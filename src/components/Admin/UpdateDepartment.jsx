
// import React, { useState, useEffect } from 'react';
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
// import { useNavigate, useParams } from 'react-router-dom';

// const UpdateDepartment = () => {
//     const { id } = useParams();
//     const [department, setDepartment] = useState({
//         departmentName: '',
//         headName: '',
//         email: '',
//         // Add other fields if needed
//     });
//     const [loading, setLoading] = useState(true);
//     const toast = useToast();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchDepartment = async () => {
            
//             if (!id || isNaN(id)) {
//                 toast({
//                     title: 'Invalid ID',
//                     description: 'The department Data is invalid.',
//                     status: 'error',
//                     duration: 5000,
//                     isClosable: true,
//                 });
//                 return;
//             }

//             try {
//                 const response = await axios.get(`http://localhost:8006/department/${id}`);
//                 setDepartment(response.data);
//             } catch (error) {
//                 console.error('Error fetching department:', error);
//                 toast({
//                     title: 'Error fetching department.',
//                     description: error.message,
//                     status: 'error',
//                     duration: 5000,
//                     isClosable: true,
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchDepartment();
//     }, [id, toast]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setDepartment({ ...department, [name]: value });
//     };

//     const handleSubmit = async () => {
//         try {
//             await axios.put(`http://localhost:8006/department/${id}`, department);
//             toast({
//                 title: 'Department updated.',
//                 status: 'success',
//                 duration: 5000,
//                 isClosable: true,
//             });
//             navigate('/admin/department');
//         } catch (error) {
//             console.error('Error updating department:', error);
//             toast({
//                 title: 'Error updating department.',
//                 description: error.message,
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//             });
//         }
//     };

//     if (loading) {
//         return <Box p={8}><Heading mb={6}>Loading...</Heading></Box>;
//     }

//     return (
//         <Box p={8}>
//             <Heading mb={6}>Update Department</Heading>
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
//             {/* Add more fields if necessary */}
//             <Button colorScheme="blue" onClick={handleSubmit}>
//                 Update
//             </Button>
//         </Box>
//     );
// };

// export default UpdateDepartment;

import React, { useState, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';

const UpdateDepartment = () => {
    const { id } = useParams();
    const [department, setDepartment] = useState({
        departmentName: '',
        headName: '',
        email: '',
        username: '', // Added username to state
    });
    const [loading, setLoading] = useState(true);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartment = async () => {
            if (!id || isNaN(id)) {
                toast({
                    title: 'Invalid ID',
                    description: 'The department data is invalid.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8006/department/${id}`);
                setDepartment(response.data);
            } catch (error) {
                console.error('Error fetching department:', error);
                toast({
                    title: 'Error fetching department.',
                    description: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDepartment();
    }, [id, toast]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:8006/department/${id}`, department);
            toast({
                title: 'Department updated.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/admin/department');
        } catch (error) {
            console.error('Error updating department:', error);
            toast({
                title: 'Error updating department.',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return <Box p={8}><Heading mb={6}>Loading...</Heading></Box>;
    }

    return (
        <Box p={8}>
            <Heading mb={6}>Update Department</Heading>
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
            <FormControl id="username" mb={4}> {/* Added FormControl for username */}
                <FormLabel>Username</FormLabel>
                <Input
                    name="username"
                    value={department.username}
                    onChange={handleChange}
                />
            </FormControl>
            {/* Add more fields if necessary */}
            <Button colorScheme="blue" onClick={handleSubmit}>
                Update
            </Button>
        </Box>
    );
};

export default UpdateDepartment;
