

// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Table,
//     Thead,
//     Tbody,
//     Tr,
//     Th,
//     Td,
//     Button,
//     Select,
//     Heading,
//     VStack,
// } from '@chakra-ui/react';
// import axios from 'axios';

// const AssignEmployee = () => {
//     const [grievances, setGrievances] = useState([]);
//     const [employees, setEmployees] = useState([]);
//     const [selectedEmployee, setSelectedEmployee] = useState({});

//     // Fetch grievances based on department ID from session
//     const fetchGrievances = async () => {
//         try {
//             const departmentId = sessionStorage.getItem("id");
//             if (!departmentId) {
//                 console.error("No department ID found in session storage");
//                 return;
//             }

//             // Make the API call using the departmentId
//             const response = await axios.get(`http://localhost:8006/grievances/department/${departmentId}`);

//             // Filter grievances that have no assigned employee
//             const unassignedGrievances = response.data.filter(grievance => !grievance.assignedEmployee);

//             setGrievances(unassignedGrievances);
//         } catch (error) {
//             console.error('Error fetching grievances:', error);
//         }
//     };

//     // Fetch employees
//     const fetchEmployees = async () => {
//         try {
//             const response = await axios.get('http://localhost:8006/employee/all');
//             setEmployees(response.data);
//         } catch (error) {
//             console.error('Error fetching employees:', error);
//         }
//     };

//     useEffect(() => {
//         fetchGrievances();
//         fetchEmployees();
//     }, []);

//     const assignEmployee = async (grievanceId) => {
//         try {
//             await axios.patch(`http://localhost:8006/grievances/${grievanceId}/assign/${selectedEmployee[grievanceId]}`);
//             fetchGrievances(); // Refresh after assignment
//         } catch (error) {
//             console.error('Error assigning employee:', error);
//         }
//     };

//     return (
//         <VStack spacing={5} align="stretch">
//             <Heading>Assign Employee to Grievance</Heading>
//             <Box overflowX="auto">
//                 <Table variant="simple">
//                     <Thead>
//                         <Tr>
//                             <Th>ID</Th>
//                             <Th>Description</Th>
//                             <Th>Department</Th>
//                             <Th>Assign Employee</Th>
//                             <Th>Action</Th>
//                         </Tr>
//                     </Thead>
//                     <Tbody>
//                         {grievances.map(grievance => (
//                             <Tr key={grievance.grievanceId}>
//                                 <Td>{grievance.grievanceId}</Td>
//                                 <Td>{grievance.description}</Td>
//                                 <Td>{grievance.department.departmentName}</Td>
//                                 <Td>{grievance.category.categoryName}</Td>
//                                 <Td>
//                                     <Button
//                                         colorScheme="blue"
//                                         onClick={() => assignEmployee(grievance.grievanceId)}
//                                     >
//                                         Assign
//                                     </Button>
//                                 </Td>
//                             </Tr>
//                         ))}
//                     </Tbody>
//                 </Table>
//             </Box>
//         </VStack>
//     );
// };

// export default AssignEmployee;

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
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignEmployee = () => {
    const [grievances, setGrievances] = useState([]);
    const navigate = useNavigate();

    // Fetch grievances based on department ID from session
    const fetchGrievances = async () => {
        try {
            const departmentId = sessionStorage.getItem('id');
            if (!departmentId) {
                console.error('No department ID found in session storage');
                return;
            }

            const response = await axios.get(`http://localhost:8006/grievances/department/${departmentId}`);
            const unassignedGrievances = response.data.filter(grievance => !grievance.assignedEmployee);
            setGrievances(unassignedGrievances);
        } catch (error) {
            console.error('Error fetching grievances:', error);
        }
    };

    useEffect(() => {
        fetchGrievances();
    }, []);

    // Navigate to EmployeeList component with grievanceId
    const handleAssign = (grievanceId) => {
        navigate(`/assign-employee/${grievanceId}`);  // Redirect to EmployeeList page with grievanceId
    };

    return (
        <VStack spacing={5} align="stretch">
            <Heading>Assign Employee to Grievance</Heading>
            <Box overflowX="auto">
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Description</Th>
                            <Th>Department</Th>
                            <Th>Category</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {grievances.map(grievance => (
                            <Tr key={grievance.grievanceId}>
                                <Td>{grievance.grievanceId}</Td>
                                <Td>{grievance.description}</Td>
                                <Td>{grievance.department.departmentName}</Td>
                                <Td>{grievance.category.categoryName}</Td>
                                <Td>
                                    <Button
                                        colorScheme="blue"
                                        onClick={() => handleAssign(grievance.grievanceId)}
                                    >
                                        Assign
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

export default AssignEmployee;
