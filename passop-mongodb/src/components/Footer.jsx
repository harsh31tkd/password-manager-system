import React from "react";

const Footer = () => {
  return (
    // <div class="absolute top-0 -z-10 h-full w-full bg-white"><div class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center w-full sticky bottom-0">
        <div className="logo font-bold text-2xl">
        
        <span className='text-green-800'>&lt;</span>
        Pass
        <span className='text-green-600'>OP</span>
        <span className='text-green-800'>/&gt;</span>
        
      </div>
      <div className="flex gap-2">
        Created with 
        <img className="w-8" src="icons/heart.png" alt="" />
        by Harsh
      </div>
    </div>
    // </div>
  );
};

export default Footer;
