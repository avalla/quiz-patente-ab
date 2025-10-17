import React from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Center,
  Button,
  Container,
  useToast,
  Heading,
  Text,
} from '@chakra-ui/react';
import Hint from '../Hint/Hint';
import Figura from '../Figura/Figura';

function Domanda({
  id,
  id_chapter,
  argomento,
  image,
  question,
  answer,
  theory,
  totali,
  errate,
  progress,
  onSuccess,
  onError,
}) {
  const toast = useToast();

  function clickHandler(value) {
    return function() {
      if (answer === value) {
        toast({
          title: 'Esatto',
          status: 'success',
          duration: 700,
        });
        onSuccess();
      } else {
        toast({
          title: 'Sbagliato :(',
          status: 'error',
          duration: 700,
        });
        onError(id);
      }
    };
  }

  return (
    <>
      <Container w='full'>
        {progress && (
          <Text fontSize='md' marginBottom={1}>
            Question {progress.current} / {progress.total}
          </Text>
        )}
        <Text fontSize='2xl' marginBottom={3}>
          <strong>{totali}</strong> domande | <strong>{errate}</strong> errate
        </Text>
        <Text fontSize="md" marginBottom={3}>
          Domanda: {id}
        </Text>
        <Heading as='h2' size='md' marginBottom={3}>
          {id_chapter}. {argomento}
        </Heading>
        <Figura image={image} marginBottom={5} />
        <Text fontSize="2xl">
          {question}
        </Text>
        <Center marginTop={10} marginBottom={5}>
          <Stack direction='row'>
            <Button colorScheme='red' size='lg' onClick={clickHandler(0)}>
              Falso
            </Button>
            <Button colorScheme='green' size='lg' onClick={clickHandler(1)}>
              Vero
            </Button>
          </Stack>
        </Center>
        <Hint theory={theory} />
      </Container>
      <Container>
      </Container>
    </>
  );
}

Domanda.defaultProps = {
  progress: null,
};
Domanda.propTypes = {
  id: PropTypes.number.isRequired,
  id_chapter: PropTypes.number.isRequired,
  theory: PropTypes.number.isRequired,
  argomento: PropTypes.string.isRequired,
  image: PropTypes.string,
  question: PropTypes.string.isRequired,
  answer: PropTypes.number.isRequired,
  totali: PropTypes.number.isRequired,
  errate: PropTypes.number.isRequired,
  progress: PropTypes.shape({
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }),
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};
export default Domanda;
