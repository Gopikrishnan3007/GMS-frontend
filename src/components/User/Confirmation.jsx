

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import {
//   Container,
//   Heading,
//   Stack,
//   Text,
//   Button,
//   Box,
//   Spinner,
//   Alert,
//   AlertIcon,
//   Image,
//   useToast,
// } from '@chakra-ui/react';

// const Confirmation = () => {
//   const [grievances, setGrievances] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const toast = useToast();
//   const navigate = useNavigate();

//   // Assume user ID is fetched from session or a similar method
//   const userId = 1; // Replace with actual user ID retrieval

//   useEffect(() => {
//     const fetchGrievances = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8006/grievances/user/${userId}`);
//         console.log('API Response:', response.data); // Log the full response from the API
  
//         const filteredGrievances = response.data.filter(
//           (grievance) => 
//             grievance.status === 'Resolved' &&
//             !grievance.closeConfirmation &&
//             grievance.resolvedAttachment !== null // Check if resolvedAttachment is not null
//         );
//         console.log('Filtered Grievances:', filteredGrievances); // Log the filtered grievances
  
//         setGrievances(filteredGrievances);
//       } catch (error) {
//         console.error('Error fetching grievances:', error);
//         setError('Unable to fetch grievances.');
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchGrievances();
//   }, [userId]);
  

//   // Handle updating the grievance as solved
//   const handleProblemSolvedUpdate = async (grievanceId) => {
//     try {
//       await axios.patch(
//         `http://localhost:8006/grievances/${grievanceId}/confirmation`,`true`,
//        // JSON data
//         { headers: { 'Content-Type': 'application/json' } } // Explicitly set JSON header
//       );
//       // Update the UI by removing the solved grievance
//       setGrievances((prevGrievances) =>
//         prevGrievances.filter((grievance) => grievance.grievanceId !== grievanceId)
//       );
//       toast({
//         title: 'Success',
//         description: 'Grievance marked as solved.',
//         status: 'success',
//         duration: 5000,
//         isClosable: true,
//       });
//     } catch (error) {
//       console.error('Error updating grievance status:', error);
//       setError('Unable to update grievance status.');
//     }
//   };

//   // Handle marking a grievance as "Not Solved"
//   const handleNotSolvedUpdate = async (grievanceId) => {
//     try {
//         await axios.patch(`http://localhost:8006/grievances/${grievanceId}/status`, 'Not-Solved', {
//             headers: {
//                 'Content-Type': 'text/plain', // Ensure the Content-Type is set correctly
//             },
//         });
//         // Update the state with new status
//         setGrievances(prev => prev.map(grievance =>
//             grievance.grievanceId === grievanceId ? { ...grievance, status: 'Approved' } : grievance
//         ));
//         toast({
//           title: 'Noted',
//           description: 'Grievance marked as Not - solved.',
//           status: 'success',
//           duration: 5000,
//           isClosable: true,
//         });
//     } catch (error) {
//         console.error('Error approving grievance:', error);
//     }
// };

//   // Display loading spinner while fetching data
//   if (loading) {
//     return (
//       <Container centerContent>
//         <Spinner size="xl" />
//         <Text mt={4}>Loading...</Text>
//       </Container>
//     );
//   }

//   // Display error message if something goes wrong or no grievances exist
//   if (error) {
//     return (
//       <Container centerContent>
//         <Alert status="error">
//           <AlertIcon />
//           {error}
//         </Alert>
//       </Container>
//     );
//   }

//   // Render the grievances in a list with buttons to confirm or reject the resolution
//   return (
//     <Container maxW="container.md" py={6}>
//       <Heading mb={6}>Resolved Grievances</Heading>
//       <Stack spacing={4}>
//         {grievances.length === 0 ? (
//           <Text>No grievances available for confirmation.</Text>
//         ) : (
//           grievances.map((grievance) => (
//             <Box key={grievance.grievanceId} borderWidth="1px" borderRadius="md" p={4} shadow="md">
//               <Heading size="md" mb={2}>{grievance.branchName}</Heading>
//               <Text mb={4}>{grievance.description}</Text>
//               {grievance.resolvedAttachment && (
//                 <Image
//                   src={`data:image/jpeg;base64,${grievance.resolvedAttachment}`}
//                   alt="Attachment"
//                   boxSize="200px"
//                   objectFit="cover"
//                   borderRadius="md"
//                 />
//               )}
//               <Button
//                 colorScheme="green"
//                 mr={3}
//                 onClick={() => handleProblemSolvedUpdate(grievance.grievanceId)}
//               >
//                 Problem Solved
//               </Button>
//               <Button
//                 colorScheme="red"
//                 onClick={() => handleNotSolvedUpdate(grievance.grievanceId)}
//               >
//                 Not Solved
//               </Button>
//             </Box>
//           ))
//         )}
//       </Stack>
//     </Container>
//   );
// };

// export default Confirmation;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Box,
  Spinner,
  Alert,
  AlertIcon,
  Image,
  useToast,
  Icon,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi'; // Import icons for buttons
import { MdImage } from 'react-icons/md'; // Image icon
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const Confirmation = () => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // State to hold the selected image
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal control for image popup
  const toast = useToast();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode(); // For theme switching

  // Assume user ID is fetched from session or a similar method
  const userId = sessionStorage.getItem("id"); // Replace with actual user ID retrieval

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await axios.get(`http://localhost:8006/grievances/user/${userId}`);
        console.log('API Response:', response.data); // Log the full response from the API
  
        const filteredGrievances = response.data.filter(
          (grievance) => 
            grievance.status === 'Resolved' &&
            !grievance.closeConfirmation &&
            grievance.resolvedAttachment !== null // Check if resolvedAttachment is not null
        );
        console.log('Filtered Grievances:', filteredGrievances); // Log the filtered grievances
  
        setGrievances(filteredGrievances);
      } catch (error) {
        console.error('Error fetching grievances:', error);
        setError('Unable to fetch grievances.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchGrievances();
  }, [userId]);
  
  // Handle updating the grievance as solved
  const handleProblemSolvedUpdate = async (grievanceId) => {
    try {
      await axios.patch(
        `http://localhost:8006/grievances/${grievanceId}/confirmation`, `true`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setGrievances((prevGrievances) =>
        prevGrievances.filter((grievance) => grievance.grievanceId !== grievanceId)
      );
      toast({
        title: 'Success',
        description: 'Grievance marked as solved.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating grievance status:', error);
      setError('Unable to update grievance status.');
    }
  };

  // Handle marking a grievance as "Not Solved"
  const handleNotSolvedUpdate = async (grievanceId) => {
    try {
      await axios.patch(`http://localhost:8006/grievances/${grievanceId}/status`, 'Not-Solved', {
        headers: { 'Content-Type': 'text/plain' },
      });
      setGrievances(prev => prev.map(grievance =>
        grievance.grievanceId === grievanceId ? { ...grievance, status: 'Approved' } : grievance
      ));
      toast({
        title: 'Noted',
        description: 'Grievance marked as Not-solved.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error approving grievance:', error);
    }
  };

  // Handle image click to open modal
  const handleImageClick = (imageData) => {
    setSelectedImage(imageData);
    onOpen();
  };

  // Display loading spinner while fetching data
  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" />
        <Text mt={4}>Loading...</Text>
      </Container>
    );
  }

  // Display error message if something goes wrong or no grievances exist
  if (error) {
    return (
      <Container centerContent>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  // Render the grievances in a list with buttons to confirm or reject the resolution
  return (
    <Container maxW="container.md" py={6}>
      <Heading mb={6}>Resolved Grievances</Heading>
      <Stack spacing={4}>
        {grievances.length === 0 ? (
          <Text>No grievances available for confirmation.</Text>
        ) : (
          grievances.map((grievance) => (
            <Box key={grievance.grievanceId} borderWidth="1px" borderRadius="md" p={4} shadow="md">
              <Heading size="md" mb={2}>{grievance.branchName}</Heading>
              <Text mb={4}>{grievance.description}</Text>
              {grievance.resolvedAttachment && (
                <Box as="button" onClick={() => handleImageClick(grievance.resolvedAttachment)}>
                  <Image
                    src={`data:image/jpeg;base64,${grievance.resolvedAttachment}`}
                    alt="Attachment"
                    boxSize="200px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Text mt={2} color="blue.500"><Icon as={MdImage} /> View Image</Text>
                </Box>
              )}
              <Button
                leftIcon={<FiCheckCircle />}
                colorScheme="green"
                mr={3}
                onClick={() => handleProblemSolvedUpdate(grievance.grievanceId)}
              >
                Problem Solved
              </Button>
              <Button
                leftIcon={<FiXCircle />}
                colorScheme="red"
                onClick={() => handleNotSolvedUpdate(grievance.grievanceId)}
              >
                Not Solved
              </Button>
            </Box>
          ))
        )}
      </Stack>

      {/* Modal for displaying full-size image */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Resolved Attachment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedImage && (
              <Image
                src={`data:image/jpeg;base64,${selectedImage}`}
                alt="Resolved Attachment"
                objectFit="contain"
                maxH="400px"
                w="100%"
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Confirmation;
