"use client";

import "./globals.css";
import Head from "next/head";
import { store } from "./redux/app/store"; // Make sure this path is correct
import { Provider } from "react-redux";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Viva-La-Pizza</title>
        <meta name="description" content="Viva-La-Pizza" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <link
          href="https://fonts.cdnfonts.com/css/beyond-the-mountains"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Provider store={store}>
          <Header />
          <Toaster position="top-center" />

          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
