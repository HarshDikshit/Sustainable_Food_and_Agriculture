import React from 'react'
import CropRecommendationPage from './Pages/CropRecommendationPage'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AboutUs from './Pages/AboutUs'
import Header from './components/Header.js';
import Footer from './components/Footer'
import FertilizerRecommendation from './Pages/FertilizerRecommendation.js';
import User from './Pages/User.js';

import BlogsGovtSchemes from './Pages/Blogs/BlogsGovtSchemes.js';
import BlogsOrganic from './Pages/Blogs/BlogsOrganic.js';
import BlogIrrigation from './Pages/Blogs/BlogIrrigation.js';
import HomePage from './Pages/HomePage.js';
import FoodDemandPrediction from './Pages/FoodDemandPrediction.js';
import SimpleCropRecommendation from './Pages/SimpleCropRecommendation.js';
import Supplier from './Pages/Supplier.js';
import BlogEVs from './Pages/Blogs/BlogEVs.js';
import StateAdmin from './Pages/StateAdmin.js';
import WharWeDo from './Pages/WharWeDo.js';

function App() {
  return (
    <div className='min-h-screen'>
      
      <Router>
    <Header/>
      <Routes>
      <Route path='/' element={<HomePage/>}/>
        <Route path='/crop-recommendation' element={<CropRecommendationPage/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/fertlizer' element={<FertilizerRecommendation/>}/>
        <Route path='/user-create-request' element={<User/>}/>
        <Route path='/blogs/govt-schemes' element={<BlogsGovtSchemes/>}/>
        <Route path='/blogs/organic-farming' element={<BlogsOrganic/>}/>
        <Route path='/blogs/irrigation' element={<BlogIrrigation/>}/>
        <Route path='/food-demand' element={<FoodDemandPrediction/>}/>
        <Route path='/simple-crop-recommendation' element={<SimpleCropRecommendation/>}/>
        <Route path='/supplier' element={<Supplier/>}/>
        <Route path='/blogs/ev' element={<BlogEVs/>}/>
        <Route path='/state-admin' element={<StateAdmin/>}/>
        <Route path='/whatwedo' element={<WharWeDo/>}/>

      </Routes>
      <Footer/>
    </Router>

    </div>
  )
}

export default App
