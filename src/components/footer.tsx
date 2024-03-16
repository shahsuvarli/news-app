import React from "react";

function Footer() {
  const date = new Date().getFullYear();
  return (
    <div className="bg-slate-200 h-20 py-4 px-8 flex flex-col justify-center">
      <p>&#169; Copyright {date}</p>
    </div>
  );
}

export default Footer;
