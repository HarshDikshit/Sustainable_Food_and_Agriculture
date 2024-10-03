import React from 'react'
import {Link} from 'react-router-dom'

function WharWeDo() {
  
  return (
    <div>

      <div className='grid grid-cols-2 justify-center items-center p-10 gap-4'>
        <div className='m-auto p-8 border-blue-400 border-2 rounded-md flex-col gap-12'>
          <h1 className='font-bold text-xl text-center mb-4'>Simple Crop Recommendation Model</h1>
          <p className='text-justify italic'>A <span className='font-semibold'>simple Crop Prediction    Machine Learning (ML) </span> model is designed to predict the most suitable crops for cultivation based on two key inputs: <span className='font-semibold'>season name and state name. </span>This model leverages historical agricultural data, such as climate patterns, soil types, and regional crop yields, to provide accurate crop recommendations. By inputting the current season (e.g., monsoon, winter) and the state or region (e.g., Maharashtra, Punjab), the model analyzes which crops are most likely to thrive under these conditions. This helps farmers or agricultural planners make informed decisions, optimize resources, and improve yield outcomes.</p>
          <Link to='/simple-crop-recommendation'>
          <button className='bg-blue-500 py-2 text-center w-full mt-4 text-white rounded-md border-blue-600 border-2'> Simple Crop Recommendation Model</button></Link>
        </div>
        <div className='m-auto p-8 border-blue-400 border-2 rounded-md flex-col gap-12'>
          <h1 className='font-bold text-xl text-center mb-4'>Specific Crop Recommendation Model</h1>
          <p className='text-justify italic'>A <span className='font-semibold'>specific Crop Recommendation Machine Learning model</span> uses multiple inputs such as <span className='font-semibold'>nitrogen, potassium, phosphorus levels, humidity, soil type, rainfall, pH, temperature, and the desired crop type</span> to suggest the best crops for cultivation. By analyzing these variables, the model predicts which crops will yield the highest output in given conditions. It leverages historical crop growth patterns and soil data to provide farmers with optimized recommendations, enabling them to improve productivity, minimize risks, and make data-driven agricultural decisions tailored to specific environments.</p>

          <button className='bg-blue-500 py-2 text-center w-full mt-4 text-white rounded-md border-blue-600 border-2'>Specific Crop Recommendation Model</button>
        </div>
        <div className='m-auto p-8 border-blue-400 border-2 rounded-md flex-col gap-12'>
          <h1 className='font-bold text-xl text-center mb-4'>Food Demand Predictor Model</h1>
          <p className='text-justify italic'>A <span className='font-semibold'>Food Demand Predictor</span> model forecasts the demand for various crops based on historical data and current market trends. By analyzing factors such as <span className='font-semibold'>consumer preferences, seasonal patterns, regional demand, economic conditions,</span> and <span className='font-semibold'>supply chain logistics,</span> the model predicts which crops will be in high demand. It also considers environmental aspects like weather and crop yield forecasts. This enables farmers, distributors, and retailers to make informed decisions about what to grow, stock, or distribute, ensuring that supply meets consumer demand while minimizing waste and maximizing profits.</p>

          <button className='bg-blue-500 py-2 text-center w-full mt-4 text-white rounded-md border-blue-600 border-2'>Food Demand Predictor Model</button>
        </div>
        <div className='m-auto p-8 border-blue-400 border-2 rounded-md flex-col gap-12'>
          <h1 className='font-bold text-xl text-center mb-4'>Fertilizer Recommendation Model</h1>
          <p className='text-justify italic'>
          A<span className='font-semibold'>Fertilizer Recommendation Model</span>  provides tailored suggestions for optimal fertilizer usage based on inputs like <span className='font-semibold'>nitrogen, phosphorus, and potassium levels, humidity, soil type, rainfall, pH, temperature, and the specific crop</span> being grown. By analyzing these variables, the model recommends the precise type and amount of fertilizer needed to improve soil nutrient balance, boost crop yield, and enhance plant health. It leverages historical data and environmental factors to ensure efficient fertilizer usage, helping farmers minimize costs, reduce environmental impact, and achieve sustainable agricultural practices for their crops.</p>

          <button className='bg-blue-500 py-2 text-center w-full mt-4 text-white rounded-md border-blue-600 border-2'>Fertilizer Recommendation Model</button>
        </div>
      </div>
      {/* <ul className='list-disc text-xl m-auto p-10'>
        <li>Simple Crop Recommendation Model </li>
        <li>Specific Crop Recommendation Model</li>
        <li>Food Demand Predictor Model</li>
        <li>Fertilizer Recommendation Model</li>
      </ul> */}
    </div>
  )
}

export default WharWeDo
