// import React, { useState, useEffect } from 'react';
// import {
//     Box, Flex, Text, Avatar, Button, VStack, Heading, Stack, IconButton,Table,HStack, Thead, Tbody, Tr, Th, Td, Input, Select, useColorMode
// } from '@chakra-ui/react';
// import { FiLogOut } from 'react-icons/fi';
// import { SunIcon, MoonIcon } from '@chakra-ui/icons';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const DepartmentHeadDashboard = () => {
//     const [grievances, setGrievances] = useState([]);
//     const [filter, setFilter] = useState('');
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(5);
//     const [currentDepartment, setCurrentDepartment] = useState(null); // The department of the head
//     const navigate = useNavigate();
//     const { colorMode, toggleColorMode } = useColorMode();

//     useEffect(() => {
//         // Fetch department and grievances for this specific department
//         const fetchDepartmentAndGrievances = async () => {
//             try {
//                 const departmentResponse = await axios.get('http://localhost:8006/department/head', {
//                     headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } // Assuming token is stored in session
//                 });
//                 const department = departmentResponse.data;
//                 setCurrentDepartment(department);

//                 const grievancesResponse = await axios.get(`http://localhost:8006/grievances/department/${department.departmentId}`);
//                 setGrievances(grievancesResponse.data);
//             } catch (error) {
//                 console.error('Error fetching department or grievances:', error);
//             }
//         };

//         fetchDepartmentAndGrievances();
//     }, []);

//     useEffect(() => {
//         let filtered = grievances;

//         if (statusFilter !== 'all') {
//             filtered = filtered.filter(grievance => grievance.status === statusFilter);
//         }

//         if (filter) {
//             filtered = filtered.filter(grievance =>
//                 grievance.description.toLowerCase().includes(filter.toLowerCase())
//             );
//         }

//         // setFilteredGrievances(filtered);
//         setCurrentPage(1);
//     }, [filter, statusFilter, grievances]);

   

//     const totalGrievances = grievances.length;
//     const pendingGrievances = grievances.filter(grievance => grievance.status === 'Pending').length;
//     const closedGrievances = grievances.filter(grievance => grievance.status === 'Closed').length;

//     const handleSignOut = () => {
//         sessionStorage.clear();
//         navigate('/login');
//     };

//     return (
//         <Flex height="100vh">
//             {/* Sidebar */}
//             <Box
//                 w={{ base: '100%', md: '20%' }}
//                 bg={colorMode === 'light' ? 'gray.200' : 'gray.900'}
//                 color={colorMode === 'light' ? 'black' : 'white'}
//                 p={5}
//             >
//                 <VStack align="start" spacing={4}>
//                     <Avatar name="Department Head" size="xl" />
//                     <Text fontSize="xl" fontWeight="bold">Department Head</Text>
//                     <Text fontSize="md">{currentDepartment?.departmentName}</Text>
//                     <Button leftIcon={<FiLogOut />} w="full" onClick={handleSignOut}>Sign Out</Button>
//                     <Button  w="full" onClick={() => navigate('/dept/empasign')}>Asign Employee</Button>

//                     <IconButton
//                         aria-label="Toggle Theme"
//                         icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
//                         onClick={toggleColorMode}
//                     />
//                 </VStack>
//             </Box>

//             {/* Main Content */}
//             <Box flex="1" p={8} bg={colorMode === 'light' ? 'white' : 'gray.800'} color={colorMode === 'light' ? 'black' : 'white'}>
//                 <HStack justify="space-between" mb={8}>
//                     <Heading>Department Grievances</Heading>
//                 </HStack>

//                 {/* Grievance Statistics */}
//                 <Flex justify="space-between" mb={8}>
//                     <Box textAlign="center" p={4} bg="blue.100" rounded="md" w="30%">
//                         <Text color={'black'} fontSize="xl" fontWeight="bold">{totalGrievances}</Text>
//                         <Text color={'black'}>Total Grievances</Text>
//                     </Box>
//                     <Box textAlign="center" p={4} bg="yellow.100" rounded="md" w="30%">
//                         <Text color={'black'} fontSize="xl" fontWeight="bold">{pendingGrievances}</Text>
//                         <Text color={'black'}>Pending Grievances</Text>
//                     </Box>
//                     <Box textAlign="center" p={4} bg="green.100" rounded="md" w="30%">
//                         <Text color={'black'} fontSize="xl" fontWeight="bold">{closedGrievances}</Text>
//                         <Text color={'black'}>Closed Grievances</Text>
//                     </Box>
//                 </Flex>

