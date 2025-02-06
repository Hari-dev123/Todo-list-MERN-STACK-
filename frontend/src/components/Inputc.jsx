import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inputc = () => {
  const [data, setData] = useState('');
  const [retriveData, setRetrive] = useState([]);
  const [editId, setEditId] = useState(null);  // Stores ID of item being edited
  const [editText, setEditText] = useState(""); // Stores edited text


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

        const allData = res.data.datas.flatMap((item) => item);
        setRetrive(allData); // Flattened data
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  // Delete data by id
  const del = async (id) => {
    try {
      console.log(id, 'from del')
      const res = await axios.delete(`${import.meta.env.VITE_URI}/del/${id}`);
      if (res.data.success) {
        console.log('Deleted successfully');
        retrive(); // Refresh the data after deletion
      }
    } catch (error) {
      console.log('Error deleting data:', error);
    }
  };

  const edit = async (id) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_URI}/chan/${id}`, { newData: editText });
      if (res.data.success) {
        console.log("Updated successfully");
        setEditId(null); // Reset edit mode
        setEditText(""); // Clear input
        retrive();  // Refresh data
      }
    } catch (error) {
      console.log("Error updating data:", error);
    }
  };

  useEffect(() => {
    retrive(); // Fetch data when the component mounts
  }, []);

  return (
    <>
      <div className=" py-4 px-4">
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
      <div className="border-1 border-black-400 ">
        <div className="flex flex-col gap-3 py-3">
          {retriveData.length > 0 ? (
            retriveData.map((el, index) => (
              <div className='flex justify-between px-3' key={index}>
                {editId === el._id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="border-2 border-black rounded-xl py-1 outline-0 bg-white"
                  />
                ) : (
                  <p>{el.data}</p>
                )}

                {/* Buttons for edit/save and delete */}
                <div className='flex gap-3'>
                  {editId === el._id ? (
                    <button onClick={() => edit(el._id)} className='border-1 px-1'>Save</button>
                  ) : (
                    <button onClick={() => { setEditId(el._id); setEditText(el.data); }} className='border-1 px-1'>Edit</button>
                  )}
                  <p onClick={() => del(el._id)} style={{ cursor: 'pointer', color: 'red' }}>X</p>
                </div>
              </div>
            ))
          ) : (
            <p>No data available</p>
          )}

        </div>
      </div>
    </>
  );
};

export default Inputc;
