import React, { useEffect, useState } from 'react';
import { useWeb3Context } from '../../context/UseWeb3Context';
import Layout from '../../Components/Navigation/Layout';
import axios from 'axios';

const GetVoterList = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const [voterList, setVoterList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getVoterImage = async (accountAddress) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('https://votingdapp-1vp7.onrender.com/api/v1/getVoterImage', 
        { accountAddress },
        {
          headers: {
            'x-access-token': token,
          }
        }
      );
      return res.data?.imageUrl || null;
    } catch (error) {
      console.error("Error fetching image:", error.response?.data || error.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchVoterList = async () => {
      setLoading(true);
      setError(null);
      try {
        const voters = await contractInstance.getVoterList();
        const updatedVoters = await Promise.all(voters.map(async (voter) => {
          const [name, age, anotherValue, gender, votes, voterAddress] = voter;

          return {
            name,
            age: age.toString(),
            voterAddress,
            imageUrl: await getVoterImage(voterAddress.toLowerCase())
          };
        }));

        setVoterList(updatedVoters);
      } catch (err) {
        console.error('Error fetching voters list:', err);
        setError('Failed to fetch voters list. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (contractInstance) {
      fetchVoterList();
    }
  }, [contractInstance]);

  return (

    <section className="px-5 lg:px-0 mt-12">
      <div className="w-full max-w-4xl mx-auto rounded-lg shadow-xl md:p-10 bg-gray-900 text-white">
        <h3 className="text-3xl font-bold mb-10 text-center ">
          Voter <span className="text-teal-500">List</span>!
        </h3>
  
        {loading && <p className="text-center text-teal-300">Loading voter list...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
  
        {!loading && !error && voterList.length === 0 && (
          <p className="text-center text-gray-400">No voters available.</p>
        )}
  
        {!loading && !error && voterList.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm text-left">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-center text-gray-300">Image</th>
                  <th className="px-4 py-2 text-center text-gray-300">Name</th>
                  <th className="px-4 py-2 text-center text-gray-300">Age</th>
                  <th className="px-4 py-2 text-center text-gray-300">Address</th>
                </tr>
              </thead>
              <tbody>
                {voterList.map((voter, index) => (
                  <tr
                    key={index}
                    className="bg-gray-800 hover:bg-gray-600 transition duration-300"
                  >
                    <td className="px-4 py-2 text-center">
                      {voter.imageUrl ? (
                        <img
                          alt={`${voter.name}'s photo`}
                          src={voter.imageUrl}
                          className="w-16 h-16 rounded-full mx-auto object-cover"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">{voter.name || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{voter.age || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{voter.voterAddress || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  
  );
};

export default GetVoterList;
