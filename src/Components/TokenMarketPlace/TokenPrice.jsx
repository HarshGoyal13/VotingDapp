import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'


const TokenPrice = ({contractInstance}) => {

    const [TokenPrice, setTokenPrice] = useState(null);

    useEffect(()=>{
        try{
            const fetchTokenPrice = async()=>{
               const tokenPriceWei = await contractInstance.tokenPrice();
               const tokenPriceEth = ethers.formatEther(tokenPriceWei)
               setTokenPrice(tokenPriceEth)
            }
            contractInstance && fetchTokenPrice()
            
           }catch(error){
               toast.error("Error: Fetching Token Price")
               console.error(error)
           }
           
       },[contractInstance])
  return (
<div className="top-0 left-0 w-full bg-gradient-to-r from-teal-500 to-teal-800 text-white text-lg font-medium py-4 px-6 shadow-lg z-50 flex justify-between items-center">
  <span className="text-2xl font-bold">Token Price:</span> 
  <span className="text-2xl font-bold animate-pulse">{TokenPrice} ETH</span>
</div>

  
  )
}

export default TokenPrice