import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  HStack,
  Image,
  Menu,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  MenuButton,
  Text,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import Logo from "../media/Logo-in-png.png";
import { FaBus, FaCar, FaSuitcaseRolling, FaBed } from "react-icons/fa";
import { FaPlaneUp } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/slices/AuthSlice";

export default function WithSubnavigation() {
  const user = useSelector((state) => state.authReducer?.value);
  const dispatch = useDispatch();

  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={999}
      background="#ffffff80"
      backdropFilter="blur(50px)"
    >
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justify={{ md: "between" }}
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "start", md: "start" }}
          align={{ base: "center", md: "center" }}
        >
          <Link to="/">
            <Image src={Logo} sx={{ width: "120px" }} />
          </Link>
          <Flex
            flex={{ base: 1, md: "flex" }}
            display={{ base: "none", md: "flex" }}
            justify={{ md: "center" }}
            ml={10}
          >
            <DesktopNav />
          </Flex>
          <select className="py-2 px-3 pr-9 block  rounded-md text-sm focus:outline-none focus:ring-0">
            <option selected>EN</option>
            <option>HI</option>
          </select>
          <HStack
            spacing="5"
            display={{
              base: "none",
              md: "flex",
            }}
          >
            {user ? (
              <Flex align={{ md: "center" }} justify={{ md: "center" }}>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={2}
                  >
                    <Button colorScheme="red" size="md">
                      {user?.email.slice(0, 1).toUpperCase()}
                    </Button>
                  </MenuButton>
                  <MenuList>
                    <MenuItem disabled={true} _hover={{ background: "none" }}>
                      {user?.email}
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem className="transition-all duration-1000 hover:bg-red-600 hover:text-white ease-in-out">
                      Profile
                    </MenuItem>
                    <MenuDivider />
                    <MenuItem className="transition-all duration-1000 hover:bg-red-600 hover:text-white ease-in-out">
                      <button
                        onClick={() => {
                          dispatch(logout());
                        }}
                        type="button"
                      >
                        Logout
                      </button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            ) : (
              <>
                <Link to="/login">
                  <Button colorScheme="red" size="md">
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button colorScheme="gray" size="md">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </HStack>
        </Flex>
        <Flex
          flex={{ base: 0, md: "auto" }}
          ml={{ base: "auto" }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const cl = useColorModeValue("red.500", "white");
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      <Link to="/flight">
        <Button
          color="gray.600"
          display="inline-flex"
          alignItems="center"
          fontSize="lg"
          _hover={{
            color: cl,
          }}
          _focus={{
            boxShadow: "none",
          }}
          bg="none"
          leftIcon={<FaPlaneUp fontSize={20} />}
        >
          Flight
        </Button>
      </Link>
      <Link to="/hotel">
        <Button
          color="gray.600"
          display="inline-flex"
          alignItems="center"
          fontSize="lg"
          _hover={{
            color: cl,
          }}
          _focus={{
            boxShadow: "none",
          }}
          bg="none"
          leftIcon={<FaBed fontSize={20} />}
        >
          Hotel
        </Button>
      </Link>
      <Link to="/bus">
        <Button
          color="gray.600"
          display="inline-flex"
          alignItems="center"
          fontSize="lg"
          _hover={{
            color: cl,
          }}
          _focus={{
            boxShadow: "none",
          }}
          bg="none"
          leftIcon={<FaBus fontSize={20} />}
        >
          Bus
        </Button>
      </Link>
      <Link to="/car">
        <Button
          color="gray.600"
          display="inline-flex"
          alignItems="center"
          fontSize="lg"
          _hover={{
            color: cl,
          }}
          _focus={{
            boxShadow: "none",
          }}
          bg="none"
          leftIcon={<FaCar fontSize={20} />}
        >
          Car
        </Button>
      </Link>
      <Link to="/travel">
        <Button
          color="gray.600"
          display="inline-flex"
          alignItems="center"
          fontSize="lg"
          _hover={{
            color: cl,
          }}
          _focus={{
            boxShadow: "none",
          }}
          bg="none"
          leftIcon={<FaSuitcaseRolling fontSize={20} />}
        >
          Travel Packages
        </Button>
      </Link>
    </Stack>
  );
};

const MobileNav = () => {
  const cl = useColorModeValue("red.500", "white");
  return (
    <>
      <Stack
        bg={useColorModeValue("white", "gray.800")}
        p={4}
        display={{ md: "none" }}
      >
        <Flex w="100%" mx="auto">
          <Flex
            spacing="5"
            display={{
              base: "flex",
              md: "flex",
            }}
            justify={{ base: "center" }}
            align={{ base: "center" }}
            direction={{ base: "column" }}
            gap={3}
            w="100%"
          >
            <Link to="/flight">
              <Button
                color="gray.600"
                display="inline-flex"
                alignItems="center"
                fontSize="lg"
                _hover={{
                  color: cl,
                }}
                _focus={{
                  boxShadow: "none",
                }}
                bg="none"
                leftIcon={<FaPlaneUp fontSize={20} />}
              >
                Flight
              </Button>
            </Link>
            <Link to="/hotel">
              <Button
                color="gray.600"
                display="inline-flex"
                alignItems="center"
                fontSize="lg"
                _hover={{
                  color: cl,
                }}
                _focus={{
                  boxShadow: "none",
                }}
                bg="none"
                leftIcon={<FaBed fontSize={20} />}
              >
                Hotel
              </Button>
            </Link>
            <Link to="/bus">
              <Button
                color="gray.600"
                display="inline-flex"
                alignItems="center"
                fontSize="lg"
                _hover={{
                  color: cl,
                }}
                _focus={{
                  boxShadow: "none",
                }}
                bg="none"
                leftIcon={<FaBus fontSize={20} />}
              >
                Bus
              </Button>
            </Link>
            <Link to="/car">
              <Button
                color="gray.600"
                display="inline-flex"
                alignItems="center"
                fontSize="lg"
                _hover={{
                  color: cl,
                }}
                _focus={{
                  boxShadow: "none",
                }}
                bg="none"
                leftIcon={<FaCar fontSize={20} />}
              >
                Car
              </Button>
            </Link>
            <Link to="/travel">
              <Button
                color="gray.600"
                display="inline-flex"
                alignItems="center"
                fontSize="lg"
                _hover={{
                  color: cl,
                }}
                _focus={{
                  boxShadow: "none",
                }}
                bg="none"
                leftIcon={<FaSuitcaseRolling fontSize={20} />}
              >
                Travel Packages
              </Button>
            </Link>
            <select className="py-2 px-3 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500">
              <option selected>Open this select menu</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>

            <Link to="/login">
              <Button colorScheme="red" size="md">
                Sign in
              </Button>
            </Link>
            <Link to="/register">
              <Button colorScheme="gray" size="md">
                Sign up
              </Button>
            </Link>

            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={2}
              >
                <Avatar
                  size={"md"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Stack>
    </>
  );
};
