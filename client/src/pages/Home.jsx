import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {Swiper, SwiperSlide} from 'swiper/react' 
import 'swiper/css/bundle'
import SwiperCore from 'swiper'
import {Navigation, Autoplay} from 'swiper/modules'
import ListingCard from '../components/ListingCard'

export default function Home() {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  SwiperCore.use([Navigation, Autoplay])

  console.log(offerListings)
  useEffect(()=>{
    const fetchOfferListings = async ()=>{
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4')
        const data = await res.json()
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
    <div className='pt-10 sm:pt-16'>
      {/* top */}
        <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-slate-400'>
            perfect</span> <br/>
          place with ease
          </h1>
          <div className='text-gray-400 text-xs sm:text-sm'>
            NestLand is the place to find your next perfect place to live.<br/>
            We have a wide range of properties for you to choose from.
          </div>
          <Link to={"/search"} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
            Let's get started...
          </Link>
        </div>
      {/* swiper */}
      <Swiper navigation autoplay={{
          delay: 4000, // 自动翻页的时间间隔，单位是毫秒
          disableOnInteraction: false, // 是否在用户交互时禁用自动播放
          pauseOnMouseEnter: true,
        }}
        loop={true} // 是否循环播放
        speed={500} // 翻页的速度，单位是毫秒
        >

      {offerListings && offerListings.length>0 && (
        offerListings.map((listing)=>{
          console.log(listing)
          return(
          <SwiperSlide key={listing._id}>
            <Link to={`/listing/${listing._id}`}>
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
    </div>
  )
}
