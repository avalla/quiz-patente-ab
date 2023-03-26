import React, {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {ColorModeScript} from '@chakra-ui/react';
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ColorModeScript/>
        <App/>
    </StrictMode>,
)
