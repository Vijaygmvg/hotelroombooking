import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { getAllUsers } from '../Utils/ApiFunctions';

const RegHistory = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates.');
      return;
    }

    try {
      const result = await getAllUsers();
      const filtered = result.filter((user) => {
        const regDate = new Date(user.registrationDate);
        return regDate >= new Date(startDate) && regDate <= new Date(endDate);
      });
      setUsers(filtered);
      setError('');
    } catch (err) {
      setError('Failed to fetch users: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-semibold mb-4">User Registration History</h2>

      <div className="flex flex-col gap-4 mb-4">
        <div>
          <label className="block font-medium">Start Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">End Date</label>
          <input
            type="date"
            className="w-full border p-2 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          onClick={fetchUsers}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Fetch Registered Users
        </button>
      </div>

      {error && <p className="text-red-600">{error}</p>}

      {users.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mt-6 mb-2">Users Registered:</h3>
          <ul className="list-disc list-inside">
            {users.map((user, index) => (
              <li key={index}>
                {user.name} - {user.email} - Registered on:{' '}
                {moment(user.registrationDate).format('DD-MM-YYYY')}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RegHistory;
