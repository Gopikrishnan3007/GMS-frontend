

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Button,
  useColorMode,
  useToast,
  IconButton,
  VStack,
  HStack,
  Spinner,
  Fade,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { MdError } from 'react-icons/md';
import axios from 'axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:8006/department/all');
        setDepartments(response.data);
      } catch (error) {
        setError('Error fetching departments. Please try again later.');
        toast({
          title: 'Error',
          description: 'Failed to load departments.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, [toast]);

  return (
    <Box p={6} bg={colorMode === 'light' ? 'white' : 'gray.800'}>
      <HStack justify="space-between" mb={6}>
        <Heading as="h1" size="lg">
          Select the Departments
        </Heading>
       
      </HStack>
      
      {isLoading ? (
        <VStack spacing={4} justify="center" align="center" minH="60vh">
          <Spinner size="xl" color="teal.500" />
          <Text>Loading departments...</Text>
        </VStack>
      ) : error ? (
        <VStack spacing={4} justify="center" align="center" minH="60vh">
          <MdError size="40px" color="red.500" />
          <Text color="red.500">{error}</Text>
        </VStack>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={6}>
          {departments.map((department) => (
            <Fade key={department.departmentId} in={true} transition={{ enter: { duration: 0.5 } }}>
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                bg="gray.100"
                shadow="md"
                transition="transform 0.2s"
               
              >
                <Heading color="black" as="h2" size="md" mb={4}>
                  {department.departmentName}
                </Heading>
                <Button
                  as={Link}
                  to={`/user/addgrievance/${department.departmentId}`} // Navigate to Add Grievance with departmentId
                  colorScheme="teal"
                  rightIcon={<ChevronRightIcon />}
                  _hover={{ transform: 'scale(1.01)' }}

                >
                  Select Department
                </Button>
              </Box>
            </Fade>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default DepartmentList;
