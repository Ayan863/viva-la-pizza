'use client';

import React, { useEffect, useState } from 'react';
import './wishlist.css';
import toast from 'react-hot-toast';
import CardComp from '@/app/Components/Card/Card';

const Page = () => {
  const [wishlistData, setWishlistData] = useState(null);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const storedUser = localStorage.getItem("user");
  //     if (storedUser) {
  //       const parsedUser = JSON.parse(storedUser);
  //       setWishlistData(parsedUser.wishlist);
  //     }
  //   }
  // }, []);
  useEffect(() => {
    // This will run whenever wishlistData changes
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setWishlistData(parsedUser.wishlist);
      }
    }
  }, [wishlistData]);

  console.log("hello",wishlistData)
  return (
    <section className='wishlist'>
      <h4 className={wishlistData ? "text-center" : null}>Wishlist Page</h4>
      {
        wishlistData ? (<div className='flex w-full items-center justify-center'>
            <div className='flex flex-wrap gap-2 w-[90%]'>
            {
            wishlistData.map((item) => (
              <CardComp
                key={item.id}
                type={item.type}
                status={item.status}
                price={item.price}
                ingredients={item.ingredients}
                name={item.name}
                image={item.image}
                id={item.id}
              />
            ))
      }
        </div>
        </div>)
         : (
            <>
            <span>There is no item</span> 
            
            
            </>

        )
      }
    </section>
  );
};

export default Page;
