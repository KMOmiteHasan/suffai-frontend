import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import React from "react";
// import React, { useState } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import PropTypes from 'prop-types'

type Props = {
  children: React.ReactNode;
};

function LayoutHome({ children }: Props): JSX.Element {
//   const [registerOpen, setRegisterOpen] = useState<boolean>(false);
//   const location = useLocation();

//   const toggleRegister = (): void => {
//     setRegisterOpen(true);
//   };

//   const toggleRegister2 = (): void => {
//     setRegisterOpen(false);
//   };

  return (
    <>
      {/* <NavBar toggleRegister={toggleRegister} /> */}
      <NavBar />
      <div>{children}</div>
      <Footer />
    </>
  );
}

export default LayoutHome;
