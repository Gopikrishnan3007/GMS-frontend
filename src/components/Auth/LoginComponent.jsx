


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaLock, FaUserAlt, FaArrowLeft, FaUserPlus, FaUserCheck, FaSync } from 'react-icons/fa';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Stack,
  Text,
  useToast,
  useColorMode,
  useBreakpointValue,
  IconButton,
  HStack,
  Link,
  Flex
} from '@chakra-ui/react';

const generateCaptcha = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const length = 6; // Length of the CAPTCHA string
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState(generateCaptcha()); // CAPTCHA value
  const [captchaInput, setCaptchaInput] = useState(''); // CAPTCHA input from the user
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const navigate = useNavigate();
  const toast = useToast();
  const { colorMode } = useColorMode();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setUsernameError('');
    setPasswordError('');
    setCaptchaError('');

    let isValid = true;

    // Check for empty inputs
    if (!username.trim()) {
      setUsernameError('Username cannot be empty');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password cannot be empty');
      isValid = false;
    }

    // Check for CAPTCHA match
    if (captchaInput.trim() !== captcha) {
      setCaptchaError('Incorrect CAPTCHA, please try again.');
      setCaptcha(generateCaptcha()); // Generate a new CAPTCHA after failure
      isValid = false;
    }

    if (!isValid) return;

    const HARD_CODED_USER = 'admin';
    const HARD_CODED_PASSWORD = '1234';
    if (username === HARD_CODED_USER && password === HARD_CODED_PASSWORD) {
      sessionStorage.setItem('id', 1);
      sessionStorage.setItem('name', "Admin");
      sessionStorage.setItem('login', "Yes");

      toast({
        title: 'Login successful',
        description: `Welcome, Admin!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });

      navigate('/admin/admindashboard');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8006/login', {
        username,
        password,
      });

      if (response.data) {
        const userData = response.data;

        switch (userData.role) {
          case 'User':
            sessionStorage.setItem('name', userData.name);
            sessionStorage.setItem('id', userData.userId);
            sessionStorage.setItem('login', "Yes");
            toast({
              title: 'Login successful',
              description: `Welcome, ${userData.name}!`,
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
            });
            navigate('/user/userdashboard');
            break;
          case 'Employee':
            sessionStorage.setItem('name', userData.name);
            sessionStorage.setItem('id', userData.employeeId);
            sessionStorage.setItem('login', "Yes");
            toast({
              title: 'Login successful',
              description: `Welcome, ${userData.name}!`,
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
            });
            navigate('/emp/empdashboard');
            break;
          case 'head':
            sessionStorage.setItem('name', userData.headName);
            sessionStorage.setItem('id', userData.departmentId);
            sessionStorage.setItem('login', "Yes");
            toast({
              title: 'Login successful',
              description: `Welcome, ${userData.name}!`,
              status: 'success',
              duration: 3000,
              isClosable: true,
              position: 'top-right',
            });
            navigate('/head/headdashboard');
            break;
          default:
            setError('Invalid username or password');
            break;
        }
      } else {
        setError('Login failed: Invalid username or password');
      }
    } catch (error) {
      setError('Login failed: Invalid username or password');
    }
  };

  const handleCaptchaRefresh = () => {
    setCaptcha(generateCaptcha()); // Refresh the CAPTCHA
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
            Login
          </Text>
        </Stack>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel
                color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
              >
                Username
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaUserAlt color="gray.500" />}
                />
                <Input
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
                  _focus={{
                    borderColor: colorMode === 'light' ? 'blue.500' : 'blue.300',
                  }}
                />
              </InputGroup>
              {usernameError && (
                <Text color="red.500" fontSize="sm">
                  {usernameError}
                </Text>
              )}
            </FormControl>

            <FormControl id="password">
              <FormLabel
                color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
              >
                Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<FaLock color="gray.500" />}
                />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  borderColor={colorMode === 'light' ? 'gray.300' : 'gray.600'}
                  _focus={{
                    borderColor: colorMode === 'light' ? 'blue.500' : 'blue.300',
                  }}
                />
              </InputGroup>
              {passwordError && (
                <Text color="red.500" fontSize="sm">
                  {passwordError}
                </Text>
              )}
            </FormControl>

            {/* CAPTCHA Section */}
            <FormControl id="captcha">
              <FormLabel
                color={colorMode === 'light' ? 'gray.700' : 'gray.300'}
              >
                CAPTCHA
              </FormLabel>
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
                _focus={{
                  borderColor: colorMode === 'light' ? 'blue.500' : 'blue.300',
                }}
              />
              {captchaError && (
                <Text color="red.500" fontSize="sm">
                  {captchaError}
                </Text>
              )}
            </FormControl>

            {error && (
              <Text color="red.500" fontSize="sm" textAlign="center">
                {error}
              </Text>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              mt={4}
              size={useBreakpointValue({ base: 'md', sm: 'lg' })}
              leftIcon={<FaUserCheck />}
              _hover={{ transform: 'scale(1.01)', transition: 'all 0.3s ease' }}
            >
              Login
            </Button>

            {/* Register Section */}
            <Flex justify="center" align="center" mt={4}>
              <Text fontSize="sm" color={colorMode === 'light' ? 'gray.600' : 'gray.400'}>
                New user?
              </Text>
              <Link
                ml={2}
                color={colorMode === 'light' ? 'blue.600' : 'blue.300'}
                fontWeight="bold"
                onClick={() => navigate('/register')}
                _hover={{
                  textDecoration: 'underline',
                  color: colorMode === 'light' ? 'blue.500' : 'blue.400',
                }}
              >
                <HStack>
                  <FaUserPlus />
                  <Text>Register here</Text>
                </HStack>
              </Link>
            </Flex>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginComponent;
