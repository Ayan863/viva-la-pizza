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
import React from 'react';
import './login.css';

const Login = () => {
  const submit = (value, action) => {
    setTimeout(() => {
      console.log(value);
      action.resetForm();
    });
  };

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validationSchema: FormLogin,
    onSubmit: submit,
  });

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
                  onChange={handleChange}
                />
              </div>
              {errors.name && (
                <Alert
                  startDecorator={<WarningIcon />}
                  variant="soft"
                  color="danger"
                  endDecorator={
                    <IconButton variant="soft" size="m" color="danger">
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
                  onChange={handleChange}
                />
              </div>
              {errors.password && (
                <Alert
                  startDecorator={<WarningIcon />}
                  variant="soft"
                  color="danger"
                  endDecorator={
                    <IconButton variant="soft" size="m" color="danger">
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
            </div><div className="sign">
            <Link href="./../signup/page">Or Sign Up</Link>
          </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Login;
