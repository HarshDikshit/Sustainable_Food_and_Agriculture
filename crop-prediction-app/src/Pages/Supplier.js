import React, { useEffect, useState } from 'react';
import DatePickerComponent from '../components/DatePickerComponent';
import { Link, useNavigate } from 'react-router-dom';
import {FaInfo} from 'react-icons/fa6'
import CropDropDown from '../components/CropDropDown';
import TableWithDataFetch from '../components/TableWithDataFetch';
import {useDispatch, useSelector}   from 'react-redux'
import {getItems, addItem, updateItem, deleteItem} from '../redux/actions/itemsActions.js'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Supplier() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    crop: "", 
    state: "",
    date: "",
    contact:"",
    supply: "",
    partners: "Supplier"
  });
  
  const navigate=useNavigate()
  const isToday = (date)=> {
    const Today =new Date();
    setData({...data, date:  Today.getDate() +'/'+ Today.getMonth() +'/'+ Today.getFullYear()})
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

const handleClick = ()=> {
  if(data.partners =='' || data.contact=='' || data.crop=='' || data.date == '' || data.state=='' || data.supply =='' ) {
    toast.error('Kindly fill all the fields before submit!')
    return
  }
    dispatch(addItem(data));
    toast.success('Request added successfully! ')
    
}


  return (
    <div className='w-full flex flex-col p-5'>
      <h1 className='text-white flex m-auto mt-5 text-xl font-bold bg-black rounded-lg py-2 px-3'>Supplier</h1>
     
    

       <TableWithDataFetch/>

       <section className='w-full flex mb-8 flex-col '>
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
              {/* <Link className='w-full' to='/crop-recommendation'><button className='w-full mt-3 bg-green-500 text-lg text-white font-semibold text-center py-2 rounded-md'>Crop Recommendation</button></Link> */}
            </div>

            
          </div>
        </section>
    </div>
  )
}

export default Supplier
