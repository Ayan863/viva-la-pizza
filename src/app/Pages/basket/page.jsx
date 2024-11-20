'use client';

import React, { useEffect, useState } from 'react';
import CardComp from '@/app/Components/Card/Card';

const page = () => {
    const [basketData, setBasketData] = useState(null);

  useEffect(() => {
    const updateBasket = () => {
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setBasketData(parsedUser.basket || []);
        }
      }
    };
  
    updateBasket();
  
    window.addEventListener("storage", updateBasket);
  
    return () => {
      window.removeEventListener("storage", updateBasket);
    };
  }, []);
  return (
    <section className='basket'>
      <h4 className={basketData ? "text-center" : null}>View card Page</h4>
      {
        basketData ? (<div className='flex w-full items-center justify-center'>
            <div className='flex flex-wrap gap-2 w-[90%]'>
            {
            basketData.map((item) => (
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
  )
}

export default page
