// import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { MdLockOutline } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import Link from "next/link";
import "./signup.css";
const SignUp = () => {
  const submit = (value, action) => {
    setTimeout(() => {
      action.resetForm();
    }, 1000);
  
    axios.post("https://66eba35c2b6cf2b89c5b2596.mockapi.io/login", value)
      .then((res) => console.log(res.data))
      .catch((error) => console.error(error));
  };
  return (
    <section className='card-Section'>
      <video
            className="video w-full h-full object-cover"
            autoPlay
            loop
            muted
            suppressHydrationWarning
          >
            <source src="/pizza-video.mp4" type="video/mp4" />
          </video>
      <div className="card backdrop-blur-lg bg-black/50 shadow-lg">
        <h2>Sign Up</h2>
        <div className="type">
          <div className="user-name">
            <span>Username</span>
            <div className="input anime">
              <CiUser />
              <input type="text" placeholder="Type your username" />
            </div>
          </div>
          <div className="email">
            <span>Email</span>
            <div className="input anime">
            <IoMail />

              <input type="email" placeholder="Type your email" />
            </div>
          </div>
          <div className="password">
            <span>Password</span>
            <div className="input">
              <MdLockOutline />
              <input type="password" placeholder="Type your password" />
            </div>
          </div>
        </div>
        <div className="button">
          <div className="forgot">
            <button>SIGN UP</button>
          </div>
        </div>
        <div className="about">
        <div className="social-media">
          <div className="icons">
            <div className="facebook social">
              <FaFacebookF className="fb media" />
            </div>
            <div className="twitter social">
              <FaTwitter className="tw media" />
            </div>
            <div className="google social">
              <FaGoogle className="g media" />
            </div>
          </div>
        </div>
        <div className="sign">
            <span><Link  href="#"> I'm already a member </Link><Link href="#">Sign In</Link></span>
          

        </div>
        </div>
      </div>
    </section>
  )
}

export default SignUp
