import { Box,Button, Flex } from "@chakra-ui/react";
import { useState } from "react";

const CartIcon = ({handleUpdate1,id}) => {
  const [state,setState]=useState(1)
  const handleClick = (val) => {
    setState((prev)=>{
      if(prev+val<1){
        handleUpdate1(id)
        return 1
      }
       return prev+val
    })
  };

  return (
  <Flex gap={"5px"} justifyContent={"center"} placeItems={"center"}><Button disabled={state===1} onClick={()=>handleClick(-1)} size={'sm'}>-</Button><Box>{state}</Box><Button size={'sm'} onClick={()=>handleClick(1)}>+</Button></Flex>
  );
};

export default CartIcon;
