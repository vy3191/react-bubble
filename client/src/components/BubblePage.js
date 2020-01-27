import React, { useState, useEffect } from "react";
import {axiosWithAuth} from '../auth/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect( () => {
     axiosWithAuth().get('/api/colors')
                    .then( response => {
                      console.log(response);
                      setColorList(response.data)
                    })
                    .catch( err => {
                      console.log(err);
                    })
  })
  return (
    <>
      <p>Welcome to bubble-page</p>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
