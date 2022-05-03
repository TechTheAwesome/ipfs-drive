import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'
import Drive from './components/Drive';
import Keys from './components/Keys';
import NavBar from './components/NavBar';
import Setup from './components/Setup';
import { InitializeIPFS } from './ipfs/client';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Setup />}/>
          <Route path='drive' element={<Drive/>}/>
          <Route path='keys' element={<Keys/>}/>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
InitializeIPFS();

export default App;
