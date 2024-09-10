import React, { useEffect } from 'react';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { auth } from '../firebase'; // 导入初始化的 auth 对象
import { useDispatch } from 'react-redux';
import { signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider); // 使用 redirect 登录
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      dispatch(signInFailure('Google Sign-In Failed'));
    }
  };

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth); // 处理重定向结果
        if (result) {
          const user = result.user;
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
            }),
          });
          const data = await res.json();
          if (data.success) {
            dispatch(signInSuccess(data));
            navigate('/');
          } else {
            dispatch(signInFailure(data.message));
          }
        }
      } catch (error) {
        console.error("Error handling redirect result:", error);
        dispatch(signInFailure('Google Sign-In Failed'));
      }
    };

    handleRedirectResult(); // 在组件加载时处理重定向结果
  }, [dispatch, navigate]);

  return (
    <button
      type='button'
      onClick={handleGoogleClick}
      className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
    >
      Continue with Google
    </button>
  );
}