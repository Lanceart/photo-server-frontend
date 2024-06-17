import {
  Box,
  Button,
  CircularProgress,
  Image,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import useMutation from '../hooks/useMutation';
import useQuery from '../hooks/useQuery';
import Gallery from './Gallery';

const validFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
const URL = '/image';

const ErrorText = ({ children, ...props }) => (
  <Text fontSize="lg" color="red.300" {...props}>
    {children}
  </Text>
);

const Posts = () => {
  const [refetch, setRefetch] = useState(0);
  const {
    mutate: uploadImage,
    isLoading: uploading,
    error: uploadError,
  } = useMutation({ url: URL });

  const [error, setError] = useState('');

  const handleUpload = async e => {
    const file = e.target.files[0];

    if (!validFileTypes.includes(file.type)) {
      setError('File must be in JPG/PNG format');
      return;
    }

    const reader = new FileReader();


    try {
      const response = await fetch(process.env.REACT_APP_API_URL + '/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: file,
      });
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      setRefetch((s) => s + 1);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image');
    }


    // reader.onloadend = async () => {
    //   console.log('show me the fuck', reader.result)
    //   const base64String = reader.result.split(',')[1];
    //   console.log("Base64 String:", base64String);
    //   try {
    //     const response = await fetch(process.env.REACT_APP_API_URL + '/image', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //       body: atob(base64String),
    //     });
    //     if (!response.ok) {
    //       throw new Error('Failed to upload image');
    //     }
    //     setRefetch((s) => s + 1);
    //   } catch (err) {
    //     console.error('Upload error:', err);
    //     setError('Failed to upload image');
    //   }

    //   // try {
    //   //   await uploadImage({ file: base64String });
    //   //   setTimeout(() => {
    //   //     setRefetch(s => s + 1);
    //   //   }, 1000);
    //   // } catch (err) {
    //   //   console.error("Upload error:", err);
    //   //   setError('Failed to upload image');
    //   // }
    // };
    // reader.readAsDataURL(file);
  };

  return (
    <Box mt={6}>
      <Input id="imageInput" type="file" hidden onChange={handleUpload} />
      <Button
        as="label"
        htmlFor="imageInput"
        colorScheme="blue"
        variant="outline"
        mb={4}
        cursor="pointer"
        isLoading={uploading}
      >
        Upload
      </Button>
      {error && <ErrorText>{error}</ErrorText>}
      {uploadError && <ErrorText>{uploadError.message}</ErrorText>}

      <Text textAlign="left" mb={4}>
        Posts
      </Text>

      <Gallery refetch={refetch} />
    </Box>
  );
};

export default Posts;
