

// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //     Box,
// // //     Flex,
// // //     Text,
// // //     Heading,
// // //     Button,
// // //     Select,
// // //     useColorMode,
// // //     Spinner,
// // //     useToast,
// // //     Icon
// // // } from '@chakra-ui/react';
// // // import axios from 'axios';
// // // import { Line, Bar, Pie } from 'react-chartjs-2';
// // // import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
// // // import { FiBarChart2, FiPieChart, FiLineChart } from 'react-icons/fi';

// // // // Register ChartJS components
// // // ChartJS.register(
// // //     CategoryScale,
// // //     LinearScale,
// // //     BarElement,
// // //     PointElement,
// // //     LineElement,
// // //     ArcElement,
// // //     Title,
// // //     Tooltip,
// // //     Legend
// // // );

// // // const GrievanceData = ({ selectedGrievance }) => {
// // //     const [chartType, setChartType] = useState('line');
// // //     const [chartData, setChartData] = useState(null);
// // //     const [statistics, setStatistics] = useState(null);
// // //     const [departmentStats, setDepartmentStats] = useState(null);
// // //     const { colorMode } = useColorMode();
// // //     const toast = useToast();

// // //     useEffect(() => {
// // //         const fetchData = async () => {
// // //             try {
// // //                 // Fetch overall grievance statistics
// // //                 const statsResponse = await axios.get('http://localhost:8006/grievances/grievanceStatistics');
// // //                 setStatistics(statsResponse.data);

// // //                 // Fetch grievance count by department
// // //                 const departmentResponse = await axios.get('http://localhost:8006/grievances/grievanceCountByDepartment');
// // //                 setDepartmentStats(departmentResponse.data);

// // //                 // Example data for the chart
// // //                 const data = {
// // //                     labels: ['Pending', 'Closed', 'Resolved'],
// // //                     datasets: [{
// // //                         label: 'Grievances',
// // //                         data: [
// // //                             statsResponse.data.pending,
// // //                             statsResponse.data.closed,
// // //                             statsResponse.data.resolved
// // //                         ],
// // //                         backgroundColor: [
// // //                             'rgba(255, 99, 132, 0.6)',
// // //                             'rgba(54, 162, 235, 0.6)',
// // //                             'rgba(255, 206, 86, 0.6)'
// // //                         ],
// // //                         borderColor: [
// // //                             'rgba(255, 99, 132, 1)',
// // //                             'rgba(54, 162, 235, 1)',
// // //                             'rgba(255, 206, 86, 1)'
// // //                         ],
// // //                         borderWidth: 1
// // //                     }]
// // //                 };
// // //                 setChartData(data);
// // //             } catch (error) {
// // //                 toast({
// // //                     title: "Error fetching data.",
// // //                     description: "Unable to fetch grievance statistics.",
// // //                     status: "error",
// // //                     duration: 5000,
// // //                     isClosable: true,
// // //                 });
// // //             }
// // //         };

// // //         fetchData();
// // //     }, [toast]);

// // //     const chartOptions = {
// // //         maintainAspectRatio: false,
// // //         scales: {
// // //             x: {
// // //                 type: 'category',
// // //             },
// // //             y: {
// // //                 beginAtZero: true,
// // //             },
// // //         },
// // //     };

// // //     const renderChart = () => {
// // //         switch (chartType) {
// // //             case 'bar':
// // //                 return <Bar data={chartData} options={chartOptions} />;
// // //             case 'pie':
// // //                 return <Pie data={chartData} options={chartOptions} />;
// // //             case 'line':
// // //             default:
// // //                 return <Line data={chartData} options={chartOptions} />;
// // //         }
// // //     };

// // //     return (
// // //         <Flex direction="column" p={4} bg={colorMode === 'light' ? 'white' : 'gray.800'} color={colorMode === 'light' ? 'black' : 'white'}>
// // //             <Heading size="lg" mb={4}>Grievance Details</Heading>
// //             // <Box mb={4}>
// //             //     <Text><strong>Total Grievances:</strong> {statistics?.total}</Text>
// //             //     <Text><strong>Pending:</strong> {statistics?.pending}</Text>
// //             //     <Text><strong>Closed:</strong> {statistics?.closed}</Text>
// //             //     <Text><strong>Resolved:</strong> {statistics?.resolved}</Text>
// //             // </Box>

// // //             <Select value={chartType} width="200px" onChange={(e) => setChartType(e.target.value)} mb={4}>
// // //                 <option value="line">Line Chart</option>
// // //                 <option value="bar">Bar Chart</option>
// // //                 <option value="pie">Pie Chart</option>
// // //             </Select>

// // //             <Box h="400px" mb={4}>
// // //                 {chartData ? renderChart() : <Spinner size="lg" />}
// // //             </Box>
            
