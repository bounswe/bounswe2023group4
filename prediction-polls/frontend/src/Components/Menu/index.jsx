import React from "react";
import Sidebar from "../Sidebar";
import MobileMenu from "../MobileMenu";

function Menu({currentPage}) {
  return <>
    <Sidebar currentPage={currentPage}/>
    <MobileMenu />
  </>;
}

export default Menu;
