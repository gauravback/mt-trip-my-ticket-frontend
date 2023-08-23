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
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Processing...", { id: "1" });
    try {
      const { name, email, phone, password, confirmpassword } = e.target;
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/register/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            phone: phone.value,
            password: password.value,
            password2: confirmpassword.value,
          }),
        }
      );
      const result = await response.json();
      const status = await response.status;

      if (status === 201) {
        toast.success(Object.values(result)[0], { id: "1" });
        navigate("/login");
      } else {
        toast.error("Something went wrong", { id: "1" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Server error", { id: "1" });
    }
  };
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
            <form method="POST" onSubmit={handleSubmit}>
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
              <Stack mt={3}>
                <Button
                  type="submit"
                  bg={"red.500"}
                  color={"white"}
                  _hover={{
                    bg: "red.600",
                  }}
                >
                  Sign Up
                </Button>
              </Stack>
            </form>
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
