import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
     <Helmet>
        <title>ERROR </title>
      </Helmet>
      <div className="flex justify-center items-center text-7xl  text-red-600  h-screen bg-black">
        <div>
          <h1>404 NOT FOUND PAGE</h1>
        </div>
        
      </div>
    </>
  );
};

export default NotFound;
