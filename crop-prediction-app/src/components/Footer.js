import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate()
  return (
    <div>
      <footer className='px-8 bg-[#1C1C1C]'>
        <div className="footer-content">
          <div className="footer-section">
          
            
            <h3 className='font-bold text-lg mb-5 text-center flex justify-center items-center gap-2 tracking-wider text-nowrap text-green-300'>
          
            Sustainable Food & Agriculture(SFA)</h3>
          
            <p className='text-center leading-5'>SFA platform provides various Artificial Intelligence and Machine Learning Models including various solutions to overcome challenges for a Sustainable Future and Cities.</p>
          </div>
          <div onClick={()=> navigate('/about')} className="footer-section cursor-pointer font-semibold  text-green-500">
            <h3>About Us</h3>
          </div>
          <div onClick={()=> navigate('/about')}  className="footer-section cursor-pointer font-semibold text-green-500">
            <h3>Quick Links</h3>
          </div>
          <div   className="footer-section cursor-pointer font-semibold text-green-500">
           <a href={`mailto:abc@gmail.com?subject=Contact%20Us`}><h3>Contact Us</h3></a> 
          </div>
        </div>
      
      </footer>
      <div onClick={()=> navigate('/')} className="copyright font-semibold w-full py-2 text-white bg-[#292828]">
          Copyright © 2024 SFA
        </div>
    </div>
  )
}

export default Footer
