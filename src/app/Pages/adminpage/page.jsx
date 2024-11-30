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
import { useRouter } from 'next/navigation';
import axios from 'axios';
// import AdminLayout from "./layouts/AdminLayout"; // Admin Layout'u import et

const Login = () => {
  const [loginSuccess, setLoginSuccess] = useState(null);
  const [showError, setShowError] = useState({ name: true, password: true });
  const router = useRouter();

  const submit = (values, actions) => {
    setTimeout(() => {
      axios.get("https://66eba56d2b6cf2b89c5b2e2d.mockapi.io/products")
        .then((res) => {
          const data = res.data;
          const matchedUser = data.find(
            (item) => item.name === values.name && item.password === values.password
          );
          localStorage.clear();
          localStorage.setItem(`admin`,JSON.stringify(matchedUser));
          console.log("item=",matchedUser);
  
          if (matchedUser) {
            setLoginSuccess(true);
            actions.resetForm();
  
            router.push(`/Pages/admin/user`)
          } else {
            setLoginSuccess(false);
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
          setLoginSuccess(false);
        });
    }, 500);
  };
  

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
            </div>{loginSuccess === false && (
                    <Alert
                      startDecorator={<WarningIcon />}
                      variant="soft"
                      color="danger"
                      endDecorator={
                        <IconButton
                          variant="soft"
                          size="m"
                          color="danger"
                          onClick={() => setLoginSuccess(null)}
                        >
                          <CloseIcon />
                        </IconButton>
                      }
                    >
                      Username or password is not correct.
                    </Alert>
                  )}
          </div>
          <div className="button">
            <div className="forgot">
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
              <Link href="./../../Pages/signup">Or Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
