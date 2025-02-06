import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inputc = () => {
  const [data, setData] = useState('');
  const [retriveData, setRetrive] = useState([]);

  // Add new data to the database
  const add = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_URI}/add`, { data });
      if (res.data.success) {
        console.log('Added successfully');
        setData('');
        retrive(); // Refresh the data after adding
      }
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  // Retrieve data from the database
  const retrive = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URI}/get`);
      if (res.data.success) {
        // Flatten the data if it's an array within each document
        const allData = res.data.datas.flatMap((item) => item.data);
        setRetrive(allData); // Flattened data
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    retrive(); // Fetch data when the component mounts
  }, []);

  return (
    <>
      <div className="h-400px py-4">
        <h1 className="text-center mb-3 text-2xl font-semibold">To-do List</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="border-2 border-black rounded-xl py-1 outline-0 bg-white"
          />
          <button onClick={add} className="bg-black text-white px-4 py-1">
            Add
          </button>
        </div>
      </div>
      <div className="border-1 border-black-400 px-2">
        <div className="flex flex-col gap-3">
          {retriveData.length > 0 ? (
            retriveData.map((el, index) => (
              <p key={index}>{el}</p> // Render each retrieved data item
            ))
          ) : (
            <p>No data available</p> // If no data is retrieved
          )}
        </div>
      </div>
    </>
  );
};

export default Inputc;
