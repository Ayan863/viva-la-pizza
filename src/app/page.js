"use client";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "./Components/Carousel/Carousel";
import { useEffect } from "react";
import { getProduct } from "./redux/feature/product/ProductSlice";
import Tab from "./Components/Tabs/Tab";
import Card from "./Components/Card/Card";
import Header from "./Components/Header/Header";

export default function Home() {
  const dispatch = useDispatch()
  const { value, loading } = useSelector((state) => state.product)
  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch])
  return (
    <div>
      <Carousel />
      {/* {
        loading ? (
          <h4>loading,..</h4>
        ): (value.map((item)=><img key={item.id} src={item.image} alt={item.name} />))
      } */}
      <Tab />
    </div>
  );
}
