import { useState } from "react";

const DivPage: React.FC = () => {
  const [step, setStep] = useState(0);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      {step === 0 && (
        <div className="p-6 bg-blue-600 rounded-xl shadow-lg text-white flex flex-col items-center">
          <button onClick={() => setStep(1)} className="mt-4 px-6 py-3 bg-white text-blue-600 rounded-lg shadow-md">
            Open
          </button>
        </div>
      )}
      {step === 1 && (
        <div className="p-6 bg-green-600 rounded-xl shadow-lg text-white flex flex-col items-center">
          <button onClick={() => setStep(2)} className="mt-4 px-6 py-3 bg-white text-green-600 rounded-lg shadow-md">
            Open Next
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="p-6 bg-purple-600 rounded-xl shadow-lg text-white flex flex-col items-center">
          <span className="text-4xl">😊</span>
          <button onClick={() => setStep(0)} className="mt-4 px-6 py-3 bg-red-500 text-white rounded-lg shadow-md">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default DivPage;