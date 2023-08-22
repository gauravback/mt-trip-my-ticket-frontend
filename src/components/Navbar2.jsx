import {
  Box,
  Button,
  chakra,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  VStack,
  useColorModeValue,
  useDisclosure,
  Link,
  SimpleGrid,
  Stack,
  Image,
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
import React from "react";
import { AiFillHome, AiOutlineInbox, AiOutlineMenu } from "react-icons/ai";
import { BsFillCameraVideoFill } from "react-icons/bs";
import logo from "../media/Logo-in-png.png";
import {
  FaHotel,
  FaBus,
  FaPlane,
  FaCar,
  FaSuitcaseRolling,
  FaSuitcase,
  FaBed,
} from "react-icons/fa";
import { FaPlaneUp } from "react-icons/fa6";

const Navbar2 = () => {
  const ref = React.useRef(null);
  const [y, setY] = React.useState(0);
  const height = ref.current ? ref.current.getBoundingClientRect() : 0;
  const { scrollY } = useViewportScroll();
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()));
  }, [scrollY]);
  const cl = useColorModeValue("red.500", "white");
  const mobileNav = useDisclosure();

  const Section = (props) => {
    const ic = useColorModeValue("brand.600", "brand.50");
    const hbg = useColorModeValue("gray.50", "brand.400");
    const tcl = useColorModeValue("gray.900", "gray.50");
    const dcl = useColorModeValue("gray.500", "gray.50");
    return (
      <Link
        m={-3}
        p={3}
        display="flex"
        alignItems="start"
        rounded="lg"
        _hover={{
          bg: hbg,
        }}
      >
        <chakra.svg
          flexShrink={0}
          h={6}
          w={6}
          color={ic}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {props.icon}
        </chakra.svg>
        <Box ml={4}>
          <chakra.p fontSize="sm" fontWeight="700" color={tcl}>
            {props.title}
          </chakra.p>
          <chakra.p mt={1} fontSize="sm" color={dcl}>
            {props.children}
          </chakra.p>
        </Box>
      </Link>
    );
  };

  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? "flex" : "none"}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
        Dashboard
      </Button>
      <Button
        w="full"
        variant="solid"
        colorScheme="brand"
        leftIcon={<AiOutlineInbox />}
      >
        Inbox
      </Button>
      <Button w="full" variant="ghost" leftIcon={<BsFillCameraVideoFill />}>
        Videos
      </Button>
    </VStack>
  );
  return (
    <>
      <chakra.header
        ref={ref}
        shadow={y > height ? "sm" : undefined}
        transition="box-shadow 0.2s"
        borderTop="6px solid"
        borderTopColor="brand.400"
        w="full"
        overflowY="hidden"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="100%" w="100%">
          <Flex
            w="full"
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex align="flex-start">
              <Link href="/">
                <HStack>
                  <Image src={logo} sx={{ width: "120px" }} />
                </HStack>
              </Link>
            </Flex>
            <Flex>
              <HStack
                spacing="5"
                display={{
                  base: "none",
                  md: "flex",
                }}
              >
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
              </HStack>
            </Flex>
            <Flex justify="flex-end" align="center" color="gray.700">
              <HStack
                spacing="5"
                display={{
                  base: "none",
                  md: "flex",
                }}
              >
                <Button colorScheme="red" size="md">
                  Sign in
                </Button>
                <Button colorScheme="gray" size="md">
                  Sign up
                </Button>
              </HStack>

              <IconButton
                display={{
                  base: "flex",
                  md: "none",
                }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{
                  color: "inherit",
                }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
            </Flex>
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </>
  );
};

export default Navbar2;
