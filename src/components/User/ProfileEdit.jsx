import React, { useState, useEffect } from 'react';
import {
    Box, Flex, Text, Input, Button, useToast, useColorMode, FormControl, FormLabel, Grid, Spinner, IconButton, Stack
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { FaSync } from 'react-icons/fa'; // Importing from react-icons
import axios from 'axios';

// Function to generate CAPTCHA
const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 6; // Length of the CAPTCHA string
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const ProfileEdit = () => {
    const [user, setUser] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [captcha, setCaptcha] = useState(generateCaptcha()); // CAPTCHA value
    const [captchaInput, setCaptchaInput] = useState(''); // CAPTCHA input from the user
    const [captchaError, setCaptchaError] = useState('');
    const { colorMode } = useColorMode();
    const toast = useToast();
    const userId = sessionStorage.getItem('id');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8006/users/${userId}`);
                setUser(response.data);
                setFormValues(response.data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch user data.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [userId, toast]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const validateForm = () => {
        let newErrors = {};
        
        // Basic validations
        if (!formValues.name) newErrors.name = "Name is required";
        if (!formValues.address) newErrors.address = "Address is required";
        if (!formValues.country) newErrors.country = "Country is required";
        if (!formValues.state) newErrors.state = "State is required";
        if (!formValues.district) newErrors.district = "District is required";
        if (!formValues.pinCode) newErrors.pinCode = "Pin Code is required";
        if (!formValues.mobileNumber) newErrors.mobileNumber = "Mobile Number is required";
        if (!formValues.email) newErrors.email = "Email is required";
        
        // Email format validation
        if (formValues.email && !/\S+@\S+\.\S+/.test(formValues.email)) newErrors.email = "Email is invalid";
        
        // Mobile number validation (10 digits)
        if (formValues.mobileNumber && !/^\d{10}$/.test(formValues.mobileNumber)) newErrors.mobileNumber = "Mobile number must be 10 digits";
        
        // Pin code validation (Assuming 6 digits)
        if (formValues.pinCode && !/^\d{6}$/.test(formValues.pinCode)) newErrors.pinCode = "Pin Code must be 6 digits";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        if (captchaInput.trim() !== captcha) {
            setCaptchaError('Incorrect CAPTCHA, please try again.');
            setCaptcha(generateCaptcha()); // Generate a new CAPTCHA after failure
            return;
        }

        try {
            sessionStorage.setItem("name", formValues.name);
            setIsLoading(true);
            await axios.put('http://localhost:8006/users/update', formValues);
            toast({
                title: "Success",
                description: "User data updated successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update user data.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCaptchaRefresh = () => {
        setCaptcha(generateCaptcha()); // Refresh the CAPTCHA
    };

    return (
        <Flex direction="column" p={8} bg={colorMode === 'light' ? 'white' : 'gray.800'} minH="100vh">
            <Text fontSize="2xl" as="h1" size="lg" fontWeight="bold" mb={6} textAlign="center">
                Edit Profile
            </Text>

            {isLoading ? (
                <Flex align="center" justify="center" minH="60vh">
                    <Spinner size="xl" />
                </Flex>
            ) : (
                <Grid
                    templateColumns={{ base: '1fr', md: '1fr 1fr' }}
                    gap={6}
                    maxW="8xl"
                    mx="100px"
                    bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                    p={6}
                    rounded="md"
                    shadow="md"
                >
                    <Stack spacing={4}>
                        <FormControl mb={4} isInvalid={errors.name}>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input
                                id="name"
                                name="name"
                                value={formValues.name || ''}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                isReadOnly
                            />
                            {errors.name && <Text color="red.500">{errors.name}</Text>}
                        </FormControl>
                        <FormControl mb={4} isInvalid={errors.address}>
                            <FormLabel htmlFor="address">Address</FormLabel>
                            <Input
                                id="address"
                                name="address"
                                value={formValues.address || ''}
                                onChange={handleChange}
                                placeholder="Enter your address"
                            />
                            {errors.address && <Text color="red.500">{errors.address}</Text>}
                        </FormControl>
                        <FormControl mb={4} isInvalid={errors.country}>
                            <FormLabel htmlFor="country">Country</FormLabel>
                            <Input
                                id="country"
                                name="country"
                                value={formValues.country || ''}
                                onChange={handleChange}
                                placeholder="Enter your country"
                            />
                            {errors.country && <Text color="red.500">{errors.country}</Text>}
                        </FormControl>
                        <FormControl mb={4} isInvalid={errors.state}>
                            <FormLabel htmlFor="state">State</FormLabel>
                            <Input
                                id="state"
                                name="state"
                                value={formValues.state || ''}
                                onChange={handleChange}
                                placeholder="Enter your state"
                            />
                            {errors.state && <Text color="red.500">{errors.state}</Text>}
                        </FormControl>
                        <FormControl mb={4} isInvalid={errors.district}>
                            <FormLabel htmlFor="district">District</FormLabel>
                            <Input
                                id="district"
                                name="district"
                                value={formValues.district || ''}
                                onChange={handleChange}
                                placeholder="Enter your district"
                            />
                            {errors.district && <Text color="red.500">{errors.district}</Text>}
                        </FormControl>
                    </Stack>
                    <Stack spacing={4}>
                        <FormControl mb={4} isInvalid={errors.pinCode}>
                            <FormLabel htmlFor="pinCode">Pin Code</FormLabel>
                            <Input
                                id="pinCode"
                                name="pinCode"
                                value={formValues.pinCode || ''}
                                onChange={handleChange}
                                placeholder="Enter your pin code"
                            />
                            {errors.pinCode && <Text color="red.500">{errors.pinCode}</Text>}
                        </FormControl>
                        <FormControl mb={4} isInvalid={errors.mobileNumber}>
                            <FormLabel htmlFor="mobileNumber">Mobile Number</FormLabel>
                            <Input
                                id="mobileNumber"
                                name="mobileNumber"
                                value={formValues.mobileNumber || ''}
                                onChange={handleChange}
                                placeholder="Enter your mobile number"
                                isReadOnly
                            />
                            {errors.mobileNumber && <Text color="red.500">{errors.mobileNumber}</Text>}
                        </FormControl>
                        <FormControl mb={4} isInvalid={errors.email}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formValues.email || ''}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                isReadOnly
                            />
                            {errors.email && <Text color="red.500">{errors.email}</Text>}
                        </FormControl>
                        <FormControl mb={4} isInvalid={captchaError}>
                            <FormLabel htmlFor="captcha">CAPTCHA</FormLabel>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                p={2}
                                bgGradient="linear(to-r, blue.300, pink.300)"
                                borderRadius="md"
                                border="1px"
                                borderColor={colorMode === 'light' ? 'blue.500' : 'blue.300'}
                                mb={2}
                                position="relative"
                                textAlign="center"
                            >
                                <Text
                                    fontSize="xl"
                                    fontWeight="bold"
                                    color={colorMode === 'light' ? 'white' : 'gray.800'}
                                >
                                    {captcha}
                                </Text>

                                <IconButton
                                    aria-label="Refresh CAPTCHA"
                                    icon={<FaSync />}
                                    size="sm"
                                    variant="ghost"
                                    onClick={handleCaptchaRefresh}
                                    position="absolute"
                                    top="2"
                                    right="2"
                                    colorScheme="blue"
                                />
                            </Box>
                            <Input
                                placeholder="Enter CAPTCHA"
                                value={captchaInput}
                                onChange={(e) => setCaptchaInput(e.target.value)}
                                borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
                            />
                            {captchaError && <Text color="red.500">{captchaError}</Text>}
                        </FormControl>

                        <Flex justify="center" mt={6}>
                            <Button
                                colorScheme="blue"
                                onClick={handleSubmit}
                                isLoading={isLoading}
                                spinner={<Spinner size="sm" />}
                            >
                                <CheckIcon mr={2} />
                                Update
                            </Button>
                        </Flex>
                    </Stack>
                </Grid>
            )}
        </Flex>
    );
};

export default ProfileEdit;
