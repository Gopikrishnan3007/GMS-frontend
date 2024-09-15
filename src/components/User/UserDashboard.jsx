

import React, { useState } from 'react';
import { Box, Flex, VStack, Button, Text, Avatar,  useColorMode, useToast,  Divider } from '@chakra-ui/react';
import { EditIcon, LockIcon, TimeIcon, RepeatIcon,  AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import PasswordReset from './PasswordReset'; // Component for reset password
import Confirmation from './Confirmation';  // Component for confirmation
import ProfileEdit from './ProfileEdit';
import UserGrievance from './UserGrievance';
import DepartmentList from './DepartmentList';
import LoginNavbar from './LoginNavbar';

const UserDashboard = () => {
    const [activeSection, setActiveSection] = useState('grievances'); // Active section state
    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast(); // Chakra's toast for notifications
    const navigate = useNavigate();
    const userName = sessionStorage.getItem('name') || 'John Doe';

    // Handlers for switching sections
    const handleSectionChange = (section) => {
        setActiveSection(section);
        toast({
            title: `Switched to ${section} section.`,
            status: 'info',
            duration: 2000,
            isClosable: true,
        });
    };

    const handleSignOut = () => {
        sessionStorage.clear();
        toast({
            title: "Signed out.",
            description: "You have successfully logged out.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
        navigate('/login');
    };

    return (
        <>
        <LoginNavbar />
        <Flex minH="100vh" flexDir={{ base: 'column', md: 'row' }}>
            {/* Sidebar */}
            <Box
                w={{ base: '100%', md: '20%' }}
                bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}
                p={5}
                h={{ base: 'auto', md: '100vh' }}
                position="sticky"
                top="0"
                borderRightWidth={{ base: '0', md: '1px' }}
                borderColor={colorMode === 'light' ? 'gray.200' : 'gray.700'}
                boxShadow={{ base: 'none', md: 'md' }}
                overflowY={{ base: 'auto', md: 'hidden' }}
            >
                <VStack align="start" spacing={6}>
                <Flex align="center" mb={6}>
                    <Avatar name={userName} size="md" />
                    <Text fontSize="xl" fontWeight="bold" ml={4}>{userName}</Text>
                </Flex>
                    <Button leftIcon={<EditIcon />} onClick={() => handleSectionChange('grievances')} w="full" colorScheme="teal" variant="outline">
                        Grievances
                    </Button>
                    <Button leftIcon={<AddIcon />} onClick={() => handleSectionChange('department')} w="full" colorScheme="teal" variant="outline">
                        Add Grievance
                    </Button>
                    <Button leftIcon={<EditIcon />} onClick={() => handleSectionChange('profile')} w="full" colorScheme="teal" variant="outline">
                        Edit Profile
                    </Button>
                    <Button leftIcon={<LockIcon />} onClick={() => handleSectionChange('password')} w="full" colorScheme="teal" variant="outline">
                        Reset Password
                    </Button>
                    <Button leftIcon={<RepeatIcon />} onClick={() => handleSectionChange('confirmation')} w="full" colorScheme="teal" variant="outline">
                        Confirmation
                    </Button>
                    <Divider my={4} />
                </VStack>
            </Box>

            {/* Main content area */}
            <Box flex="1" p={8} bg={colorMode === 'light' ? 'white' : 'gray.800'}>
                
                {/* Conditional rendering of sections */}
                {activeSection === 'grievances' && <UserGrievance />}
                {activeSection === 'department' && <DepartmentList />}
                {activeSection === 'profile' && <ProfileEdit />}
                {activeSection === 'password' && <PasswordReset />}
                {activeSection === 'confirmation' && <Confirmation />}
            </Box>
        </Flex>
        </>
    );
};

export default UserDashboard;
