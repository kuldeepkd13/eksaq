// AudioRecorder.js
import React, { useState, useEffect,useRef } from 'react';


const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [isLoadingRecordings, setIsLoadingRecordings] = useState(true);
 
  const mediaRecorderRef = useRef(null);


  useEffect(() => {
    fetchRecordings(); 
  }, []); 


  const fetchRecordings = async () => {
    try {
      const response = await fetch('https://eksaq.onrender.com/audio/');
      const data = await response.json();
      
      setRecordings(data.recordings)
      setIsLoadingRecordings(false);
    } catch (error) {
      console.error('Error fetching recordings:', error);
    }
  };

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        const chunks = [];

        mediaRecorder.ondataavailable = event => {
          chunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = function () {
            const base64data = reader.result.split(',')[1];
            uploadAudio(base64data, `Recording_${new Date().toLocaleString().replace(/[^\w\s]/gi, '')}`);
          };
        };

        mediaRecorder.start();
        setIsRecording(true);
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  };

  const uploadAudio = async (audioData, name) => {
    try {
      const response = await fetch('https://eksaq.onrender.com/audio/recordings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, audioData })
      });
      const data = await response.json();
      console.log('Audio uploaded successfully:', data);
      setIsRecording(false);
      await fetchRecordings();
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const playRecording = (audioUrl) => {
    console.log(audioUrl);
    const audio = new Audio(audioUrl);
    audio.play();
  };

   return (
    <div className="audio-recorder">
      <h2>Audio Recorder</h2>
      <div className="controls">
        {!isRecording ? (
          <button onClick={startRecording}>Start Recording</button>
        ) : (
          <button className="recording" onClick={stopRecording}>Stop Recording</button>
        )}
      </div>
      <div className="recordings-list">
        {isLoadingRecordings ? (
          <p>Loading recordings...</p>
        ) : recordings.length > 0 ? (
          <div>
            <h3>Recordings</h3>
            {recordings.map((recording, index) => (
              <div key={index} className="audio-item">
                <span>{recording.name}</span>
                <button onClick={() => playRecording(recording.audioUrl)}>Play</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No recordings yet.</p>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;