// // //         </Flex>
// // //     );
// // // };

// // // export default GrievanceData;

// // import React, { useState, useEffect } from 'react';
// // import {
// //     Box,
// //     Flex,
// //     Text,
// //     Heading,
// //     Button,
// //     Select,
// //     useColorMode,
// //     Spinner,
// //     useToast,
// //     Icon
// // } from '@chakra-ui/react';
// // import axios from 'axios';
// // import { Line, Bar, Pie } from 'react-chartjs-2';
// // import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
// // import { FiBarChart2, FiPieChart, FiLineChart } from 'react-icons/fi';

// // // Register ChartJS components
// // ChartJS.register(
// //     CategoryScale,
// //     LinearScale,
// //     BarElement,
// //     PointElement,
// //     LineElement,
// //     ArcElement,
// //     Title,
// //     Tooltip,
// //     Legend
// // );

// // const GrievanceData = ({ selectedGrievance }) => {
// //     const [chartType, setChartType] = useState('line');
// //     const [chartData, setChartData] = useState(null);
// //     const [statistics, setStatistics] = useState(null);
// //     const { colorMode } = useColorMode();
// //     const toast = useToast();

// //     useEffect(() => {
// //         const fetchData = async () => {
// //             try {
// //                 // Fetch all grievances
// //                 const grievancesResponse = await axios.get('http://localhost:8006/grievances/findAll');
// //                 const grievances = grievancesResponse.data;

// //                 // Group grievances by creation date
// //                 const groupedByDate = grievances.reduce((acc, grievance) => {
// //                     const creationDate = new Date(grievance.createdAt).toLocaleDateString();
// //                     if (!acc[creationDate]) {
// //                         acc[creationDate] = { pending: 0, closed: 0, resolved: 0 };
// //                     }
// //                     acc[creationDate][grievance.status.toLowerCase()]++;
// //                     return acc;
// //                 }, {});

// //                 // Prepare the data for the chart
// //                 const labels = Object.keys(groupedByDate); // Dates
// //                 const pendingData = labels.map(date => groupedByDate[date].pending);
// //                 const closedData = labels.map(date => groupedByDate[date].closed);
// //                 const resolvedData = labels.map(date => groupedByDate[date].resolved);

// //                 const data = {
// //                     labels: labels,
// //                     datasets: [
// //                         {
// //                             label: 'Pending',
// //                             data: pendingData,
// //                             backgroundColor: 'rgba(255, 99, 132, 0.6)',
// //                             borderColor: 'rgba(255, 99, 132, 1)',
// //                             borderWidth: 1,
// //                         },
// //                         {
// //                             label: 'Closed',
// //                             data: closedData,
// //                             backgroundColor: 'rgba(54, 162, 235, 0.6)',
// //                             borderColor: 'rgba(54, 162, 235, 1)',
// //                             borderWidth: 1,
// //                         },
// //                         {
// //                             label: 'Resolved',
// //                             data: resolvedData,
// //                             backgroundColor: 'rgba(255, 206, 86, 0.6)',
// //                             borderColor: 'rgba(255, 206, 86, 1)',
// //                             borderWidth: 1,
// //                         }
// //                     ]
// //                 };

// //                 setChartData(data);
// //             } catch (error) {
// //                 toast({
// //                     title: "Error fetching data.",
// //                     description: "Unable to fetch grievance statistics.",
// //                     status: "error",
// //                     duration: 5000,
// //                     isClosable: true,
// //                 });
// //             }
// //         };

// //         fetchData();
// //     }, [toast]);

// //     const chartOptions = {
// //         maintainAspectRatio: false,
// //         scales: {
// //             x: {
// //                 type: 'category',
// //             },
// //             y: {
// //                 beginAtZero: true,
// //             },
// //         },
// //     };

// //     const renderChart = () => {
// //         switch (chartType) {
// //             case 'bar':
// //                 return <Bar data={chartData} options={chartOptions} />;
// //             case 'pie':
// //                 return <Pie data={chartData} options={chartOptions} />;
// //             case 'line':
// //             default:
// //                 return <Line data={chartData} options={chartOptions} />;
// //         }
// //     };

// //     return (
// //         <Flex direction="column" p={4} bg={colorMode === 'light' ? 'white' : 'gray.800'} color={colorMode === 'light' ? 'black' : 'white'}>
// //             <Heading size="lg" mb={4}>Grievance Details</Heading>

// //             <Select value={chartType} width="200px" onChange={(e) => setChartType(e.target.value)} mb={4}>
// //                 <option value="line">Line Chart</option>
// //                 <option value="bar">Bar Chart</option>
// //                 {/* <option value="pie">Pie Chart</option> */}
// //             </Select>

