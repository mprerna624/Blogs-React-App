import React from 'react';
import {Logo} from './index'

function Footer() {
  return (
    <footer className='bg-slate-500 border-t-[3px] border-t-black flex justify-around flex-wrap gap-6 p-6'>
      <div className='flex flex-col justify-between'>
        <Logo />
        <p>All Copyrights reserved by DevUI.</p>
      </div>

      <div className='flex flex-wrap gap-12 justify-center'>
        <div>
          <h6 className='font-semibold mb-4'>COMPANY</h6>
          <ul>
            <li className='p-1'>Features</li>
            <li className='p-1'>Pricing</li>
            <li className='p-1'>Affiliate Program</li>
            <li className='p-1'>Press Kit</li>
          </ul>
        </div>

        <div>
          <h6 className='font-semibold mb-4'>SUPPORT</h6>
          <ul>
            <li className='p-1'>Account</li>
            <li className='p-1'>Help</li>
            <li className='p-1'>Contact Us</li>
            <li className='p-1'>Customer Support</li>
          </ul>
        </div>

        <div>
          <h6 className='font-semibold mb-4'>LEGALS</h6>
          <ul>
            <li className='p-1'>Terms & Conditions</li>
            <li className='p-1'>Privacy Policy</li>
            <li className='p-1'>Licensing</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer