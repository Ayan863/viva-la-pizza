import React from 'react'
import * as yup from "yup"

export const FormSign = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  password: yup.string().required("Please enter your password"),
  email: yup.string()
            .email("Please enter a valid email address")
            .required("Please enter your email")
})

export default FormSign
