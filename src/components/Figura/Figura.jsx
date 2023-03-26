import React from 'react';
import PropTypes from 'prop-types';
import { Center, Image, Stack } from '@chakra-ui/react';

function Figura({ image }) {
  if (image > 0) {
    return (
        <Center>
          <Stack direction='row'>
            <Image
              boxSize='200px'
              objectFit='cover'
              src={`/images/${image}.gif`}
              alt=''
            />
          </Stack>
        </Center>
    );
  }
  return <span />
}

Figura.defaultProps = {};
Figura.propTypes = {
  image: PropTypes.string.isRequired,
};
export default Figura;
