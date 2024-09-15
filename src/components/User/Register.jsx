

import React, { useState, useEffect } from 'react';
import {
    Box, Flex, Heading, Input, FormControl, FormLabel, Button, useToast,
    useColorMode, IconButton, Textarea, Select, Text, Stack, HStack, InputGroup,
    InputLeftElement, Divider
} from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaArrowLeft, FaGlobe, FaFlag, FaMapPin, FaCity, FaMobileAlt, FaEnvelope, FaSync } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// CAPTCHA generation function
const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = 6;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const getCurrentDateTime = () => {
    return new Date().toISOString(); // This will return the current date-time in ISO format
};

const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNumber, setmobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [generatedCaptcha, setGeneratedCaptcha] = useState(generateCaptcha());

    const [pinCode, setPincode] = useState('');
    const [pinCodeError, setPincodeError] = useState('');

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');


    const [nameError, setNameError] = useState('');
    const [mobileNumberError, setmobileNumberError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [captchaError, setCaptchaError] = useState('');

    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');

    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');

    const toast = useToast();
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();


    useEffect(() => {
        // Automatically set the createdAt and updatedAt when the component mounts
        const currentDateTime = getCurrentDateTime();
        setCreatedAt(currentDateTime);
        setUpdatedAt(currentDateTime);
    }, []);

    // Validation function
    const validateForm = () => {
        let isValid = true;
        setNameError('');
        setmobileNumberError('');
        setEmailError('');
        setPasswordError('');
        setConfirmPasswordError('');
        setCaptchaError('');

        if (!name.trim()) {
            setNameError('Name cannot be empty');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            isValid = false;
        }

        if (!pinCode.trim() || !/^\d{6}$/.test(pinCode)) {
            setPincodeError('Please enter a valid 6-digit pinCode');
            isValid = false;
        }


        if (!mobileNumber.trim() || !/^\d{10}$/.test(mobileNumber)) {
            setmobileNumberError('Please enter a valid 10-digit mobileNumber number');
            isValid = false;
        }

        if (!password.trim()) {
            setPasswordError('Password cannot be empty');
            isValid = false;
        }

        if (!username.trim()) {
            setUsernameError('Username cannot be empty');
            isValid = false;
        }



        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        }

        if (captchaInput.trim() !== generatedCaptcha) {
            setCaptchaError('Incorrect CAPTCHA, please try again.');
            setGeneratedCaptcha(generateCaptcha()); // Generate a new CAPTCHA after failure
            isValid = false;
        }

        if (!country.trim()) {
            isValid = false;
            toast({
                title: 'Country is required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }

        if (!state.trim()) {
            isValid = false;
            toast({
                title: 'State is required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }

        if (!district.trim()) {
            isValid = false;
            toast({
                title: 'District is required',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();



        if (!validateForm()) {
            toast({
                title: 'Form submission failed',
                description: 'Please fix the errors and try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            const userData = { name, email, username, gender, address, mobileNumber, password, pinCode, createdAt, updatedAt, country, state, district };
            const response = await axios.post('http://localhost:8006/users/register', userData);

            toast({
                title: 'Registration successful',
                description: `Welcome, ${name}!`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            toast({
                title: 'Registration failed',
                description: 'Something went wrong. Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleCaptchaRefresh = () => {
        setGeneratedCaptcha(generateCaptcha());
    };

    return (
        <Box
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={colorMode === 'light' ? 'gray.100' : 'gray.800'}
            p={4}
        >
            <Box
                bg={colorMode === 'light' ? 'white' : 'gray.700'}
                p={8}
                borderRadius="md"
                boxShadow="lg"
                w={{ base: 'full', sm: 'md' }}
                pos="relative"
            >
                {/* Back Button */}
                <IconButton
                    aria-label="Go back"
                    icon={<FaArrowLeft />}
                    size="lg"
                    variant="ghost"
                    onClick={() => navigate('/')}
                    pos="absolute"
                    top="4"
                    left="4"
                    colorScheme="blue"
                />

                <Stack spacing={4} mb={6} align="center">
                    {/* Login Title */}
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                        textAlign="center"
                        color={colorMode === 'light' ? 'gray.800' : 'gray.200'}
                    >
                        Register
                    </Text>
                </Stack>
                <form onSubmit={handleSubmit}>
                    <FormControl isRequired mb={4}>

                        <FormLabel>Name</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<FaUserAlt color="gray.500" />} />
                            <Input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </InputGroup>
                        {nameError && <Text color="red.500" fontSize="sm">{nameError}</Text>}
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Username</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<FaUserAlt color="gray.500" />} />
                            <Input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </InputGroup>
                        {usernameError && <Text color="red.500" fontSize="sm">{usernameError}</Text>}
                    </FormControl>


                    <FormControl isRequired mb={4}>
                        <FormLabel>Gender</FormLabel>
                        <Select
                            placeholder="Select gender"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Select>
                    </FormControl>

                    <FormControl mb={4}>
                        <FormLabel>Address</FormLabel>
                        <Textarea
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Country</FormLabel>
                        <InputGroup>
                            <InputLeftElement children={<FaGlobe color="gray.500" />} />
                            <Input
                                type="text"
                                placeholder="Enter your country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>State</FormLabel>
                        <InputGroup>
                            <InputLeftElement children={<FaFlag color="gray.500" />} />
                            <Input
                                type="text"
                                placeholder="Enter your state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>District</FormLabel>
                        <InputGroup>
                            <InputLeftElement children={<FaCity color="gray.500" />} />
                            <Input
                                type="text"
                                placeholder="Enter your district"
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                        </InputGroup>
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Pincode</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<FaMapPin color="gray.500" />} />

                            <Input
                                type="text"
                                placeholder="Enter your pinCode"
                                value={pinCode}
                                onChange={(e) => setPincode(e.target.value)}
                            />
                        </InputGroup>
                        {pinCodeError && <Text color="red.500" fontSize="sm">{pinCodeError}</Text>}
                    </FormControl>


                    <FormControl isRequired mb={4}>
                        <FormLabel>Mobile Number</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<FaMobileAlt color="gray.500" />} />
                            <Input
                                type="text"
                                placeholder="Enter your Mobile number"
                                value={mobileNumber}
                                onChange={(e) => setmobileNumber(e.target.value)}
                            />
                        </InputGroup>
                        {mobileNumberError && <Text color="red.500" fontSize="sm">{mobileNumberError}</Text>}
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Email</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<FaEnvelope color="gray.500" />} />
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </InputGroup>
                        {emailError && <Text color="red.500" fontSize="sm">{emailError}</Text>}
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<FaLock color="gray.500" />} />
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </InputGroup>
                        {passwordError && <Text color="red.500" fontSize="sm">{passwordError}</Text>}
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Confirm Password</FormLabel>
                        <InputGroup>
                            <InputLeftElement pointerEvents="none" children={<FaLock color="gray.500" />} />
                            <Input
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </InputGroup>
                        {confirmPasswordError && <Text color="red.500" fontSize="sm">{confirmPasswordError}</Text>}
                    </FormControl>

                    <Divider mb={4} />

                    {/* CAPTCHA */}
                    <FormControl isRequired mb={4}>
                        <FormLabel>CAPTCHA</FormLabel>
                        {/* <Box display="flex" alignItems="center">
                        <Text fontSize="xl" fontWeight="bold" color={colorMode === 'light' ? 'blue.600' : 'pink.300'} mr={4}>
                            {generatedCaptcha}
                        </Text>
                        <IconButton
                            aria-label="Refresh CAPTCHA"
                            icon={<FaSync />}
                            onClick={handleCaptchaRefresh}
                        />
                    </Box> */}
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
                                textDecoration="line-through"
                            >
                                {generatedCaptcha}
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
                            mt={2}
                            type="text"
                            placeholder="Enter the CAPTCHA"
                            value={captchaInput}
                            onChange={(e) => setCaptchaInput(e.target.value)}
                        />
                        {captchaError && <Text color="red.500" fontSize="sm">{captchaError}</Text>}
                    </FormControl>

                    <Button mt={4} type="submit" colorScheme="blue" width="full">Register</Button>
                </form>
            </Box>
        </Box>
    );
};

export default Register;
