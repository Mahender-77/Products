import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'; // Outlined heart
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';   // Solid heart
import { useSelector } from 'react-redux';

function About() {
  // State to track whether the heart is filled or not
  const [isFilled, setIsFilled] = useState(false);
  const auth=useSelector((store)=>store.auth)
  const inputvalue=useSelector((store)=>store.inputValue)

  // console.log(auth)
  console.log("inputvalue",inputvalue)
  // Function to toggle the heart state




  const toggleHeart = () => {
    setIsFilled(!isFilled);
  };

  return (
    <div style={{marginTop:"100px"}}>
      <FontAwesomeIcon
        icon={isFilled ? fasHeart : farHeart}  // Toggle between filled and outlined heart
        onClick={toggleHeart}                  // Handle click event
        style={{ color: isFilled ? 'red' : 'black', fontSize: '24px', cursor: 'pointer' }}
      />
 

    </div>
  );
}

export default About;
