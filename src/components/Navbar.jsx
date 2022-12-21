import React from "react";

const Navbar = ({ setPage }) => {
  return (
    <nav>
      <button onClick={() => setPage("planets")}>planets</button>
      <button onClick={() => setPage("people")}>people</button>
    </nav>
  );
};

export default Navbar;
