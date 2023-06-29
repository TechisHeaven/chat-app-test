import React, { useEffect } from "react";
import { Container, Box, Text , Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";

const Homepage = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("UserInfo");

    if (!userInfo) {
      navigate("/");
    }
    else{
      navigate("/chats")
    }
  }, [navigate]);



  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth={"1px"}
      >
        <Text fontSize={"4xl"} textAlign="center" color="black">
          Talk-a-Tive
        </Text>
      </Box>
      <Box w={"100%"} bg="white" p={4} borderRadius="lg" borderWidth={"1px"}>
        <Tabs variant="soft-rounded">
          <TabList justifyContent={"center"}>
            <Tab w={"40%"}>Login</Tab>
            <Tab w={"40%"}>Register </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;
