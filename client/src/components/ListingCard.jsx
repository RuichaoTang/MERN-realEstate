import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'
import { FaBath, FaBed} from 'react-icons/fa'

export default function ListingCard({listing}) {


    if(listing.offer){
        var price = listing.discountedPrice
    }else{
        var price = listing.regularPrice
    }

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[270px]'>
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} 
            alt='Picture Not Found' className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
            <div className='p-3 flex flex-col gap-2 w-full'>
                <p className='truncate text-lg font-semibold text-slate-700'>{listing.name}</p>
                <div className='flex items-center gap-1'>
                    <MdLocationOn className='h-4 w-4 text-green-700'/>
                    <p className='text-sm text-gray-500 truncate w-full'>{listing.address}</p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-3'>{listing.description}</p>
                <p>
                    <p className='text-slate-700 mt-2 font-semibold flex'>
                        ${price && price.toLocaleString('en-US')}
                        {listing.type === 'rent' && ' / month'}
                    </p>
                </p>
                <div className='text-xs font-bold flex flex-wrap gap-4 text-gray-900'>
                    <div className='flex gap-1 items-center whitespace-nowrap'>
                        <FaBed className='text-lg'/>
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
                    </div>
                    <div className='flex gap-1 items-center whitespace-nowrap'>
                        <FaBath className='text-md'/>
                        {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Baths`}
                    </div>
                    
                </div>
            </div>
        </Link>
        
    </div>
  )
}
