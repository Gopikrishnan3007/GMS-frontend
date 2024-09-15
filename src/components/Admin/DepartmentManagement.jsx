import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    useToast,
    IconButton,
    Input,
    Select,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DepartmentManagement = () => {
    const [departments, setDepartments] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredDepartments, setFilteredDepartments] = useState([]);
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all departments from the backend
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:8006/department/all');
                setDepartments(response.data);
                setFilteredDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    useEffect(() => {
        // Filter departments based on search input
        if (search) {
            setFilteredDepartments(
                departments.filter(department =>
                    department.departmentName.toLowerCase().includes(search.toLowerCase())
                )
            );
        } else {
            setFilteredDepartments(departments);
        }
    }, [search, departments]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8006/department/${id}`);
            setDepartments(departments.filter(department => department.departmentId !== id));
            setFilteredDepartments(filteredDepartments.filter(department => department.departmentId !== id));
            toast({
                title: 'Department deleted.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error deleting department:', error);
            toast({
                title: 'Error deleting department.',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleUpdate = (id) => {
        navigate(`/admin/department/update/${id}`);
    };

    const handleAdd = () => {
        navigate('/admin/department/add');
    };

    return (
        <Box p={8}>
            <HStack mb={6} justify="space-between">
                <Heading>Department Management</Heading>
                <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={handleAdd}>
                    Add Department
                </Button>
            </HStack>

            <Input
                placeholder="Search by department name"
                mb={4}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Head Name</Th>
                        <Th>Email</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredDepartments.map(department => (
                        <Tr key={department.departmentId}>
                            <Td>{department.departmentId}</Td>
                            <Td>{department.departmentName}</Td>
                            <Td>{department.headName}</Td>
                            <Td>{department.email}</Td>
                            <Td>
                                <HStack spacing={4}>
                                    <IconButton
                                        aria-label="Edit"
                                        icon={<EditIcon />}
                                        onClick={() => handleUpdate(department.departmentId)}
                                    />
                                    <IconButton
                                        aria-label="Delete"
                                        icon={<DeleteIcon />}
                                        colorScheme="red"
                                        onClick={() => handleDelete(department.departmentId)}
                                    />
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default DepartmentManagement;
