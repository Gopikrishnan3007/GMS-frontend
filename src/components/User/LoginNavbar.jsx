


import { 
    Flex, 
    Button, 
    IconButton, 
    useColorMode, 
    useBreakpointValue, 
    Drawer, 
    DrawerBody, 
    DrawerOverlay, 
    DrawerContent, 
    DrawerCloseButton, 
    DrawerHeader, 
    VStack,
    HStack, 
    Text,
    useDisclosure 
} from '@chakra-ui/react';
import { 
    SunIcon, 
    MoonIcon, 
    HamburgerIcon
} from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { FaHome, FaSignInAlt } from 'react-icons/fa';
import { MdOutlineContactSupport, MdOutlineInfo, MdOutlineQuestionAnswer } from 'react-icons/md';
import Logo from './GMS.png'; // Import your SVG logo

const LoginNavbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    const handleThemeToggle = () => {
        toggleColorMode();
        window.location.reload();
    };

    // Define whether to show mobile menu or not based on screen size
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Flex 
            as="nav" 
            justify="space-between" 
            align="center" 
            p={4} 
            bg={colorMode === 'light' ? 'gray.100' : 'gray.900'} 
            color={colorMode === 'light' ? 'black' : 'white'}
            position="sticky"  // Makes the navbar sticky
            top="0"            // Sticks the navbar to the top of the page
            zIndex="1000"      // Ensures it's always on top of other content
            boxShadow="md"     // Adds a subtle shadow for better visibility
        >
            {/* Logo and title */}
            <HStack spacing={3} align="center">
                <Link to="/">
                    <img src={Logo} alt="Company Logo" style={{ width: '50px', borderRadius: '50%' }} />
                </Link>
                <Text fontSize="1.5rem" fontWeight="bold">Grievance Management System</Text>
            </HStack>

            {/* Navbar links for larger screens */}
            {!isMobile ? (
                <HStack spacing={5}>
                    <Button leftIcon={<FaHome />} variant="ghost" as={Link} to="/user/userdashboard">Dashboard</Button>
                    <Button leftIcon={<FaHome />} variant="ghost" as={Link} to="/home">Home</Button>
                    <Button leftIcon={<MdOutlineInfo />} variant="ghost" as={Link} to="/about">About Us</Button>
                    <Button leftIcon={<MdOutlineContactSupport />} variant="ghost" as={Link} to="/contact">Contact Us</Button>
                    <Button leftIcon={<MdOutlineQuestionAnswer />} variant="ghost" as={Link} to="/qa">Q/A</Button>
                    <IconButton
                        aria-label="Toggle Theme"
                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        onClick={handleThemeToggle}
                        variant="ghost"
                    />
                    <Button leftIcon={<FaSignInAlt />} variant="solid" colorScheme="teal" as={Link} to="/login">Logout</Button>
                </HStack>
            ) : (
                // Hamburger menu for mobile view
                <>
                    <IconButton
                        ref={btnRef}
                        aria-label="Open Menu"
                        icon={<HamburgerIcon />}
                        onClick={onOpen}
                        variant="ghost"
                    />
                    <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader>Menu</DrawerHeader>
                            <DrawerBody>
                                <VStack spacing={4}>
                                <Button leftIcon={<FaHome />} w="100%" variant="outline" as={Link} to="/user/userdashboard" onClick={onClose}>Dashboard</Button>
                                    <Button leftIcon={<FaHome />} w="100%" variant="outline" as={Link} to="/home" onClick={onClose}>Home</Button>
                                    <Button leftIcon={<MdOutlineInfo />} w="100%" variant="outline" as={Link} to="/about" onClick={onClose}>About Us</Button>
                                    <Button leftIcon={<MdOutlineContactSupport />} w="100%" variant="outline" as={Link} to="/contact" onClick={onClose}>Contact Us</Button>
                                    <Button leftIcon={<MdOutlineQuestionAnswer />} w="100%" variant="outline" as={Link} to="/qa" onClick={onClose}>Q/A</Button>
                                    <IconButton
                                        aria-label="Toggle Theme"
                                        icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                        onClick={handleThemeToggle}
                                        w="100%"
                                        variant="outline"
                                    />
                                    <Button leftIcon={<FaSignInAlt />} w="100%" colorScheme="teal" as={Link} to="/" onClick={onClose}>Sign Out</Button>
                                </VStack>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </>
            )}
        </Flex>
    );
};

export default LoginNavbar;
