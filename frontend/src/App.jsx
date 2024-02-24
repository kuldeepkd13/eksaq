
import React from 'react';
import AudioRecorder from './component/AudioRecorder';
import './App.css';



import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <AudioRecorder />
      <ToastContainer />
    </div>
  );
}

export default App;

