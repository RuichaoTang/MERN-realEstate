import React from 'react'

export default function About() {
  return (
    <div className='pt-10 sm:pt-16 flex flex-col min-h-screen w-full'>
      {/* banner */}
      <img
        src="https://firebasestorage.googleapis.com/v0/b/mern-estate-c1d3f.appspot.com/o/1726135812598pixlr-image-generator-0a9aaa1e-0d0b-42ac-b407-dfb1e5f82b42.png?alt=media&token=ca194743-0d0c-4280-af4f-4110579ecba6" // Replace with your image path
        alt=""
        className="w-full h-64 object-cover"
        style={{
          maskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%)'
        }}
      />
      

      {/* About the Author */}
      <div className="about-container max-w-3xl mx-auto py-12 px-6 rounded-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-700 mb-6 tracking-wide">About The Author</h1>
        
        <p className="text-lg sm:text-xl text-slate-600 mb-6 ">
          Hi! I'm <span className="font-semibold text-blue-600 hover:underline cursor-pointer" onClick={()=>{document.getElementById("scroll-target").scrollIntoView({ behavior: 'smooth' })}}>Ruichao Tang</span>, a computer science student based in San Francisco. I’m passionate about technology and software development, aiming to pursue a career as a software engineer.
        </p>
        
        {/* About the Project */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-700 mb-6 tracking-wide">About This Project</h1>
        <p className="text-lg sm:text-xl text-slate-600 mb-6">
          This project is part of my personal learning journey, developed using the MERN stack (MongoDB, Express, React, Node.js). While it serves as a practice project, it represents my ongoing dedication to mastering software engineering and my continuous effort to improve as a developer. Feel free to explore, and thank you for visiting!
        </p>

        {/* Tools & Frameworks */}
        <h2 className="text-lg sm:text-xl font-semibold text-slate-600 mb-4 tracking-wide">Other Tools & Frameworks:</h2>
        <p className="text-lg sm:text-xl text-slate-600">
          Firebase (authentication, picture storage),<br/>Redux (state management),<br/>JWT (secure communication),<br/>Render (deployment),<br/>Tailwind CSS (styling).
        </p>

        {/* Credits */}
        <div className="my-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-700 mb-6 tracking-wide">Credits</h1>
          <p className="text-lg sm:text-xl text-slate-600">
            Special thanks to <a href="https://www.youtube.com/@reactproject" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">@React & Next.js Projects with Sahand</a> for providing valuable learning resources. The tutorial {'\u00A0'}
            <a href="https://www.youtube.com/watch?v=VAaUy_Moivw&ab_channel=React%26NextjsProjectswithSahand" target="_blank" title="Watch on YouTube">
              <i className="fab fa-youtube text-red-500 hover:text-red-400"></i>
            </a>played a key role in the development of this project.
          </p>
        </div>
      </div>
      {/* Animated background section */}
      <div className='animated-background h-screen flex flex-col items-center justify-center' id='scroll-target'>
        <p className="sm:text-3xl font-semibold text-xl text-slate-700 uppercase tracking-wide">
          Let's Connect
        </p>
        <div className="flex flex-col sm:flex-row gap-6 py-8">
          <div className='flex flex-nowrap gap-6 items-center justify-center'>
          <a href="https://www.linkedin.com/in/ruichaotang" target="_blank" rel="noopener noreferrer" title='LinkedIn'>
            <i className="fab fa-linkedin fa-2x text-slate-700 hover:text-blue-500 transition-colors duration-300"></i>
          </a>
          <a href="https://www.instagram.com/ruichaotang" target="_blank" rel="noopener noreferrer" title='Instagram'>
            <i className="fab fa-instagram fa-2x text-slate-700 hover:text-pink-500 transition-colors duration-300"></i>
          </a>
          </div>
          <div className='flex flex-nowrap gap-6 items-center justify-center'>
          <a href="https://github.com/RuichaoTang" target="_blank" rel="noopener noreferrer" title='GitHub'>
            <i className="fab fa-github fa-2x text-slate-700 hover:text-gray-500 transition-colors duration-300"></i>
          </a>
          <a href="mailto:tangrich@outlook.com" title='Email'>
            <i className="fas fa-envelope fa-2x text-slate-700 hover:text-yellow-500 transition-colors duration-300"></i>
          </a>
          </div>
        </div>
      </div>
    </div>
  );
}