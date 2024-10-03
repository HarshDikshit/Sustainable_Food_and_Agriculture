import React, { useEffect, useState } from 'react';
import DatePickerComponent from '../components/DatePickerComponent';
import { Link, useNavigate } from 'react-router-dom';
import {FaInfo} from 'react-icons/fa6'
import CropDropDown from '../components/CropDropDown';
import Request from '../components/Dialog/Request';

<<<<<<< HEAD
import {useDispatch, useSelector}   from 'react-redux'
import {getItems, addItem, updateItem, deleteItem} from '../redux/actions/itemsActions.js'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function User() {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    crop: "", 
    state: "",
    date: "",
    contact:"",
    supply: "Surplus",
    partners: "Farmer"
  });
 
  const navigate=useNavigate()
 
  const [signD, setSignD]= useState(false)
  const isToday = (date)=> {
    const Today =new Date();
    setData({...data, date:  Today.getDate() +'/'+ Today.getMonth() +'/'+ Today.getFullYear()})
=======

function User() {
  
  const [crop, setCrop] = useState("");
  const [state, setState] = useState("");
  const navigate=useNavigate()
  const [todayDate, setTodayDate]= useState();
  const [signD, setSignD]= useState(false)


  const isToday = (date)=> {
    const Today =new Date();
  
    setTodayDate(  Today.getDate() +'/'+ Today.getMonth() +'/'+ Today.getFullYear())
    
>>>>>>> c7955d66a4ba05be13a2cb2c080b269091ac5d63
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

<<<<<<< HEAD
const handleClick = ()=> {
  if(data.partners =='' || data.contact=='' || data.crop=='' || data.date == '' || data.state=='' || data.supply =='' ) {
    toast.error('Kindly fill all the fields before submit!')
    return
  }
    dispatch(addItem(data));
    setSignD((prev)=> !prev)
}
=======

>>>>>>> c7955d66a4ba05be13a2cb2c080b269091ac5d63

  return (
    <div className='w-full flex  flex-col'>
      <h1 className='text-white flex m-auto mt-5 text-xl font-bold bg-black rounded-lg py-2 px-3'>Farmer</h1>
      <h1 className='text-black flex m-auto mt-5 text-lg font-bold'>Create a Request</h1>

        <div className="flex justify-center p items-center gap-4 p-5 flex-wrap text-nowrap">

<label htmlFor="partners">Partners:</label>
<select className='bg-gray-200' disabled name="partners" id="partners" >
    <option value="Farmer">Farmer</option>
    <option value="Supplier">Supplier</option>
  </select>

  <label htmlFor="supply">Supply:</label>
    <select className='bg-gray-200' disabled name="supply" id="supply">
    <option value="Surplus">Surplus</option>
    <option value="Shortage">Shortage</option>
  </select>

  <label htmlFor="state">State:</label>
<<<<<<< HEAD
  <select  name="state" id="state" value={data.state} onChange={(e)=> setData({...data, state: e.target.value})}>
  <option disabled value="" >Select</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
=======
  <select  name="state" id="state" value={state} onChange={(e)=> setState(e.target.value)}>
  <option disabled value="" >Select</option>
    <option value="Surplus">Andhra Pradesh</option>
    <option value="Shortage">Arunachal Pradesh</option>
>>>>>>> c7955d66a4ba05be13a2cb2c080b269091ac5d63
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
<<<<<<< HEAD
    <select  name="crop" id="crop" value={data.crop} onChange={(e)=> setData({...data, crop: e.target.value})}>
=======
    <select  name="crop" id="crop" value={crop} onChange={(e)=> setCrop(e.target.value)}>
>>>>>>> c7955d66a4ba05be13a2cb2c080b269091ac5d63
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
<<<<<<< HEAD
       <input id='date' value={data.date} disabled className='px-3 py-2 bg-gray-200 border-green-400 border-2 rounded-lg' type="text"  />
    </div>

  <input value={data.contact} onChange={(e)=> setData({...data, contact: e.target.value})} className='px-3 py-2 border-green-400 border-2 rounded-lg' type="text"  placeholder='Contact Number'/>
=======
       <input id='date' value={todayDate} disabled className='px-3 py-2 bg-gray-200 border-green-400 border-2 rounded-lg' type="text"  />
    </div>

  <input className='px-3 py-2 border-green-400 border-2 rounded-lg' type="text"  placeholder='Contact Number'/>
>>>>>>> c7955d66a4ba05be13a2cb2c080b269091ac5d63
        </div>
        <span className='flex m-auto justify-center items-center gap-5 bg-yellow-200 border-2 border-yellow-600 bg-opacity-30 py-1 px-4 rounded-md flex-wrap'>
        <FaInfo className='text-white rounded-full p-[3px] bg-yellow-600'/>
        <h1>This form is to create a request by farmer to allow the suppliers or states to know about the current availability of crops or foods.</h1>
        </span>
<<<<<<< HEAD
        <button onClick={handleClick} className='hover:bg-green-600 mx-8 my-5 text-center text-white bg-green-500 border-green-700 border-2 rounded-md font-semibold py-2'>Submit</button>
=======
        <button onClick={()=> setSignD((prev)=> !prev)} className='hover:bg-green-600 mx-8 my-5 text-center text-white bg-green-500 border-green-700 border-2 rounded-md font-semibold py-2'>Submit</button>
>>>>>>> c7955d66a4ba05be13a2cb2c080b269091ac5d63

        <section className='w-full flex flex-col mt-5'>
        <h1 className='text-black flex m-auto mt-5 text-2xl mb-5 font-bold'>Artificial Intelligence and Machine Learning Models</h1>
          <div className='w-full flex justify-center items-center'>
            <div className='border-green-400 border-2 rounded-md m-2 p-3 w-1/4 mb-56'>
              <h1 className='text-black flex m-auto mt-5 text-lg font-bold'>Crop Recommendation</h1>
              <p className='text-justify '> <ListWithWordLimit items={ [
    'Optimize crop selection for local conditions.',
    'Choose crops with high market demand.',
    'mproved hand-eye coordination and dexterity: Enhances fine motor skills, allowing for precise movements.',
    'Enhanced finger strength and flexibility: Strengthens fingers, reducing fatigue and injury risk.'
  ]} limit={20} /></p>
             <CropDropDown/>
            </div>

            <div className='border-green-400 border-2 h-auto rounded-md m-2 p-3 w-1/4 mt-30'>
              <h1 className='text-black flex m-auto mt-5 text-lg font-bold'>Food Demand this Year</h1>
              <p className='text-justify '> <ListWithWordLimit items={ [
    'Improved inventory management: Reduces waste, optimizes stock.',
    'Enhanced supply chain efficiency: Streamlines logistics, reduces delays.',
    ' Increased revenue: Maximizes sales, minimizes lost opportunities.'
  ]} limit={20} /></p>
              <button onClick={()=>navigate('/food-demand')} className='w-full mt-3 bg-green-500 text-lg text-white font-semibold text-center py-2 rounded-md'>Food Demand Prediction</button>
            </div>

            <div className='border-green-400 border-2 rounded-md m-2 p-3 w-1/4 mb-56'>
              <h1 className='text-black flex m-auto mt-5 text-lg font-bold'>Fertilizer Recommendation</h1>
              <p className='text-justify '> <ListWithWordLimit items={ [
    'Increased crop yields: Optimized nutrient application.',
    'Improved crop quality: Enhanced nutritional content.',
    'Reduced water pollution: Minimized fertilizer runoff.',
    'Increased farmer profitability: Optimized fertilizer investment.'
  ]} limit={20} /></p>
              <Link className='w-full' to='/fertlizer'><button className='w-full mt-3 bg-green-500 text-lg text-white font-semibold text-center py-2 rounded-md'>Fertilizer Recommendation</button></Link>
            </div>
          </div>
        </section>

        <section className='w-full flex mb-8 flex-col '>
          <h1 
          onClick={()=> navigate('/blogs')}
          className='text-black flex m-auto text-3xl font-bold'>Related Blogs</h1>
          <div className='w-full flex justify-center '>
            <div
            // onClick={()=> navigate('/blogs')}
            className='border-green-400 cursor-pointer border-2 rounded-md m-2 p-3 w-1/4'>
              <h1
               onClick={()=> navigate('/blogs/organic-farming')}
              className='text-green-500 flex m-auto mt-5 text-lg font-bold'>Organic Farming</h1>
              <p className='text-justify '>
              <ListWithWordLimit items={ [
    'Increased interest in sustainable and chemical-free farming practices.',
    'Policies supporting organic agriculture and certification processes.',
    'Organic farming promotes healthier soils by avoiding synthetic fertilizers and pesticides, which can degrade soil quality over time.'
  ]} limit={20} />
              </p>
              {/* <Link className='w-full' to='/crop-recommendation'><button className='w-full mt-3 bg-green-500 text-lg text-white font-semibold text-center py-2 rounded-md'>Crop Recommendation</button></Link> */}
            </div>

            <div
            // onClick={()=> navigate('/blogs')}
            className='border-green-400 border-2 rounded-md m-2 p-3 w-1/4'>
              <h1
              onClick={()=> navigate('/blogs/govt-schemes')}
              className='text-green-500 cursor-pointer flex m-auto mt-5 text-lg font-bold'>Government Schemes and Subsidies</h1>
              <p className='text-justify '>
              <ListWithWordLimit items={ [
    'Paramparagat Krishi Vikas Yojana (PKVY) promotes organic farming practices by forming clusters of organic farmers and supporting them financially.',
    'The KCC scheme provides short-term credit to farmers at subsidized interest rates for agricultural and allied activities.',
  ]} limit={20} />
              </p>
              {/* <button className='w-full mt-3 bg-green-500 text-lg text-white font-semibold text-center py-2 rounded-md'>Food Demand Recommendation</button> */}
            </div>

            <div
            // onClick={()=> navigate('/blogs')}
            className='border-green-400 border-2 rounded-md m-2 p-3 w-1/4'>
              <h1
              onClick={()=> navigate('/blogs/irrigation')}
              className='text-green-500 cursor-pointer flex m-auto mt-5 text-lg font-bold'>Smart Irrigation Systems</h1>
              <p className='text-justify '>
              <ListWithWordLimit items={ [
    'Popularization of drip irrigation and sprinkler systems for water efficiency',
    'Government subsidies and schemes supporting water-efficient irrigation.',
  ]} limit={20} />

              </p>
<<<<<<< HEAD
=======
              {/* <Link className='w-full' to='/fertlizer'><button className='w-full mt-3 bg-green-500 text-lg text-white font-semibold text-center py-2 rounded-md'>Fertilizer Recommendation</button></Link> */}
>>>>>>> c7955d66a4ba05be13a2cb2c080b269091ac5d63
            </div>
          </div>
        </section>

<<<<<<< HEAD
        <Request data={data} click={()=>{
            setSignD(!signD)
            }} className={`${signD? 'block':'hidden'}`}/>

            <ToastContainer 
            position='top-right'  
            autoClose={1000} 
            hideProgressBar={false}
            newestOnTop={false}            
            closeOnClick                   
            rtl={false}               
            draggable                      
            pauseOnHover                   
            theme="colored" /> 
    </div>

=======
        <Request click={()=>{
            setSignD(!signD)
            }} className={`${signD? 'block':'hidden'}`}/>
    </div>
>>>>>>> c7955d66a4ba05be13a2cb2c080b269091ac5d63
  )
}

export default User
