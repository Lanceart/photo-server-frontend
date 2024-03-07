// ImageCard.jsx
import React from 'react';
import { Box, Image, IconButton, Menu, MenuButton, MenuList, MenuItem, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const ImageCard = ({ url, onDelete, onCopyKey }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleDelete = () => {
    onDelete(url);
    onClose(); // Ensure the menu closes after the action
  };

  const handleCopyKey = () => {
    onCopyKey(url);
    onClose(); // Ensure the menu closes after the action
  };
  return (
    <Box position="relative" display="inline-block">
      <Image src={url} alt="Image" borderRadius="5" />
      <Menu isOpen={isOpen}>
        <MenuButton
          as={IconButton}
          icon={<HamburgerIcon />}
          variant="ghost"
          position="absolute"
          top={2}
          right={2}
          onClick={onOpen}
          aria-label="Options"
          size="sm"
          backgroundColor="rgba(255, 255, 255, 0.6)" // Semi-transparent
        />
        <MenuList>
          <MenuItem onClick={handleDelete}>del</MenuItem>
          <MenuItem onClick={handleCopyKey}>copy</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ImageCard;
