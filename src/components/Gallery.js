
import React, { useState, useEffect } from 'react';
import { Image} from '@chakra-ui/react';
import ImageCard from './Cards';
import { SimpleGrid } from '@chakra-ui/react';
const Gallery = () => {
  const [items, setItems] = useState([]);

  
  const breakpointColumnsObj = {
    default: 3, // 默认三列
    1100: 3, // 浏览器宽度在1100px以上时三列
    700: 2, // 700px到1100px之间时两列
    500: 1, // 500px以下时一列
  };
  useEffect(() => {
    fetch('https://7cepehhnii.execute-api.us-west-1.amazonaws.com/v1/images')
      .then(response => response.json())
      .then(data => {
        const urls = data.map(item => constructImageUrl(item.id.S + '_low.jpg'));
        console.log(urls);
        setItems(urls);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []); // Empty dependency array means this effect runs once on mount
  const handleDelete = (url) => {
    console.log('Deleting', url);

    // Implement your delete logic here
  };
  const handleCopyKey = (key) => {
    if (!navigator.clipboard) {
        // navigator.clipboard API 不可用
        console.error('Clipboard API is not available.');
        return;
      }
    
      navigator.clipboard.writeText(key).then(() => {
        console.log('Key copied to clipboard:', key);
        // 显示用户反馈，如通知消息等
        // 例如：toast('Key copied successfully!')
      }).catch(err => {
        console.error('Failed to copy key to clipboard:', err);
      });
    // console.log('Copying key for', url);
    // Implement your copy key logic here
  };
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={4}>
      {items.map(url => (
        // <Image borderRadius="5" src={url} alt="Image" key={url} />
        <ImageCard url={url} key={url} onDelete={handleDelete} onCopyKey={handleCopyKey} />
      
      ))}
    </SimpleGrid>
    
  );
};

// Example function to construct image URL from key
// Adjust this function based on how your image URLs need to be constructed
function constructImageUrl(key) {
  // For demonstration purposes, assuming the key is the URL
  // In a real scenario, you might need to prepend a base URL or add a file extension
  return 'https://7cepehhnii.execute-api.us-west-1.amazonaws.com/v1/image?imageid=' + `${key}`;
}

export default Gallery;
