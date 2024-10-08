
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingCard from '../components/ListingCard'
import { FaBook } from 'react-icons/fa'
import { useSelector } from 'react-redux'

export default function Search() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [listings, setListings] = useState([])
    const [ showMore, setShowMore ] = useState(false)
    const {currentUser} = useSelector((state) => state.user)


    const onShowMoreClick = async ()=>{
        const numberOfListings = listings.length
        const urlParams = new URLSearchParams(location.search)
        const startIndex = numberOfListings
        urlParams.set('startIndex',startIndex)
        const searchQuery = urlParams.toString()
        const res = await fetch(`/api/listing/get?${searchQuery}`)
        const data = await res.json()
        if(data.length < 9){
            setShowMore(false)
        }
        setListings([...listings, ...data])

    }


    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'createdAt',
        order: 'desc',
    })

    const handleChange = (e)=>{
        if( e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale' ){
            setSidebarData({...sidebarData, type: e.target.id})
        }
        if( e.target.id === 'searchTerm'){
            setSidebarData({...sidebarData, searchTerm: e.target.value})
        }
        if( e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer' ){
            setSidebarData({...sidebarData, [e.target.id]: e.target.checked || e.target.checked ==='true' ? true : false})
        }
        if( e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'createdAt'
            const order = e.target.value.split('_')[1] || 'desc'
            setSidebarData({...sidebarData, sort, order})
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm', sidebarData.searchTerm)
        urlParams.set('type', sidebarData.type)
        urlParams.set('parking', sidebarData.parking)
        urlParams.set('furnished', sidebarData.furnished)
        urlParams.set('offer', sidebarData.offer)
        urlParams.set('sort', sidebarData.sort)
        urlParams.set('order', sidebarData.order)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }


    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        const typeFromUrl = urlParams.get('type')
        const parkingFromUrl = urlParams.get('parking')
        const furnishedFromUrl = urlParams.get('furnished')
        const offerFromUrl = urlParams.get('offer')
        const sortFromUrl = urlParams.get('sort')
        const orderFromUrl = urlParams.get('order')

        if(
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ){
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'createdAt',
                order: orderFromUrl || 'desc',
            })
        }

        const fetchListings = async () =>{
            setLoading(true)
            const searchQuery = urlParams.toString()
            const res = await fetch(`/api/listing/get?${searchQuery}`)
            const data = await res.json()
            if(data.length > 8){
                setShowMore(true)
            }else{
                setShowMore(false)
            }
            setListings(data)
            setLoading(false)
        }

        fetchListings()


    },[location.search])


   
  const checkFav = () => {
    if(currentUser){
        navigate(`/user/${currentUser._id}/favorites`)
    }else{
        navigate('/sign-in')
        
    }}


  return (
    <div className='flex flex-col md:flex-row pt-10 sm:pt-16 min-h-screen bg-gradient-to-b sm:bg-gradient-to-r from-transparent via-transparent to-slate-200 w-full'>
     <div className="fixed bottom-20 right-7 sm:right-16 flex justify-center z-50">

      <button
  onClick={checkFav}
  className="flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-blue-700 text-white p-4 rounded-lg shadow-lg hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-800 transition-all duration-300 w-16 h36"
  title="Saved Listings"
>
  <FaBook className="w-10 h-10 mb-2" />
  
</button>

      </div>

        {/* left part */}
        <div className='p-7 md:h-full sm:fixed bg-gradient-to-b from-slate-200 via-transparent to-transparent z-10'>
            <form className='flex flex-col gap-7' onSubmit={handleSubmit}>
                <div className='flex items-center gap-2'>
                    <div className='whitespace-nowrap font-semibold'>Search Term</div>
                    <input type='text' id='searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-full' onChange={handleChange} value={sidebarData.searchTerm}/>
                </div>

                <div className='flex gap-2 flex-wrap items-center'>
                    <div className='font-semibold'>Type:</div>
                    <div>
                        <input type='checkbox' id='all' className='w-5' onChange={handleChange} checked={sidebarData.type==='all'}/>
                        <span>Rent & Sale</span>
                    </div>
                    
                    <div>
                        <input type='checkbox' id='rent' className='w-5' onChange={handleChange} checked={sidebarData.type==='rent'}/>
                        <span>Rent</span>
                    </div>

                    <div>
                        <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={sidebarData.type==='sale'}/>
                        <span>Sale</span>
                    </div>

                    <div>
                        <input type='checkbox' id='offer' className='w-5' onChange={handleChange} checked={sidebarData.offer}/>
                        <span>Offer</span>
                    </div>
                </div>

                <div className='flex gap-2 flex-wrap items-center'>
                    <div className='font-semibold'>Amendites:</div>
                    <div>
                        <input type='checkbox' id='parking' className='w-5' onChange={handleChange} checked={sidebarData.parking}/>
                        <span>Parking</span>
                    </div>
                    
                    <div>
                        <input type='checkbox' id='furnished' className='w-5' onChange={handleChange} checked={sidebarData.furnished}/>
                        <span>Furnished</span>
                    </div>
                </div>

                <div className='flex gap-2 items-center'>
                    <div className='font-semibold'>Sort:</div>
                    <select 
                    value={`${sidebarData.sort}_${sidebarData.order}`}
                    
                    id='sort_order' className='border rounded-lg p-2' onChange={handleChange}>
                        <option value = 'regularPrice_desc'>Price high to low</option>
                        <option value = 'regularPrice_asc'>Price low to high</option>
                        <option value = 'createdAt_desc'>Latest</option>
                        <option value = 'createdAt_asc'>Oldest</option>
                    </select>
                </div>

                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
                    Search
                </button>

            </form>
        </div>

        {/* right part */}
        <div className='flex-1 sm:ml-96 '>
            <h1 className='text-lg sm:text-2xl font-semibold border-b text-slate-700 text-center tracking-wide mt-12 mb-5'>
    Listings Results
    </h1>
            <div className='sm:p-7 p-3 flex flex-wrap gap-4'>
                {!loading && listings.length === 0 && (
                    <p className='text-slate-700 text-xl'>Nothing found.</p>
                )}
                {loading && (
                    <p className='text-slate-700 text-xl text-center w-full'>Loading...</p>
                )}

                <div className='flex gap-4 flex-wrap w-full'>

                {!loading && listings && listings.map((listing)=>(
                    <div className='gap-4 w-full sm:w-[270px]' key={listing._id}>
                        <ListingCard listing={listing}/>

                    </div>
                ))
            }
            </div>
          

                {showMore && (
                    <button onClick={
                        onShowMoreClick
                    } className='text-green-700 hover:underline p-7 w-full text-center'>
                        Show more
                    </button>
                )

                }
                <div className='p-10'></div>
            </div>
        </div>


        <div className='p-10'></div>
    </div>
  )
}
