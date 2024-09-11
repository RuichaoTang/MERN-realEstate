import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure, clearError } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // 在刷新页面时清除错误
    if (error) {
      dispatch(clearError());
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        dispatch(signInFailure(errorData.message || 'Failed to sign in'));
        return;
      }

      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className=''>

    <div className='p-3 max-w-lg mx-auto pt-10 sm:pt-16 min-h-screen'>
      <h1 className='text-slate-600 text-2xl sm:text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <input
          type='email'
          placeholder='Email'
          className='border p-2 sm:p-3 rounded-lg'
          id='email'
          onChange={handleChange}
          />
        <input
          type='password'
          placeholder='Password'
          className='border p-2 sm:p-3 rounded-lg'
          id='password'
          onChange={handleChange}
          />
        <button
          disabled={loading}
          className={`bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 ${
            loading ? 'opacity-80 cursor-not-allowed' : ''
          }`}
          >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have an account?</p>
        <Link to='/sign-up'>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5 text-center'>{error}</p>}
      </div>
      </div>
  );
}