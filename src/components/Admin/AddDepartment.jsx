// import React, { useState } from 'react';
// import {
//     Box,
//     Button,
//     FormControl,
//     FormLabel,
//     Input,
//     useToast,
//     Heading,
// } from '@chakra-ui/react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddDepartment = () => {
//     const [department, setDepartment] = useState({});
//     const toast = useToast();
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setDepartment({ ...department, [name]: value });
//     };

//     const handleSubmit = async () => {
//         try {
//             await axios.post('http://localhost:8006/department', department);
//             toast({
//                 title: 'Department added.',
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//             });
//             navigate('/admin/department');
//         } catch (error) {
//             console.error('Error adding department:', error);
//             toast({
//                 title: 'Error adding department.',
//                 description: error.message,
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//             });
//         }
//     };

//     return (
//         <Box p={8}>
//             <Heading mb={6}>Add Department</Heading>
//             <FormControl id="departmentName" mb={4}>
//                 <FormLabel>Department Name</FormLabel>
//                 <Input
//                     name="departmentName"
//                     value={department.departmentName || ''}
//                     onChange={handleChange}
//                 />
//             </FormControl>
//             <FormControl id="headName" mb={4}>
//                 <FormLabel>Head Name</FormLabel>
//                 <Input
//                     name="headName"
//                     value={department.headName || ''}
//                     onChange={handleChange}
//                 />
//             </FormControl>
//             <FormControl id="email" mb={4}>
//                 <FormLabel>Email</FormLabel>
//                 <Input
//                     name="email"
//                     value={department.email || ''}
//                     onChange={handleChange}
//                 />
//             </FormControl>
//             <Button colorScheme="blue" onClick={handleSubmit}>
//                 Add
//             </Button>
//         </Box>
//     );
// };

// export default AddDepartment;

import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast,
    Heading,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const generatePassword = () => {
    // Simple password generator for demonstration; customize as needed
    return Math.random().toString(36).slice(-8);
};

// const AddDepartment = () => {
//     const [department, setDepartment] = useState({
//         departmentName: '',
//         headName: '',
//         email: '',
//         username: '',
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString(),
//         // Password will be set in the handleSubmit function
//     });
//     const toast = useToast();
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setDepartment({ ...department, [name]: value });
//     };

//     const handleSubmit = async () => {
//         try {
//             const newPassword = generatePassword(); // Generate a new password
//             const departmentToAdd = {
//                 ...department,
//                 password: newPassword, // Add the generated password
//                 createdAt: new Date().toISOString(),
//                 updatedAt: new Date().toISOString(),
//             };

//             await axios.post('http://localhost:8006/department', departmentToAdd);
//             toast({
//                 title: 'Department added.',
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//             });
//             navigate('/admin/department');
//         } catch (error) {
//             console.error('Error adding department:', error);
//             toast({
//                 title: 'Error adding department.',
//                 description: error.message,
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//             });
//         }
//     };

//     return (
//         <Box p={8}>
//             <Heading mb={6}>Add Department</Heading>
//             <FormControl id="departmentName" mb={4}>
//                 <FormLabel>Department Name</FormLabel>
//                 <Input
//                     name="departmentName"
//                     value={department.departmentName}
//                     onChange={handleChange}
//                 />
//             </FormControl>
//             <FormControl id="headName" mb={4}>
//                 <FormLabel>Head Name</FormLabel>
//                 <Input
//                     name="headName"
//                     value={department.headName}
//                     onChange={handleChange}
//                 />
//             </FormControl>
//             <FormControl id="email" mb={4}>
//                 <FormLabel>Email</FormLabel>
//                 <Input
//                     name="email"
//                     value={department.email}
//                     onChange={handleChange}
//                 />
//             </FormControl>
//             <FormControl id="username" mb={4}>
//                 <FormLabel>Username</FormLabel>
//                 <Input
//                     name="username"
//                     value={department.username}
//                     onChange={handleChange}
//                 />
//             </FormControl>
//             <Button colorScheme="blue" onClick={handleSubmit}>
//                 Add
//             </Button>
//         </Box>
//     );
// };
const getISTDateTime = () => {
    const offset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    const istDate = new Date(Date.now() + offset);
    return istDate.toISOString();
};

// Use getISTDateTime to set createdAt and updatedAt
const AddDepartment = () => {
    const [department, setDepartment] = useState({
        departmentName: '',
        headName: '',
        email: '',
        username: '',
        createdAt: getISTDateTime(),
        updatedAt: getISTDateTime(),
        // Password will be set in the handleSubmit function
    });
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const newPassword = generatePassword(); // Generate a new password
            const departmentToAdd = {
                ...department,
                password: newPassword, // Add the generated password
                createdAt: getISTDateTime(),
                updatedAt: getISTDateTime(),
            };

            await axios.post('http://localhost:8006/department', departmentToAdd);
            toast({
                title: 'Department added.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/admin/department');
        } catch (error) {
            console.error('Error adding department:', error);
            toast({
                title: 'Error adding department.',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={8}>
            <Heading mb={6}>Add Department</Heading>
            <FormControl id="departmentName" mb={4}>
                <FormLabel>Department Name</FormLabel>
                <Input
                    name="departmentName"
                    value={department.departmentName}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl id="headName" mb={4}>
                <FormLabel>Head Name</FormLabel>
                <Input
                    name="headName"
                    value={department.headName}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl id="email" mb={4}>
                <FormLabel>Email</FormLabel>
                <Input
                    name="email"
                    value={department.email}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl id="username" mb={4}>
                <FormLabel>Username</FormLabel>
                <Input
                    name="username"
                    value={department.username}
                    onChange={handleChange}
                />
            </FormControl>
            <Button colorScheme="blue" onClick={handleSubmit}>
                Add
            </Button>
        </Box>
    );
};


export default AddDepartment;
