"use client";
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import { FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';
import { CiUser } from 'react-icons/ci';
import { MdLockOutline } from 'react-icons/md';
import { useFormik } from 'formik';
import FormLogin from './FormLogin';
import { Alert, IconButton } from '@mui/joy';
import Link from 'next/link';
import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [showError, setShowError] = useState({ name: true, password: true });

  // const submit = (value, action) => {
    const submit = () => {
      const [loginSuccess, setLoginSuccess] = useState(null); // Başlangıç durumu null
      
      const submit = (value, action) => {
        setTimeout(() => {
          axios.get("https://66eba35c2b6cf2b89c5b2596.mockapi.io/login")
            .then((res) => {
              let data = res.data;
              const isitTrue = data.some(
                (item) => item.name === value.name && item.password === value.password
              );
              
              if (isitTrue) {
                setLoginSuccess(true);
                action.resetForm(); // Formu sıfırlıyoruz
              } else {
                setLoginSuccess(false);
              }
            })
            .catch((error) => {
              console.error("API Error:", error);
              setLoginSuccess(false); // Hata durumunda giriş başarısız
            });
        }, 500);
      };
    }

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: FormLogin,
    onSubmit: submit,
  });

  const handleCloseError = (field) => {
    setShowError((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <section className="card-Section">
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
        <h2>Login</h2>
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
                      onClick={() => handleCloseError('name')}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                >
                  {errors.name}
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
                      onClick={() => handleCloseError('password')}
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
              <Link href="#">Forgot password?</Link>
              <button type="submit">LOGIN</button>
            </div>
          </div>
        </form>
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
              <Link href="./../signup/page">Or Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
