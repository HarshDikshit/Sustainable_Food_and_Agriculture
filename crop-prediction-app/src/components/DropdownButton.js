import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {FaAngleDown} from 'react-icons/fa6'
import {Menu, MenuHandler, MenuList, MenuItem, Button} from '@material-tailwind/react'
import {  ChevronUpIcon } from "@heroicons/react/24/solid";
import { Transition } from '@headlessui/react';
import { useParams, useNavigate } from 'react-router-dom';
import LoginRegister from './Dialog/LoginRegister';
import { useDispatch, useSelector } from 'react-redux'
import {LOGIN} from '../redux/reducers/authReducer';



function DropdownButton() {
    const navigate = useNavigate();

    const authStatus = useSelector((state)=> state.auth.authStatus)

    const [signD, setSignD]= useState(false)
    const [state, setState] = useState('');

    const [open, setOpen] = useState(false);
    const [nestedOpen, setNestedOpen] = useState(false);
    const [nestedStateOpen, setNestedStateOpen] = useState(false);

  
    const handleClick= ()=>{
       setOpen(!open)
       setNestedOpen(!nestedOpen)
       setNestedStateOpen(!nestedStateOpen)
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
                    <div   className="relative w-full inline-block text-left z-10">
                    <button
                onClick={() => setNestedStateOpen(!nestedStateOpen)}
                className="w-full text-left  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between rounded-lg"
              >
                      State Admin
                      </button>
                      <Transition
                show={nestedStateOpen}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 transform scale-95"
                enterTo="opacity-100 transform scale-100"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 transform scale-100"
                leaveTo="opacity-0 transform scale-95"
              >
                <div
               
                className="w-full text-left  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between rounded-lg"
              > <select className='border-blue-400 border-2'  name="state" id="state" value={state} onChange={(e)=> {setState(e.target.value)
                navigate(`/state-admin/${e.target.value}`)
                handleClick()
              }}>
              <option disabled value="" >Select</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chattisgarh">Chattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
    </select></div></Transition>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>

            <div onClick={() => {
              setOpen(!open)
              if(authStatus){
                navigate('/admin')
              }else{
                setSignD((prev)=> !prev)
              }
              
              }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
              Admin
            </div>

          </div>
        </div>
      </Transition>
      
      <LoginRegister click={()=>{
            setSignD(!signD)
            }} className={`${signD? 'block':'hidden'}`} />
    </div>
  )
}

export default DropdownButton
