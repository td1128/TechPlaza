import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizantalCardProduct from '../components/HorizantalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>

      <HorizantalCardProduct category={"airpods"} heading={"Top in Airpods"} />
      <HorizantalCardProduct category={"camera"} heading={"Top Cameras & Photography"} />
      <HorizantalCardProduct category={"watches"} heading={"Watches and Smartwatches"} />
      <HorizantalCardProduct category={"earphones"} heading={"Best in Earphones"} />
      <HorizantalCardProduct category={"processors"} heading={"Have a glance on Processors"} />


      <VerticalCardProduct category={"mobiles"} heading={"Popular Smartphones"} />
      <VerticalCardProduct category={"mouse"} heading={"Top in Mouses"} />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />      
      <VerticalCardProduct category={"printers"} heading={"Best in Printers"} />      
      <VerticalCardProduct category={"refrigerators"} heading={"Refrigerators"} />      
      <VerticalCardProduct category={"speakers"} heading={"Buy best quality Speakers"} />
      <VerticalCardProduct category={"televisions"} heading={"Top Televisions"} />


    </div>
  )
}

export default Home
