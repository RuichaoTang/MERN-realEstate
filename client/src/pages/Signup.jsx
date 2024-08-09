import {Link} from 'react-router-dom'

export default function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-slate-600 text-2xl sm:text-3xl text-center font-semibold mt-7 mb-4'>Sign Up</h1>
      <form className='flex flex-col gap-3'>
        <input type = "text" placeholder='Username' className='border p-2 sm:p-3 rounded-lg' id='username'/>
        <input type = "text" placeholder='Email' className='border p-2 sm:p-3 rounded-lg' id='emial'/>
        <input type = "text" placeholder='Password' className='border p-2 sm:p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}