
const express = require('express');
const { AudioModel } = require('../models/audio');
const Audiorouter = express.Router();


const { Storage } = require('@google-cloud/storage');

// Initialize storage
const storage = new Storage({
  keyFilename: `./curious-ellipse-415205-abc0f1a98715.json`,
});

const bucketName = 'eksaqbucket';
const bucket = storage.bucket(bucketName);


Audiorouter.post('/recordings', async (req, res) => {
  try {
    const { name, audioData } = req.body; 
    const audioBlob = Buffer.from(audioData, 'base64'); 
    const dateTime = new Date().toLocaleString().replace(/[^\w\s]/gi, '');
    const fileName = `Recording_${dateTime}.wav`;

    const file = bucket.file(fileName);
    await file.save(audioBlob);

    // Making file public to the internet
    await file.makePublic();

    const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
    console.log(`Public URL for ${fileName}: ${publicUrl}`);

    const newRecording = new AudioModel({ name, audioUrl: publicUrl });
    const savedRecording = await newRecording.save();
    res.status(200).send({ savedRecording });
  } catch (error) {
    console.error('Error uploading recording:', error);
    res.status(500).send({ error: 'Error uploading recording' });
  }
});

// Route for fetching all recordings
Audiorouter.get('/', async (req, res) => {
  try {
    const recordings = await AudioModel.find();
    res.status(200).send({recordings});
  } catch (error) {
    console.error('Error fetching recordings:', error);
    res.status(500).send({ error: 'Error fetching recordings' });
  }
});

module.exports = {Audiorouter};
