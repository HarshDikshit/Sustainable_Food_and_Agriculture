import React, { useState } from 'react';
import axios from 'axios';
import Animation3 from '../LottieAnimations/Animation3';
import Animation5 from '../LottieAnimations/Animation5';
import Animation2 from '../LottieAnimations/Animation2';

const FoodDemandPrediction = () => {
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleShowPredictions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/predict_all');
      console.log('API Response:', response.data); // Debug log
      setPredictions(response.data.predictions);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setError(error.message || 'An error occurred while fetching predictions.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen py-10'>
       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Crop Demand Predictor</h2>

<section className="page1 w-full">
          <div className="lPart w-1/2">
            <section className="about-model">
              <h3 className="font-bold text-xl ">Forecasting Future Demand for Smart Farming
              </h3>
              <h4 className="font-semibold text-lg mb-4 mt-2 ">AI and ML powered platform predicting crop demand to optimize production, reduce waste, and increase profitability, this year</h4>
              <p className="text-justify ">
                The Crop Demand Predictor revolutionizes how farmers choose
                crops. Data-driven decisions maximize yields and profits.Plan production according to forecasted demand.
                Timely supply of essential crops. Stay ahead of market trends and competitors.
                </p>
            </section>

            <section className="how-it-works">
              <h3 className="font-bold text-xl">How it Works!</h3>
              <ul>
                <li>● Historical data on crop production, consumption, and market trends.</li>
                <li>● Machine Learning: Train algorithms to identify patterns and correlations.</li>
                <li>●  Model Deployment: Generate forecasts based on input data.</li>
              </ul>
            </section>
          </div>
          <div className="rPart w-1/2 flex items-start justify-start ">
            <Animation3 className=" h-[60%] m-auto"/>
          </div>
        </section>

      {/* form goes here */}
    <div className="max-w-2xl mx-auto  p-6 bg-white rounded-lg shadow-md border-[#3B82F6] border-2 ">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Crop Demand Predictor</h2>
      
      <div className="flex justify-center mb-8">
        <button 
          onClick={handleShowPredictions}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'SHOW PREDICTION'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {predictions && (
        <div className="mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700">Predicted Crop Demands:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(predictions).map(([crop, demand]) => (
              <div key={crop} className="bg-gray-100 p-4 rounded-lg shadow">
                <h4 className="text-lg font-medium text-gray-800">{crop}</h4>
                <p className="text-2xl font-bold text-blue-600">{demand.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    <section className="need-for-recommendation mt-8">
          <div className="image-container">
            <Animation2 className="h-[300px] w-[300px] scale-[1.3]"/>
          </div>
          <div className="content">
            <h3 className="font-bold text-xl">Need for Crop Demand Predictor</h3>
            <p className="text-justify mb-8">
            The Crop Demand Predictor System revolutionizes how farmers choose
                crops. Data-driven decisions maximize yields and profits.Plan production according to forecasted demand.
                Timely supply of essential crops. Stay ahead of market trends and competitors.
            </p>
            <h4 className="font-bold text-xl">How it Works!</h4>
            <ul className="list-disc pl-5">
              <li>Analyze yearly consumptin and production parameters.</li>
              <li>Get precise crop predictions based on data.</li>
              <li>Make informed decisions on crop management.</li>
            </ul>
          </div>
        </section>

        <section className="advantages-disadvantages flex  w-full">
          <div className="w-1/2 justify-center items-center space-y-5">
          <div className="advantages">
            <h4 className="font-bold text-xl">Advantages:</h4>
            <ul className="list-disc pl-5">
              <li>Helps farmers make data-driven decisions.</li>
              <li>
                Increases crop yield by selecting the most suitable crops.
              </li>
              <li>
                Reduces the risk of crop failure by considering environmental
                factors.
              </li>
              <li>Optimizes resource use like water and fertilizers.</li>
            </ul>
          </div>
          </div>
          <div className="image-container w-1/2">
            <Animation5 className="h-[300px] w-[300px] scale-[1.3]"/>
          </div>
        </section>
    </div>
  );
};

export default FoodDemandPrediction;