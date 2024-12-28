import React, { useRef, useState } from 'react';
import { useWeb3Context } from '../../context/UseWeb3Context';

import toast from 'react-hot-toast';

const VotingPeriod = () => {
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State || {};
  const [loading, setLoading] = useState(false);

  const setTimePeriod = async (e) => {
    e.preventDefault();

    const startTime = startTimeRef.current.value;
    const endTime = endTimeRef.current.value;

    if (!contractInstance) {
      toast.error('Contract instance not available');
      return;
    }

    if (startTime >= endTime) {
      toast.error('Start time must be earlier than end time');
      return;
    }

    setLoading(true);
    try {
      await contractInstance.setVotingPeriod(startTime, endTime);
      toast.success('Voting period set successfully!');
      console.log(`Voting period set from ${startTime} to ${endTime}`);
    } catch (error) {
      console.error('Error setting voting period:', error);
      toast.error('Error: Voting Time Period');
    } finally {
      setLoading(false);
    }
  };

  return (

    <section className="px-5 lg:px-0 mt-[30px] items-center">
    <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-xl md:p-10 bg-gray-800">
      <h3 className="text-white text-[22px] leading-9 font-bold mb-10">
       ⌚ Time <span className="text-teal-400">Period</span> For Voting!
      </h3>
  
      <form className="py-4 md:py-0" onSubmit={setTimePeriod}>
        <div className="mb-5">
          <input
            type="time"
            ref={startTimeRef}
            placeholder="Enter Start Time"
            name="Start Time"
            className="w-full py-3 px-4 bg-gray-700 text-white text-[16px] leading-7 rounded-lg shadow-md border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300 ease-in-out placeholder:text-gray-400"
            required
          />
        </div>
  
        <div className="mb-5">
          <input
            type="time"
            ref={endTimeRef}
            placeholder="Enter End Time"
            name="End Time"
            className="w-full py-3 px-4 bg-gray-700 text-white text-[16px] leading-7 rounded-lg shadow-md border border-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-300 ease-in-out placeholder:text-gray-400"
            required
          />
        </div>
  
        <div className="mt-7 flex justify-center items-center">
          <button
            type="submit"
            className="w-[300px] items-center  bg-gradient-to-r from-teal-600 to-teal-800 text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Set Time'}
          </button>
        </div>
      </form>
    </div>
  </section>
  

  );
};

export default VotingPeriod;
