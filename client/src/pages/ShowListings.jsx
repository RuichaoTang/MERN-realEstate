import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation, Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css/bundle'
import { FaMapMarkedAlt, FaBed, FaBath, FaParking, FaChair } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Contact from '../components/Contact'
import ListingUpdater from '../components/ListingUpdater'
import { useNavigate } from 'react-router-dom';

import GoBack from '../components/GoBack'
import { FaStar, FaBook } from 'react-icons/fa'; // 使用 react-icons 图标库


export default function ShowListings() {
    SwiperCore.use([ Navigation, Autoplay, Pagination ])
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [contact, setContact] = useState(false)
    const params = useParams()
    const {currentUser} = useSelector((state) => state.user)
    const [showUpdate, setShowUpdate] = useState(false)
    const navigate = useNavigate()
    
    const [isFavorited, setIsFavorited] = useState(false)
    const [favorites, setFavorites] = useState([]);
    // console.log('param',params)

    // console.log(favorites)

    useEffect(() => {
        if(!currentUser){
            return
        }
        const userId = currentUser._id
        const fetchFavorites = async () => {
          try {
            const res = await fetch(`/api/user/${userId}/favorites`)
            const data = await res.json()
            setFavorites(data);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
        fetchFavorites();
      },[]);

    useEffect(()=>{
        if(!currentUser){return}
        // console.log(params.listingId)
         setIsFavorited(favorites.some(listing=>{return listing._id === params.listingId}))
        //  console.log(isFavorited)
    },[favorites])

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const edit = urlParams.get('edit')?  true : false
        setShowUpdate(edit)
        const fetchListing = async ()=>{
            try {
                setLoading(true)
                const res = await fetch(`/api/listing/get/${params.listingId}`)
                const data = await res.json()
                if(data.success === false){
                    setError(true)
                    setLoading(false)
                    return
                }
            
                setListing(data)
                setLoading(false)
                setError(false)
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
        fetchListing()
    },[params.listingId])

    const handleClickUpdate = ()=>{
        setShowUpdate(true)
    }

const handleFavorite = async () => {
    if(currentUser){
        
        try {
          const response = await fetch('/api/user/favorite', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ listingId: params.listingId,
                userRef: currentUser._id
             }),
          });
      
          const data = await response.json();
          console.log(data)
          setIsFavorited(!isFavorited) 
        } catch (error) {
          console.error('Error toggling favorite:', error);
        }

    }else{
        const yesOrNo = window.confirm('You haven\'t logged in. Log in to save this listing?')
        if(yesOrNo===true){
            navigate('/sign-in')
        }else{
            return
        }
    }

  };

  const checkFav = () => {
        if(currentUser){
            navigate(`/user/${currentUser._id}/favorites`)
        }else{
            const yesOrNo = window.confirm('You haven\'t logged in. Log in to see your saved listing?')
            if(yesOrNo===true){
                navigate('/sign-in')
            }else{
                return
            }
        }
      }

  return (
    <main className={`pt-10 sm:pt-16 max-w-full transition-all duration-300`}>
        

        <div className="fixed top-24 sm:top-32 left-0 w-full flex justify-center z-50">
      <div className="max-w-6xl w-full flex justify-between items-center px-4">
        {/* 返回按钮 */}
        <GoBack/>

        {/* 收藏按钮 */}
        <button
          onClick={handleFavorite}
          className={` text-white p-3 rounded-lg shadow-lgactive:scale-95 transition-colors duration-200 ${isFavorited ? 'bg-gradient-to-b from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700' : 
                        'bg-gradient-to-b from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800'}`}
        title={isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
        >
          <FaStar className="w-6 h-6" />
        </button>


      </div>
    </div>
    <div className="fixed top-40 sm:top-48 left-0 w-full flex justify-center z-50">
      <div className="max-w-6xl w-full flex justify-end items-center px-4">

        <button
          onClick={checkFav}
          className="text-white p-3 rounded-lg shadow-lg bg-gradient-to-b from-blue-500 to-blue-700 hover:bg-gradient-to-b hover:from-blue-600 hover:to-blue-800 transition-all duration-300 active:scale-95"
          title="Saved List"
        >
          <FaBook className="w-6 h-6" />
        </button>


      </div>
    </div>


        

        



        {loading && <p className='text-center my-7 text-2x'>Loading...</p>}
        {error && <p className='text-center my-7 text-2x'>Something went wrong!</p>}
        {listing && !loading && !error && (
        <div>
            <Swiper navigation autoplay={{
          delay: 4000, // 自动翻页的时间间隔，单位是毫秒
          disableOnInteraction: true, // 是否在用户交互时禁用自动播放
          pauseOnMouseEnter: true,
        }}
        loop={true} // 是否循环播放
        speed={500} // 翻页的速度，单位是毫秒
        pagination={{ clickable: true,
        }}
       spaceBetween={30}
       slidesPerView={1}
        >
                {listing.imageUrls.map( url => (
                    <SwiperSlide
                    key={url}
                    className={`relative transition-opacity duration-300`}
                  >
                    {isFavorited && (
                        
                      <div
                        className="absolute inset-0 bg-gradient-to-b from-yellow-600 to-transparent opacity-50 transparent-element"
                        style={{ zIndex: 2 }}
                        />
                        
                        
                        
                      
                    )}
                    <Link to={url} target="_blank" rel="noopener noreferrer" title='See Full Image'>
                      <div
                        style={{
                          maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 30%)',
                          WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 30%)',
                          position: 'relative',
                          zIndex: 1, // Ensure this is above the background
                        }}
                      >
                        <img
                          src={url}
                          alt='Picture not found.'
                          className="w-full h-[350px] sm:h-[550px] object-cover"
                        />
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
            </Swiper>
            <div className='max-w-4xl  mx-auto flex flex-col gap-y-6 p-3' >
            
            <div className='flex flex-wrap gap-4'>
                <h1 className='text-3xl font-bold uppercase text-slate-700'>{listing.name}</h1>
                <h1 className='text-3xl font-bold uppercase text-slate-700'>-</h1>
                <div className='flex font-semibold'>
                    {listing.offer? 
                    <div className='flex '>
                        <div className='text-3xl'>
                        $ {listing.discountedPrice.toLocaleString('en-US')}
                        </div>

                        <div className='line-through text-gray-400'>
                        {listing.regularPrice.toLocaleString('en-US')}
                        </div>
                    </div> :  
                    <div className='text-3xl'>$ {listing.regularPrice.toLocaleString('en-US')} </div>}
                    {listing.type ==='rent' && <div className='text-3xl'>/ Month</div>}
                </div>  
            </div>
            <div className='flex flex-col gap-y-1'>

            <p className='flex items-center gap-2 text-slate-600 text-sm'>
                    <FaMapMarkedAlt className='text-green-700'/>
                    {listing.address}
            </p>
            <div className='flex gap-4'>

            <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>{listing.type === 'rent' ? 'For Rent' : 'For Sale'}</p>
            {
                listing.offer && (
                    <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>Discount: ${+listing.regularPrice - +listing.discountedPrice}</p>
                )
            }

            </div>

            </div>

            <p className='text-slate-800'>
                <span className='font-semibold text-black'>
                Description - {' '}
                </span>
                {listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                <li className='flex item-center gap-1 whitespace-nowrap'>
                    <FaBed className='text-lg'/>
                    {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                </li>
                <li className='flex item-center gap-1 whitespace-nowrap'>
                    <FaBath className='text-lg'/>
                    {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
                </li>
                <li className='flex item-center gap-1 whitespace-nowrap'>
                    <FaParking className='text-lg'/>
                    {listing.parking ? 'Parking Spot' : 'No Parking'}
                </li>
                <li className='flex item-center gap-1 whitespace-nowrap'>
                    <FaChair className='text-lg'/>
                    {listing.furnished ? 'Furnished' : 'Not Furnished'}
                </li>
                
            </ul>
            {!currentUser && <div className='mt-16'>
                    <Link to={'/sign-in'}>
                    
                    <button className='bg-slate-700 text-white font-semibold rounded-lg hover:opacity-95 p-3 w-full mb-16'>Sign in for more information!</button>
                    </Link>
                </div>}
            {currentUser && listing.userRef === currentUser._id && !showUpdate &&
            
                <button onClick={handleClickUpdate} className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 w-full mt-16 mb-16'>
                    Edit your listing
                </button>
            
            }
            {currentUser && listing.userRef !== currentUser._id && !contact &&
            <button onClick={()=>setContact(true)}
            className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 w-full mt-16 -16'>Contact Landlord</button>
        }
            {contact && <Contact listing={listing}/>}
            </div>

        {currentUser && listing.userRef === currentUser._id && showUpdate &&
        <div>

            <div className='bg-gradient-to-b from-transparent to-slate-200 w-full'>
                <ListingUpdater/>
            </div>
        </div>
        }
        </div>
        )}
    </main>
  )
}
