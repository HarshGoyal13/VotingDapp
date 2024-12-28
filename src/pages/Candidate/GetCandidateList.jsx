import React, { useEffect, useState } from 'react';
import { useWeb3Context } from '../../context/UseWeb3Context';
import Layout from '../../Components/Navigation/Layout';
import axios from 'axios';

const GetCandidateList = () => {
  const { web3State } = useWeb3Context();
  const { contractInstance } = web3State;
  const [candidateList, setCandidateList] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false); // Add a loading state
  const [error, setError] = useState(null); // Add an error state

  // Function to fetch the image URL for a candidate
  const getCandidateImage = async (accountAddress) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('https://votingdapp-1vp7.onrender.com/api/v1/CandidateImages', 
        { accountAddress },
        {
          headers: {
            'x-access-token': token, // Send token in the headers
          }  // Send accountAddress in the body of the POST request
      });
      console.log("Image URL Response:", res.data);  // Log the response from the backend
      return res.data?.imageUrl;  // Assuming the response contains imageUrl
    } catch (error) {
      console.error("Error fetching image:", error.response?.data || error.message);
      return null;
    }
  };

  useEffect(() => {
    const fetchCandidateList = async () => {
      setLoading(true);
      setError(null);
      try {
        const candidates = await contractInstance.getCandidateList(); // Fetch data
        console.log('Candidate List from Blockchain:', candidates); // Log the candidate list from the blockchain

        // For each candidate, map the indexed data to an object
        const updatedCandidates = await Promise.all(candidates.map(async (candidate) => {
          const [name, party, age,anotherValue, somethingElse, candidateAddress,votes] = candidate;

          // Create a new object with the fields mapped properly
          const mappedCandidate = {
            name,
            party,
            age: age.toString(), // Convert BigInt to string
            votes: votes.toString(), // Convert BigInt to string
            candidateAddress,
            imageUrl: await getCandidateImage(candidateAddress.toLowerCase())
          };

          console.log('Mapped Candidate:', mappedCandidate);  // Log the mapped candidate object
          return mappedCandidate;
        }));

        setCandidateList(updatedCandidates); // Set the updated candidate list
      } catch (err) {
        console.error('Error fetching candidate list:', err);
        setError('Failed to fetch candidate list. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (contractInstance) {
      fetchCandidateList();
    }
  }, [contractInstance]);

  return (

    <section className="px-5 lg:px-0 mt-12">
      <div className="w-full max-w-4xl mx-auto rounded-lg shadow-xl md:p-10 bg-gray-900 text-white">
        <h3 className="text-3xl font-bold mb-10 text-center ">
          Candidate <span className="text-teal-500">List</span>!
        </h3>
  
        {loading && <p className="text-center text-teal-300">Loading voter list...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
  
        {!loading && !error && candidateList.length === 0 && (
          <p className="text-center text-gray-400">No voters available.</p>
        )}
  
        {!loading && !error && candidateList.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm text-left">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-center text-gray-300">Image</th>
                  <th className="px-4 py-2 text-center text-gray-300">Name</th>
                  <th className="px-4 py-2 text-center text-gray-300">Address</th>
                  <th className="px-4 py-2 text-center text-gray-300">Party</th>
                  <th className="px-4 py-2 text-center text-gray-300">Age</th>
                  <th className="px-4 py-2 text-center text-gray-300">Votes</th>
                </tr>
              </thead>
              <tbody>
                {candidateList.map((candidate, index) => (
                  <tr
                    key={index}
                    className="bg-gray-800 hover:bg-gray-600 transition duration-300"
                  >
                    <td className="px-4 py-2 text-center">
                      {candidate.imageUrl ? (
                        <img
                          alt={`${candidate.name}'s photo`}
                          src={candidate.imageUrl}
                          className="w-16 h-16 rounded-full mx-auto object-cover"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">{candidate.name || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{candidate.candidateAddress ? candidate.candidateAddress.toLowerCase() : 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{candidate.party || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{candidate.age || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">{candidate.votes || 'N/A'}</td>
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

export default GetCandidateList;
