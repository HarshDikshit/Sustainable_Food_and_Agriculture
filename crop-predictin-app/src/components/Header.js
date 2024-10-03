import React from 'react'
import { Link } from 'react-router-dom'
import DropdownButton from './DropdownButton'

function Header() {
  return (
    <div>
       <header className='px-3 bg-[#1C1C1C]'>
        <div className=" flex justify-center items-center">
          <img className='w-[80px] scale-[1.5] ml-5 object-cover' src="./logo.png" alt="logo" />
          
        </div>
        <nav className='flex justify-center items-center'>
          <ul >
              {[{name:'Home', route:'/'}, {name:'About', route:'/about'}, {name:'What We Do', route:'/whatwedo'},  {name:'Feedback', route:'/feedback'}].map((item) => (
                <Link to={item.route}>
              <li key={item.name}>{item.name}</li></Link>
            ))}
            
          </ul>
          
        </nav>
        <DropdownButton/>
      </header>

    </div>
  )
}

export default Header;
