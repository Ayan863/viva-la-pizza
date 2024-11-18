"use client";

import "./globals.css";
import Head from "next/head";
import { store } from "./redux/app/store"; // Make sure this path is correct
import { Provider } from "react-redux";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// export const metadata = {
//   title: "Viva-La-Pizza",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.cdnfonts.com/css/beyond-the-mountains"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Provider store={store}>
        <Header/>
          {children}
          <Footer/>
        </Provider>
      </body>
    </html>
  );
}
