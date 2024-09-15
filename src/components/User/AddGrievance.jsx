import React, { useState, useEffect } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Textarea, Select, useColorMode, VStack, HStack,
  Heading, useToast, FormErrorMessage
} from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AddGrievance = () => {
  const { departmentId } = useParams();
  const [departmentName, setDepartmentName] = useState('');
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState(sessionStorage.getItem("id"));
  const [categoryId, setCategoryId] = useState('');
  const [assignedEmployeeId, setAssignedEmployeeId] = useState(0);
  const [branchName, setBranchName] = useState('');
  const [description, setDescription] = useState('');
  const [status] = useState('Pending');
  const [closeConfirmation, setCloseConfirmation] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [errors, setErrors] = useState({});

  const toast = useToast();

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8006/department/${departmentId}`);
        setDepartmentName(response.data.departmentName);
      } catch (error) {
        console.error('Failed to fetch department details:', error);
        
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8006/category/department/${departmentId}`);
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        
      }
    };

    fetchDepartmentDetails();
    fetchCategories();
  }, [departmentId, toast]);

  const handleFileChange = (event) => {
    setAttachment(event.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userId) newErrors.userId = 'User ID is required';
    if (!departmentId) newErrors.departmentId = 'Department ID is required';
    if (!categoryId) newErrors.categoryId = 'Category ID is required';
    if (!branchName) newErrors.branchName = 'Branch name is required';
    if (!description) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('departmentId', departmentId);
    formData.append('categoryId', categoryId);
    formData.append('assignedEmployeeId', assignedEmployeeId);
    formData.append('branchName', branchName);
    formData.append('status', status);
    formData.append('description', description);
    formData.append('closeConfirmation', closeConfirmation);
    formData.append('createdAt', new Date().toISOString());
    formData.append('updatedAt', new Date().toISOString());
    formData.append('attachment', attachment);

    try {
      await axios.post('http://localhost:8006/grievances', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        title: 'Grievance submitted successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setUserId('');
      setCategoryId('');
      setAssignedEmployeeId('');
      setBranchName('');
      setDescription('');
      setCloseConfirmation(false);
      setAttachment(null);
    } catch (error) {
      toast({
        title: 'Failed to submit grievance',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} maxW="600px" mx="auto">
      <HStack justifyContent="space-between" mb={6}>
        <Heading as="h2" size="lg">
          Add New Grievance for Department {departmentName || 'Loading...'}
        </Heading>
      </HStack>

      <form onSubmit={handleSubmit}>
        <VStack spacing={5}>
          <FormControl isInvalid={errors.categoryId}>
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </Select>
            {errors.categoryId && <FormErrorMessage>{errors.categoryId}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={errors.branchName}>
            <FormLabel>Problem</FormLabel>
            <Input
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
            />
            {errors.branchName && <FormErrorMessage>{errors.branchName}</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={errors.description}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={2000}
            />
            {errors.description && <FormErrorMessage>{errors.description}</FormErrorMessage>}
          </FormControl>

          <FormControl>
            <FormLabel>Attachment</FormLabel>
            <Input type="file" onChange={handleFileChange} />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            leftIcon={<AttachmentIcon />}
            isFullWidth
          >
            Submit Grievance
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AddGrievance;
