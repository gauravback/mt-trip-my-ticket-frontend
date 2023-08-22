import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Link as UiLink,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <Flex
      minH={"89vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} w={"lg"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Create New Acount</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" />
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Phone Number</FormLabel>
                <Input type="tel" name="phone" />
              </FormControl>
            </HStack>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" />
            </FormControl>
            <FormControl id="confirmpassword">
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" name="confirmpassword" />
            </FormControl>
            <Stack>
              <Button
                bg={"red.500"}
                color={"white"}
                _hover={{
                  bg: "red.600",
                }}
              >
                Sign Up
              </Button>
            </Stack>
            <Stack>
              <Text>
                Already have an acccount?{" "}
                <Link to="/login">
                  <UiLink color={"red.500"}>Login</UiLink>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
