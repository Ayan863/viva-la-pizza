import React from 'react'
import Tab from "../../Components/Tabs/Tab";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

const Menu = () => {
  return (
    <>
    <Header/>
    <section className='flex items-center justify-center w-[100%]'>
      <Tab />
    </section>
    <Footer/>
    </>
  )
}

export default Menu