//                 {/* Filter and Grievance Table */}
//                 <Stack spacing={4}>
//                     <Flex justify="space-between" mb={4}>
//                         <Input
//                             placeholder="Search Grievances"
//                             value={filter}
//                             onChange={(e) => setFilter(e.target.value)}
//                             w="40%"
//                         />
//                         <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} w="30%">
//                             <option value="all">All</option>
//                             <option value="pending">Pending</option>
//                             <option value="approved">Approved</option>
//                             <option value="rejected">Rejected</option>
//                         </Select>
//                     </Flex>

//                     <Box overflowX="auto">
//                         <Table variant="simple" size="md">
//                             <Thead>
//                                 <Tr>
//                                     <Th>ID</Th>
//                                     <Th>Description</Th>
//                                     <Th>Status</Th>
//                                     <Th>Date</Th>
//                                     <Th>Actions</Th>
//                                 </Tr>
//                             </Thead>
//                             <Tbody>
//                                 {/* {currentGrievances.map(grievance => (
//                                     <Tr key={grievance.grievanceId}>
//                                         <Td>{grievance.grievanceId}</Td>
//                                         <Td>{grievance.description}</Td>
//                                         <Td>{grievance.status}</Td>
//                                         <Td>{new Date(grievance.grievanceDate).toLocaleDateString()}</Td>
//                                         <Td>
//                                             <Button size="sm" colorScheme="blue">View Details</Button>
//                                         </Td>
//                                     </Tr>
//                                 ))} */}
//                             </Tbody>
//                         </Table>
//                     </Box>

//                     {/* Pagination Controls */}
//                     <Flex justify="center" mt={4}>
//                         <Button
//                             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                             isDisabled={currentPage === 1}
//                         >
//                             Previous
//                         </Button>
                       
//                     </Flex>
//                 </Stack>
//             </Box>
//         </Flex>
//     );
// };

// export default DepartmentHeadDashboard;

import React, { useState } from 'react';
import { Box, Flex, VStack, Button, Text, Avatar, useColorMode, useToast, Divider } from '@chakra-ui/react';
import { EditIcon, LockIcon, TimeIcon, RepeatIcon, AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import AssignEmployee from './AssignEmployee';
import AddEmployee from './AddEmployee';
import GrievanceData from './GrievanceDataDP';
import GrievanceDataDP from './GrievanceDataDP';


const DepartmentHeadDashboard = () => {
    const [activeSection, setActiveSection] = useState('grievances'); // Default section
    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast(); // Chakra's toast for notifications
    const navigate = useNavigate();
    const headName = sessionStorage.getItem('name') || 'Department Head'; // Department Head's name or default

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
                            <Avatar name={headName} size="md" />
                            <Text fontSize="xl" fontWeight="bold" ml={4}>{headName}</Text>
                        </Flex>
                        <Button leftIcon={<EditIcon />} onClick={() => handleSectionChange('grievances')} w="full" colorScheme="teal" variant="outline">
                            Grievances
                        </Button>
                        <Button leftIcon={<AddIcon />} onClick={() => handleSectionChange('asignemployee')} w="full" colorScheme="teal" variant="outline">
                            Asign Employee
                        </Button>
                        <Button leftIcon={<AddIcon />} onClick={() => handleSectionChange('addemployee')} w="full" colorScheme="teal" variant="outline">
                            Add New Employee
                        </Button>
                        <Divider my={4} />
                        <Button onClick={handleSignOut} colorScheme="red" w="full">
                            Sign Out
                        </Button>
                    </VStack>
                </Box>

                {/* Main content area */}
                <Box flex="1" p={8} bg={colorMode === 'light' ? 'white' : 'gray.800'}>
                    {/* Conditional rendering of sections */}
                    {activeSection === 'grievances' && <GrievanceDataDP />}
                    {activeSection === 'asignemployee' && <AssignEmployee />}
                    {activeSection === 'addemployee' && <AddEmployee />}
                    {/*{activeSection === 'allgrievances' && <AllGrievances />} */}
                </Box>
            </Flex>
        </>
    );
};

export default DepartmentHeadDashboard;
