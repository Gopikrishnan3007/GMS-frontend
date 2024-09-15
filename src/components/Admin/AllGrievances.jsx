


// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   Grid,
//   Heading,
//   Image,
//   Input,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalBody,
//   Select,
//   Spinner,
//   Stack,
//   Text,
//   useDisclosure,
//   useToast,
// } from '@chakra-ui/react';
// import axios from 'axios';

// const AllGrievances = () => {
//   const [grievances, setGrievances] = useState([]);
//   const [pendingGrievances, setPendingGrievances] = useState([]);
//   const [filters, setFilters] = useState({ department: '', status: '', date: '' });
//   const [loading, setLoading] = useState(false);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedImage, setSelectedImage] = useState(null);
//   const toast = useToast();

//   useEffect(() => {
//     fetchGrievances();
//   }, []);

//   const fetchGrievances = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get('http://localhost:8006/grievances/findAll');
//       const allGrievances = res.data;
//       setGrievances(allGrievances.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))); // Sort by createdAt
//       setPendingGrievances(allGrievances.filter(g => g.status === 'Pending'));
//     } catch (error) {
//       toast({
//         title: 'Error fetching grievances',
//         status: 'error',
//         isClosable: true,
//       });
//     }
//     setLoading(false);
//   };

//   const handleApprove = async grievanceId => {
//     try {
//       await axios.patch(`http://localhost:8006/grievances/${grievanceId}/status`, 'Approved', {
//         headers: {
//           'Content-Type': 'text/plain',
//         },
//       });
//       fetchGrievances();
//       toast({
//         title: 'Grievance Approved',
//         status: 'success',
//         isClosable: true,
//       });
//     } catch (error) {
//       toast({
//         title: 'Error approving grievance',
//         status: 'error',
//         isClosable: true,
//       });
//     }
//   };

//   const handleReject = async grievanceId => {
//     try {
//       await axios.patch(`http://localhost:8006/grievances/${grievanceId}/status`, 'Rejected', {
//         headers: {
//           'Content-Type': 'text/plain',
//         },
//       });
//       fetchGrievances();
//       toast({
//         title: 'Grievance Rejected',
//         status: 'warning',
//         isClosable: true,
//       });
//     } catch (error) {
//       toast({
//         title: 'Error rejecting grievance',
//         status: 'error',
//         isClosable: true,
//       });
//     }
//   };

//   const handleFilterChange = e => {
//     const { name, value } = e.target;
//     setFilters({ ...filters, [name]: value });
//   };

//   const handleImageClick = image => {
//     setSelectedImage(image);
//     onOpen();
//   };

//   const filteredGrievances = grievances.filter(g => {
//     return (
//       (filters.department === '' || g.department.departmentId === parseInt(filters.department)) &&
//       (filters.status === '' || g.status === filters.status) &&
//       (filters.date === '' || g.createdAt.startsWith(filters.date))
//     );
//   });

//   return (
//     <Box p={5}>
//       <Heading as="h2" size="lg" mb={5}>
//         Admin Grievance Management
//       </Heading>

//       {/* Pending Grievances Section */}
//       <Heading as="h3" size="md" mb={3}>
//         Pending Grievances
//       </Heading>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} mb={10}>
//           {pendingGrievances.map(g => (
//             <Box key={g.grievanceId} p={5} shadow="md" borderWidth="1px" rounded="md">
//               <Text fontWeight="bold">Branch: {g.branchName}</Text>
//               <Text>User: {g.user.name}</Text>
//               <Text>Department: {g.department.departmentName}</Text>
//               <Text>Description: {g.description}</Text>
//               {g.attachment ? (
//                 <Image
//                   src={`data:image/jpeg;base64,${g.attachment}`}
//                   alt="Attachment"
//                   onClick={() => handleImageClick(g.attachment)}
//                   cursor="pointer"
//                   boxSize="60px"
//                   objectFit="cover"
//                 />
//               ) : (
//                 'No Image'
//               )}
//               <Text>Status: {g.status}</Text>
//               <Stack direction="row" spacing={4} mt={3}>
//                 <Button colorScheme="green" size="sm" onClick={() => handleApprove(g.grievanceId)}>
//                   Approve
//                 </Button>
//                 <Button colorScheme="red" size="sm" onClick={() => handleReject(g.grievanceId)}>
//                   Reject
//                 </Button>
//               </Stack>
//             </Box>
//           ))}
//         </Grid>
//       )}

