import React, { useState, useEffect } from 'react';

import { useWeb3Context } from '../../context/UseWeb3Context';

const DisplayWinner = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State || {};
  const [winner, setWinner] = useState('No winner declared');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWinner = async () => {
      if (!contractInstance) {
        console.error('Contract instance not available');
        setWinner('Error: Unable to fetch winner');
        setLoading(false);
        return;
      }

      try {
        const winningCandidateAddress = await contractInstance.winner();
        if (winningCandidateAddress !== '0x0000000000000000000000000000000000000000') {
          setWinner(winningCandidateAddress);
        } else {
          setWinner('No winner declared');
        }
      } catch (error) {
        console.error('Error fetching winner:', error);
        setWinner('Error: Unable to fetch winner');
      } finally {
        setLoading(false);
      }
    };

    getWinner();
  }, [contractInstance]);

  return (

      <div className="text-center mt-10">
        {loading ? (
          <h1 className="text-lg font-bold text-gray-700">Fetching Winner...</h1>
        ) : (
          <h1 className="text-lg font-bold text-gray-700">Winner: <span className='text-teal-700'> {winner}</span></h1>
        )}
      </div>

  );
};

export default DisplayWinner;
