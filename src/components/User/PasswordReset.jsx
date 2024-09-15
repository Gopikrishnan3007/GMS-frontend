import React, { useState, useEffect } from 'react';
import {
    Box, Flex, Text, Input, Button, useToast, useColorMode, FormControl, FormLabel, Grid, Spinner, IconButton, Stack, FormErrorMessage
} from '@chakra-ui/react';
import { SunIcon, MoonIcon, CheckIcon } from '@chakra-ui/icons';
import { FaSync } from 'react-icons/fa'; // Importing from react-icons
import axios from 'axios';

// Function to generate CAPTCHA
const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 6;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const PasswordReset = () => {
    const [formValues, setFormValues] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [captcha, setCaptcha] = useState(generateCaptcha()); // CAPTCHA value
    const [captchaInput, setCaptchaInput] = useState(''); // CAPTCHA input from the user
    const [captchaError, setCaptchaError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const { colorMode } = useColorMode();
    const toast = useToast();
    const userId = sessionStorage.getItem('id');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8006/users/${userId}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch user details',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
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
        if (!formValues.oldPassword) newErrors.oldPassword = "Old password is required";
        if (!formValues.newPassword) newErrors.newPassword = "New password is required";
        if (formValues.newPassword.length < 8) newErrors.newPassword = "New password must be at least 8 characters";
        if (formValues.newPassword !== formValues.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        if (user && formValues.oldPassword !== user.password) newErrors.oldPassword = "Old password is incorrect";
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
            setIsLoading(true);
            await axios.put('http://localhost:8006/users/update', {
                ...user,
                password: formValues.newPassword, // Update with the new password
            });
            toast({
                title: "Success",
                description: "Password reset successfully.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            setFormValues({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
            setCaptcha(generateCaptcha()); // Refresh CAPTCHA on success
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to reset password.",
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
            <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
                Reset Password
            </Text>

            <Grid
                gap={6}
                maxW="8xl"
                mx="200px"
                bg={colorMode === 'light' ? 'gray.100' : 'gray.700'}
                p={6}
                rounded="md"
                shadow="md"
            >
                <FormControl mb={4} isInvalid={errors.oldPassword}>
                    <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
                    <Input
                        id="oldPassword"
                        name="oldPassword"
                        type="password"
                        value={formValues.oldPassword}
                        onChange={handleChange}
                        placeholder="Enter your old password"
                    />
                    {errors.oldPassword && <FormErrorMessage>{errors.oldPassword}</FormErrorMessage>}
                </FormControl>

                <FormControl mb={4} isInvalid={errors.newPassword}>
                    <FormLabel htmlFor="newPassword">New Password</FormLabel>
                    <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={formValues.newPassword}
                        onChange={handleChange}
                        placeholder="Enter a new password"
                    />
                    {errors.newPassword && <FormErrorMessage>{errors.newPassword}</FormErrorMessage>}
                </FormControl>

                <FormControl mb={4} isInvalid={errors.confirmPassword}>
                    <FormLabel htmlFor="confirmPassword">Confirm New Password</FormLabel>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formValues.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your new password"
                    />
                    {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>}
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
                        Reset Password
                    </Button>
                </Flex>
            </Grid>
        </Flex>
    );
};

export default PasswordReset;
