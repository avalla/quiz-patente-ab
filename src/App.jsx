import React, { useEffect, useState } from 'react';
import {
    ChakraProvider,
    Spinner,
    Box,
    Grid,
    Flex,
    Spacer,
    Button,
    Stack,
    Text,
    useToast,
    theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher.jsx';
import Domanda from './components/Domanda';
import pickDomanda from './services/pick-domanda';
import ArgomentoPicker from './components/ArgomentoPicker';
import buildMockTest from './services/build-mock-test';
import { MOCK_TEST_VALUE } from './constants/mock-test';

function App() {
    const toast = useToast();
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [mode, setMode] = useState('practice');
    const [domanda, setDomanda] = useState(null);
    const [mockQueue, setMockQueue] = useState([]);
    const [mockIndex, setMockIndex] = useState(0);
    const [errate, setErrate] = useState([]);
    const [totali, setTotali] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setDomanda(pickDomanda());
    }, []);

    function resetTracking() {
        setErrate([]);
        setTotali(0);
    }

    function getNewDomanda() {
        setTotali((current) => current + 1);
        if (mode === 'mock') {
            const nextIndex = mockIndex + 1;
            setMockIndex(nextIndex);
            if (nextIndex < mockQueue.length) {
                setDomanda(mockQueue[nextIndex]);
            } else {
                setDomanda(null);
            }
        } else {
            setDomanda(pickDomanda(selectedChapter));
        }
    }

    function addErrate(id) {
        if (errate.indexOf(id) >= 0) {
            return;
        }
        setErrate([...errate, id]);
    }

    function exitMockTest() {
        setMode('practice');
        setMockQueue([]);
        setMockIndex(0);
        setSelectedChapter(null);
        resetTracking();
        setDomanda(pickDomanda());
    }

    function startMockTest() {
        setIsLoading(true);
        try {
            const questions = buildMockTest();
            if (!questions.length) {
                throw new Error('No questions available for the mock test.');
            }
            setMode('mock');
            setMockQueue(questions);
            setMockIndex(0);
            resetTracking();
            setSelectedChapter(null);
            setDomanda(questions[0]);
        } catch (error) {
            toast({
                title: 'Unable to start mock test',
                description: error.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
            exitMockTest();
        } finally {
            setIsLoading(false);
        }
    }

    function onChangeArgomento(value) {
        if (value === MOCK_TEST_VALUE) {
            startMockTest();
            return;
        }

        const chapterId = value === '' ? null : Number(value);
        setMode('practice');
        setMockQueue([]);
        setMockIndex(0);
        setSelectedChapter(chapterId);
        resetTracking();
        setDomanda(pickDomanda(chapterId));
    }

    const mockCompleted = mode === 'mock' && mockQueue.length > 0 && mockIndex >= mockQueue.length;
    const selectValue = mode === 'mock' ? MOCK_TEST_VALUE : (selectedChapter ?? '');
    const progress = mode === 'mock' && !mockCompleted && mockQueue.length > 0
        ? { current: mockIndex + 1, total: mockQueue.length }
        : null;
    const displayedTotali = mode === 'mock' ? mockIndex : totali;

    return (
        <ChakraProvider theme={theme}>
            <Flex p={2}>
                <Box>
                    <ArgomentoPicker
                        onChange={onChangeArgomento}
                        value={selectValue}
                        includeMockOption
                    />
                </Box>
                <Spacer />
                <Box>
                    <ColorModeSwitcher justifySelf='flex-end' />
                </Box>
            </Flex>
            <Box textAlign='center' fontSize='xl'>
                <Grid minH={500} p={3}>
                    {isLoading && <Spinner />}
                    {!isLoading && mockCompleted && (
                        <Stack spacing={4} align='center'>
                            <Text fontSize='2xl' fontWeight='bold'>
                                Mock test completed!
                            </Text>
                            <Text fontSize='lg'>
                                Correct answers: {mockQueue.length - errate.length} / {mockQueue.length}
                            </Text>
                            <Text fontSize='lg'>
                                Incorrect questions: {errate.length}
                            </Text>
                            <Stack direction='row' spacing={4}>
                                <Button colorScheme='teal' onClick={startMockTest}>
                                    Restart mock test
                                </Button>
                                <Button variant='outline' onClick={exitMockTest}>
                                    Return to practice
                                </Button>
                            </Stack>
                        </Stack>
                    )}
                    {!isLoading && !mockCompleted && domanda ?
                        <Domanda
                            totali={displayedTotali}
                            errate={errate.length}
                            progress={progress}
                            {...domanda}
                            onSuccess={getNewDomanda}
                            onError={addErrate}
                        /> :
                        !isLoading && !mockCompleted && <Spinner />
                    }
                </Grid>
            </Box>
        </ChakraProvider>
    );
}

export default App;
