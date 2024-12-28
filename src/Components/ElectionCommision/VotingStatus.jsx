import React, { useState, useEffect } from 'react';

import { useWeb3Context } from '../../context/UseWeb3Context';
import toast from 'react-hot-toast';

const VotingStatus = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State ;
  const [votingStatus, setVotingStatus] = useState('');
  const [loading, setLoading] = useState(true);

  const statusMap = {
    0: 'Not Started',
    1: 'In Progress',
    2: 'Ended',
  };

  useEffect(() => {
    const getVotingStatus = async () => {
      if (!contractInstance) {
        setVotingStatus('Contract instance not available');
        setLoading(false);
        return;
      }

      try {
        const currentVotingStatus = await contractInstance.getVotingStatus();
        setVotingStatus(statusMap[currentVotingStatus] || 'Unknown Status');
      } catch (error) {
        console.error('Error fetching voting status:', error);
        toast.error('Error: Getting Voting Status');
        setVotingStatus('Error fetching status');
      } finally {
        setLoading(false);
      }
    };

    getVotingStatus();
  }, [contractInstance]);

  return (

      <div className="text-center mt-10">
        {loading ? (
          <h1 className="text-lg font-bold text-gray-700">Fetching Voting Status...</h1>
        ) : (
          <h1 className="text-lg font-bold text-gray-700">Status: <span className='text-teal-700'> {votingStatus}</span> </h1>
        )}
      </div>

  );
};

export default VotingStatus;
