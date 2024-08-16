import {FaSearch} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux'

export default function Header() {
    const {currentUser} = useSelector(state => state.user)
  return (
    <header className='bg-slate-200 shadow-md p-1 sm:p-3'>
        <div className='flex justify-between items-center max-w-6xl mx-auto'>
            <Link to='/'>
            <h1 className='mx-3 font-bold text-xl sm:text-2xl flex flex-wrap'>
                <span className='text-slate-500'>Nest</span>
                <span className='text-slate-700'>Land</span>
            </h1>
            </Link>
            <form className='bg-slate-100 p-1 sm:p-2 rounded-lg flex items-center'>
                <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-32 sm:w-64'/>
                <FaSearch className='text-slate-600'/>
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
