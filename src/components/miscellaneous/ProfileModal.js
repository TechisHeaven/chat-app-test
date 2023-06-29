import { ViewIcon } from "@chakra-ui/icons";
import {
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          aria-label="view database"
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal size={"lg"} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent display={"flex"} justifyContent="space-between"  height={"410px"} alignItems={"center"}>
          <ModalHeader
            display={"flex"}
            fontSize={"40px"}
            justifyContent={"center"}
            textTransform={"capitalize"}
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent="center"
          >
            <Image
              src={user.pic}
              alt={user.name}
              boxSize={"150px"}
              borderRadius="full"
            ></Image>
            <Text fontSize={{ base: "28px", md: "30px" }}>
              Email : {user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
