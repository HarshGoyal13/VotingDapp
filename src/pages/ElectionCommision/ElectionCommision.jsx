import React, { useEffect } from 'react';
import AnnounceWinner from "../../Components/ElectionCommision/AnnounceWinner";
import VotingStatus from '../../Components/ElectionCommision/VotingStatus';
import DisplayWinner from '../../Components/ElectionCommision/DisplayWinner';
import VotingPeriod from '../../Components/ElectionCommision/VotingPeriod';
import EmergencyDeclare from '../../Components/ElectionCommision/EmergencyDeclare';
import { useNavigate } from 'react-router-dom';
import Layout from "../../Components/Navigation/Layout";

const ElectionCommision = () => {
  const token = localStorage.getItem("token");
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!token) {
      navigateTo("/");
    }
  }, [navigateTo, token]);

  return (
    <div className="bg-dark-gray min-h-screen text-white">
      <Layout title={"Election Commission"}>
        <VotingStatus/>
        <DisplayWinner/>
        {/* Centering the content and adding spacing between each component */}
        <div className="container mx-auto px-5 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: Voting Period */}
            <div className="lg:col-span-2">
              <VotingPeriod />
            </div>

            {/* Right Side: Announce Winner and Emergency Declare */}
            <div className="lg:col-span-1 mt-20">
              <AnnounceWinner />
              <EmergencyDeclare />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ElectionCommision;
