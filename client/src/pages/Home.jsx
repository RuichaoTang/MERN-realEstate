import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react' 
import 'swiper/css/bundle'
import SwiperCore from 'swiper'
import {Navigation, Autoplay, Pagination} from 'swiper/modules'
import ListingCard from '../components/ListingCard'


export default function Home() {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  SwiperCore.use([Navigation, Autoplay, Pagination])

  console.log(offerListings)
  useEffect(()=>{
    const fetchOfferListings = async ()=>{
      try {
        const res = await fetch('/api/listing/random_offer')
        const data = await res.json()
        console.log(data)
        setOfferListings(data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListings = async ()=>{
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4')
        const data = await res.json()
        setRentListings(data)
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings = async ()=>{
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4')
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings()
    fetchRentListings()
    fetchSaleListings()
  },[])



  return (
    <div className='pt-10 sm:pt-16 min-h-screen'>
      {/* banner */}
      <img
        src="https://firebasestorage.googleapis.com/v0/b/mern-estate-c1d3f.appspot.com/o/1726135812598pixlr-image-generator-0a9aaa1e-0d0b-42ac-b407-dfb1e5f82b42.png?alt=media&token=ca194743-0d0c-4280-af4f-4110579ecba6" // Replace with your image path
        alt=""
        className="w-full h-64 object-cover fixed opacity-5 transparent-element"
        style={{
          maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%)'
        }}
      />
      {/* top */}
      <div className="dynamic-background flex items-center justify-center sm:items-start sm:justify-start z-10" >
      {/* <h1 class="text-4xl font-bold text-white">Animated Background</h1> */}
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
          <h1 className='text-slate-600 font-bold text-4xl lg:text-6xl'>Effortless home{'\u00A0'}
            <Link to={'/search'} title='Search' onClick={()=>window.scrollTo(0,0)}>
              <span className='text-green-700 hover:text-slate-500 transition-colors duration-300'>
                search</span>
            </Link>
          
          <br/>just for you
          </h1>
          <Link to={'/about'} title='About'>
          <div className='text-gray-500 text-xs sm:text-sm hover:text-black transition-colors duration-300'>
          Your perfect home is just a click away at NestLand. <br/>
          Explore our wide range of property options to find the one that fits you best.
          </div>
          </Link>
          <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline' title='search'>
            Let's get started...
          </Link>
        </div>
    </div>
      {/* swiper */}
      <Swiper navigation
          autoplay={{
          delay: 4000, // 自动翻页的时间间隔，单位是毫秒
          disableOnInteraction: true, // 是否在用户交互时禁用自动播放
          pauseOnMouseEnter: true,}}
          modules={[Pagination]}
          pagination={{ clickable: true,
           }}
          spaceBetween={30}
          slidesPerView={1}
          loop={true} // 是否循环播放
          speed={500} // 翻页的速度，单位是毫秒
        >

      {offerListings && offerListings.length>0 && (
        offerListings.map((listing)=>{
          // console.log(listing)
          return(
          <SwiperSlide key={listing._id}>
            <Link to={`/listing/${listing._id}`} title='Show This Listing'>
            <div style={{
              maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 30%)',
              WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 1) 30%)'
            }}>
            <img src={listing.imageUrls[0]} alt='Picture not found.' className="w-full h-[450px] sm:h-[600px] object-cover transition-opacity duration-300 hover:opacity-80"/>
            </div>
          </Link>
          </SwiperSlide>
        )})
      )}
   
    </Swiper>
    

    <div className='bg-gradient-to-b from-transparent to-slate-200 w-full'>

      {/* listing results for offer, sale and rent */}
        <div className='max-w-6xl mx-auto p-3 flex flex-col my-10 gap-8'>
          {offerListings && offerListings.length>0 && (
            <div className=''>
              <div className=''>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
              </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing)=>(
                <ListingCard listing={listing} key={`${listing._id}C`}></ListingCard>
              ))}
            </div>
            </div>
          )}

          {rentListings && rentListings.length>0 && (
            <div className=''>
              <div className=''>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places to rent</Link>
              </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing)=>(
                <ListingCard listing={listing} key={`${listing._id}B`}></ListingCard>
              ))}
            </div>
            </div>
          )}

          {saleListings && saleListings.length>0 && (
            <div className=''>
              <div className=''>
                <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places to sale</Link>
              </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing)=>(
                <ListingCard listing={listing} key={`${listing._id}A`}></ListingCard>
              ))}
            </div>
            </div>
          )}

        </div>
        <div className='p-10'></div>
          </div>
    </div>
  )
}
