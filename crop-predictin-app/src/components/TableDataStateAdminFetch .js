import "./TableWithDataFetch.css"

import React, { useEffect, useState } from 'react';

const TableDataStateAdminFetch  = () => {
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
              { partners: 'Farmer', supply: 'Surplus', state: 'West Bengal', crop: 'Wheat', date: '24-09-2024', contact:' 0000000000' },{ partners: 'State Admin', supply: 'Surplus', state: 'Arunachal Pradesh', crop: 'Sorghum', date: '24-09-2024', contact: '0000000000' },
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
              { partners: 'State Admin', shortage: 'Shortage', state: 'Arunachal Pradesh', crop: 'Sorghum', date: '24-09-2024', contact: '0000000000' },
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

  return (
    <>
    <div className="table-container">
    <h1>Surplus Requests</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Partners</th>
            <th>Supply</th>
            <th>State</th>
            <th>Crop</th>
            <th>Date</th>
            <th>Contact</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="table-container">
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
    </div>
    </>
  );
};

export default TableDataStateAdminFetch ;