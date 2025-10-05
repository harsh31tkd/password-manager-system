import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800 text-white'>

      <div className="mycontainer flex justify-between items-center px-5 h-14 py-5">


      <div className="logo font-bold text-2xl">
        
        <span className='text-green-800'>&lt;</span>
        Pass
        <span className='text-green-600'>OP</span>
        <span className='text-green-800'>/&gt;</span>
        
      </div>

      {/* <ul>
        <li className='flex gap-4 '>
          <a className='hover:font-bold' href="/">home</a>
          <a className='hover:font-bold' href="#">about</a>
          <a className='hover:font-bold' href="#">contact</a>
        </li>
      </ul> */}

      <button className='text-white my-15 cursor-pointer'>
        <img className='invert w-25 px-9' src="/icons/github.svg" alt="github logo" />
        Github
      </button>

      </div>
      
    </nav>
  )
}

export default Navbar
