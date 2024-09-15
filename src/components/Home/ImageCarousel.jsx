// // import { Box } from '@chakra-ui/react';
// // import { Carousel } from 'react-responsive-carousel';
// // import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
// // import {image1} from './Grievance.jpg'

// // const ImageCarousel = () => (
// //   <Box mt={4}>
// //     <Carousel>
// //       <div><img src="https://cdndailyexcelsior.b-cdn.net/wp-content/uploads/2022/11/Grievance.jpg" alt="Image 1" /></div>
// //       <div><img src="https://cdndailyexcelsior.b-cdn.net/wp-content/uploads/2022/11/Grievance.jpg" alt="Image 2" /></div>
// //       <div><img src="https://cdndailyexcelsior.b-cdn.net/wp-content/uploads/2022/11/Grievance.jpg" alt="Image 3" /></div>
// //       <div><img src="https://cdndailyexcelsior.b-cdn.net/wp-content/uploads/2022/11/Grievance.jpg" alt="Image 4" /></div>
// //       <div><img src="https://cdndailyexcelsior.b-cdn.net/wp-content/uploads/2022/11/Grievance.jpg" alt="Image 5" /></div>
// //     </Carousel>
// //   </Box>
// // );
// // export default ImageCarousel;

// import { Box, Text, useBreakpointValue } from '@chakra-ui/react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

// const ImageCarousel = () => {
//   const imgSize = useBreakpointValue({ base: '250px', md: '400px', lg: '500px' });

//   return (
//     <Box mt={4} w="100%" maxW="1200px" mx="auto" boxShadow="lg" borderRadius="lg" overflow="hidden">
//       <Carousel 
//         showArrows={true}
//         infiniteLoop={true}
//         showThumbs={false}
//         autoPlay={true}
//         interval={3000}
//         stopOnHover={true}
//         showStatus={false}
//       >
//         {[1, 2, 3, 4, 5].map((index) => (
//           <Box 
//             key={index} 
//             position="relative" 
//             h={imgSize} 
//             bg="gray.100"
//             display="flex" 
//             justifyContent="center" 
//             alignItems="center"
//           >
//             <img 
//               src={`https://cdndailyexcelsior.b-cdn.net/wp-content/uploads/2022/11/Grievance.jpg`}
//               alt={`Image ${index}`} 
//               style={{
//                 height: '100%',
//                 width: '100%',
//                 objectFit: 'cover',
//                 borderRadius: 'lg',
//               }}
//             />
//             {/* Overlay text */}
//             <Text 
//               position="absolute"
//               bottom="20px"
//               left="20px"
//               bg="rgba(0, 0, 0, 0.5)"
//               color="white"
//               px={3}
//               py={1}
//               borderRadius="md"
//               fontSize="lg"
//               fontWeight="bold"
//             >
//               Grievance Management {index}
//             </Text>
//           </Box>
//         ))}
//       </Carousel>
//     </Box>
//   );
// };

// export default ImageCarousel;

import { Box, Text, useBreakpointValue } from '@chakra-ui/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import  img1  from './img1.jpg'
import  img2  from './img2.jpg'
import  img3  from './img3.jpg'




const images = [
   img1,
   img2,
   img3,
   img2,
   img1
];

const ImageCarousel = () => {
  const imgSize = useBreakpointValue({ base: '250px', md: '400px', lg: '500px' });

  return (
    <Box mt={4} w="100%" maxW="1200px" mx="auto" boxShadow="lg" borderRadius="lg" overflow="hidden">
      <Carousel 
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        autoPlay={true}
        interval={3000}
        stopOnHover={true}
        showStatus={false}
      >
        {images.map((image, index) => (
          <Box 
            key={index} 
            position="relative" 
            h={imgSize} 
            bg="gray.100"
            display="flex" 
            justifyContent="center" 
            alignItems="center"
          >
            <img 
              src={image}
              alt={`Image ${index + 1}`} 
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                borderRadius: 'lg',
              }}
            />
            {/* Overlay text */}
            {/* <Text 
              position="absolute"
              bottom="20px"
              left="20px"
              bg="rgba(0, 0, 0, 0.5)"
              color="white"
              px={3}
              py={1}
              borderRadius="md"
              fontSize="lg"
              fontWeight="bold"
            >
              Grievance Management {index + 1}
            </Text> */}
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default ImageCarousel;
