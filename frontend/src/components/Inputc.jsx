import React, { useEffect, useState } from "react";
import axios from "axios";

const Inputc = () => {
  const [data, setData] = useState("");
  const [retriveData, setRetrive] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const add = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_URI}/add`, { data });
      if (res.data.success) {
        setData("");
        retrive();
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const retrive = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URI}/get`);
      if (res.data.success) {
        const allData = res.data.datas.flatMap((item) => item);
        setRetrive(allData);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const del = async (id) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_URI}/del/${id}`);
      if (res.data.success) {
        retrive();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const edit = async (id) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_URI}/chan/${id}`, {
        newData: editText,
      });
      if (res.data.success) {
        setEditId(null);
        setEditText("");
        retrive();
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    retrive();
  }, []);

  return (
    <div className="w-full shadow-2xl h-fit max-w-xl md:max-w-2xl mx-auto py-16 px-6 sm:px-7 md:px-10 bg-white  rounded-lg">
      <h1 className="text-center text-3xl sm:text-4xl font-bold mb-6">
        To-Do List
      </h1>
      <div className="flex  gap-2">
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="border border-gray-400 rounded-md p-3 w-full sm:w-auto flex-grow bg-gray-100 focus:outline-none text-lg"
          placeholder="Enter task..."
        />
        <button
          onClick={add}
          className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition duration-300"
        >
          Add
        </button>
      </div>

      <div className="mt-6 max-h-[400px] overflow-y-scroll">
        {retriveData.length > 0 ? (
          retriveData.map((el) => (
            <div
              key={el._id}
              className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md mb-2"
            >
              {editId === el._id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border border-gray-500 rounded-md p-2 w-full sm:w-auto"
                />
              ) : (
                <p className="text-lg font-medium">{el.data}</p>
              )}

              <div className="flex gap-2 mt-2 sm:mt-0">
                {editId === el._id ? (
                  <button
                    onClick={() => edit(el._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditId(el._id);
                      setEditText(el.data);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition duration-300"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => del(el._id)}
                  className="bg-red-500  text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">No tasks available</p>
        )}
      </div>
    </div>
  );
};

export default Inputc;
