import React from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import Slider from "react-slick";
import { Box, Image } from "@chakra-ui/react";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box w={'90%'} mx="auto" mt="80px"  border={'1px solid black'}>
      <Slider {...settings}>
        <Box h={"400px"}>
          <Image objectFit={"cover"} src="https://img.freepik.com/free-vector/illustration-shopping-online_53876-18355.jpg?t=st=1727866779~exp=1727870379~hmac=770e81edfa9e854f5839728d3a471f590b8b0e8d01611e9dbf5124d87659a87a&w=2000" alt="First Image" />
        </Box>
        <Box>
          <Image src="image2.jpg" alt="Second Image" />
        </Box>
        <Box>
          <Image src="image3.jpg" alt="Third Image" />
        </Box>
      </Slider>
    </Box>
  );
};

export default Carousel;
