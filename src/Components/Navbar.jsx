import React from 'react'
import logo from '../assets/Logos/logo1.png'
/*
. means “current folder.”
.. means “parent folder” (go up one level).
logo is just a variable name we choose.
It will contain the final URL/path of the image after the build tool (Vite) processes it.
*/

function Navbar() {
  return (
    <div className=" bg-green1 h-15 w-max-full ">
      <div className=" h-full w-auto flex items-center justify-between   content_size">
        {/* h-full and w-full takes the same height and width from parent element */}

        <div className='logo'>
          <a href="#"><img src={logo} alt="" className='h-6' /></a>
        </div>

        <div className=' Buttons bg-green3 h-10 text-white text-lg font-medium flex justify-evenly items-center gap-8 px-5.5 rounded-3xl'>
          <a href="#">Home </a>
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar
