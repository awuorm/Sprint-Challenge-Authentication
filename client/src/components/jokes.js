import React, { useEffect } from "react";
import axios from "axios";

const Jokes = props => {
  useEffect(() => {
    axios.get("http://localhost:3300/api/jokes")
    .then(res=> {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
  }, []);
  return <div>Hello from jokes</div>;
};

export default Jokes;
