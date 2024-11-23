// const [isModalOpen, setModalOpen] = useState(false);
// const [count, setCount] = useState(1);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [showCount, setShowCount] = useState(false);
  
//   const handleOpenModal = () => setModalOpen(true);
//   const handleCloseModal = () => setModalOpen(false);
  
  
//   const updateBasketQuantity = useCallback(async (amount) => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       if (!storedUser) return;
//       const parsedUser = JSON.parse(storedUser);
//       const basket = parsedUser.basket || [];
//       const itemIndex = basket.findIndex((item) => item.id === id);
//       if (itemIndex !== -1) {
//         basket[itemIndex].quantity += amount;
//         basket[itemIndex].total = basket[itemIndex].quantity * price;
//       }
//       parsedUser.basket = basket;
//       localStorage.setItem("user", JSON.stringify(parsedUser));
//       await axios.put(
//         `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
//         { ...parsedUser, basket: parsedUser.basket }
//       );
//     } catch (error) {
//       toast.error("Something went wrong.");
//     }
//   }, [id, price]);
//   const handleIncreaseQuantity = useCallback(() => {
//     setQuantity((prevQuantity) => prevQuantity + 1);
//     updateBasketQuantity(1);
//   }, [updateBasketQuantity]);
//   const removeItem = useCallback(async () => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       if (!storedUser) return;
  
//       const parsedUser = JSON.parse(storedUser);
//       const updatedBasket = parsedUser.basket.filter((item) => item.id !== id);
  
//       parsedUser.basket = updatedBasket;
//       localStorage.setItem("user", JSON.stringify(parsedUser));
  
//       await axios.put(
//         `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
//         { ...parsedUser, basket: parsedUser.basket }
//       );
  
//       toast.success("Item is removed from the basket");
//       setShowCount(false);
//     } catch (error) {
//       toast.error("Something went wrong.");
//     }
//   }, [id]);
//   const handleDecreaseQuantity = useCallback(() => {
//     if (quantity > 1) {
//       setQuantity((prevQuantity) => prevQuantity - 1);
//       updateBasketQuantity(-1);
//     } else {
//       removeItem();
//     }
//   }, [quantity, updateBasketQuantity, removeItem]);
  
//   const handleAddToCartClick = useCallback(async () => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       let parsedUser = storedUser ? JSON.parse(storedUser) : { basket: [] };
  
//       const itemIndex = parsedUser.basket.findIndex((item) => item.id === id);
//       if (itemIndex === -1) {
//         parsedUser.basket.push({
//           id,
//           name,
//           type,
//           price,
//           ingredients,
//           image,
//           quantity,
//           total: price * quantity,
//         });
//       } else {
//         parsedUser.basket[itemIndex].quantity += quantity;
//         parsedUser.basket[itemIndex].total =
//           parsedUser.basket[itemIndex].quantity * price;
//       }
  
//       localStorage.setItem("user", JSON.stringify(parsedUser));
//       setShowCount(true);
  
//       await axios.put(
//         `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
//         { ...parsedUser, basket: parsedUser.basket }
//       );
  
//       toast.success("Item is added to the basket");
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   }, [id, name, type, price, ingredients, image, quantity]);
  
  
  
//   const handleFavoriteClick = useCallback(
//     async (type, price, ingredients, name, image, id) => {
//       try {
//         const storedUser = localStorage.getItem("user");
  
//         let parsedUser = storedUser ? JSON.parse(storedUser) : { wishlist: [] };
//         const storedFavorites = parsedUser.wishlist || [];
//         const itemIndex = storedFavorites.findIndex((item) => item.id === id);
  
//         if (itemIndex === -1) {
//           const updatedFavorites = [
//             ...storedFavorites,
//             { type, price, ingredients, name, image, id },
//           ];
//           parsedUser.wishlist = updatedFavorites;
//           setIsFavorite(true);
//           toast.success("Item is added to the wishlist.");
//         } else {
//           const updatedFavorites = storedFavorites.filter(
//             (item) => item.id !== id
//           );
//           parsedUser.wishlist = updatedFavorites;
//           setIsFavorite(false);
//           toast.success("Item is removed from the wishlist.");
//         }
  
//         localStorage.setItem("user", JSON.stringify(parsedUser));
  
//         await axios.put(
//           `https://66eba35c2b6cf2b89c5b2596.mockapi.io/login/${parsedUser.id}`,
//           { wishlist: parsedUser.wishlist }
//         );
  
//         window.dispatchEvent(new Event("storage"));
//       } catch (error) {
//         toast.error("Failed to update wishlist on the server.");
//       }
//     },
//     []
//   );
  



















// // import React, { useEffect, useState } from 'react';
// // import CardComp from '@/app/Components/Card/Card';

// // const page = () => {
// //     const [basketData, setBasketData] = useState(null);

// //   useEffect(() => {
// //     const updateBasket = () => {
// //       if (typeof window !== "undefined") {
// //         const storedUser = localStorage.getItem("user");
// //         if (storedUser) {
// //           const parsedUser = JSON.parse(storedUser);
// //           setBasketData(parsedUser.basket || []);
// //         }
// //       }
// //     };
  
// //     updateBasket();
  
// //     window.addEventListener("storage", updateBasket);
  
// //     return () => {
// //       window.removeEventListener("storage", updateBasket);
// //     };
// //   }, []);
// //   return (
// //     <section className='basket'>
// //       <h4 className={basketData ? "text-center" : null}>View card Page</h4>
// //       {
// //         basketData ? (<div className='flex w-full items-center justify-center'>
// //             <div className='flex flex-wrap gap-2 w-[90%]'>
// //             {
// //             basketData.map((item) => (
// //               <CardComp
// //                 key={item.id}
// //                 type={item.type}
// //                 status={item.status}
// //                 price={item.price}
// //                 ingredients={item.ingredients}
// //                 name={item.name}
// //                 image={item.image}
// //                 id={item.id}
// //               />
// //             ))
// //       }
// //         </div>
// //         </div>)
// //          : (
// //             <>
// //             <span>There is no item</span> 
            
            
// //             </>

// //         )
// //       }
// //     </section>
// //   )
// // }

// // export default page
