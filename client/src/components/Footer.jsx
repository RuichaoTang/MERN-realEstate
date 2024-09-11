import React from 'react'

export default function Tail() {
  return (
    <footer className="bg-slate-800 text-white py-8 z-30">
  <div className="max-w-6xl mx-auto px-4">
    <div className="flex flex-col sm:flex-row justify-between items-center">
      {/* <!-- Left side: logo and description --> */}
      <div className="mb-6 sm:mb-0">
        <h1 className="text-base sm:text-2xl font-bold">Created By RuichaoTang</h1>
        <p className="text-sm sm:text-base text-gray-400 mt-2">This project was developed as a practice exercise.</p>
      </div>
      
   
      
      {/* <!-- Right side: social media links --> */}
      <div className="flex space-x-4 mt-4 sm:mt-0">
      <a href="https://www.linkedin.com/in/ruichaotang" target="_blank" title="LinkedIn Profile">
        <i class="fab fa-linkedin"></i>
      </a>
      <a href="mailto:tangrich@outlook.com" title="Send me an email">
        <i class="fas fa-envelope"></i>
      </a>
      <a href="https://www.instagram.com/ruichaotang" target="_blank" title="Instagram Profile">
        <i class="fab fa-instagram"></i>
      </a>
      <a href="/about" title="About Us">
        <i class="fas fa-info-circle"></i>
      </a>
      </div>

    </div>
    
    <div className="mt-8 text-center text-gray-500 text-sm">
      © 2024 Ruichao Tang. All rights reserved.
    </div>
  </div>
</footer>
  )
}
