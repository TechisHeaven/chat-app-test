import { Box } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import React from 'react'

const UserBadgeItem = ({user, handleFunction}) => {
  return (
    <Box
    px={2}
    py={1}
    borderRadius="lg"
    m={1}
    mb={2}
    variant="solid"
    fontSize={14}
    bg= "purple"

    color={"white"}
    cursor={"pointer"}
    onClick={handleFunction}

    >
        {user.name}
        <CloseIcon pl={2} fontSize={16}/>
    </Box>
  )
}

export default UserBadgeItem