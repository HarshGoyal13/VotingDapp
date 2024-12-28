import { React } from 'react';
import Layout from "./Components/Navigation/Layout"

function Home() {


    return (
        <Layout title={"Home"}>
        <div className="text-center py-10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-teal-700 to-teal-900 opacity-40 rounded-full filter blur-3xl transform scale-150 -z-10"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <span className="inline-block mx-auto px-6 py-3 rounded-full bg-white text-[#F83002] font-semibold shadow-lg animate-fadeIn">
              The Future of Secure Voting
            </span>
            <h1 className="text-6xl font-extrabold text-black mt-8 animate-slideIn">
              Innovate, Participate & <br /> Shape Your <span className="text-[#FFD700]">Democracy</span>
            </h1>
            <p className="mt-6 text-black text-lg max-w-2xl mx-auto animate-fadeInDelay">
              Experience seamless and secure electronic voting. Join us to empower every citizen and make democracy more accessible and transparent!
            </p>
            <div className="flex mt-12 w-full max-w-2xl mx-auto shadow-xl border border-gray-200 bg-white rounded-full items-center gap-4 relative z-10">
            </div>
          </div>
        </div>
      </Layout>
      
    );
}

export default Home;
