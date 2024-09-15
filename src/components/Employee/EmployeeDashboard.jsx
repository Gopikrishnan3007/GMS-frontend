


// // import React, { useState, useEffect } from 'react';
// // import {
// //   Box, Flex, Text, Avatar, Button, VStack, Heading, Stack, IconButton, HStack, useColorMode, Modal,
// //   ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Image, useDisclosure
// // } from '@chakra-ui/react';
// // import { FiLogOut } from 'react-icons/fi';
// // import { SunIcon, MoonIcon } from '@chakra-ui/icons';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const EmployeeDashboard = () => {
// //   const [grievances, setGrievances] = useState([]);
// //   const [selectedImage, setSelectedImage] = useState(null);
// //   const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI modal hooks
// //   const navigate = useNavigate();
// //   const { colorMode, toggleColorMode } = useColorMode();

// //   useEffect(() => {
// //     const fetchEmployeeGrievances = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:8006/grievances/employee/1', {
// //           headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
// //         });
// //         // Filter to show only grievances with status 'Approved'
// //         const approvedGrievances = response.data.filter(grievance => grievance.status === 'Approved');
// //         setGrievances(approvedGrievances);
// //       } catch (error) {
// //         console.error('Error fetching grievances:', error);
// //       }
// //     };

// //     fetchEmployeeGrievances();
// //   }, []);

// //   const handleSignOut = () => {
// //     sessionStorage.clear();
// //     navigate('/login');
// //   };

// //   const handleImageClick = (image) => {
// //     setSelectedImage(image); // Set the clicked image
// //     onOpen(); // Open the modal
// //   };

// //   return (
// //     <Flex height="100vh">
// //       {/* Sidebar */}
// //       <Box w={{ base: '100%', md: '20%' }} bg={colorMode === 'light' ? 'gray.200' : 'gray.900'} color={colorMode === 'light' ? 'black' : 'white'} p={5}>
// //         <VStack align="start" spacing={4}>
// //           <Avatar name="Employee" size="xl" />
// //           <Text fontSize="xl" fontWeight="bold">Employee</Text>
// //           <Button leftIcon={<FiLogOut />} w="full" onClick={handleSignOut}>Sign Out</Button>
// //           <IconButton
// //             aria-label="Toggle Theme"
// //             icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
// //             onClick={toggleColorMode}
// //           />
// //         </VStack>
// //       </Box>

// //       {/* Main Content */}
// //       <Box flex="1" p={8} bg={colorMode === 'light' ? 'white' : 'gray.800'} color={colorMode === 'light' ? 'black' : 'white'}>
// //         <HStack justify="space-between" mb={8}>
// //           <Heading>Approved Grievances</Heading>
// //         </HStack>

// //         {/* Grievances as Cards */}
// //         <Stack spacing={4}>
// //           {grievances.length === 0 ? (
// //             <Text>No approved grievances found.</Text>
// //           ) : (
// //             grievances.map(grievance => (
// //               <Box key={grievance.grievanceId} p={4} borderWidth="1px" borderRadius="md" boxShadow="md" bg="blue.100">
// //                 <Text fontWeight="bold">Grievance: {grievance.branchName}</Text>
// //                 <Text>Description: {grievance.description}</Text>
// //                 <Text>Status: {grievance.status}</Text>
// //                 <Text>Date: {new Date(grievance.createdAt).toLocaleDateString()}</Text>
// //                 <Text>
// //                   {grievance.attachment ? (
// //                     <img
// //                       src={`data:image/jpeg;base64,${grievance.attachment}`}
// //                       alt="Attachment"
// //                       style={{ height: '60px', objectFit: 'cover', cursor: 'pointer' }}
// //                       onClick={() => handleImageClick(grievance.attachment)} // Open modal on click
// //                     />
// //                   ) : (
// //                     'No Image'
// //                   )}
// //                 </Text>
// //               </Box>
// //             ))
// //           )}
// //         </Stack>
// //       </Box>

// //       {/* Modal for displaying the full image */}
// //       <Modal isOpen={isOpen} onClose={onClose} isCentered>
// //         <ModalOverlay />
// //         <ModalContent>
// //           <ModalCloseButton />
// //           <ModalBody>
// //             {selectedImage && (
// //               <Image
// //                 src={`data:image/jpeg;base64,${selectedImage}`}
// //                 alt="Attachment"
// //                 width="100%"
// //                 height="auto"
// //                 borderRadius="md"
// //               />
// //             )}
// //           </ModalBody>
// //         </ModalContent>
// //       </Modal>
// //     </Flex>
// //   );
// // };

// // export default EmployeeDashboard;


