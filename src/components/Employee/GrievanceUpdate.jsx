

// import React, { useState, useEffect } from 'react';
// import {
//   Box, Text, Button, Select, VStack, Heading, Divider, Image, Stack
// } from '@chakra-ui/react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const GrievanceUpdate = () => {
//   const { grievanceId } = useParams();
//   const [grievance, setGrievance] = useState(null);
//   const [status, setStatus] = useState('');
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchGrievanceDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8006/grievances/find/${grievanceId}`);
//         setGrievance(response.data);
//         setStatus(response.data.status);
//       } catch (error) {
//         console.error('Error fetching grievance:', error);
//       }
//     };

//     fetchGrievanceDetails();
//   }, [grievanceId]);

//   const handleStatusUpdate = async () => {
//     try {
//       await axios.patch(`http://localhost:8006/grievances/${grievanceId}/status`, status, {
//         headers: {
//           'Content-Type': 'text/plain', // Adjust content type if necessary
//         },
//       });
//       // Update the state with new status
//       setGrievance(prev => ({ ...prev, status }));

//       navigate('/employee-dashboard');
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   return (
//     <Box p={8}>
//       <VStack spacing={4} align="start">
//         {grievance ? (
//           <>
//             <Heading mb={4}>Update Grievance Status</Heading>
//             <Stack spacing={4} w="full">
//               <Text><strong>Grievance ID:</strong> {grievance.grievanceId}</Text>
//               <Text><strong>Branch Name:</strong> {grievance.branchName}</Text>
//               <Text><strong>Description:</strong> {grievance.description}</Text>
//               <Text><strong>Assigned Employee:</strong> {grievance.assignedEmployee ? grievance.assignedEmployee.name : 'None'}</Text>
//               <Text><strong>Status:</strong> {grievance.status}</Text>
//               <Text><strong>Created At:</strong> {new Date(grievance.createdAt).toLocaleDateString()}</Text>
//               <Text><strong>Updated At:</strong> {new Date(grievance.updatedAt).toLocaleDateString()}</Text>
//               {grievance.attachment && (
//                 <Image
//                   src={`data:image/jpeg;base64,${grievance.attachment}`}
//                   alt="Attachment"
//                   boxSize="200px"
//                   objectFit="cover"
//                   borderRadius="md"
//                 />
//               )}
//             </Stack>
//             <Divider my={4} />
//             <Select value={status} onChange={(e) => setStatus(e.target.value)} mb={4}>
//               <option value="Approved">Approved</option>
//               <option value="Rejected">Rejected</option>
//               <option value="Pending">Pending</option>
//               <option value="Solved">Solved</option>
//               <option value="Resolved">Resolved</option>
//             </Select>
//             <Button onClick={handleStatusUpdate} colorScheme="teal">Update Status</Button>
//           </>
//         ) : (
//           <Text>Loading grievance details...</Text>
//         )}
//       </VStack>
//     </Box>
//   );
// };

// export default GrievanceUpdate;

import React, { useState, useEffect } from 'react';
import {
  Box, Text, Button, Select, VStack, Heading, Divider, Image, Stack, Input
} from '@chakra-ui/react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const GrievanceUpdate = () => {
  const { grievanceId } = useParams();
  const [grievance, setGrievance] = useState(null);
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrievanceDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8006/grievances/find/${grievanceId}`);
        setGrievance(response.data);
        setStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching grievance:', error);
      }
    };

    fetchGrievanceDetails();
  }, [grievanceId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleStatusUpdate = async () => {
    const formData = new FormData();
    formData.append('status', status);
    formData.append('resolvedAttachment', file);
    

    try {
      await axios.patch(`http://localhost:8006/grievances/updateStatusAndAttachment/${grievanceId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the state with new status
      setGrievance(prev => ({ ...prev, status }));

      navigate('/employee-dashboard');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        {grievance ? (
          <>
            <Heading mb={4}>Update Grievance Status</Heading>
            <Stack spacing={4} w="full">
              <Text><strong>Grievance ID:</strong> {grievance.grievanceId}</Text>
              <Text><strong>Branch Name:</strong> {grievance.branchName}</Text>
              <Text><strong>Description:</strong> {grievance.description}</Text>
              <Text><strong>Assigned Employee:</strong> {grievance.assignedEmployee ? grievance.assignedEmployee.name : 'None'}</Text>
              <Text><strong>Status:</strong> {grievance.status}</Text>
              <Text><strong>Created At:</strong> {new Date(grievance.createdAt).toLocaleDateString()}</Text>
              <Text><strong>Updated At:</strong> {new Date(grievance.updatedAt).toLocaleDateString()}</Text>
              {grievance.attachment && (
                <Image
                  src={`data:image/jpeg;base64,${grievance.attachment}`}
                  alt="Attachment"
                  boxSize="200px"
                  objectFit="cover"
                  borderRadius="md"
                />
              )}
            </Stack>
            <Divider my={4} />
            <Select value={status} onChange={(e) => setStatus(e.target.value)} mb={4}>
              <option value="Approved">Approved</option>
              <option value="Resolved">Resolved</option>
            </Select>
            <Input
              type="file"
              onChange={handleFileChange}
              mb={4}
            />
            <Button onClick={handleStatusUpdate} colorScheme="teal">Update Status and Attachment</Button>
          </>
        ) : (
          <Text>Loading grievance details...</Text>
        )}
      </VStack>
    </Box>
  );
};

export default GrievanceUpdate;
