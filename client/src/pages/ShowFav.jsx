import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { useNavigate } from 'react-router-dom';
import GoBack from '../components/GoBack'

const FavoritesPage = () => {
  const { userId } = useParams();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate()


  console.log(userId)
  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`/api/user/${userId}/favorites`)
        const data = await res.json()
        setFavorites(data);
        console.log(data)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  if (error) return <p>Error: {error}</p>;

  const handleExplore = ()=>{
    navigate('/search')
  }

  return (
    <div className='flex flex-col md:flex-row pt-10 sm:pt-16 min-h-screen bg-gradient-to-b sm:bg-gradient-to-r from-transparent via-transparent to-slate-200 w-full'>
        <div className="fixed top-24 sm:top-32 left-0 w-full flex justify-center z-50">
      <div className="max-w-6xl w-full flex justify-between items-center px-4">
        {/* 返回按钮 */}
        <GoBack/>

      </div>
    </div>
  <div className='flex flex-col items-center w-full'>
    <h1 className='text-base sm:text-2xl font-semibold border-b text-slate-700 text-center tracking-wide mb-5'>
      Saved Listings
    </h1>

    <div className='p-3 sm:p-7 w-full flex flex-wrap justify-center gap-4'>
      {!loading && favorites.length === 0 && (
        <p className='text-slate-700 text-xl'>You haven't saved any listing.{'\u00A0'}
        
        <button onClick={handleExplore} className='text-blue-600'>
            Go explore.    
        </button></p>
      )}
      {loading && (
        <p className='text-slate-700 text-xl text-center w-full'>Loading...</p>
      )}

      {!loading && favorites && favorites.map((listing) => (
        <div className='w-full sm:w-[270px] mb-4' key={listing._id}>
          <ListingCard listing={listing} />
        </div>
      ))}
    </div>
  </div>
</div>
    
  );
};

export default FavoritesPage;