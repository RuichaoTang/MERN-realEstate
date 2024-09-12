 import React from 'react'
 
 export default function About() {
   return (
     <div className='pt-10 sm:pt-16 flex flex-col min-h-screen bg-gradient-to-b from-transparen via-transparent to-slate-200 w-full'>
      <div className="about-container max-w-3xl mx-auto py-12 px-6 bg-gradient-to-r from-transparent via-white to-transparent">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">About the Author</h1>
      
      <p className="text-lg sm:text-xl text-gray-700 mb-4">
        Hi! I'm <span className="font-semibold text-blue-700">Ruichao Tang</span>, currently a computer science student based in San Francisco.
         I am passionate about technology and software development, 
         and I aspire to build a career as a software engineer.
      </p>
      {/* Contact Section */}
      
        <p className="text-lg sm:text-xl text-gray-700 mb-4">
          Feel free to connect:
        </p>
        <div className="flex space-x-6">
          <a href="https://www.linkedin.com/in/ruichaotang" target="_blank" rel="noopener noreferrer" title='Linkedin'>
            <i className="fab fa-linkedin fa-2x text-blue-950 hover:text-blue-800"></i>
          </a>
          <a href="https://www.instagram.com/ruichaotang" target="_blank" rel="noopener noreferrer" title='Instagram'>
            <i className="fab fa-instagram fa-2x text-blue-950 hover:text-blue-800"></i>
          </a>
          <a href="https://github.com/RuichaoTang" target="_blank" rel="noopener noreferrer" title='Github'>
            <i className="fab fa-github fa-2x text-blue-950 hover:text-blue-800"></i>
          </a>
          <a href="mailto:tangrich@outlook.com" title='Email'>
            <i className="fas fa-envelope fa-2x text-blue-950 hover:text-blue-800"></i>
          </a>
        </div>
     
      
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 mt-12">About This Project</h2>
      <p className="text-lg sm:text-xl text-gray-700 mb-4">
        This project is a part of my personal learning journey, and it's built utilizing MERN stack (MongoDB, Express.js, React, Node.js).
      <p className="text-lg sm:text-xl text-gray-700">
        While this project is for practice, it represents my ongoing dedication to mastering software engineering and my continuous effort to improve as a developer. Feel free to explore, and thank you for visiting!
      </p>
      </p>
      	<span className='text-lg sm:text-xl font-bold mb-4 mt-12'>Other Tools & Frameworks:</span> 
        <p className="text-lg sm:text-xl text-gray-700 mb-4">Firebase (authentication and picture storage)<br/>Redux (state management)<br/> JWT (secure communication)<br/> Render (deployment)<br/> Tailwind CSS (styling)</p>

      

            {/* Credit Section */}
            <div className="credit-section mt-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Credits</h2>
          <p className="text-lg sm:text-xl text-gray-700">
          Special thanks to <a href="https://www.youtube.com/@reactproject" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-semibold">@
            React & Next js Projects with Sahand</a> for providing valuable learning resources. This tutorial{'\u00A0'} <a href="https://www.youtube.com/watch?v=VAaUy_Moivw&ab_channel=React%26NextjsProjectswithSahand" target="_blank" title="Watch on YouTube">
          <i class="fab fa-youtube text-red-500"></i>
          </a>was instrumental in the development of this project.
        </p>
      </div>
    </div>
    
     </div>
   )
 }
