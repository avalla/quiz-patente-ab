import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, Heading, Text,
} from '@chakra-ui/react';
import getHint from '../../services/get-hint';

function Hint({ theory }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hint, setHint] = useState({});
  useEffect(() => {
    const hint = getHint(theory)
    setHint(hint);
  }, [theory]);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Mostra suggerimento
      </Button>
      <Modal size="xl" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Suggerimento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading as='h2' size='lg' marginBottom={5}>
              {hint?.title || 'Spiacente'}
            </Heading>
            <Text color='black.500' fontSize='lg' dangerouslySetInnerHTML={{ __html: hint.description || 'Suggerimento mancante'}} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => setIsOpen(false)}>
              Chiudi
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

Hint.defaultProps = {};
Hint.propTypes = {
  theory: PropTypes.number.isRequired
};
export default Hint;
