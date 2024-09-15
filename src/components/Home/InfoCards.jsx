
// import { Box, Stack, Text, Button, Link, Icon, useColorMode } from '@chakra-ui/react';
// import { FaSignInAlt, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';

// const InfoCards = () => {
//   const { colorMode } = useColorMode();
//   const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.700';
//   const textColor = colorMode === 'light' ? 'gray.600' : 'gray.300';

//   return (
//     <Stack
//       direction={{ base: 'column', md: 'row' }}
//       spacing={8}
//       p={8}
//       justify="center"
//       align="center"
//     >
//       {/* Login Card */}
//       <Box
//         p={6}
//         shadow="lg"
//         borderWidth="1px"
//         borderRadius="lg"
//         transition="transform 0.2s"
//         _hover={{ transform: 'scale(1.05)' }}
//         bg={bgColor}
//         textAlign="center"
//         maxW="sm"
//         w="full"
//       >
//         <Icon as={FaSignInAlt} boxSize={10} color="blue.500" mb={4} />
//         <Text fontSize="2xl" fontWeight="bold" mb={2}>
//           Login
//         </Text>
//         <Text fontSize="md" color={textColor} mb={4}>
//           Access your account and manage your grievances.
//         </Text>
//         <Button
//           as={Link}
//           to="/login"
//           colorScheme="blue"
//           variant="solid"
//           size="lg"
//         >
//           Go to Login
//         </Button>
//       </Box>

//       {/* About Us Card */}
//       <Box
//         p={6}
//         shadow="lg"
//         borderWidth="1px"
//         borderRadius="lg"
//         transition="transform 0.2s"
//         _hover={{ transform: 'scale(1.05)' }}
//         bg={bgColor}
//         textAlign="center"
//         maxW="sm"
//         w="full"
//       >
//         <Icon as={FaInfoCircle} boxSize={10} color="green.500" mb={4} />
//         <Text fontSize="2xl" fontWeight="bold" mb={2}>
//           About Us
//         </Text>
//         <Text fontSize="md" color={textColor} mb={4}>
//           Learn more about how our system can help resolve your concerns.
//         </Text>
//         <Button
//           as={Link}
//           to="/about"
//           colorScheme="green"
//           variant="solid"
//           size="lg"
//         >
//           Learn More
//         </Button>
//       </Box>

//       {/* Contact Us Card */}
//       <Box
//         p={6}
//         shadow="lg"
//         borderWidth="1px"
//         borderRadius="lg"
//         transition="transform 0.2s"
//         _hover={{ transform: 'scale(1.05)' }}
//         bg={bgColor}
//         textAlign="center"
//         maxW="sm"
//         w="full"
//       >
//         <Icon as={FaPhoneAlt} boxSize={10} color="red.500" mb={4} />
//         <Text fontSize="2xl" fontWeight="bold" mb={2}>
//           Contact Us
//         </Text>
//         <Text fontSize="md" color={textColor} mb={4}>
//           Get in touch with our support team for any assistance.
//         </Text>
//         <Button
//           as={Link}
//           to="/contact"
//           colorScheme="red"
//           variant="solid"
//           size="lg"
//         >
//           Contact Support
//         </Button>
//       </Box>
//     </Stack>
//   );
// };

// export default InfoCards;

import { Box, Stack, Text, Button, Link, Icon, useColorMode } from '@chakra-ui/react';
import { FaSignInAlt, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const InfoCards = () => {
  const { colorMode } = useColorMode();
  const { t } = useTranslation();
  const bgColor = colorMode === 'light' ? 'gray.50' : 'gray.700';
  const textColor = colorMode === 'light' ? 'gray.600' : 'gray.300';

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing={8}
      p={8}
      justify="center"
      align="center"
    >
      {/* Login Card */}
      <Box
        p={6}
        shadow="lg"
        borderWidth="1px"
        borderRadius="lg"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.05)' }}
        bg={bgColor}
        textAlign="center"
        maxW="sm"
        w="full"
      >
        <Icon as={FaSignInAlt} boxSize={10} color="blue.500" mb={4} />
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          {t('infoCards.login.title')}
        </Text>
        <Text fontSize="md" color={textColor} mb={4}>
          {t('infoCards.login.description')}
        </Text>
        <Button
          as={Link}
          to="/login"
          colorScheme="blue"
          variant="solid"
          size="lg"
        >
          {t('infoCards.login.buttonText')}
        </Button>
      </Box>

      {/* About Us Card */}
      <Box
        p={6}
        shadow="lg"
        borderWidth="1px"
        borderRadius="lg"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.05)' }}
        bg={bgColor}
        textAlign="center"
        maxW="sm"
        w="full"
      >
        <Icon as={FaInfoCircle} boxSize={10} color="green.500" mb={4} />
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          {t('infoCards.aboutUs.title')}
        </Text>
        <Text fontSize="md" color={textColor} mb={4}>
          {t('infoCards.aboutUs.description')}
        </Text>
        <Button
          as={Link}
          to="/about"
          colorScheme="green"
          variant="solid"
          size="lg"
        >
          {t('infoCards.aboutUs.buttonText')}
        </Button>
      </Box>

      {/* Contact Us Card */}
      <Box
        p={6}
        shadow="lg"
        borderWidth="1px"
        borderRadius="lg"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.05)' }}
        bg={bgColor}
        textAlign="center"
        maxW="sm"
        w="full"
      >
        <Icon as={FaPhoneAlt} boxSize={10} color="red.500" mb={4} />
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          {t('infoCards.contactUs.title')}
        </Text>
        <Text fontSize="md" color={textColor} mb={4}>
          {t('infoCards.contactUs.description')}
        </Text>
        <Button
          as={Link}
          to="/contact"
          colorScheme="red"
          variant="solid"
          size="lg"
        >
          {t('infoCards.contactUs.buttonText')}
        </Button>
      </Box>
    </Stack>
  );
};

export default InfoCards;
