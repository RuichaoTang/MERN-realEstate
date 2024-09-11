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
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(window.location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl)
        }

    },[location.search])

  return (
      <header className='bg-slate-200 shadow-md p-1 sm:p-3 fixed top-0 left-0 right-0 z-20'>
        <div className='flex justify-between items-center max-w-lg sm:max-w-6xl mx-auto'>
            <Link to='/'>
            <h1 className='mx-3 font-bold text-xl sm:text-2xl flex flex-wrap'>
                <span className='text-slate-500'>Nest</span>
                <span className='text-slate-700'>Land</span>
            </h1>
            </Link>

            
            <form onSubmit={handleSubmit} className='bg-slate-100 p-1 sm:p-2 rounded-lg flex items-center'>
                <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-32 sm:w-64'
                value ={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>

                <button>
                    <FaSearch className='text-slate-600'/>
                </button>
            </form>

            <ul className='flex gap-5 items-center'>
                <Link to='/'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                </Link>
                <Link to='about'>
                <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                </Link>

                <Link to='/profile'>
                {currentUser ? (
                    <img className='rounded-full h-7 w-7 sm:h-11 sm:w-11 object-cover' src={currentUser.avatar} alt="" />

                ) : (<li className='text-slate-700 hover:underline'>Sign in</li>)
                }
                </Link>
                
            </ul>

        </div>
    </header>
  )
}
