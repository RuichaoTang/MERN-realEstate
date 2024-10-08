import {FaSearch} from 'react-icons/fa';
import {Link, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react';

export default function Header() {
    const {currentUser} = useSelector(state => state.user)
    const [ searchTerm, setSearchTerm ] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams(window.location.search)
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString()
        navigate(`search?${searchQuery}`)
        window.scrollTo(0, 0)
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl)
        }

    },[location.search])

  return (
    <header className='bg-slate-200 p-1 sm:p-3 fixed top-0 left-0 right-0 z-20'>
    <div className='flex justify-center items-center w-full'>
      <div className='flex justify-between items-center max-w-lg sm:max-w-6xl w-full px-4'>
        <Link to='/' title='Home' onClick={() => { window.scrollTo(0, 0) }}>
          <h1 className='mx-1 sm:mx-3 font-bold text-base sm:text-2xl flex flex-wrap'>
            <span className='text-slate-500'>Nest</span>
            <span className='text-slate-700'>Land</span>
          </h1>
        </Link>
  
        <form onSubmit={handleSubmit} className='bg-slate-100 p-1 sm:p-2 rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Search...'
            className='bg-transparent focus:outline-none w-32 sm:w-64'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className='text-slate-600' />
          </button>
        </form>
  
        <ul className='flex gap-0 sm:gap-5 items-center'>
          <Link to='/' onClick={() => window.scrollTo(0, 0)} title='Home'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
          </Link>
          <Link to='about' onClick={() => window.scrollTo(0, 0)} title='About'>
            <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
          </Link>
  
          <div className='flex flex-wrap gap-3 sm:gap-5  justify-center items-center mx-auto sm:mx-0'>
            <Link to='/profile' title='Profile' onClick={() => window.scrollTo(0, 0)}>
              {currentUser ? (
                <img className='rounded-full h-7 w-7 sm:h-11 sm:w-11 object-cover' src={currentUser.avatar} alt="Profile" />
              ) : (
                <li className='text-slate-700 hover:underline'>Sign in</li>
              )}
            </Link>
            <Link to={'/about'} onClick={() => window.scrollTo(0, 0)} title='About'>
              <i className="block mx-auto sm:hidden fas fa-info scale-75  hover:text-slate-400 transition-colors duration-200 text-slate-300"></i>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  </header>
  )
}
