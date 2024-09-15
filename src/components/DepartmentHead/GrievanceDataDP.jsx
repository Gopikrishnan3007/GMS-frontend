// import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     Flex,
//     Text,
//     Heading,
//     Select,
//     useColorMode,
//     Spinner,
//     useToast
// } from '@chakra-ui/react';
// import axios from 'axios';
// import { Line, Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

// // Register ChartJS components
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend
// );

// const GrievanceDataDP = ({ selectedGrievance }) => {
//     const [chartType, setChartType] = useState('line');
//     const [chartData, setChartData] = useState(null);
//     const [statusCounts, setStatusCounts] = useState({ pending: 0, closed: 0, resolved: 0 });
//     const { colorMode } = useColorMode();
//     const toast = useToast();

//     // Retrieve department ID from session storage
//     const departmentId = sessionStorage.getItem('id');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch grievances based on department ID
//                 const grievancesResponse = await axios.get(`http://localhost:8006/grievances/department/${departmentId}`);
//                 const grievances = grievancesResponse.data;

//                 // Group grievances by creation date and count statuses
//                 const groupedByDate = grievances.reduce((acc, grievance) => {
//                     const creationDate = new Date(grievance.createdAt).toLocaleDateString();
//                     if (!acc[creationDate]) {
//                         acc[creationDate] = { pending: 0, closed: 0, resolved: 0 };
//                     }
//                     acc[creationDate][grievance.status.toLowerCase()]++;
//                     return acc;
//                 }, {});

//                 // Count total grievances by status
//                 const totalStatusCounts = grievances.reduce((acc, grievance) => {
//                     acc[grievance.status.toLowerCase()]++;
//                     return acc;
//                 }, { pending: 0, closed: 0, resolved: 0 });

//                 // Prepare the data for the chart
//                 const labels = Object.keys(groupedByDate); // Dates
//                 const pendingData = labels.map(date => groupedByDate[date].pending);
//                 const closedData = labels.map(date => groupedByDate[date].closed);
//                 const resolvedData = labels.map(date => groupedByDate[date].resolved);

//                 const data = {
//                     labels: labels,
//                     datasets: [
//                         {
//                             label: 'Pending',
//                             data: pendingData,
//                             backgroundColor: 'rgba(255, 99, 132, 0.6)',
//                             borderColor: 'rgba(255, 99, 132, 1)',
//                             borderWidth: 1,
//                         },
//                         {
//                             label: 'Closed',
//                             data: closedData,
//                             backgroundColor: 'rgba(54, 162, 235, 0.6)',
//                             borderColor: 'rgba(54, 162, 235, 1)',
//                             borderWidth: 1,
//                         },
//                         {
//                             label: 'Resolved',
//                             data: resolvedData,
//                             backgroundColor: 'rgba(255, 206, 86, 0.6)',
//                             borderColor: 'rgba(255, 206, 86, 1)',
//                             borderWidth: 1,
//                         }
//                     ]
//                 };

//                 setChartData(data);
//                 setStatusCounts(totalStatusCounts); // Set the total counts
//             } catch (error) {
//                 toast({
//                     title: "Error fetching data.",
//                     description: "Unable to fetch grievance statistics.",
//                     status: "error",
//                     duration: 5000,
//                     isClosable: true,
//                 });
//             }
//         };

//         fetchData();
//     }, [departmentId, toast]);

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
//             case 'line':
//             default:
//                 return <Line data={chartData} options={chartOptions} />;
//         }
//     };

//     return (
//         <Flex direction="column" p={4} bg={colorMode === 'light' ? 'white' : 'gray.800'} color={colorMode === 'light' ? 'black' : 'white'}>
//             <Heading size="lg" mb={4}>Grievance Details for Your Department</Heading>

//             {/* Display total counts of each grievance status */}
//             <Box mb={4}>
//                 <Text><strong>Total Pending:</strong> {statusCounts.pending}</Text>
//                 <Text><strong>Total Closed:</strong> {statusCounts.closed}</Text>
//                 <Text><strong>Total Resolved:</strong> {statusCounts.resolved}</Text>
//             </Box>

//             <Select value={chartType} width="200px" onChange={(e) => setChartType(e.target.value)} mb={4}>
//                 <option value="line">Line Chart</option>
//                 <option value="bar">Bar Chart</option>
//             </Select>

//             <Box h="400px" mb={4}>
//                 {chartData ? renderChart() : <Spinner size="lg" />}
//             </Box>
//         </Flex>
//     );
// };

// export default GrievanceDataDP;

