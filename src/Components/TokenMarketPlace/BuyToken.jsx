import { ethers } from "ethers";
import { useRef } from "react";
import { toast } from "react-hot-toast";

const BuyToken = ({ contractInstance }) => {
  const tokenAmountRef = useRef(null);

  const buyToken = async (e) => {
    try {
      e.preventDefault();
      const tokenAmount = tokenAmountRef.current.value;
  
      if (!contractInstance) {
        toast.error("Contract instance is not available");
        return;
      }
  
      // Convert the token amount to Wei (assuming 18 decimals for the token)
      const tokenAmountInWei = ethers.parseEther(tokenAmount);
      console.log('Token Amount in Wei:', tokenAmountInWei.toString());
  
      // Fetch the token price for the specified amount of tokens
      const requiredTokenPrice = await contractInstance.calculateTokenPrice(tokenAmountInWei);
      console.log("Required Token Price (Wei):", requiredTokenPrice.toString());
  
      // Convert to Ether for display purposes
      const priceToPay = ethers.formatEther(requiredTokenPrice);
      console.log("Required Token Price (Ether):", priceToPay);
  
      // Check if the price is valid (greater than zero)
      if (isNaN(priceToPay) || priceToPay <= 0) {
        throw new Error("Invalid price returned");
      }
  
      // Verify if the correct amount of Ether is passed
      console.log('Sending Wei:', ethers.parseEther(priceToPay.toString()).toString());
  
      // Execute the transaction with the calculated price
      const tx = await contractInstance.buyGLDToken(tokenAmountInWei, {
        value: ethers.parseEther(priceToPay.toString()), // Send the required price in Ether as msg.value
        gasLimit: 500000, // Increased gas limit
      });
  
      const receipt = await tx.wait();
      if (receipt.status === 0) {
        throw new Error('Transaction reverted');
      }
  
      console.log("Transaction Successful", receipt);
      toast.success("Transaction Successful");
    } catch (error) {
      toast.error("Error: Buy Token");
      console.error("Transaction error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <form onSubmit={buyToken} className="bg-gray-800 p-6 rounded-lg shadow-lg w-[400px]">
        <label className="block text-white text-lg font-medium mb-2">
          Token Amount To Buy (In ETH):
        </label>
        <input
          type="text"
          ref={tokenAmountRef}
          className="w-full bg-gray-700 text-white text-base p-3 rounded-lg mb-4 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount"
        />
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
        >
          Buy Token
        </button>
      </form>
    </div>
  );
};

export default BuyToken;