//       {/* All Grievances Section */}
//       <Heading as="h3" size="md" mb={3}>
//         All Grievances
//       </Heading>
//       <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={5}>
//         <Select placeholder="Filter by Department" name="department" onChange={handleFilterChange}>
//           <option value="1">Department 1</option>
//           <option value="2">Department 2</option>
//           {/* Add more departments */}
//         </Select>
//         <Select placeholder="Filter by Status" name="status" onChange={handleFilterChange}>
//           <option value="Pending">Pending</option>
//           <option value="Approved">Approved</option>
//           <option value="Rejected">Rejected</option>
//           <option value="Closed">Closed</option>
//           <option value="Resolved">Resolved</option>
//         </Select>
//         <Input type="date" name="date" onChange={handleFilterChange} />
//       </Stack>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
//           {filteredGrievances.map(g => (
//             <Box key={g.grievanceId} p={5} shadow="md" borderWidth="1px" rounded="md">
//               <Text fontWeight="bold">Branch: {g.branchName}</Text>
//               <Text>User: {g.user.name}</Text>
//               <Text>Department: {g.department.departmentName}</Text>
//               {g.attachment ? (
//                 <Image
//                   src={`data:image/jpeg;base64,${g.attachment}`}
//                   alt="Attachment"
//                   onClick={() => handleImageClick(g.attachment)}
//                   cursor="pointer"
//                   boxSize="60px"
//                   objectFit="cover"
//                 />
//               ) : (
//                 'No Image'
//               )}
//               <Text>Status: {g.status}</Text>
//               <Text>Date: {new Date(g.createdAt).toLocaleDateString()}</Text>
//             </Box>
//           ))}
//         </Grid>
//       )}

//       {/* Modal for Image Preview */}
//       <Modal isOpen={isOpen} onClose={onClose} size="xl">
//         <ModalOverlay />
//         <ModalContent>
//           <ModalBody>
//             <Image
//               src={`data:image/jpeg;base64,${selectedImage}`}
//               alt="Grievance Attachment"
//               boxSize="100%"
//               objectFit="contain"
//             />
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default AllGrievances;


import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Select,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15, 20];