import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    Heading,
    Select,
    useColorMode,
    Spinner,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const GrievanceDataDP = ({ selectedGrievance }) => {
    const [chartType, setChartType] = useState('line');
    const [chartData, setChartData] = useState(null);
    const [statusCounts, setStatusCounts] = useState({ pending: 0, closed: 0, resolved: 0, total: 0 , rejected:0 });
    const { colorMode } = useColorMode();
    const toast = useToast();

    // Retrieve department ID from session storage
    const departmentId = sessionStorage.getItem('id');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch grievances based on department ID
                const grievancesResponse = await axios.get(`http://localhost:8006/grievances/department/${departmentId}`);
                const grievances = grievancesResponse.data;

                // Group grievances by creation date and count statuses
                const groupedByDate = grievances.reduce((acc, grievance) => {
                    const creationDate = new Date(grievance.createdAt).toLocaleDateString();
                    if (!acc[creationDate]) {
                        acc[creationDate] = { pending: 0, closed: 0, resolved: 0, approved :0 };
                    }
                    acc[creationDate][grievance.status.toLowerCase()]++;
                    return acc;
                }, {});

                // Count total grievances by status
                const totalStatusCounts = grievances.reduce((acc, grievance) => {
                    acc[grievance.status.toLowerCase()]++;
                    acc.total++;
                    return acc;
                }, { pending: 0, closed: 0, resolved: 0, total: 0, rejected :0});

                // Prepare the data for the chart
                const labels = Object.keys(groupedByDate); // Dates
                const pendingData = labels.map(date => groupedByDate[date].pending);
                const closedData = labels.map(date => groupedByDate[date].closed);
                const resolvedData = labels.map(date => groupedByDate[date].resolved);
                const approvedData = labels.map(date => groupedByDate[date].approved);


                const data = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Approved',
                            data: approvedData,
                            backgroundColor: 'rgba(0, 99, 132, 0.6)',
                            borderColor: 'rgba(0, 99, 132, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Pending',
                            data: pendingData,
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Closed',
                            data: closedData,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1,
                        },
                        {
                            label: 'Resolved',
                            data: resolvedData,
                            backgroundColor: 'rgba(255, 206, 86, 0.6)',
                            borderColor: 'rgba(255, 206, 86, 1)',
                            borderWidth: 1,
                        }
                    ]
                };

                setChartData(data);
                setStatusCounts(totalStatusCounts); // Set the total counts
            } catch (error) {
                toast({
                    title: "Error fetching data.",
                    description: "Unable to fetch grievance statistics.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchData();
    }, [departmentId, toast]);

    const chartOptions = {
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'category',
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return <Bar data={chartData} options={chartOptions} />;
            case 'line':
            default:
                return <Line data={chartData} options={chartOptions} />;
        }
    };

    return (
        <Flex direction="column" p={4} bg={colorMode === 'light' ? 'white' : 'gray.800'} color={colorMode === 'light' ? 'black' : 'white'}>
            <Heading size="lg" mb={4}>Grievance Details for Your Department</Heading>

            {/* Grievance status cards */}
            <Flex justify="space-between" mb={6}>
                <Box textAlign="center" p={4} bg="blue.100" rounded="md" w="20%">
                    <Text color="black" fontSize="xl" fontWeight="bold">{statusCounts.total}</Text>
                    <Text color="black">Total Grievances</Text>
                </Box>
                <Box textAlign="center" p={4} bg="yellow.100" rounded="md" w="20%">
                    <Text color="black" fontSize="xl" fontWeight="bold">{(statusCounts.total)-(statusCounts.resolved + statusCounts.closed + statusCounts.rejected)}</Text>
                    <Text color="black">Pending Grievances</Text>
                </Box>
                <Box textAlign="center" p={4} bg="purple.100" rounded="md" w="20%">
                    <Text color="black" fontSize="xl" fontWeight="bold">{statusCounts.resolved}</Text>
                    <Text color="black">Resolved Grievances</Text>
                </Box>
                <Box textAlign="center" p={4} bg="green.100" rounded="md" w="20%">
                    <Text color="black" fontSize="xl" fontWeight="bold">{statusCounts.closed}</Text>
                    <Text color="black">Closed Grievances</Text>
                </Box>
                <Box textAlign="center" p={4} bg="red.100" rounded="md" w="20%">
                    <Text color="black" fontSize="xl" fontWeight="bold">{statusCounts.rejected}</Text>
                    <Text color="black">Rejected Grievances</Text>
                </Box>
            </Flex>

            {/* Chart selection and display */}
            <Select value={chartType} width="200px" onChange={(e) => setChartType(e.target.value)} mb={4}>
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
            </Select>

            <Box h="400px" mb={4}>
                {chartData ? renderChart() : <Spinner size="lg" />}
            </Box>
        </Flex>
    );
};

export default GrievanceDataDP;
