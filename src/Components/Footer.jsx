import React from 'react'
import { ZodiacCancer } from 'lucide-react';
export default function Footer() {
  return (
    <footer
      className="">
     <div
     className='flex mx-166 mt-2.5 font-bold '>
        <ZodiacCancer size={32} color="#ff00ea" />
  <span className="self-center ms-1.5 text-xl font-bold whitespace-nowrap dark:text-white">
    Social App
  </span>
     </div>
    </footer>
  )
}
