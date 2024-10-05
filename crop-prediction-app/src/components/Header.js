import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DropdownButton from './DropdownButton'
import { FaBars } from 'react-icons/fa6'

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <div>
       <header className='px-3 bg-[#1C1C1C] relative z-[10] shadow-xl'>
        <div className=" flex justify-center items-center">
          <img className='w-[40px] md:w-[80px] scale-[1.5] ml-5 object-cover' src="./logo.png" alt="logo" />
          
        </div>
        <nav className='hidden  md:flex justify-center items-center'>
          <ul >
              {[{name:'Home', route:'/'}, {name:'About', route:'/about'}, {name:'What We Do', route:'/whatwedo'},  {name:'Feedback', route:'/feedback'}].map((item) => (
                <Link to={item.route}>
              <li key={item.name}>{item.name}</li></Link>
            ))}
            
          </ul>
          
        </nav>

      
        
        <DropdownButton classname='hidden md:inline-block'/>
        <FaBars onClick={()=> setOpen((prev)=>!prev)} className='text-white text-2xl block md:hidden'/>
      </header>

      <nav className={`flex-col md:hidden absolute transition-all duration-200 ${open? 'top-[50px] left-0 ' : 'top-[-200px]'} w-full justify-center items-center  z-[5] text-white rounded-b-lg `}>
          <ul className='flex-col justify-center items-center bg-[#1C1C1C] rounded-b-lg w-full'>
              {[{name:'Home', route:'/'}, {name:'About', route:'/about'}, {name:'What We Do', route:'/whatwedo'},  {name:'Feedback', route:'/feedback'}].map((item) => (
                <Link to={item.route} onClick={()=> setOpen((prev)=> !prev)}>
              <li key={item.name}>{item.name}</li></Link>
            ))}
            <DropdownButton classname="md:hidden inline-block mb-4"/>
          </ul>
          
        </nav>
      
    </div>
  )
}

export default Header;
