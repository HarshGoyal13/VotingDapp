import React, {useRef, useState} from 'react'
import GetVoterList from "./GetVoterList"
import {useWeb3Context} from "../../context/UseWeb3Context"
import Layout from "../../Components/Navigation/Layout"
import axios from 'axios'
import { HashLoader } from 'react-spinners';
import toast from 'react-hot-toast'





const RegisterVoter = () => {

  const [file,setFile] = useState();

    const [loading, setLoading] = useState(false)
    
  
  const { web3State } = useWeb3Context();



  const { contractInstance } = web3State;
    const nameref = useRef(null);
    const ageRef = useRef(null);
    const genderef = useRef(null);





    const handelVoterImage = async (e) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Authentication token not found");
        }
    
        const form = new FormData();
        form.append("file", file);
    
        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": token,
          },
        };
        const res = await axios.post("http://localhost:8080/api/v1/uploadVoter", form, config);
        if (res.data?.success) {
          console.log(res.data);
          return true;
        } else {
          throw new Error("Image upload failed on the server");
        }
      } catch (error) {
        console.error("Error uploading candidate image:", error.response?.data || error.message);
        throw error;
      }
    };


    const handelRegisterVoter = async(e)=>{
      e.preventDefault();
      try{

        const name = nameref.current.value;
        const age = ageRef.current.value;
        const gender = genderef.current.value;

        if(!contractInstance){
          throw new Error("Contract instance not found");
        }

        await contractInstance.registerVoter(name, age, gender);
        console.log("Voter registered on the blockchain");

        const uploadVoterStatus = await handelVoterImage();
        if (uploadVoterStatus) {
          // Clear form fields
          nameref.current.value = "";
          ageRef.current.value = "";
          genderef.current.value = "";

          setFile(null);
    
          toast.success('Voter Register successfully');
          alert("Buy Tokens For Vote");
          setLoading(false)
        } else {
          throw new Error("Image upload failed");
        }

      }catch(error){
        console.log(error);
        toast.error('Something went wrong in  Candidate Registration');
          setLoading(false)
      }
    }




  return (

<Layout title={"Register Voter"}>
  <section className="px-5 lg:px-0 mt-[30px]">
    <div className="w-full max-w-[600px] mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl p-10">
      <h3 className="text-white text-[28px] font-extrabold text-center mb-8">
        Welcome, <span className="text-teal-400">Voter</span>!
      </h3>

      <form className="space-y-8" onSubmit={handelRegisterVoter}>
        {/* Name Input */}
        <div>
          <label className="block text-gray-400 text-sm font-semibold mb-2">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              ref={nameref}
              placeholder="Enter your name"
              className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-500"
              required
            />
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500">
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>

        {/* Age Input */}
        <div>
          <label className="block text-gray-400 text-sm font-semibold mb-2">
            Age
          </label>
          <div className="relative">
            <input
              type="number"
              ref={ageRef}
              placeholder="Enter your age"
              className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-500"
              required
            />
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500">
              <i className="fas fa-calendar-alt"></i>
            </span>
          </div>
        </div>

        {/* Gender Select */}
        <div>
          <label className="block text-gray-400 text-sm font-semibold mb-2">
            Gender
          </label>
          <select
            ref={genderef}
            className="w-full py-3 px-4 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:teal-400-500"
            required
          >
            <option value="">Select your gender</option>
            <option value="0">Not Specified</option>
            <option value="1">Male</option>
            <option value="2">Female</option>
            <option value="3">Other</option>
          </select>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-gray-400 text-sm font-semibold mb-2">
            Upload Photo
          </label>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setFile(file);
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                required
              />
              <div className="py-3 px-4 bg-gray-800 text-gray-400 border border-gray-700 rounded-lg flex items-center justify-center hover:teal-400-500 transition duration-300 cursor-pointer">
                {file ? file.name : "Choose a photo"}
              </div>
            </div>
            {/* Preview */}
            {file && (
              <div className="w-16 h-16 bg-gray-700 rounded-full overflow-hidden border-2 border-teal-800">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white text-lg font-bold rounded-lg shadow-md hover:bg-teal-800 transition duration-300 relative flex items-center justify-center"
          >
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <HashLoader size={25} color="#fff" />
              </div>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form>
    </div>

            <GetVoterList/>
          

  </section>
</Layout>

  

  )
}

export default RegisterVoter; 


