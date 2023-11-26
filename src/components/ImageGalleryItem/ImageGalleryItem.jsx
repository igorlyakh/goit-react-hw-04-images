import Modal from 'react-modal';
import { Image, Item } from './ImageGalleryItem.styled';
import { useState } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const ImageGalleryItem = ({ photo, alt, bigImg }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return (
    <Item>
      <Image src={photo} alt={alt} onClick={toggleModal} />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Gallery item"
      >
        <img src={bigImg} alt={alt} />
      </Modal>
    </Item>
  );
};

export default ImageGalleryItem;
