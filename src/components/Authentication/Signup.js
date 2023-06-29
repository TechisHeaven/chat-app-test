import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Input, InputRightElement, InputGroup } from "@chakra-ui/input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConPassword] = useState();
  const [pic, setPic] = useState();
  const [Loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select a Image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top right",
      });
    }

    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/jpg" ||
      pics.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ChatApp");
      data.append("cloud_name", "dsj8p2upl");
      fetch("https://api.cloudinary.com/v1_1/dsj8p2upl/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select a Image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top right",
      });
      setLoading(false);
      return;
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top right",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Password Do Not match",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top right",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers:{
          "Content-Type": "application/json",
        }
      };
      const { data } = await axios.post(
        `/api/user`,
        {
          name,
          email,
          password,
          pic,
        },
        config
      );
      toast({
        title: "Registration successful",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top right",
      });

      localStorage.setItem("UserInfo", JSON.stringify(data));

      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top right",
      });
      setLoading(false);
    }
  };

  const handleclick = () => setShow(!show);

  return (
    <div>
      <VStack spacing={4} color="black">
        <FormControl id="first-name" isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup id="password">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement w={"4.5rem"}>
              <Button
                h={"1.75rem"}
                bg="white"
                size={"sm"}
                onClick={handleclick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup id="password">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Your Password"
              onChange={(e) => setConPassword(e.target.value)}
            />
            <InputRightElement w={"4.5rem"}>
              <Button
                h={"1.75rem"}
                bg="white"
                size={"sm"}
                onClick={handleclick}
              >
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="pic">
          <Input
            type={"file"}
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          ></Input>
        </FormControl>

        <Button
          colorScheme={"blue"}
          w={"100%"}
          my={"16"}
          onClick={handleSubmit}
          isLoading={Loading}
        >
          Submit
        </Button>
      </VStack>
    </div>
  );
};

export default Signup;
