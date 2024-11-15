import React from 'react'
import "./footer.css"
const Footer = () => {
  return (
    <footer>
      <div className="nav">
        <a href="#">About us</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Gift Certificates</a>
      </div>
      <div class="images flex flex-col gap-1 ">
      <div className="firstL flex gap-1">
        <img src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/5-home-default-870x564.jpg" alt="" className='w-[100px] h-[100px]'/>
        <img src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/4-home-default-870x564.jpg" alt="" className='w-[100px] h-[100px]' />
        <img src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/3-home-default-870x564.jpg" alt="" className='w-[100px] h-[100px]' />

      </div>
      <div className="secondL flex gap-1">
        <img src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/2-home-default-870x564.jpg" alt="" className='w-[100px] h-[100px]' />
        <img src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/cache/catalog/demo/banners/1-home-default-870x564.jpg" alt="" className='w-[100px] h-[100px]' />
        <img src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/catalog/demo/banners/gallery-img-05.jpg" alt="" className='w-[100px] h-[100px]' />

      </div>
      <div className="thirdL flex gap-1">
        <img src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/catalog/demo/banners/gallery-img-04.jpg" alt="" className='w-[100px] h-[100px]' />
        <img src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/catalog/demo/banners/gallery-img-03.jpg" alt="" className='w-[100px] h-[100px]' />
        <img src="https://opencart.templatetrip.com/OPCTM01/OPCTM013_pizza/image/catalog/demo/banners/gallery-img-01.jpg" alt="" className='w-[100px] h-[100px]' />

      </div>
      </div>

      <div className="info">
        <h4>STORE INFORMATION</h4>
        <div className="loc">

        </div>
        <div className="mail">

            demo@gmail.com
        </div>
        <div className="call">
            <a href="">Call us:<span>+91 0123456789</span></a>

        </div>
      </div>
    </footer>
  )
}

export default Footer
