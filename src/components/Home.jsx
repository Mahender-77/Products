import React from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  Center,
  Box,
  GridItem,
  Grid,
  Button,
  Flex,

  Text,
 
  Skeleton
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { db } from "./firebase";
import Products from "./Products";
import { useSelector,useDispatch } from "react-redux";

function Home ()  {
  const [products, setProducts] = React.useState([]);
  const [rawData, setRawData] = React.useState([]);
  const [status, setStatus] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const [open1, setOpen1] = React.useState(false);
  const [range1,setRange1]= React.useState(null)
  const [range2,setRange2]= React.useState(null)
  const [loading,setLoading] =React.useState(false)
  const [category, setCategory] = React.useState("");
  const productData = collection(db, "Products");
  const inputText = useSelector((store) => store.inputValue);

  const dispatch=useDispatch() 
  const fetchData = async (inputText, category,range1,range2) => {
    setLoading(true)
    try {
      if (inputText) {
        const productArray = rawData?.filter((item) =>
          item.name.toLowerCase().includes(inputText.toLowerCase())
        );
        
        setProducts(productArray);
      } else {
        if (category || (range1 && range2)) {
            
          let q = query(productData, where("category", "==", category));
          if(range1 !== null && range2 !== null){
          
            q=query(q,where("price",">=",range1),where("price","<=",range2))
        
          }
          const data = await getDocs(q);
          const productArray = data.docs.map((element) => ({
            id: element.id,
            ...element.data(),
          }));
         
          
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
    } catch (error) { 
      console.error("Error fetching products",error)
    } finally{
      setLoading(false)
      const snapShot= query(collection(db, "Products"), where("state", "==", true))
    const data=await getDocs(snapShot)
    dispatch({type:"WISHLIIST_SIZE",payload:data.size})
    }
  
  }


  React.useEffect(() => {
    fetchData(inputText, category,range1,range2);
  }, [category, range1, range2, inputText]);
  return (
    <Center bg={"whitesmoke"} w={"70%"} m={"auto"} mt={"100px"} mb={"30px"}>
     
        <Flex flexDirection={"column"} 
>
        
          <Button display={products.length===0 ? "none":"block"}
            colorScheme="orange"
            variant="outline"
            size="sm"
            w={"60px"}
            mb={"10px"}
            position={"sticky"}
            top={status ? "100px" : "0"}
            onClick={() => setStatus(!status)}
          >
            Filter
          </Button>
         
          <Flex>
            {status && (
                <Skeleton isLoaded={!loading} fadeDuration={1} >
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
                      onClick={() => setCategory((prev)=>prev==="Electronics"?"":"Electronics")}
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
                      onClick={() => setCategory((prev)=>prev==="Clothing"?"":"Clothing")}
                      color={category==="Clothing" ? "orange" : "black" }
                      borderBottom={category === "Clothing" ? "2px solid  white" : "none"}
                    >
                      Clothing
                    </Text>
                  </Box>
                )}

            { category && <Box>
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
                      color={range1===0 ? "orange" : "black" }
                      borderBottom={range1 === 0 ? "2px solid  white" : "none"}

                      onClick={() => {setRange1((prev)=>prev===0?null:0); setRange2((prev)=>prev===50?null:50)}}
                    >
                  0 to 50
                    </Text>
                    <Text
                      h={"35px"}
                      textAlign={"left"}
                      p={"5px"}
                      fontWeight={"500"}
                      cursor={"pointer"}
                      color={range1===51? "orange" : "black" }
                      borderBottom={range1 === 51 ? "2px solid  white" : "none"}
                      onClick={() => {setRange1((prev)=>prev===51?null:51); setRange2((prev)=>prev===100?null:100)}}
                     
                    >
                      51 to 100
                    </Text>
                  </Box>
                )}
             </Box>}
              </Box>
              </Skeleton>
            )}

            <Box>
              <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                {products?.map((item) => (
                  <GridItem key={item.id}>
                    <Skeleton isLoaded={!loading} fadeDuration={1}>
                    <Products {...item} fetchData={fetchData} />
                  </Skeleton>
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </Flex>
        </Flex>
      
    </Center>
  );
}

export default Home;
