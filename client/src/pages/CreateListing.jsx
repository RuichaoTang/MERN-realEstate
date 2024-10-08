import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { app } from '../firebase'
import { useNavigate } from 'react-router-dom'

export default function CreateListing() {
    const {currentUser} = useSelector(state=>state.user)
    const [files, setFile] = useState([])
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 0,
        bathrooms: 0,
        regularPrice: 50,
        discountedPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    })
    const [ imageUploadError, setImageUploadError] = useState(false)
    const [ uploading, setUploading] = useState(false)
    const [ error, setError] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()
    const handleImageSubmit = () =>{
        if(files.length > 0 && (files.length + formData.imageUrls.length) < 7){
            setUploading(true)
            setImageUploadError(false)
            const promises = []
            for (let i = 0; i < files.length; i++){
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls) => {
                setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)})
                setImageUploadError(false)
                setUploading(false)
            }).catch((err)=>{
                console.log(formData.imageUrls.length)
                console.log(files.length)
                setImageUploadError('Image upload failed. (2Mb max per image)')
                setUploading(false)
            })
        }else{
            setImageUploadError('You can only upload 6 images per listing.')
            setUploading(false)
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject)=>{
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)
            uploadTask.on(
                'state_changed',
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log(progress)
                },
                (error) => {
                    reject(error)
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )

        })
    }

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_,i) => i !== index)
        })
    }

    const handleChange = (e) => {
        if(e.target.id ==='sale' || e.target.id ==='rent'){
            setFormData({
                ...formData,
                type: e.target.id
            })
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            }
            )
        }

        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
            if(e.target.id === 'discountedPrice'){
                if(e.target.value > parseInt(formData.regularPrice,10)){
                    console.log('here')
                    setFormData({
                        ...formData,
                        // [e.target.id]: formData.regularPrice
                    })
                }else{setFormData({
                    ...formData,
                    [e.target.id]: e.target.value
                })}
            }else{
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })}
        }

    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            if(formData.imageUrls.length < 1) return setError('You must upload at least one image.')
            setLoading(true)
            setError(true)
            const res = await fetch('/api/listing/create',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...formData,
                    userRef: currentUser._id
                })
            })
            const data = await res.json()
            setLoading(false)
            if(data.success===false){
                setError(data.message)
            }else{
                navigate(`/listing/${data._id}`)
            }
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
    }

  return (
    <main className='p-3 max-w-4xl mx-auto pt-10 sm:pt-16 min-h-screen'>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
            <div className='flex flex-col gap-4 flex-1'>
                <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='5' required onChange={handleChange} value={formData.name}/>
                <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required onChange={handleChange} value={formData.description}/>
                <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' required onChange={handleChange} value={formData.address}/>
            <div className='flex gap-6 flex-wrap'>
                <div className='flex gap-2'>
                    <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={formData.type==='sale'}/>
                    <span>Sell</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='rent' className='w-5' onChange={handleChange} checked={formData.type==='rent'}/>
                    <span>Rent</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='parking' className='w-5' onChange={handleChange} checked={formData.parking===true}/>
                    <span>Parking Spot</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='furnished' className='w-5' onChange={handleChange} checked={formData.furnished===true}/>
                    <span>Furnished</span>
                </div>
                <div className='flex gap-2'>
                    <input type='checkbox' id='offer' className='w-5' onChange={handleChange} checked={formData.offer===true}/>
                    <span>Offer</span>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='bedrooms' min='0' max='50' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bedrooms}/>
                        <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='bathrooms' min='0' max='50' required className='p-3 border border-gray-300 rounded-lg'onChange={handleChange} value={formData.bathrooms}/>
                        <p>Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' id='regularPrice' min='50' max='9999999999' required className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.regularPrice}/>
                        <div className='flex flex-col'>
                        <p>Regular Price</p>
                        <span className='text-xs'>{formData.type==='rent'? '($ / month)':''}</span>
                        </div>
                    </div>
                    { formData.offer &&
                    <div className='flex items-center gap-2'>
                        <input type='number' id='discountedPrice' min='50' max='9999999999' className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.discountedPrice}/>
                        <div className='flex flex-col'>
                        <p>Discounted Price</p>
                        <span className='text-xs'>{formData.type==='rent'? '($ / month)':''}</span>
                        </div>
                    </div>
}
                </div>

            </div>
            
            </div>
            <div className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover. (max 6)</span>
                </p>
                <div className='flex gap-4'>
                    <input onChange={(e) => setFile(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type='file' id='images' accept='image/*' multiple/>
                    <button type='button' onClick={handleImageSubmit} disabled={uploading} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:text-gray-500 disabled:border-gray-500'>{uploading? 'Uploading...':'Upload'}</button>
                </div>
                    <p className='text-red-700 m-3'>{imageUploadError? `${imageUploadError}`:""}</p>
                    <div className=''>
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((url, index)=>(
                            <div key={index} className='flex justify-between p-3 border items-center'>
                            <img key={url} src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg'/>
                            <button onClick={()=>handleRemoveImage(index)} type='button' className='p-3 rounded-lg uppercase hover:opacity-75 cursor-pointer text-sm text-red-700'> Delete </button>
                            </div>
                        ))
                    }
                    </div>
                    <button disabled={formData.imageUrls.length <= 0 || loading || uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading? 'Creating...':'Create Listing'}</button>
                    {error && <p className='text-red-700 text-sm'>{error}</p>}
            </div>
        </form>
    </main>
  )
}
