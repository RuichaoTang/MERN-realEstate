import React from 'react'
import { Link } from 'react-router-dom'

export default function Tail() {
  return (
    <footer className="bg-slate-800 text-white pt-6 z-30">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex flex-col sm:flex-row justify-between items-center">
      {/* <!-- Left side: logo and description --> */}
      <div className="mb-4 sm:mb-0">
        <h1 className="flex text-base sm:text-2xl sm:font-bold">Created By{'\u00A0'}
        <Link to={'/about'} onClick={() => window.scrollTo(0, 0)}>
        <span className='text-blue-500 hover:text-blue-400 transition-colors duration-300' title='About'> RuichaoTang</span> 
        </Link>
        </h1>
        <p className="text-xs sm:text-base text-gray-400 mt-2">This project was developed as a practice exercise.</p>
      </div>
      
   
      
      {/* <!-- Right side: social media links --> */}
      <div className="flex space-x-4">
      <a href="https://www.linkedin.com/in/ruichaotang" target="_blank" title="LinkedIn Profile">
        <i className="fab fa-linkedin hover:scale-125 transition-scale duration-200"></i>
      </a>
      <a href="mailto:tangrich@outlook.com" title="Send me an email">
        <i className="fas fa-envelope hover:scale-125 transition-scale duration-200"></i>
      </a>
      <a href="https://www.instagram.com/ruichaotang" target="_blank" title="Instagram Profile">
        <i className="fab fa-instagram hover:scale-125 transition-scale duration-200"></i>
      </a>
      <Link to={'/about'} onClick={() => window.scrollTo(0, 0)} title='About' >
        <i className="fas fa-info-circle hover:scale-125 transition-scale duration-200"></i>
      </Link>
      </div>

    </div>
    
    <div className="mt-4 text-center text-gray-500 text-xs">
      © 2024 Ruichao Tang. All rights reserved.
    </div>
  </div>
</footer>
  )
}
