import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Input, InputRightElement, InputGroup } from "@chakra-ui/input";
import axios from "axios";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const toast = useToast();

  const handleSubmit = async () => {

    setLoading(true);
    if (!email || !password) {
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

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/user/login`,
        {
          email,
          password,
        },
        config
      );
      toast({
        title: "Login successful",
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
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            value={email}
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup id="password">
            <Input
              value={password}
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

        <Button
          colorScheme={"blue"}
          w={"100%"}
          my={"16"}
          onClick={handleSubmit}
          isLoading={Loading}
        >
          Submit
        </Button>
        <Button
          variant={"solid"}
          colorScheme={"red"}
          w={"100%"}
          my={"16"}
          onClick={() => {
            setEmail("guest@example.com");
            setPassword("123456");
          }}
        >
          Get Guest Credentials
        </Button>
      </VStack>
    </div>
  );
};

export default Login;
