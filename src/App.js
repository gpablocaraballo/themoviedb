import React from 'react';
import Main from './components/main';
import { MovieContextProvider } from "./context/movie-context";
import './App.css';

function App() {
  return (
    <MovieContextProvider>
      <Main />
    </MovieContextProvider>
  );
}

export default App;
