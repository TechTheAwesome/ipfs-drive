import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import FileStore from './components/Store/FileStore';
import NavBar from './components/NavBar';
import Setup from './components/Setup';
import Drive from './components/Drive/Drive';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Setup />}/>
          <Route path='store' element={<FileStore/>}/>
          <Route path='drive' element={<Drive />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
