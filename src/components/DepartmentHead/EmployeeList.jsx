import React, { useState, useEffect } from 'react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Heading,
    VStack,
    Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [grievanceId, setGrievanceId] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();  // The grievanceId will be passed via the URL

    // Fetch employees based on department ID from session storage
    const fetchEmployees = async () => {
        try {
            const departmentId = sessionStorage.getItem('id');
            if (!departmentId) {
                console.error('No department ID found in session storage');
                return;
            }

            const response = await axios.get(`http://localhost:8006/employee/department/${departmentId}`);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        setGrievanceId(id);  // Grievance ID passed via route param
        fetchEmployees();
    }, [id]);

    // Handle employee assignment
    const assignEmployee = async (employeeId) => {
        try {
            if (!grievanceId) {
                console.error('No grievance ID available');
                return;
            }
    
            // Patch request to update the grievance with the selected employee ID
            await axios.patch(`http://localhost:8006/grievances/${grievanceId}/assign/${employeeId}`);
            // Optionally, you can update the local state or show a success message here
    
            navigate('/grievances'); // Redirect back to grievance list after assignment
        } catch (error) {
            console.error('Error assigning employee:', error);
        }
    };
    

    return (
        <VStack spacing={5} align="stretch">
            <Heading>Assign Employee to Grievance</Heading>
            <Box overflowX="auto">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>Employee Name</Th>
                            <Th>Task Count</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {employees.map(employee => (
                            <Tr key={employee.employeeId}>
                                <Td>{employee.name}</Td>
                                <Td>{employee.taskCount}</Td>
                                <Td>
                                    <Button
                                        colorScheme="blue"
                                        onClick={() => assignEmployee(employee.employeeId)}
                                    >
                                        Assign to Grievance
                                    </Button>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </VStack>
    );
};

export default EmployeeList;
