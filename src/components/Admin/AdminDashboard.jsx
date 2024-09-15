// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Flex,
//     Text,
//     Avatar,
//     Button,
//     VStack,
//     HStack,
//     Heading,
//     IconButton,
//     Stack,
//     Table,
//     Thead,
//     Tbody,
//     Tr,
//     Th,
//     Td,
//     Input,
//     Select,
//     useColorMode,
//     ButtonGroup,
//     FormControl,
//     FormLabel,
//     FormErrorMessage
// } from '@chakra-ui/react';
// import { FiLogOut } from 'react-icons/fi';
// import { SunIcon, MoonIcon, AddIcon, TimeIcon, CheckIcon, LockIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Line, Bar, Pie } from 'react-chartjs-2';

// import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

// // Register the components you are using
// ChartJS.register(
//     CategoryScale, // For categorical axes
//     LinearScale,   // For linear axes
//     BarElement,    // For bar chart elements
//     PointElement,  // For point elements (used in Line charts)
//     LineElement,   // For line elements (used in Line charts)
//     ArcElement,    // For arc elements (used in Pie and Doughnut charts)
//     Title,         // For chart titles
//     Tooltip,       // For tooltips
//     Legend         // For legends
// );


// const AdminDashboard = () => {
//     const [grievances, setGrievances] = useState([]);
//     const [departments, setDepartments] = useState([]);
//     const [filteredGrievances, setFilteredGrievances] = useState([]);
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [filter, setFilter] = useState('');
//     const [chartType, setChartType] = useState('line');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage] = useState(5);
//     const [selectedGrievance, setSelectedGrievance] = useState(null);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const navigate = useNavigate();
//     const { colorMode, toggleColorMode } = useColorMode();

//     useEffect(() => {
//         const fetchGrievances = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8006/grievances/findAll');
//                 setGrievances(response.data);
//                 setFilteredGrievances(response.data);
//             } catch (error) {
//                 console.error('Error fetching grievances:', error);
//             }
//         };

//         const fetchDepartments = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8006/department/all');
//                 setDepartments(response.data);
//             } catch (error) {
//                 console.error('Error fetching departments:', error);
//             }
//         };

//         fetchGrievances();
//         fetchDepartments();
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

//         setFilteredGrievances(filtered);
//         setCurrentPage(1);
//     }, [filter, statusFilter, grievances]);

//     const totalPages = Math.ceil(filteredGrievances.length / itemsPerPage);
//     const currentGrievances = filteredGrievances.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//     );

//     const totalGrievances = grievances.length;
//     const pendingGrievances = grievances.filter(grievance => grievance.status === 'Pending').length;
//     const closedGrievances = grievances.filter(grievance => grievance.status === 'Closed').length;

//     const chartData = {
//         labels: grievances.map(grievance => new Date(grievance.grievanceDate).toLocaleDateString()),
//         datasets: [
//             {
//                 label: 'Grievances Over Time',
//                 data: grievances.map(grievance => grievance.grievanceId),
//                 backgroundColor: 'rgba(75, 192, 192, 0.6)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 fill: true,
//             },
//         ],
//     };

//     const chartOptions = {
//         maintainAspectRatio: false,
//         scales: {
//             x: {
//                 type: 'category',
//             },
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     };

//     const renderChart = () => {
//         switch (chartType) {
//             case 'bar':
//                 return <Bar data={chartData} options={chartOptions} />;
//             case 'pie':
//                 return <Pie data={chartData} options={chartOptions} />;
//             case 'line':
//             default:
//                 return <Line data={chartData} options={chartOptions} />;
//         }
//     };

//     const handleSignOut = () => {
//         sessionStorage.clear();
//         navigate('/login');
//     };

//     const handleManageDepartments = () => {
//         navigate('/admin/departmentmanage');
//     };

//     const handleOpenModal = (grievance) => {
//         setSelectedGrievance(grievance);
//         setIsModalOpen(true);
//     };

//     const handleApproveGrievance = async (grievanceId) => {
//         try {
            // await axios.patch(`http://localhost:8006/grievances/${grievanceId}/status`, 'Approved', {
            //     headers: {
            //         'Content-Type': 'text/plain', // Ensure the Content-Type is set correctly
            //     },
