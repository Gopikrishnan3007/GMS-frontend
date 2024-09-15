import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    useToast,
    Spinner,
    Select,
    Heading,
    Avatar,
    VStack,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import { FaUserPlus, FaEnvelope, FaKey, FaUser, FaTasks } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddEmployee = () => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        username: '',
        password: '',
        email: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();
    const departmentId = sessionStorage.getItem('id'); // Department ID from session storage

    // Handler for form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value,
        });
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const employeePayload = {
            ...employeeData,
            department: { departmentId }, // Set the department ID from sessionStorage
            taskCount: 0,
            role: 'Employee',
            createdAt: new Date().toISOString(),
        };

        try {
            const response = await axios.post('http://localhost:8006/employee', employeePayload); // Assuming the backend URL
            toast({
                title: "Employee Added",
                description: `${response.data.name} has been successfully added!`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            navigate('/employees'); // Redirect after success
        } catch (error) {
            toast({
                title: "Error",
                description: "An error occurred while adding the employee.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box 
            maxW="md" 
            mx="auto" 
            mt={8} 
            p={6} 
            borderWidth={1} 
            borderRadius="lg" 
            boxShadow="lg"
            bg={useColorModeValue('gray.100', 'gray.700')}
        >
            <VStack spacing={4}>
                <Avatar size="xl" icon={<FaUserPlus />} bg="teal.500" />
                <Heading as="h2" size="lg" textAlign="center" mb={4}>
                    Add New Employee
                </Heading>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl id="name" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Enter employee's name"
                                value={employeeData.name}
                                onChange={handleInputChange}
                                icon={<FaUser />}
                            />
                        </FormControl>

                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                name="username"
                                placeholder="Enter username"
                                value={employeeData.username}
                                onChange={handleInputChange}
                                icon={<FaUser />}
                            />
                        </FormControl>

                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={employeeData.password}
                                onChange={handleInputChange}
                                icon={<FaKey />}
                            />
                        </FormControl>

                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={employeeData.email}
                                onChange={handleInputChange}
                                icon={<FaEnvelope />}
                            />
                        </FormControl>

                        {/* <FormControl id="role">
                            <FormLabel>Role</FormLabel>
                            <Select defaultValue="Employee" isReadOnly>
                                <option value="Employee">Employee</option>
                            </Select>
                        </FormControl> */}

                        <Button
                            type="submit"
                            colorScheme="teal"
                            size="lg"
                            isFullWidth
                            leftIcon={isLoading ? <Spinner /> : <FaUserPlus />}
                            isLoading={isLoading}
                        >
                            {isLoading ? "Adding Employee..." : "Add Employee"}
                        </Button>
                    </Stack>
                </form>
            </VStack>
        </Box>
    );
};

export default AddEmployee;
