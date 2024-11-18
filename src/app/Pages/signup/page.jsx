"use client";
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import { FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';
import { CiUser } from 'react-icons/ci';
import { MdLockOutline } from 'react-icons/md';
import { useFormik } from 'formik';
import FormSign from './FormSign';
import { Alert, IconButton } from '@mui/joy';
import Link from 'next/link';
import React, { useState } from 'react';
import './signup.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Signup = () => {
  const [showError, setShowError] = useState({ name: true, password: true, email: true });
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const submit = async (value, action) => {
    setApiError("");  
    
    try {
      const existingUsers = await axios.get("https://66eba35c2b6cf2b89c5b2596.mockapi.io/login");
      const usernameExists = existingUsers.data.some(user => user.name === value.name);
      
      if (usernameExists) {
        setApiError("This username already exists. Please choose a different one.");
        return;
      }
      const response = await axios.post("https://66eba35c2b6cf2b89c5b2596.mockapi.io/login", value);
      setSuccessMessage("You have successfully signed up! Please log in");
      setTimeout(() => router.push("/Pages/login"), 1500);
      
      action.resetForm();
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setApiError("An error occurred during sign-up. Please try again later.");
    }
  };

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: FormSign,
    onSubmit: submit,
  });

  return (
    <section className="card-Section">
      <video className="video w-full h-full object-cover" autoPlay loop muted suppressHydrationWarning>
        <source src="/pizza-video.mp4" type="video/mp4" />
      </video>
      <div className="card backdrop-blur-lg bg-black/50 shadow-lg">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="type">
            <div className="user-name">
              <label htmlFor="name"><span>Username</span></label>
              <div className="input anime">
                <CiUser />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Type your username"
                  value={values.name}
                  onChange={(e) => {
                    handleChange(e);
                    setShowError((prev) => ({ ...prev, name: true }));
                  }}
                  onBlur={handleBlur}
                />
              </div>
              {errors.name && touched.name && showError.name && (
                <Alert
                  startDecorator={<WarningIcon />}
                  variant="soft"
                  color="danger"
                  endDecorator={
                    <IconButton
                      variant="soft"
                      size="m"
                      color="danger"
                      onClick={() => setShowError((prev) => ({ ...prev, name: false }))}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                >
                  {errors.name}
                </Alert>
              )}
            </div>
            <div className="email">
              <label htmlFor="email"><span>Email</span></label>
              <div className="input anime">
                <MdLockOutline />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Type your email"
                  value={values.email}
                  onChange={(e) => {
                    handleChange(e);
                    setShowError((prev) => ({ ...prev, email: true }));
                  }}
                  onBlur={handleBlur}
                />
              </div>
              {errors.email && touched.email && showError.email && (
                <Alert
                  startDecorator={<WarningIcon />}
                  variant="soft"
                  color="danger"
                  endDecorator={
                    <IconButton
                      variant="soft"
                      size="m"
                      color="danger"
                      onClick={() => setShowError((prev) => ({ ...prev, email: false }))}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                >
                  {errors.email}
                </Alert>
              )}
            </div>
            <div className="password">
              <label htmlFor="password"><span>Password</span></label>
              <div className="input">
                <MdLockOutline />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Type your password"
                  value={values.password}
                  onChange={(e) => {
                    handleChange(e);
                    setShowError((prev) => ({ ...prev, password: true }));
                  }}
                  onBlur={handleBlur}
                />
              </div>
              {errors.password && touched.password && showError.password && (
                <Alert
                  startDecorator={<WarningIcon />}
                  variant="soft"
                  color="danger"
                  endDecorator={
                    <IconButton
                      variant="soft"
                      size="m"
                      color="danger"
                      onClick={() => setShowError((prev) => ({ ...prev, password: false }))}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                >
                  {errors.password}
                </Alert>
              )}
            </div>
          </div>
          <div className="button">
            <div className="forgot">
              <button type="submit">Sign Up</button>
            </div>
          </div>
        </form>

        {apiError && (
          <div className="api-error">
            <Alert variant="soft" color="danger">
              {apiError}
            </Alert>
          </div>
        )}

        {successMessage && (
          <div className="success-message">
            <Alert variant="soft" color="success">
              {successMessage}
            </Alert>
          </div>
        )}

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
            <div className="sign">
              <Link href="./../../Pages/login"> I'm already a member Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
