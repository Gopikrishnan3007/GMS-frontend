import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './Navbar';
import ImageCarousel from './ImageCarousel';
import AboutApp from './AboutApp';
import InfoCards from './InfoCards';
import Footer from './Footer';

const HomePage = () => (
  <ChakraProvider>
    <Navbar />
    <ImageCarousel />
    <AboutApp />
    <InfoCards />
    <Footer />
  </ChakraProvider>
);

export default HomePage;
