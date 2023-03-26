import React, { useEffect, useState } from 'react';
import {
    ChakraProvider,
    Spinner,
    Box,
    Grid,
    Flex,
    Spacer,
    theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher.jsx';
import Domanda from './components/Domanda';
import pickDomanda from './services/pick-domanda';
import ArgomentoPicker from './components/ArgomentoPicker';

function App() {
    const [argomento, setArgomento] = useState(null);
    const [domanda, setDomanda] = useState(null);
    const [errate, setErrate] = useState([]);
    const [totali, setTotali] = useState(0);
    useEffect(() => {
        setDomanda(pickDomanda(argomento));
    }, [])
    function getNewDomanda() {
        setDomanda(pickDomanda(argomento));
        setTotali(totali+1);
    }
    function addErrate(id) {
        if (errate.indexOf(id) >= 0) {
            return;
        }
        setErrate([...errate, id]);
    }
    function onChangeArgomento(id) {
        setDomanda(pickDomanda(id));
        setArgomento(id);
    }
    return (
        <ChakraProvider theme={theme}>
            <Flex p={2}>
                <Box>
                    <ArgomentoPicker onChange={onChangeArgomento} />
                </Box>
                <Spacer />
                <Box>
                    <ColorModeSwitcher justifySelf='flex-end' />
                </Box>
            </Flex>
            <Box textAlign='center' fontSize='xl'>
                <Grid minH={500} p={3}>
                    {domanda ?
                        <Domanda
                            totali={totali}
                            errate={errate.length}
                            {...domanda}
                            onSuccess={getNewDomanda}
                            onError={addErrate}
                        /> :
                        <Spinner />
                    }
                </Grid>
            </Box>
        </ChakraProvider>
    );
}

export default App;
