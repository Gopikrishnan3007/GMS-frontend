import { Flex, Link } from '@chakra-ui/react';

const Footer = () => (
  <Flex as="footer" p={4} justify="center">
    <Link href="/" mr={4}>Home</Link>
    <Link href="/about" mr={4}>About Us</Link>
    <Link href="/contact" mr={4}>Contact Us</Link>
    <Link href="/qa">Q/A</Link>
  </Flex>
);

export default Footer;
