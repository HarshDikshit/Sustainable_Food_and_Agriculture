import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {FaAngleDown} from 'react-icons/fa6'
import {Menu, MenuHandler, MenuList, MenuItem, Button} from '@material-tailwind/react'
import {  ChevronUpIcon } from "@heroicons/react/24/solid";
import { Transition } from '@headlessui/react';


function DropdownButton() {
    // const [isOpen, setOpen]= useState(false);
    const [isOpen2, setOpen2]= useState(false);
    const [openMenu, setOpenMenu] = React.useState(false);

    const [open, setOpen] = useState(false);
    const [nestedOpen, setNestedOpen] = useState(false);
  
    const handleClick= ()=>{
       setOpen(!open)
       setNestedOpen(!nestedOpen)
    }

  return (
    // className='relative flex flex-col items-center justify-center rounded-lg'
    <div className="relative inline-block text-left z-10" >

        {/* Main Button */}
      <button
        className="inline-flex justify-center w-full rounded-lg  shadow-sm px-4 py-2 bg-green-400 text-md  text-white font-semibold hover:bg-gray-100 focus:outline-none transition-all duration-200 ease-in-out"
        onClick={() => setOpen(!open)}
      >
        Login
       
      </button>

      {/* Dropdown Menu */}
      <Transition
        show={open}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 transform scale-95"
        enterTo="opacity-100 transform scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 transform scale-100"
        leaveTo="opacity-0 transform scale-95"
      >
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <Link to="/user-create-request" onClick={()=> setOpen(!open)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              Farmer
            </Link>
            
            {/* Nested Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setNestedOpen(!nestedOpen)}
                className="w-full text-left  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between rounded-lg"
              >
                Moderator
                <svg
                  className="h-5 w-5 transition-transform duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Nested Menu */}
              <Transition
                show={nestedOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 transform scale-95"
                enterTo="opacity-100 transform scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 transform scale-100"
                leaveTo="opacity-0 transform scale-95"
              >
                <div className="absolute right-full top-0 mt-0 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link to="/supplier" onClick={handleClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                      Supplier
                    </Link>
                    <Link to='/state-admin'  onClick={handleClick} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                      State Admin
                    </Link>
                  </div>
                </div>
              </Transition>
            </div>

            <Link  onClick={() => setOpen(!open)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              Admin
            </Link>

          </div>
        </div>
      </Transition>
      {/* <button onClick={()=>setOpen((prev)=> !prev) } 
      className='bg-[#22C55E]  py-2 px-8 rounded-full justify-center items-center flex border-4 border-transparent active:border-white duration-300 hover:scale-[1.05] hover:bg-green-600 '>Login</button>

      {isOpen && <div className='absolute top-14 z-[2] flex justify-center p-2 items-center bg-black bg-opacity-60 w-full rounded-lg '>
        <ul className='flex-col cursor-pointer flex justify-center w-full items-center'>
            <Link className='w-full' to='/user-create-request'><li className='hover:bg-gray-300 bg-opacity-60 w-full rounded-lg m-auto text-center'>Farmer</li></Link>

            <Link className='w-full' to='/supplier'><li className='hover:bg-gray-300 bg-opacity-60 w-full rounded-lg m-auto text-center'>Moderator</li></Link>
          
            <li className='hover:bg-gray-300 bg-opacity-60 w-full rounded-lg m-auto text-center'>Admin</li>
        </ul>
        </div>}

       <div className={`transition-all duration-300 ease-in-out transform
        ${isOpen2? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden absolute left-0 `}>
          <ul className='flex flex-col p-2' aria-labelledby=''>
            <li>Supplier</li>
            <li>State Admin</li>
          </ul>
          </div> */}
    </div>
  )
}

export default DropdownButton
