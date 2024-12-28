import { ethers } from "ethers";
import { useRef } from "react";
import {toast} from "react-hot-toast"

const Selltoken = ({erc20ContractInstance, contractInstance}) => {

    const sellTokenAmountRef = useRef()
    const approveTokenAmountRef = useRef()

    const sellToken = async(e)=>{
        try{
            e.preventDefault()
            const tokenValueEth = sellTokenAmountRef.current.value;
            const tokenValueWei = ethers.parseEther(tokenValueEth,18);
            const tx = await contractInstance.sellGLDToken(tokenValueWei)
            const reciept = tx.wait()
            console.log("Transaction Successful")
        }catch(error){
        toast.error("Error: Selling Token")
        console.error(error)
        }
    }

    const approveToken = async(e)=>{
        try{
            e.preventDefault()
            const tokenValueEth = approveTokenAmountRef.current.value;
            const tokenValueWei = ethers.parseEther(tokenValueEth,18);
            const tokenMarketPlace = "0xfBD1507816E58434B6D0AF43c34b0258C2263a32"
            const tx = await erc20ContractInstance.approve(tokenMarketPlace,tokenValueWei)
            const reciept = tx.wait()
            console.log("Transaction Successful")
        }catch(error){
            console.error(error)
        }
    }

  return (
<div className="flex justify-center items-center mt-10">
  <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[500px] space-y-6">
    {/* Sell Token Form */}
    <form onSubmit={sellToken} className="space-y-4">
      <label className="block text-white text-lg font-medium mb-2">
        Token Amount To Sell (In ETH):
      </label>
      <input
        type="text"
        ref={sellTokenAmountRef}
        className="w-full bg-gray-700 text-white text-base p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Enter amount"
      />
      <button
        type="submit"
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
      >
        Sell Token
      </button>
    </form>

    {/* Approve Token Form */}
    <form onSubmit={approveToken} className="space-y-4">
      <label className="block text-white text-lg font-medium mb-2">
        Token Amount To Approve (In ETH):
      </label>
      <input
        type="text"
        ref={approveTokenAmountRef}
        className="w-full bg-gray-700 text-white text-base p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Enter amount"
      />
      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
      >
        Approve Token
      </button>
    </form>
  </div>
</div>

  )
}

export default Selltoken