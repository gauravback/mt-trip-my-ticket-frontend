import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Link as UiLink,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../redux/slices/AuthSlice";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Processing...", { id: "1" });
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: e.target.email.value,
            password: e.target.password.value,
          }),
        }
      );

      const result = await response.json();
      const status = await response.status;
      toast.success("Done...", { id: "1" });
      if (status === 200) {
        dispatch(login({ token: result.access, email: result.email }));
        toast.success("Login Successful", { id: "1" });
        navigate("/");
      } else {
        toast.error("Invalid credentials", { id: "1" });
      }
    } catch {
      toast.error("Server error.", { id: "1" });
    }
  };
  return (
    <Flex
      minH={"89vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit} method="POST">
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Text color={"red.500"}>Forgot password?</Text>
                </Stack>
                <Button
                  type="submit"
                  bg={"red.500"}
                  color={"white"}
                  _hover={{
                    bg: "red.600",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
            <Stack>
              <Text>
                Don't have an acccount?{" "}
                <Link to="/register">
                  <UiLink color={"red.500"}>Create One</UiLink>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
