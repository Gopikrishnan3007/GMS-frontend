

import React, { useState, useEffect } from 'react';
import {
    Box, Flex, Text, ButtonGroup, Table, Thead, Tbody, Tr, Th, Td, Input, Select, Stack, Button, useToast, Spinner
} from '@chakra-ui/react';
import { TimeIcon, CheckIcon, ArrowUpDownIcon, StarIcon, ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import axios from 'axios';
import dayjs from 'dayjs';

const formatDate = (dateString) => dayjs(dateString).format('YYYY-MM-DD');

const UserGrievance = () => {
    const [filter, setFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [grievances, setGrievances] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [filteredGrievances, setFilteredGrievances] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('desc');
    const toast = useToast();
    const userId = sessionStorage.getItem("id");

    useEffect(() => {
        // Fetch grievances for the specific user and sort by grievanceId in descending order
        const fetchGrievances = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8006/grievances/user/${userId}`);
                const sortedGrievances = response.data.sort((a, b) => b.grievanceId - a.grievanceId); // Sorting by grievanceId
                setGrievances(sortedGrievances);
                setFilteredGrievances(sortedGrievances);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching grievances:', error);
                setLoading(false);
               
            }
        };
        fetchGrievances();
    }, [userId, toast]);

    // Sorting grievances by date or by grievanceId
    const sortGrievances = () => {
        const sorted = [...filteredGrievances].sort((a, b) => {
            const dateA = new Date(a.grievanceDate);
            const dateB = new Date(b.grievanceDate);
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setFilteredGrievances(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    // Filter grievances based on the filter text and status
    useEffect(() => {
        let filtered = grievances;

        if (statusFilter !== 'all') {
            filtered = filtered.filter(grievance => grievance.status === statusFilter);
        }

        if (filter) {
            filtered = filtered.filter(grievance =>
                grievance.description.toLowerCase().includes(filter.toLowerCase()) ||
                grievance.branchName.toLowerCase().includes(filter.toLowerCase())
            );
        }

        setFilteredGrievances(filtered);
        setCurrentPage(1); // Reset to the first page when filter changes
    }, [filter, statusFilter, grievances]);

    // Pagination logic
    const totalPages = Math.ceil(filteredGrievances.length / itemsPerPage);
    const currentGrievances = filteredGrievances.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalGrievances = grievances.length;
   
    const closedGrievances = grievances.filter(grievance => grievance.status === 'Closed').length;
    const resolvedGrievances = grievances.filter(grievance => grievance.status === 'Resolved').length;
    const rejectedGrievances = grievances.filter(grievance => grievance.status === 'Rejected').length;
    const pendingGrievances = totalGrievances- (closedGrievances + resolvedGrievances + rejectedGrievances);

    return (
        <>
            <Flex justify="space-between" mb={6}>
                <Box textAlign="center" p={4} bg="blue.100" rounded="md" w="20%">
                    <Text color={'black'} fontSize="xl" fontWeight="bold">{totalGrievances}</Text>
                    <Text color={'black'}>Total Grievances</Text>
                </Box>
                <Box textAlign="center" p={4} bg="yellow.100" rounded="md" w="20%">
                    <Text color={'black'} fontSize="xl" fontWeight="bold">{pendingGrievances}</Text>
                    <Text color={'black'}>Pending Grievances</Text>
                </Box>
                <Box textAlign="center" p={4} bg="purple.100" rounded="md" w="20%">
                    <Text color={'black'} fontSize="xl" fontWeight="bold">{resolvedGrievances}</Text>
                    <Text color={'black'}>Resolved Grievances</Text>
                </Box>
                <Box textAlign="center" p={4} bg="green.100" rounded="md" w="20%">
                    <Text color={'black'} fontSize="xl" fontWeight="bold">{closedGrievances}</Text>
                    <Text color={'black'}>Closed Grievances</Text>
                </Box>
                <Box textAlign="center" p={4} bg="red.100" rounded="md" w="20%">
                    <Text color={'black'} fontSize="xl" fontWeight="bold">{rejectedGrievances}</Text>
                    <Text color={'black'}>Rejected Grievances</Text>
                </Box>
            </Flex>

            <Stack spacing={4}>
                <Flex justify="space-between" mb={4}>
                    <Input
                        placeholder="Search Grievances"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        w="40%"
                    />
                    <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} w="30%">
                        <option value="all">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Closed">Closed</option>
                        <option value="Resolved">Resolved</option>
                    </Select>
                </Flex>

                {loading ? (
                    <Flex justify="center">
                        <Spinner size="xl" />
                    </Flex>
                ) : (
                    <>
                        <Box overflowX="auto">
                            <Table variant="simple" size="md">
                                <Thead>
                                    <Tr>
                                        <Th>Branch Name</Th>
                                        <Th>Status</Th>
                                        <Th onClick={sortGrievances} cursor="pointer">
                                            Date <ArrowUpDownIcon />
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {currentGrievances.map(grievance => (
                                        <Tr key={grievance.grievanceId}>
                                            <Td>{grievance.branchName}</Td>
                                            <Td>
                                                {
                                                    grievance.status === 'Closed' ? (
                                                        <CheckIcon color=" green.400" />
                                                    ) : grievance.status === 'Resolved' ? (
                                                        <StarIcon color="purple.400" />  
                                                ) : (
                                                < TimeIcon color="orange.400" />
                                                )}
                                            </Td>
                                            <Td>{formatDate(grievance.grievanceDate)}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>

                        <Flex justify="center" mt={4}>
                            <ButtonGroup spacing={4}>
                                <Button
                                    leftIcon={<ArrowBackIcon />}
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    isDisabled={currentPage === 1}
                                >
                                    Previous
                                </Button>
                                <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
                                <Button
                                    rightIcon={<ArrowForwardIcon />}
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    isDisabled={currentPage === totalPages}
                                >
                                    Next
                                </Button>
                            </ButtonGroup>
                        </Flex>
                        
                         <Flex
                position="fixed"
                bottom="16px"
                right="16px"
                direction="column"
                align="flex-end"
                bg="gray.50"
                p={4}
                boxShadow="lg"
                borderRadius="lg"
            >
                <Flex align="center" mb={2}>
                    <Text color="black" fontWeight="bold" mr={2}>Pending</Text>
                    <TimeIcon color="orange.400" boxSize={6} />
                </Flex>
                <Flex align="center" mb={2}>
                    <Text color="black" fontWeight="bold" mr={2}>Resolved</Text>
                    <StarIcon color="purple.400" boxSize={6} />
                </Flex>
                <Flex align="center">
                    <Text color="black" fontWeight="bold" mr={2}>Closed</Text>
                    <CheckIcon color="green.400" boxSize={6} />
                </Flex>
            </Flex>
                                            
                    </>
                )}
            </Stack>
        </>
    );
};

export default UserGrievance;
