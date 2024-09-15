// import { Box, Text, Heading } from '@chakra-ui/react';

// const AboutApp = () => (
//   <Box p={{ base: 4, md: 8 }} maxW="1300px" mx="auto">
//     <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} mb={6} textAlign="center">
//       About the Grievance Management System
//     </Heading>
//     <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
//       Welcome to the Grievance Management System, a platform designed to streamline the process of
//       lodging and addressing grievances within an organization or institution. Whether you're a student,
//       employee, or a stakeholder, this system offers an easy and transparent way to report issues,
//       track their resolution status, and ensure your concerns are properly addressed.
//     </Text>
//     <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
//       Our system is built to provide an intuitive user experience. With just a few clicks, you can submit
//       a grievance by filling out a simple form that captures the nature of your issue. Once submitted,
//       the system assigns it to the appropriate department or personnel for resolution. You will receive
//       regular updates about the status of your grievance, ensuring full transparency at every stage.
//     </Text>
//     <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} mb={4}>
//       How to Use the App
//     </Heading>
//     <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
//       1. <strong>Login or Register:</strong> If you're a new user, start by creating an account with your email and password.
//       Returning users can simply log in with their credentials.
//     </Text>
//     <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
//       2. <strong>Submit a Grievance:</strong> On the dashboard, click on "Submit New Grievance" and fill out the form with
//       details such as the issue type, description, and any supporting documents. Once completed, click "Submit."
//     </Text>
//     <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
//       3. <strong>Track Your Grievance:</strong> After submission, you can track the status of your grievance in real time. 
//       The system will notify you as your grievance moves from one stage to another until it's resolved.
//     </Text>
//     <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
//       4. <strong>Provide Feedback:</strong> After the issue is resolved, you will have the opportunity to provide feedback 
//       about the resolution process to help us improve our services.
//     </Text>
//     <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} mb={4}>
//       Why This System Is Useful
//     </Heading>
//     <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
//       The Grievance Management System ensures that every concern, no matter how small or large, is properly recorded and
//       attended to. By digitizing the grievance process, we ensure that no complaints are lost or forgotten, and that all 
//       grievances are handled in a timely and professional manner. It reduces paperwork, increases accountability, and provides
//       an effective way to resolve issues.
//     </Text>
//     <Text fontSize={{ base: 'md', md: 'lg' }}>
//       Transparency is key to building trust between users and the organization. With the ability to track your grievances,
//       you can rest assured that your concerns are being taken seriously, and that action is being taken. Whether it's 
//       workplace issues, academic grievances, or any other kind of problem, our system simplifies the process for you.
//     </Text>
//   </Box>
// );

// export default AboutApp;

import { Box, Text, Heading } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

const AboutApp = () => {
  const { t } = useTranslation();

  return (
    <Box p={{ base: 4, md: 8 }} maxW="1300px" mx="auto">
      <Heading as="h1" fontSize={{ base: '2xl', md: '3xl' }} mb={6} textAlign="center">
        {t('aboutApp.title')}
      </Heading>
      <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
        {t('aboutApp.welcome')}
      </Text>
      <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
        {t('aboutApp.userExperience')}
      </Text>
      <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} mb={4}>
        {t('aboutApp.howToUse')}
      </Heading>
      <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
        1. <strong>{t('aboutApp.steps.login')}</strong>
      </Text>
      <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
        2. <strong>{t('aboutApp.steps.submit')}</strong>
      </Text>
      <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
        3. <strong>{t('aboutApp.steps.track')}</strong>
      </Text>
      <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
        4. <strong>{t('aboutApp.steps.feedback')}</strong>
      </Text>
      <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} mb={4}>
        {t('aboutApp.whyUseful')}
      </Heading>
      <Text fontSize={{ base: 'md', md: 'lg' }} mb={4}>
        {t('aboutApp.usefulness')}
      </Text>
      <Text fontSize={{ base: 'md', md: 'lg' }}>
        {t('aboutApp.transparency')}
      </Text>
    </Box>
  );
};

export default AboutApp;
