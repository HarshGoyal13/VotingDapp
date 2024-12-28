import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './Home';
import RegisterVoter from "./pages/Voter/RegisterVoter"
import RegisterCandidate from './pages/Candidate/RegisterCandidate';
import ElectionCommision from './pages/ElectionCommision/ElectionCommision';
import TokenMarketPlace from './pages/TokenMarketPlace/TokenMarketPlace';

import CasteVote from './Components/Voter/CastVote';







function App() {
  return (
    <>

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/register-voter" element={<RegisterVoter/>} />


      <Route path="/register-candidate" element={<RegisterCandidate/>} />


      <Route path="/election-commision" element={<ElectionCommision/>} />

      <Route path="/token-marketplace" element={<TokenMarketPlace/>} />

      <Route path="/caste-vote" element={<CasteVote/>} />

   
    </Routes>
        
    </>
  );
}

export default App;
