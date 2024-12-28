import { ethers } from "ethers";
import abi from "../constant/abi.json";
import axios from "axios";

export const getWeb3State = async () => {
    try {
        // Ensure MetaMask is installed
        if (!window.ethereum) {
            throw new Error("MetaMask is not installed");
        }

        // Request MetaMask accounts
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const selectedAccount = accounts[0];

        // Get the chain ID
        const chainIdHex = await window.ethereum.request({
            method: "eth_chainId",
        });
        const chainId = parseInt(chainIdHex, 16);

        // Create provider and signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        // Smart contract address
        const contractAddress = "0x764Cde95F19948f22F3d996962dfa10040B68423";

        // Message to sign
        const message = "Welcome to Voting DApp. You accept our terms and conditions.";

        // Prompt MetaMask to sign the message
        const signature = await signer.signMessage(message); // Await added here

        // Send the signature and address to the backend
        const dataSignature = { signature };
        const res = await axios.post(
            `http://localhost:8080/api/v1/authentication?accountAddress=${selectedAccount}`,
            dataSignature
        );

        localStorage.setItem("token", res.data.token);

        // Instantiate the contract
        const contractInstance = new ethers.Contract(contractAddress, abi, signer);
        console.log("signer", signer);
        console.log("provider", provider);
        return { contractInstance, selectedAccount, chainId , signer, provider};
    } catch (error) {
        console.error("Error in getWeb3State:", error.message);
        throw error;
    }
};
