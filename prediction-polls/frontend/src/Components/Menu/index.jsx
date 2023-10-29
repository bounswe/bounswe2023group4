import React from "react";
import Sidebar from "../Sidebar";
import MobileMenu from "../MobileMenu";

function Menu({currentPage}) {
  return <div>
    <Sidebar currentPage={currentPage}/>
    <MobileMenu />
  </div>;
}

export default Menu;
