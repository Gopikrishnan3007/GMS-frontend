// import React from 'react';
// import { motion } from 'framer-motion';

// const Error404 = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white relative overflow-hidden">
//       <div className="text-center mb-8">
//         <motion.h1
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-6xl font-bold"
//         >
//           404
//         </motion.h1>
//         <p className="text-xl">Page Not Found</p>
//       </div>

//       <motion.img
//         src="https://cdn-icons-png.flaticon.com/128/17103/17103451.png" // Replace with your ship icon path
//         alt="Ship Icon"
//         className="w-32 h-32 absolute"
//         animate={{
//           y: [0, -20, 0],
//         }}
//         transition={{
//           repeat: Infinity,
//           duration: 4,
//           ease: 'easeInOut',
//         }}
//         style={{ top: '30%', left: '10%' }}
//       />

//       {/* <motion.img
//         src="/path/to/anchor-icon.png" // Replace with your anchor icon path
//         alt="Anchor Icon"
//         className="w-24 h-24 absolute"
//         animate={{
//           rotate: [0, 360],
//         }}
//         transition={{
//           repeat: Infinity,
//           duration: 6,
//           ease: 'linear',
//         }}
//         style={{ bottom: '20%', right: '15%' }}
//       /> */}

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1 }}
//         className="mt-8"
//       >
//         <a href="/" className="text-blue-400 hover:underline">
//           Back to Home
//         </a>
//       </motion.div>
//     </div>
//   );
// };

// export default Error404;

import React from 'react';
import { Box, Heading, Text, Button, Link, useColorMode, Image, VStack, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import { Spinner } from '@chakra-ui/react';

const Error404 = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      height="100vh" 
      textAlign="center" 
      bg={colorMode === 'light' ? 'gray.50' : 'gray.800'} 
      color={colorMode === 'light' ? 'black' : 'white'} 
      position="relative"
    >
      <VStack spacing={8}>
        {/* 404 Heading with animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Heading as="h1" fontSize="9xl" fontWeight="bold">
            404
          </Heading>
        </motion.div>
        
        <Text fontSize="xl" opacity={0.8}>
          Oops! The page you're looking for does not exist.
        </Text>

        {/* Floating animated icon */}
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: 'easeInOut',
          }}
        >
          {/* <Image
            src="https://cdn-icons-png.flaticon.com/512/17103/17103451.png"
            alt="Lost Ship Icon"
            boxSize="100px"
          /> */}
        </motion.div>

        {/* Back to Home Button */}
        <Button
          leftIcon={<FaHome />}
          colorScheme="blue"
          onClick={() => {
            toast({
              title: 'Returning to Home Page.',
              status: 'info',
              duration: 2000,
              isClosable: true,
            });
            // window.location.href = '/home';
            window.history.back()
          }}
        >
          Back to Home
        </Button>

        {/* Theme Switch Button */}


        {/* Optional loading spinner */}
       
      </VStack>

      {/* Smooth animated loader in case of a network delay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity }}
        position="absolute"
        bottom="10"
        right="10"
      >
        
      </motion.div>
    </Box>
  );
};

export default Error404;