const AllGrievances = () => {
  const [grievances, setGrievances] = useState([]);
  const [pendingGrievances, setPendingGrievances] = useState([]);
  const [filters, setFilters] = useState({ department: '', status: '', date: '' });
  const [loading, setLoading] = useState(false);
  const [currentPagePending, setCurrentPagePending] = useState(1);
  const [currentPageAll, setCurrentPageAll] = useState(1);
  const [itemsPerPagePending, setItemsPerPagePending] = useState(10);
  const [itemsPerPageAll, setItemsPerPageAll] = useState(10);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8006/grievances/findAll');
      const allGrievances = res.data;
      setGrievances(allGrievances.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))); // Sort by createdAt
      setPendingGrievances(allGrievances.filter(g => g.status === 'Pending'));
    } catch (error) {
      toast({
        title: 'Error fetching grievances',
        status: 'error',
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleApprove = async grievanceId => {
    try {
      await axios.patch(`http://localhost:8006/grievances/${grievanceId}/status`, 'Approved', {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      fetchGrievances();
      toast({
        title: 'Grievance Approved',
        status: 'success',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error approving grievance',
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleReject = async grievanceId => {
    try {
      await axios.patch(`http://localhost:8006/grievances/${grievanceId}/status`, 'Rejected', {
        headers: {
          'Content-Type': 'text/plain',
        },
      });
      fetchGrievances();
      toast({
        title: 'Grievance Rejected',
        status: 'warning',
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error rejecting grievance',
        status: 'error',
        isClosable: true,
      });
    }
  };

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleImageClick = image => {
    setSelectedImage(image);
    onOpen();
  };

  const filteredGrievances = grievances.filter(g => {
    return (
      (filters.department === '' || g.department.departmentId === parseInt(filters.department)) &&
      (filters.status === '' || g.status === filters.status) &&
      (filters.date === '' || g.createdAt.startsWith(filters.date))
    );
  });

  // Paginated Data
  const paginatedPendingGrievances = pendingGrievances.slice(
    (currentPagePending - 1) * itemsPerPagePending,
    currentPagePending * itemsPerPagePending
  );

  const paginatedAllGrievances = filteredGrievances.slice(
    (currentPageAll - 1) * itemsPerPageAll,
    currentPageAll * itemsPerPageAll
  );

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={5}>
        Admin Grievance Management
      </Heading>

      {/* Pending Grievances Section */}
      <Heading as="h3" size="md" mb={3}>
        Pending Grievances
      </Heading>
      <Stack direction="row" spacing={4} mb={5} align="center">
            <Text>Items per page:</Text>
            <Select value={itemsPerPagePending} width="200px" onChange={e => setItemsPerPagePending(parseInt(e.target.value))}>
              {ITEMS_PER_PAGE_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Stack>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} mb={5}>
            {paginatedPendingGrievances.map(g => (
              <Box key={g.grievanceId} p={5} shadow="md" borderWidth="1px" rounded="md">
                <Text fontWeight="bold">Branch: {g.branchName}</Text>
                <Text>User: {g.user.name}</Text>
                <Text>Department: {g.department.departmentName}</Text>
                <Text>Description: {g.description}</Text>
                {g.attachment ? (
                  <Image
                    src={`data:image/jpeg;base64,${g.attachment}`}
                    alt="Attachment"
                    onClick={() => handleImageClick(g.attachment)}
                    cursor="pointer"
                    boxSize="60px"
                    objectFit="cover"
                  />
                ) : (
                  'No Image'
                )}
                <Text>Status: {g.status}</Text>
                <Stack direction="row" spacing={4} mt={3}>
                  <Button colorScheme="green" size="sm" onClick={() => handleApprove(g.grievanceId)}>
                    Approve
                  </Button>
                  <Button colorScheme="red" size="sm" onClick={() => handleReject(g.grievanceId)}>
                    Reject
                  </Button>
                </Stack>
              </Box>
            ))}
          </Grid>
          
          <Stack direction="row" spacing={4} mb={5} align="center">
            <Button
              isDisabled={currentPagePending === 1}
              onClick={() => setCurrentPagePending(prev => prev - 1)}
            >
              Previous
            </Button>
            <Text>
              Page {currentPagePending} of {Math.ceil(pendingGrievances.length / itemsPerPagePending)}
            </Text>
            <Button
              isDisabled={currentPagePending === Math.ceil(pendingGrievances.length / itemsPerPagePending)}
              onClick={() => setCurrentPagePending(prev => prev + 1)}
            >
              Next
            </Button>
          </Stack>
        </>
      )}

      {/* All Grievances Section */}
      <Heading as="h3" size="md" mb={3}>
        All Grievances
      </Heading>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mb={5}>
        <Select placeholder="Filter by Department" name="department" onChange={handleFilterChange}>
          <option value="1">Department 1</option>
          <option value="2">Department 2</option>
          {/* Add more departments */}
        </Select>
        <Select placeholder="Filter by Status" name="status" onChange={handleFilterChange}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Closed">Closed</option>
          <option value="Resolved">Resolved</option>
        </Select>
        <Input type="date" name="date" onChange={handleFilterChange} />
      </Stack>
      <Stack direction="row" spacing={4} mb={5} align="center">
            <Text>Items per page:</Text>
            <Select value={itemsPerPageAll} width="200px" onChange={e => setItemsPerPageAll(parseInt(e.target.value))}>
              {ITEMS_PER_PAGE_OPTIONS.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </Stack>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} mb={5}>
            {paginatedAllGrievances.map(g => (
              <Box key={g.grievanceId} p={5} shadow="md" borderWidth="1px" rounded="md">
                <Text fontWeight="bold">Branch: {g.branchName}</Text>
                <Text>User: {g.user.name}</Text>
                <Text>Department: {g.department.departmentName}</Text>
                {g.attachment ? (
                  <Image
                    src={`data:image/jpeg;base64,${g.attachment}`}
                    alt="Attachment"
                    onClick={() => handleImageClick(g.attachment)}
                    cursor="pointer"
                    boxSize="60px"
                    objectFit="cover"
                  />
                ) : (
                  'No Image'
                )}
                <Text>Status: {g.status}</Text>
                <Text>Date: {new Date(g.createdAt).toLocaleDateString()}</Text>
              </Box>
            ))}
          </Grid>
         
          <Stack direction="row" spacing={4} mb={5} align="center">
            <Button
              isDisabled={currentPageAll === 1}
              onClick={() => setCurrentPageAll(prev => prev - 1)}
            >
              Previous
            </Button>
            <Text>
              Page {currentPageAll} of {Math.ceil(filteredGrievances.length / itemsPerPageAll)}
            </Text>
            <Button
              isDisabled={currentPageAll === Math.ceil(filteredGrievances.length / itemsPerPageAll)}
              onClick={() => setCurrentPageAll(prev => prev + 1)}
            >
              Next
            </Button>
          </Stack>
        </>
      )}

      {/* Modal for Image Preview */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Image
              src={`data:image/jpeg;base64,${selectedImage}`}
              alt="Grievance Attachment"
              boxSize="100%"
              objectFit="contain"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AllGrievances;