//             });
//             // Update the state with new status
//             setGrievances(prev => prev.map(grievance =>
//                 grievance.grievanceId === grievanceId ? { ...grievance, status: 'Approved' } : grievance
//             ));
//             setFilteredGrievances(prev => prev.map(grievance =>
//                 grievance.grievanceId === grievanceId ? { ...grievance, status: 'Approved' } : grievance
//             ));
//         } catch (error) {
//             console.error('Error approving grievance:', error);
//         }
//     };
    
    
//  const handleRejectGrievance = async (grievanceId) => {
//     try {
        // await axios.patch(`http://localhost:8006/grievances/${grievanceId}/status`, 'Rejected', {
        //     headers: {
        //         'Content-Type': 'text/plain', // Ensure the Content-Type is set correctly
        //     },
        // });
//         // Update the state with new status
//         setGrievances(prev => prev.map(grievance =>
//             grievance.grievanceId === grievanceId ? { ...grievance, status: 'Rejected' } : grievance
//         ));
//         setFilteredGrievances(prev => prev.map(grievance =>
//             grievance.grievanceId === grievanceId ? { ...grievance, status: 'Rejected' } : grievance
//         ));
//     } catch (error) {
//         console.error('Error rejecting grievance:', error);
//     }
// };

    

//     return (
//         <Flex height="100vh">
//             {/* Sidebar */}
//             <Box
//                 w={{ base: '100%', md: '20%' }}
//                 bg={colorMode === 'light' ? 'gray.200' : 'gray.900'}
//                 color={colorMode === 'light' ? 'black' : 'white'}
//                 p={5}
//                 position="relative"
//             >
//                 <VStack align="start" spacing={4}>
//                     <Avatar name="Admin" size="xl" />
//                     <Text fontSize="xl" fontWeight="bold">Admin</Text>
//                     <Button leftIcon={<EditIcon />} w="full" onClick={() => navigate('/admin/profile')}>Edit Profile</Button>
//                     <Button leftIcon={<LockIcon />} w="full" onClick={() => navigate('/admin/reset-password')}>Reset Password</Button>
//                     <Button leftIcon={<AddIcon />} w="full" onClick={handleManageDepartments}>Manage Departments</Button>
//                     <Button leftIcon={<FiLogOut />} w="full" onClick={handleSignOut}>Sign Out</Button>
//                     <IconButton
//                         aria-label="Toggle Theme"
//                         icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
//                         onClick={toggleColorMode}
//                         position="absolute"
//                         bottom="10"
//                         right="5"
//                     />
//                 </VStack>
//             </Box>

//             {/* Main Content */}
//             <Box flex="1" p={8} bg={colorMode === 'light' ? 'white' : 'gray.800'} color={colorMode === 'light' ? 'black' : 'white'}>
//                 <HStack justify="space-between" mb={8}>
//                     <Heading>Admin Dashboard</Heading>
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

//                 {/* Graph Section */}
//                 <Stack spacing={4} mb={8}>
//                     <Select value={chartType} onChange={(e) => setChartType(e.target.value)} w="30%">
//                         <option value="line">Line Chart</option>
//                         <option value="bar">Bar Chart</option>
//                         <option value="pie">Pie Chart</option>
//                     </Select>

//                     <Box h="400px">
//                         {renderChart()}
//                     </Box>
//                 </Stack>

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
//                                     <Th>Title</Th>
//                                     <Th>Doc</Th>
//                                     <Th>Status</Th>
//                                     <Th>Date</Th>
//                                     <Th>Actions</Th>
//                                 </Tr>
//                             </Thead>
//                             <Tbody>
//                                 {currentGrievances.map(grievance => (
//                                     <Tr key={grievance.grievanceId}>
//                                         <Td>{grievance.grievanceId}</Td>
//                                         <Td>{grievance.description}</Td>
//                                         {/* <Td>{grievance.attachment}</Td> */}
                                        // <Td>
                                        //     {grievance.attachment ? (
                                        //         <img
                                        //             src={`data:image/jpeg;base64,${grievance.attachment}`}
                                        //             alt="Attachment"
                                        //             style={{ height: '60px', objectFit: 'cover' }}
                                        //         />
                                        //     ) : (
                                        //         'No Image'
                                        //     )}
                                        // </Td>

