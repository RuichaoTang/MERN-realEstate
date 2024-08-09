import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });
      const data = await res.json(); 
      console.log(data);
      if (data.success == false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };


  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-slate-600 text-2xl sm:text-3xl text-center font-semibold mt-7 mb-4'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input type = "text" placeholder='Username' className='border p-2 sm:p-3 rounded-lg' id='username' onChange={handleChange} />
        <input type = "email" placeholder='Email' className='border p-2 sm:p-3 rounded-lg' id='email' onChange={handleChange} />
        <input type = "password" placeholder='Password' className='border p-2 sm:p-3 rounded-lg' id='password' onChange={handleChange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'loading...' : 'Sign Up'}</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}