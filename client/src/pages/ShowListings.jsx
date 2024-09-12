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


export default function ShowListings() {
    SwiperCore.use([ Navigation, Autoplay, Pagination ])
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [contact, setContact] = useState(false)
    const params = useParams()
    const {currentUser} = useSelector((state) => state.user)
    const [showUpdate, setShowUpdate] = useState(false)

    console.log(listing)

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

  return (
    <main className='pt-12 sm:pt-16'>
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
                    <SwiperSlide key={url} className='transition-opacity duration-300 hover:opacity-80'>
                    <Link to={url} target="_blank" rel="noopener noreferrer" title='See Full Image'>
                    <div style={{
                        maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 30%)',
                        WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 30%)'
                    }}>
                    <img src={url} alt='Picture not found.' className="w-full h-[350px] sm:h-[550px] object-cover"/>
                    </div>
                    </Link>
                </SwiperSlide>
                ))}
            </Swiper>
            <div className='max-w-4xl my-7 mx-auto flex flex-col gap-y-6 p-3' >

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
            className='bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3 w-full mt-16 mb-16'>Contact Landlord</button>
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