//                                         <Td>{grievance.status }</Td>
//                                         <Td>{new Date(grievance.createdAt).toLocaleDateString()}</Td>
//                                         <Td>
//                                             <Button size="sm" colorScheme="green" onClick={() => handleApproveGrievance(grievance.grievanceId)}>Approve</Button>
//                                             <Button size="sm" colorScheme="red" onClick={() => handleRejectGrievance(grievance.grievanceId)}>Reject</Button>
//                                             <Button size="sm" colorScheme="blue" onClick={() => handleOpenModal(grievance)}>Details</Button>
//                                         </Td>
//                                     </Tr>
//                                 ))}
//                             </Tbody>
//                         </Table>
//                     </Box>

//                     {/* Pagination Controls */}
//                     <Flex justify="center" mt={4}>
//                         <ButtonGroup spacing={4}>
//                             <Button
//                                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                                 isDisabled={currentPage === 1}
//                             >
//                                 Previous
//                             </Button>
//                             <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
//                             <Button
//                                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                                 isDisabled={currentPage === totalPages}
//                             >
//                                 Next
//                             </Button>
//                         </ButtonGroup>
//                     </Flex>
//                 </Stack>

//                 {/* Modal for Grievance Details */}
//                 {/* (Assuming you have a modal component for detailed view) */}
//                 {isModalOpen && selectedGrievance && (
//                     <Box position="fixed" top="20%" left="20%" width="60%" bg="white" p={4} boxShadow="lg" rounded="md">
//                         <Heading size="md" mb={4}>Grievance Details</Heading>
//                         <Text><strong>Department:</strong> {selectedGrievance.department.departmentName}</Text>
//                         <Text><strong>Category:</strong> {selectedGrievance.category.categoryName}</Text>
//                         <Text><strong>Problem:</strong> {selectedGrievance.branchName}</Text>
//                         <Text><strong>Title:</strong> {selectedGrievance.description}</Text>
//                         <Text><strong>Status:</strong> {selectedGrievance.status}</Text>
//                         <Text><strong>Date:</strong> {new Date(selectedGrievance.grievanceDate).toLocaleDateString()}</Text>
//                         <Button mt={4} onClick={() => setIsModalOpen(false)}>Close</Button>
//                     </Box>
//                 )}
//             </Box>
//         </Flex>
//     );
// };

// export default AdminDashboard;


import React, { useState } from 'react';
import { Box, Flex, VStack, Button, Text, Avatar, useColorMode, useToast, Divider } from '@chakra-ui/react';
import { EditIcon, LockIcon, TimeIcon, RepeatIcon, AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import DepartmentManagement from './DepartmentManagement';
import GrievanceData from './GrievanceData';
import AllGrievances from './AllGrievances';



const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('grievances'); // Default section
    const { colorMode, toggleColorMode } = useColorMode();
    const toast = useToast(); // Chakra's toast for notifications
    const navigate = useNavigate();
    const adminName = sessionStorage.getItem('name') || 'Admin'; // Admin's name or default

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
            {/* <AdminNavbar /> */}
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
                            <Avatar name={adminName} size="md" />
                            <Text fontSize="xl" fontWeight="bold" ml={4}>{adminName}</Text>
                        </Flex>
                        <Button leftIcon={<EditIcon />} onClick={() => handleSectionChange('grievances')} w="full" colorScheme="teal" variant="outline">
                            Grievance
                        </Button>
                        <Button leftIcon={<AddIcon />} onClick={() => handleSectionChange('allgrievances')} w="full" colorScheme="teal" variant="outline">
                           All Grievances
                        </Button>
                        <Button leftIcon={<AddIcon />} onClick={() => handleSectionChange('departments')} w="full" colorScheme="teal" variant="outline">
                            Manage Departments
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
                    {activeSection === 'grievances' && <GrievanceData />} 
                    {activeSection === 'departments' && <DepartmentManagement />}
                    {activeSection === 'allgrievances' && <AllGrievances />}

                    {/*
                    {activeSection === 'profile' && <ProfileEdit />}
                    {activeSection === 'password' && <PasswordReset />}
                    {activeSection === 'confirmation' && <Confirmation />} */}
                </Box>
            </Flex>
        </>
    );
};

export default AdminDashboard;