// import React, { useState, useEffect } from 'react';
// import {
//   Box, Flex, Text, Avatar, Button, VStack, Heading, Stack, IconButton, HStack, useColorMode, Input, Modal,
//   ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Image, useDisclosure, Select
// } from '@chakra-ui/react';
// import { FiLogOut } from 'react-icons/fi';
// import { SunIcon, MoonIcon } from '@chakra-ui/icons';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const EmployeeDashboard = () => {
//   const [grievances, setGrievances] = useState([]);
//   const [filteredGrievances, setFilteredGrievances] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const grievancesPerPage = 5; // Set the number of grievances per page
//   const [selectedImage, setSelectedImage] = useState(null);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const navigate = useNavigate();
//   const { colorMode, toggleColorMode } = useColorMode();

//   useEffect(() => {
//     const fetchEmployeeGrievances = async () => {
//       try {
//         const response = await axios.get('http://localhost:8006/grievances/employee/1', {
//           headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
//         });
//         setGrievances(response.data);
//         setFilteredGrievances(response.data); // Initially show all grievances
//       } catch (error) {
//         console.error('Error fetching grievances:', error);
//       }
//     };

//     fetchEmployeeGrievances();
//   }, []);

//   // Filter grievances based on search query
//   useEffect(() => {
//     const filtered = grievances.filter(grievance =>
//       grievance.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       grievance.branchName.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     setFilteredGrievances(filtered);
//     setCurrentPage(1); // Reset to first page on search
//   }, [searchQuery, grievances]);

//   // Pagination logic
//   const indexOfLastGrievance = currentPage * grievancesPerPage;
//   const indexOfFirstGrievance = indexOfLastGrievance - grievancesPerPage;
//   const currentGrievances = filteredGrievances.slice(indexOfFirstGrievance, indexOfLastGrievance);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleSignOut = () => {
//     sessionStorage.clear();
//     navigate('/login');
//   };

//   const handleImageClick = (image) => {
//     setSelectedImage(image); 
//     onOpen(); 
//   };

//   const handleGrievanceClick = (grievanceId) => {
//     navigate(`/grievances/update/${grievanceId}`);
//   };

//   return (
//     <Flex height="100vh">
//       {/* Sidebar */}
//       <Box w={{ base: '100%', md: '20%' }} bg={colorMode === 'light' ? 'gray.200' : 'gray.900'} color={colorMode === 'light' ? 'black' : 'white'} p={5}>
//         <VStack align="start" spacing={4}>
//           <Avatar name="Employee" size="xl" />
//           <Text fontSize="xl" fontWeight="bold">Employee</Text>
//           <Button leftIcon={<FiLogOut />} w="full" onClick={handleSignOut}>Sign Out</Button>
//           <IconButton
//             aria-label="Toggle Theme"
//             icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
//             onClick={toggleColorMode}
//           />
//         </VStack>
//       </Box>

//       {/* Main Content */}
//       <Box flex="1" p={8} bg={colorMode === 'light' ? 'white' : 'gray.800'} color={colorMode === 'light' ? 'black' : 'white'}>
//         <HStack justify="space-between" mb={4}>
//           <Heading>Approved Grievances</Heading>
//           <Input
//             placeholder="Search grievances..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             maxW="200px"
//           />
//         </HStack>

//         {/* Grievances as Cards */}
//         <Stack spacing={4}>
//           {currentGrievances.length === 0 ? (
//             <Text>No grievances found.</Text>
//           ) : (
//             currentGrievances.map(grievance => (
//               <Box key={grievance.grievanceId} p={4} borderWidth="1px" borderRadius="md" boxShadow="md" bg="blue.100" onClick={() => handleGrievanceClick(grievance.grievanceId)}>
//                 <Text fontWeight="bold">Grievance: {grievance.branchName}</Text>
//                 <Text>Description: {grievance.description}</Text>
//                 <Text>Status: {grievance.status}</Text>
//                 <Text>Date: {new Date(grievance.createdAt).toLocaleDateString()}</Text>
//                 <Text>
//                   {grievance.attachment ? (
//                     <img
//                       src={`data:image/jpeg;base64,${grievance.attachment}`}
//                       alt="Attachment"
//                       style={{ height: '60px', objectFit: 'cover', cursor: 'pointer' }}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         handleImageClick(grievance.attachment);
//                       }}
//                     />
//                   ) : (
//                     'No Image'
//                   )}
//                 </Text>
//               </Box>
//             ))
//           )}
//         </Stack>

//         {/* Pagination */}
//         <HStack justify="center" mt={4}>
//           {Array.from({ length: Math.ceil(filteredGrievances.length / grievancesPerPage) }, (_, index) => (
//             <Button key={index + 1} onClick={() => paginate(index + 1)} isActive={currentPage === index + 1}>
//               {index + 1}
//             </Button>
//           ))}
//         </HStack>
//       </Box>

