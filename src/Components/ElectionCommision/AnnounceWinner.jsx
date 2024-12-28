import React, { useState } from 'react';
import { useWeb3Context } from '../../context/UseWeb3Context';
import toast from 'react-hot-toast';

const AnnounceWinner = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State || {};
  const [loading, setLoading] = useState(false);

  const getWinner = async () => {
    if (!contractInstance) {
      toast.error('Contract instance not available');
      return;
    }

    setLoading(true);
    try {
      const tx = await contractInstance.announceVotingResult();
      const receipt = await tx.wait();
      toast.success('Winner announced successfully!');
      console.log('Transaction receipt:', receipt);
    } catch (error) {
      toast.error('Error: Announcing result');
      console.error('Error announcing result:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="flex justify-center items-center mt-[30px]">
  <button
    onClick={getWinner}
    disabled={loading}
    className="w-[300px] text-lg font-semibold text-teal-800 bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600 
      border-2 border-teal-800 rounded-lg py-3 px-6 
      transform transition duration-300 ease-in-out hover:text-teal-800 hover:border-teal-800 hover:shadow-lg hover:scale-105 
      focus:outline-none focus:ring-2 focus:ring-teal-400"
  >
    {loading ? 'Processing...' : 'Announce Winner'}
  </button>
</div>


  
  );
};

export default AnnounceWinner;
