import "./TableWithDataFetch.css"
<<<<<<< HEAD
import {useDispatch, useSelector}   from 'react-redux'
import {getItems, addItem, updateItem, deleteItem} from '../redux/actions/itemsActions.js'
import {ToastContainer, toast } from 'react-toastify';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import UpdateRequestDialog from '../components/Dialog/UpdateRequestDialog.js'

const TableWithDataFetch = ({isActionVisible=false}) => {
  const [dialogStatus, setDialogStatus] = useState({status: false})
  const [data, setData]= useState({})
  const dispatch = useDispatch();
  const {items, loading} =useSelector((state)=> state.items)

  useEffect(()=> {
    dispatch(getItems())
  }, [dispatch])


  const handleDelete = (id) =>{
    dispatch(deleteItem(id))
    toast.success('Request deleted successfully!')
  }
=======

import React, { useEffect, useState } from 'react';

const TableWithDataFetch = () => {
  const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data1, setData1] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData1();
  }, []);

  const fetchData = async () => {
    try {
      // Simulating an API call with a delay
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve([
              { partners: 'State Admin', supply: 'Shortage', state: 'Assam', crop: 'Sorghum', date: '24-09-2024', contact: '0000000000' },{ partners: 'Farmer', supply: 'Surplus', state: 'West Bengal', crop: 'Wheat', date: '24-09-2024', contact:' 0000000000' },{ partners: 'State Admin', supply: 'Surplus', state: 'Arunachal Pradesh', crop: 'Sorghum', date: '24-09-2024', contact: '0000000000' },
            ])
          });
        }, 1000);
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result);
      // setLoading(false);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      // setLoading(false);
    }
  };

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const fetchData1 = async () => {
    try {
      // Simulating an API call with a delay
      const response = await new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: () => Promise.resolve([
              { partners: 'State Admin', shortage: 'Shortage', state: 'Arunachal Pradesh', crop: 'Sorghum', date: '24-09-2024', contact: '0000000000' },{ partners: 'Farmer', shortage: 'Shortage', state: 'Gujarat', crop: 'Wheat', date: '24-09-2024', contact:' 0000000000' },
            ])
          });
        }, 1000);
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data1');
      }

      const result = await response.json();
      setData1(result);
      // setLoading(false);
    } catch (error) {
      setError('Error fetching data1. Please try again later.');
      // setLoading(false);
    }
  };


  // if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
>>>>>>> c7955d66a4ba05be13a2cb2c080b269091ac5d63

  return (
    <>
    <div className="table-container">
    <h1>Surplus and Shortage Requests</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Partners</th>
            <th>Supply</th>
            <th>State</th>
            <th>Crop</th>
            <th>Date</th>
            <th>Contact</th>
<<<<<<< HEAD
            {isActionVisible?
            <th>Action</th>
            : null}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.partners}</td>
              <td>{item.supply}</td>
              <td>{item.state}</td>
              <td>{item.crop}</td>
              <td>{item.date}</td>
              <td>{item.contact}</td>
             {isActionVisible?  <td className="gap-2 flex m-auto items-center justify-center">
                <button onClick={(e)=>{ 
                  e.preventDefault();
                  setDialogStatus({status: !dialogStatus.status,
                })

                setData(item)

                }} className="bg-gray-500 py-1 px-2 rounded-md text-white">Update</button>
              <button onClick={()=> handleDelete(item.id)} className="bg-red-500 py-1 px-2 rounded-md text-white">Delete</button></td> : null}
=======
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.partners}</td>
              <td>{row.supply}</td>
              <td>{row.state}</td>
              <td>{row.crop}</td>
              <td>{row.date}</td>
              <td>{row.contact}</td>
>>>>>>> c7955d66a4ba05be13a2cb2c080b269091ac5d63
            </tr>
          ))}
        </tbody>
      </table>
<<<<<<< HEAD
      {/* <ToastContainer/> */}
    </div>

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

<UpdateRequestDialog click={()=>{
            setDialogStatus(!dialogStatus.status)
            }} data={data} className={`${dialogStatus.status? 'block':'hidden'}`}
            setData={setData}
            />
=======
    </div>

    {/* <div className="table-container">
    <h1>Shortage Requests</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Partners</th>
            <th>Shortage</th>
            <th>State</th>
            <th>Crop</th>
            <th>Date</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {data1.map((row) => (
            <tr key={row.id}>
              <td>{row.partners}</td>
              <td>{row.shortage}</td>
              <td>{row.state}</td>
              <td>{row.crop}</td>
              <td>{row.date}</td>
              <td>{row.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div> */}
>>>>>>> c7955d66a4ba05be13a2cb2c080b269091ac5d63
    </>
  );
};

export default TableWithDataFetch;