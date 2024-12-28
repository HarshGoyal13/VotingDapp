import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import toast from 'react-hot-toast'
import {useWeb3Context} from "../../context/UseWeb3Context"

const TokenBalance = ({erc20ContractInstance}) => {

    const {web3State} = useWeb3Context();
    const {selectedAccount} = web3State
    const [userTokenBalance, setUserTokenBalance] = useState("0");

    useEffect(()=>{
        const fetchTokenBalance = async()=>{
            try{
                const  tokenBalanceWei = await erc20ContractInstance.balanceOf(selectedAccount);
                console.log(tokenBalanceWei);
                const tokenBalanceEth = ethers.formatEther(tokenBalanceWei);
                setUserTokenBalance(tokenBalanceEth)
            }catch(error){
                toast.error("Error: Getting Token Balance")
                console.error(error)
            }
        }
        erc20ContractInstance && fetchTokenBalance();
    }, [erc20ContractInstance, selectedAccount]);

  return (
    <div className="flex justify-center items-center mt-5">
    <div className=" text-black text-lg font-semibold py-3 px-6 rounded-lg shadow-md">
      Token Balance: {userTokenBalance}
    </div>
  </div>
  )
}

export default TokenBalance