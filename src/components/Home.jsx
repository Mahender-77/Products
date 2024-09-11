import React from "react";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import {
  Center,
  Box,
  GridItem,
  Grid,
  Button,
  Flex,
  Collapse,
  Text,
  Container,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { db } from "./firebase";
import Products from "./Products";
import { useSelector } from "react-redux";

function Home() {
  const [products, setProducts] = React.useState([]);
  const [rawData, setRawData] = React.useState([]);
  const [status, setStatus] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const productData = collection(db, "Products");
  const inputText = useSelector((store) => store.inputValue);

  const fetchData = async (inputText, category) => {
    if (inputText) {
      const productArray = rawData?.filter((item) =>
        item.name.toLowerCase().includes(inputText.toLowerCase())
      );
      setProducts(productArray);
    } else {
      if (category) {
        const q = query(productData, where("category", "==", category));
        console.log(q);
        const data = await getDocs(q);
        console.log(data);
        const productArray = data.docs.map((element) => ({
          id: element.id,
          ...element.data(),
        }));
        console.log(productArray);
        setProducts(productArray);
        setRawData(productArray);
      } else {
        const data = await getDocs(productData);
        const productArray = data.docs.map((element) => ({
          id: element.id,
          ...element.data(),
        }));
        setProducts(productArray);
        setRawData(productArray);
      }
    }
  };
  React.useEffect(() => {
    fetchData(inputText, category);
  }, [inputText, category]);
  return (
    <Center bg={"whitesmoke"} w={"70%"} m={"auto"} mt={"100px"} mb={"30px"}>
      {products.length && (
        <Box>
          <Button
            colorScheme="orange"
            variant="outline"
            size="sm"
            mb={"10px"}
            position={"sticky"}
            top={status ? "100px" : "0"}
            onClick={() => setStatus(!status)}
          >
            Filter
          </Button>
          <Flex>
            {status && (
              <Box
                position={"sticky"}
                top={"140"}
                w={"250px"}
                h={"400px"}
                bg={"white"}
                mr={"20px"}
                borderRadius="md"
                boxShadow="lg"
                transition="all 0.5s ease-in-out"
                opacity={status ? 1 : 0}
                // border={'4px solid green'}
                transform={status ? "scale(1)" : "scale(0.100)"}
              >
                <Flex
                  onClick={() => setOpen(!open)}
                  placeItems={"center"}
                  justifyContent={"space-between"}
                  p={"10px"}
                  bg="orange.400"
                  borderRadius="md"
                  mx={"5px"}
                >
                  <Box fontSize={"large"} fontWeight={"600"} color={"white"}>
                    Category
                  </Box>
                  {open ? (
                    <ChevronUpIcon boxSize={"1.5em"} color={"white"} />
                  ) : (
                    <ChevronDownIcon boxSize={"1.5em"} color={"white"} />
                  )}
                </Flex>
                {open && (
                  <Box borderRadius="md" mx={"5px"} bg="orange.100">
                    <Text
                      h={"35px"}
                      textAlign={"left"}
                      p={"5px"}
                      fontWeight={"500"}
                      cursor={"pointer"}
                      onClick={() => setCategory((prev)=>prev=="Electronics"?"":"Electronics")}
                      color={category==="Electronics" ? "orange" : "black" }
                      borderBottom={category === "Electroincs" ? "2px solid  white" : "none"}
                    >
                      Electronics
                    </Text>
                    <Text
                      h={"35px"}
                      textAlign={"left"}
                      p={"5px"}
                      fontWeight={"500"}
                      cursor={"pointer"}
                      onClick={() => setCategory((prev)=>prev=="Clothing"?"":"Clothing")}
                      color={category==="Clothing" ? "orange" : "black" }
                      borderBottom={category === "Clothing" ? "2px solid  white" : "none"}
                    >
                      Clothing
                    </Text>
                  </Box>
                )}

                <Flex
                  onClick={() => setOpen1(!open1)}
                  placeItems={"center"}
                  justifyContent={"space-between"}
                  p={"10px"}
                  bg="orange.400"
                  borderRadius="md"
                  mx={"5px"}
                  mt={"5px"}
                >
                  <Box fontSize={"large"} fontWeight={"600"} color={"white"}>
                    Price
                  </Box>
                  {open1 ? (
                    <ChevronUpIcon boxSize={"1.5em"} color={"white"} />
                  ) : (
                    <ChevronDownIcon boxSize={"1.5em"} color={"white"} />
                  )}
                </Flex>
                {open1 && (
                  <Box borderRadius="md" mx={"5px"} bg="orange.100">
                    <Text
                      h={"35px"}
                      textAlign={"left"}
                      p={"5px"}
                      fontWeight={"500"}
                      cursor={"pointer"}
                      onClick={() => setOpen1(0, 50)}
                    >
                      Electronics
                    </Text>
                    <Text
                      h={"35px"}
                      textAlign={"left"}
                      p={"5px"}
                      fontWeight={"500"}
                      onClick={() => setOpen1(51, 100)}
                    >
                      Clothing
                    </Text>
                  </Box>
                )}
              </Box>
            )}

            <Box>
              <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                {products?.map((item) => (
                  <GridItem key={item.id}>
                    <Products {...item} />
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </Flex>
        </Box>
      )}
    </Center>
  );
}

export default Home;
