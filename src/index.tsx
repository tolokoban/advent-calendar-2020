import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Font from 'tfw/font'
import Theme from 'tfw/theme'

import './index.css'


async function start() {
    // Set application theme.
    await Font.loadIndieFlower(true)
    Theme.apply({
        color3: "#456",
        color0: "#123",
        colorPD: "#0040dd",
        colorPL: "#56abff",
        colorS: "#ff8d1e",
        colorE: "#f44"
    })

    // Create main component.
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('ROOT')
    )
}


start()