//       {/* Modal for displaying the full image */}
//       <Modal isOpen={isOpen} onClose={onClose} isCentered>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalCloseButton />
//           <ModalBody>
//             {selectedImage && (
//               <Image
//                 src={`data:image/jpeg;base64,${selectedImage}`}
//                 alt="Attachment"
//                 width="100%"
//                 height="auto"
//                 borderRadius="md"
//               />
//             )}
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </Flex>
//   );
// };

// export default EmployeeDashboard;

import React, { useState, useEffect } from 'react';
import {
  Box, Flex, Text, Avatar, Button, VStack, Heading, Stack, IconButton, HStack, useColorMode, Input, Modal,
  ModalOverlay, ModalContent, ModalBody, ModalCloseButton, Image, useDisclosure
} from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [filteredGrievances, setFilteredGrievances] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const grievancesPerPage = 5; // Set the number of grievances per page
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  const id = sessionStorage.getItem("id");

  useEffect(() => {
    const fetchEmployeeGrievances = async () => {
      try {
        const response = await axios.get(`http://localhost:8006/grievances/employee/${id}`);
        // , {
        //   headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
        // });
        // Filter to show only grievances with status 'Approved'
        const approvedGrievances = response.data.filter(grievance => grievance.status === 'Approved');
        setGrievances(approvedGrievances);
        setFilteredGrievances(approvedGrievances); // Initially show all grievances
      } catch (error) {
        console.error('Error fetching grievances:', error);
      }
    };

    fetchEmployeeGrievances();
  }, []);

  // Filter grievances based on search query
  useEffect(() => {
    const filtered = grievances.filter(grievance =>
      grievance.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grievance.branchName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredGrievances(filtered);
    setCurrentPage(1); // Reset to first page on search
  }, [searchQuery, grievances]);

  // Pagination logic
  const indexOfLastGrievance = currentPage * grievancesPerPage;
  const indexOfFirstGrievance = indexOfLastGrievance - grievancesPerPage;
  const currentGrievances = filteredGrievances.slice(indexOfFirstGrievance, indexOfLastGrievance);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  const handleImageClick = (image) => {
    setSelectedImage(image); 
    onOpen(); 
  };

  const handleGrievanceClick = (grievanceId) => {
    navigate(`/grievances/update/${grievanceId}`);
  };

  return (
    <Flex height="100vh">
      {/* Sidebar */}
      <Box w={{ base: '100%', md: '20%' }} bg={colorMode === 'light' ? 'gray.200' : 'gray.900'} color={colorMode === 'light' ? 'black' : 'white'} p={5}>
        <VStack align="start" spacing={4}>
          <Avatar name="Employee" size="xl" />
          <Text fontSize="xl" fontWeight="bold">Employee</Text>
          <Button leftIcon={<FiLogOut />} w="full" onClick={handleSignOut}>Sign Out</Button>
          <IconButton
            aria-label="Toggle Theme"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </VStack>
      </Box>

      {/* Main Content */}
      <Box flex="1" p={8} bg={colorMode === 'light' ? 'white' : 'gray.800'} color={colorMode === 'light' ? 'black' : 'white'}>
        <HStack justify="space-between" mb={4}>
          <Heading>Approved Grievances</Heading>
          <Input
            placeholder="Search grievances..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            maxW="200px"
          />
        </HStack>

        {/* Grievances as Cards */}
        <Stack spacing={4}>
          {currentGrievances.length === 0 ? (
            <Text>No grievances found.</Text>
          ) : (
            currentGrievances.map(grievance => (
              <Box key={grievance.grievanceId} p={4} borderWidth="1px" borderRadius="md" boxShadow="md" bg="blue.100" onClick={() => handleGrievanceClick(grievance.grievanceId)}>
                <Text fontWeight="bold">Grievance: {grievance.branchName}</Text>
                <Text>Description: {grievance.description}</Text>
                <Text>Status: {grievance.status}</Text>
                <Text>Date: {new Date(grievance.createdAt).toLocaleDateString()}</Text>
                <Text>
                  {grievance.attachment ? (
                    <img
                      src={`data:image/jpeg;base64,${grievance.attachment}`}
                      alt="Attachment"
                      style={{ height: '60px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(grievance.attachment);
                      }}
                    />
                  ) : (
                    'No Image'
                  )}
                </Text>
              </Box>
            ))
          )}
        </Stack>

        {/* Pagination */}
        <HStack justify="center" mt={4}>
          {Array.from({ length: Math.ceil(filteredGrievances.length / grievancesPerPage) }, (_, index) => (
            <Button key={index + 1} onClick={() => paginate(index + 1)} isActive={currentPage === index + 1}>
              {index + 1}
            </Button>
          ))}
        </HStack>
      </Box>

      {/* Modal for displaying the full image */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {selectedImage && (
              <Image
                src={`data:image/jpeg;base64,${selectedImage}`}
                alt="Attachment"
                width="100%"
                height="auto"
                borderRadius="md"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default EmployeeDashboard;
