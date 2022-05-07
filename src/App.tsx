import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom'
import FileStore from './components/FileStore';
import Keys from './components/Keys';
import NavBar from './components/NavBar';
import Setup from './components/Setup';

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
          <Route path='drive' element={<FileStore/>}/>
          <Route path='keys' element={<Keys/>}/>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  );
}
export default App;
