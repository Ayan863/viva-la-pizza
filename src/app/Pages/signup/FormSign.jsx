import React from 'react'
import * as yup from "yup"

export const FormSign = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  password: yup.string().required("Please enter your password")
  .min(8, "Password must be at least 8 characters")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .required("Password is required")
  ,
  email: yup.string()
            .email("Please enter a valid email address")
            .required("Please enter your email")
})

export default FormSign
