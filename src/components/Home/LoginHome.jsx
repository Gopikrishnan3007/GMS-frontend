import { ChakraProvider } from '@chakra-ui/react';
import ImageCarousel from './ImageCarousel';
import AboutApp from './AboutApp';
import InfoCards from './InfoCards';
import Footer from './Footer';
import LoginNavbar from '../User/LoginNavbar';

const LoginHome = () => (
  <ChakraProvider>
    <LoginNavbar />
    <ImageCarousel />
    <AboutApp />
    <InfoCards />
    <Footer />
  </ChakraProvider>
);

export default LoginHome;
