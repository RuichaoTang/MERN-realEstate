import { useSelector } from "react-redux"
import { useRef, useState, useEffect } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import { updateUserStart, updateUserFailure, updateUserSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserSuccess, signOutUserFailure } from "../redux/user/userSlice"
import { useDispatch } from "react-redux"
import { Link } from 'react-router-dom'
import ListingCard from "../components/ListingCard"
 
export default function Profile() {
  const fileRef = useRef(null)
  const {currentUser, loading, error} = useSelector((state)=> state.user)
  const [ file, setFile ] = useState(undefined)
  const [ filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [ showListingsError, setShowListingsError ] = useState(false)
  const [ userListings, setUserListings ] = useState([])
  const [ showListingButton, setShowListingButton] =useState(true)
  console.log(userListings)
  // console.log(fileUploadError)

  
 
  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 *1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')
  useEffect(()=>{
    if(file){  
      handleFileUpload(file)
    } 
  }, [file]);

const handleFileUpload = (file)=>{
  const storage = getStorage(app)
  const fileName = new Date().getTime() + file.name
  const storageRef = ref(storage, fileName)
  const uploadTask = uploadBytesResumable(storageRef, file)
  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / 
      snapshot.totalBytes) * 100
      setFilePerc(Math.round(progress))
    },
  

  (error)=>{
    setFileUploadError(true)
  },

  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then(
      (downloadURL) => {
        setFormData({...formData, avatar:downloadURL})
      }
    )
  }
)
}

const handleChange = (e)=>{
  setUpdateSuccess(false)
  setFormData({...formData, [e.target.id]: e.target.value})
}

const handleSubmit = async (e) =>{
  e.preventDefault()
  try {
    dispatch(updateUserStart())
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    const data = await res.json()
    if(data.success === false){
      dispatch(updateUserFailure(data.message))
      return
    }
    dispatch(updateUserSuccess(data))
    setUpdateSuccess(true)
  } catch (error) {
    dispatch(updateUserFailure(error.message))
  }
}

const handleDeleteUser = async ()=>{
  const yesOrNo = window.confirm('Delete your account?')
  if(yesOrNo===false){
    return
  }
  try {
    dispatch(deleteUserStart())
    const res = await fetch(`/api/user/delete/${currentUser._id}`,{
      method: 'DELETE'
      })
    const data = await res.json()
    if(data.success === false){
      dispatch(deleteUserFailure(data.message))
      return
    }
    dispatch(deleteUserSuccess(data))
  } catch (error) {
    dispatch(deleteUserFailure(error.message))
    
  }
}

const handleSignOut = async ()=>{
  const yesOrNo = window.confirm('Sign out?')
  if(yesOrNo===false){
    return
  }
  try {
    dispatch(signOutUserStart())
    const res = await fetch('/api/auth/signout')
    const data = await res.json()
    if(data.success === false){
      dispatch(signOutUserFailure(data.message))
      return
    }
    dispatch(signOutUserSuccess(data))
  } catch (error) {
    dispatch(signOutUserFailure(error.message))
  }
}

const handleShowListings = async ()=>{
  setShowListingButton(false)
  try {
    setShowListingsError(false)
    const res = await fetch(`/api/user/listings/${currentUser._id}`)
    const data = await res.json()
    if(data.success ===false){
      setShowListingsError(true)
      return
    }
    setUserListings(data)
  } catch (error) {
    setShowListingsError(error.message)
  }
}

const handleListingDelete = async(listingId) =>{
  const yesOrNo = window.confirm('Delete this listing?')
  if(yesOrNo===false){
    return
  }
  try {
    const res = await fetch(`/api/listing/delete/${listingId}`,{
      method: 'DELETE'
    })
    const data = await res.json()
    if(data.success == false){
      console.log(data.message)
      return
    }
    setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
  } catch (error) {
    console.log(error.message)
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent to-slate-200 w-full">

    <div className="pt-10 sm:pt-16 max-w-6xl mx-auto">

    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input onChange={(e)=>{setFile(e.target.files[0])
          setUpdateSuccess(false)
        }} type="file" ref={fileRef} hidden accept='image/*'/>
        <img onClick={()=>{
          setFileUploadError(false)
          setFilePerc(false)
          fileRef.current.click()
        }} src={formData.avatar || currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover cursor-pointer self-center m-2" />
        <p className="text-sm self-center">
          {fileUploadError ?
            <span className="text-red-700">Error Image Upload. (Image must be less than 2MB)</span> :
            filePerc > 0 && filePerc < 100 ? (
              <span className="text-slate-700">Uploading {filePerc}%</span> ):
              filePerc === 100? (
                <span className="text-green-700">Image successfully uploaded</span>
              ) : (
                " "
              )
            }
        </p>
        <input type="text" defaultValue={currentUser.username} placeholder="username" id='username' className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type="email" defaultValue={currentUser.email} placeholder="email" id='email' className="border p-3 rounded-lg" onChange={handleChange}/>
        <input type="password" placeholder="password" id='password' className="border p-3 rounded-lg" onChange={handleChange}/>
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">{loading ? 'Loading...' : 'Update'}</button>
        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95" to="/create-listing" >Create Listing</Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-black cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">{updateSuccess ? "User is updated successfully!" : ""}</p>
      {showListingButton && <button onClick={handleShowListings} className="text-green-700 uppercase w-full rounded-lg p-3 ">Show listings</button>}
      <p className="text-red-700 mt-5">{showListingsError? showListingsError.message : ''}</p>
      
      </div>
      {!userListings && <h1 className="text-center mt-7 text-2xl font-semibold">You have no listing.</h1>}

    </div>

      {userListings && userListings.length > 0 && !showListingButton &&
      <div className="bg-gradient-to-b from-transparent to-slate-200 w-full">
        <h1 className="text-center mt-7 text-2xl font-semibold mb-4">Your Listings</h1>
        

        <div className="flex gap-7 flex-wrap justify-center max-w-6xl mx-auto mb-32">
        {userListings.map((listing)=>(
          
          <div key={listing._id} className="rounded-lg flex flex-col gap-1">
          <Link to={`/listing/${listing._id}`}>
            <ListingCard listing={listing}/>
          </Link>

           <button onClick={()=>handleListingDelete(listing._id)} className="text-white uppercase bg-red-700 rounded-lg w-full sm:w-[270px] p-1 hover:opacity-95">Delete</button>
            
            <Link to={`/listing/${listing._id}?edit=true`}>
            <button className="text-white uppercase bg-slate-700 rounded-lg w-full sm:w-[270px] p-1 hover:opacity-95">Edit</button>
            </Link>
            
          
          </div>
          ))
        }
        </div>
        
      
        <div className='p-10'></div>
        </div>}
        </div>
  )
}
 