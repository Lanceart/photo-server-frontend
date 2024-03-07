import { Box, Image, Text, VStack } from '@chakra-ui/react';
import Posts from './Posts';
import icon from './IMG_2034.jpg'
const Profile = () => {
  return (
    <Box>
      <VStack p={7} m="auto" width="fit-content" borderRadius={6} bg="gray.700">
        <Image
          borderRadius="full"
          boxSize="80px"
          src={icon}
          alt="Profile"
        />
        <Text>Linqing (Cyan) Li</Text>
        <Text fontSize="lg" color="gray.400">
          Software Engineer
        </Text>
      </VStack>

      <Posts />
    </Box>
  );
};
export default Profile;