// //             <Box h="400px" mb={4}>
// //                 {chartData ? renderChart() : <Spinner size="lg" />}
// //             </Box>
// //         </Flex>
// //     );
// // };

// // export default GrievanceData;

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

// const GrievanceData = ({ selectedGrievance }) => {
//     const [chartType, setChartType] = useState('line');
//     const [chartData, setChartData] = useState(null);
//     const [statusCounts, setStatusCounts] = useState({ pending: 0, closed: 0, resolved: 0 });
//     const { colorMode } = useColorMode();
//     const toast = useToast();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Fetch all grievances
//                 const grievancesResponse = await axios.get('http://localhost:8006/grievances/findAll');
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
//     }, [toast]);

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
//             <Heading size="lg" mb={4}>Grievance Details</Heading>

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

// export default GrievanceData;


import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    Heading,
    Select,
    Spinner,
    useColorMode,
    useToast,
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

const GrievanceData = () => {
    const [chartType, setChartType] = useState('line');
    const [chartData, setChartData] = useState(null);
    const [statusCounts, setStatusCounts] = useState({
        pending: 0,
        closed: 0,
        resolved: 0,
        rejected: 0,
        total: 0,
    });
    const { colorMode } = useColorMode();
    const toast = useToast();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const departmentId = sessionStorage.getItem('id'); // Get department ID from sessionStorage
                const response = await axios.get(`http://localhost:8006/grievances/findAll`);

                if (response.status === 200) {
                    const grievances = response.data;

                    // Group grievances by creation date and count statuses
                    const groupedByDate = grievances.reduce((acc, grievance) => {
                        const creationDate = new Date(grievance.createdAt).toLocaleDateString();
                        if (!acc[creationDate]) {
                            acc[creationDate] = { pending: 0, closed: 0, resolved: 0, approved:0 };
                        }
                        acc[creationDate][grievance.status.toLowerCase()]++;
                        return acc;
                    }, {});

                    // Count total grievances by status
                    const totalStatusCounts = grievances.reduce(
                        (acc, grievance) => {
                            acc[grievance.status.toLowerCase()]++;
                            acc.total++;
                            return acc;
                        },
                        { pending: 0, closed: 0, resolved: 0, rejected: 0, total: 0 }
                    );

                    // Prepare the data for the chart
                    const labels = Object.keys(groupedByDate); // Dates
                    const pendingData = labels.map(date => groupedByDate[date].pending);
                    const approveddData = labels.map(date => groupedByDate[date].approved);
                    const closedData = labels.map(date => groupedByDate[date].closed);
                    const resolvedData = labels.map(date => groupedByDate[date].resolved);

                    const data = {
                        labels: labels,
                        datasets: [
                            
                            {
                                label: 'approved',
                                data: approveddData,
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
                            },
                        ],
                    };

                    setChartData(data);
                    setStatusCounts(totalStatusCounts);
                } else {
                    throw new Error("Failed to fetch data");
                }
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
    }, [toast]);

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
            <Heading size="lg" mb={4}>Grievance Details</Heading>

            {/* Cards for displaying grievance counts */}
            <Flex justify="space-between" mb={6}>
                <Box textAlign="center" p={4} bg="blue.100" rounded="md" w="20%">
                    <Text color={'black'} fontSize="xl" fontWeight="bold">{statusCounts.total}</Text>
                    <Text color={'black'}>Total Grievances</Text>
                </Box>
                <Box textAlign="center" p={4} bg="yellow.100" rounded="md" w="20%">
                    <Text color={'black'} fontSize="xl" fontWeight="bold">{(statusCounts.total)-(statusCounts.resolved+statusCounts.closed+statusCounts.rejected)}</Text>
                    <Text color={'black'}>Pending Grievances</Text>
                </Box>
                <Box textAlign="center" p={4} bg="purple.100" rounded="md" w="20%">
                    <Text color={'black'} fontSize="xl" fontWeight="bold">{statusCounts.resolved}</Text>
                    <Text color={'black'}>Resolved Grievances</Text>
                </Box>
                <Box textAlign="center" p={4} bg="green.100" rounded="md" w="20%">
                    <Text color={'black'} fontSize="xl" fontWeight="bold">{statusCounts.closed}</Text>
                    <Text color={'black'}>Closed Grievances</Text>
                </Box>
                <Box textAlign="center" p={4} bg="red.100" rounded="md" w="20%">
                    <Text color={'black'} fontSize="xl" fontWeight="bold">{statusCounts.rejected}</Text>
                    <Text color={'black'}>Rejected Grievances</Text>
                </Box>
            </Flex>

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

export default GrievanceData;
