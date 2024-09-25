import React, { useEffect, useState } from 'react';
import DatePickerComponent from '../components/DatePickerComponent';
import { Link, useNavigate } from 'react-router-dom';
import {FaInfo} from 'react-icons/fa6'
import CropDropDown from '../components/CropDropDown';
import TableWithDataFetch from '../components/TableWithDataFetch';
import TableDataStateAdminFetch from '../components/TableDataStateAdminFetch ';


function StateAdmin() {
  
  const [crop, setCrop] = useState("");
  const [state, setState] = useState("");
  const navigate=useNavigate()
  const [todayDate, setTodayDate]= useState();
  const isToday = (date)=> {
    const Today =new Date();
  
    setTodayDate(  Today.getDate() +'/'+ Today.getMonth() +'/'+ Today.getFullYear())
    
  }

  useEffect(()=> isToday(),[])


const ListWithWordLimit = ({ items, limit }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to limit words across multiple <li> items
  const truncateList = (items, limit) => {
    let wordCount = 0;
    let truncatedItems = [];

    for (let item of items) {
      const words = item.split(' ');
      if (wordCount + words.length <= limit) {
        truncatedItems.push(item);  // Add the whole item if within limit
        wordCount += words.length;
      } else {
        const remainingWords = limit - wordCount;
        truncatedItems.push(words.slice(0, remainingWords).join(' ') + '...');
        break;
      }
    }
    return truncatedItems;
  };

  const displayedItems = isExpanded ? items : truncateList(items, limit);

  return (
    <div>
      <ul className='list-disc pl-5'>
        {displayedItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button className='text-green-500' onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? 'Read Less' : 'Read More'}
      </button>
    </div>
  );
};



  return (
    <div className='w-full flex  flex-col p-5'>
      <h1 className='text-white flex m-auto mt-5 text-xl font-bold bg-black rounded-lg py-2 px-3'>State Admin</h1>
      <h1 className='text-black flex m-auto mt-5 text-lg font-bold'>Create a Request</h1>

        <div className="flex justify-center p items-center gap-4 p-5 flex-wrap text-nowrap">

<label htmlFor="partners">Partners:</label>
<select value='Supplier' className='bg-gray-200' disabled name="partners" id="partners" >
    <option value="Farmer">Farmer</option>
    <option value="Supplier">Supplier</option>
  </select>

  <label htmlFor="supply">Supply:</label>
    <select   name="supply" id="supply">
    <option value="Surplus">Surplus</option>
    <option value="Shortage">Shortage</option>
  </select>

  <label htmlFor="state">State:</label>
  <select  name="state" id="state" value={state} onChange={(e)=> setState(e.target.value)}>
  <option disabled value="" >Select</option>
    <option value="Surplus">Andhra Pradesh</option>
    <option value="Shortage">Arunachal Pradesh</option>
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
  </select>

  <label htmlFor="crop">Crop:</label>
    <select  name="crop" id="crop" value={crop} onChange={(e)=> setCrop(e.target.value)}>
    <option disabled value="" >Select</option>
    <option value="Wheat">Wheat</option>
    <option value="Rice">Rice</option>
    <option value="Corn">Corn</option>
    <option value="Millet">Millet</option>
    <option value="Sorghum">Sorghum</option>
    <option value="Barley">Barley</option>
  </select>

  <div>
      <label className='mr-3' htmlFor="date">Date:</label>
       <input id='date' value={todayDate} disabled className='px-3 py-2 bg-gray-200 border-green-400 border-2 rounded-lg' type="text"  />
    </div>

  <input className='px-3 py-2 border-green-400 border-2 rounded-lg' type="text"  placeholder='Contact Number'/>
        </div>
        <span className='flex m-auto justify-center items-center gap-5 bg-yellow-200 border-2 border-yellow-600 bg-opacity-30 py-1 px-4 rounded-md flex-wrap'>
        <FaInfo className='text-white rounded-full p-[3px] bg-yellow-600'/>
        <h1>This form is to create a request by Supplier to allow the suppliers or states to know about the current availability of crops or foods.</h1>
        </span>
        <button className='hover:bg-green-600 mx-8 my-5 text-center text-white bg-green-500 border-green-700 border-2 rounded-md font-semibold py-2'>Submit</button>

       <TableDataStateAdminFetch/>

       {/* <section className='w-full flex mb-8 flex-col '>
          <h1 
          onClick={()=> navigate('/blogs')}
          className='text-black flex m-auto text-3xl font-bold'>Related Blogs</h1>
          <div className='w-full flex justify-between '>
            <div
            // onClick={()=> navigate('/blogs')}
            className='border-green-400 cursor-pointer border-2 rounded-md m-2 p-3 w-1/4'>
              <h1
               onClick={()=> navigate('/blogs/ev')}
              className='text-green-500 flex m-auto mt-5 text-lg font-bold'>Electric Vehicles(EVs)</h1>
              <p className='text-justify '>
              <ListWithWordLimit items={ [
    'Electric vehicles offer a sustainable alternative to traditional gasoline-powered vehicles, reducing greenhouse gas emissions and air pollution in urban areas, thus contributing to a cleaner environment and improved public health.',
    'EVs can reduce energy consumption in transportation, helping countries meet climate goals and reduce carbon footprint.',
    'EVs can enhance public health by reducing air pollution, particularly in urban areas.'
  ]} limit={20} />
              </p>
              {/* <Link className='w-full' to='/crop-recommendation'><button className='w-full mt-3 bg-green-500 text-lg text-white font-semibold text-center py-2 rounded-md'>Crop Recommendation</button></Link> 
            </div>

            
          </div>
        </section> */}
    </div>
  )
}

export default StateAdmin
