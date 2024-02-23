# Audio Recorder

## Description

This is a simple web-based audio recorder application built with React. It allows users to record audio using their microphone, play back recorded audio, and view a list of previous recordings. 


## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Google Cloud Account Setup](#google-cloud-account-setup)
- [Routes](#routes)
  - [Audio Routes](#audio-routes)


## Demo

- You can see a live demo of the application here **[Link to Feature Walkthrough](https://drive.google.com/drive/folders/1Z2qgQthN_55pF5aSevIciQgnZikyL5J6?usp=sharing)**


## Features

- Record audio using the device's microphone
- Stop and playback recorded audio
- View a list of previous recordings
- Upload recordings to a server / Cloud


## Technologies Used

- Node.js
- Express.js
- MongoDB
- ReactJs
- Google Cloud


## Installation

  ### For Backend

   1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/eksaq.git
    cd backend
    ```

  2. Install dependencies:

    ```bash
    npm install
    ```

  3. Set up your MongoDB connection by creating a `.env` file in the root directory with the following content:

    ```env
    MONGOURL=your-mongodb-connection-string

 
    ```

  - Replace `your-mongodb-connection-string` with your MongoDB connection string .
  

  4. Run the application:

    ```bash
    npm run server
    ```

  The server will be running on http://localhost:8080 by default.


 ### For Frontend
 
   1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```
    
  2. Install dependencies:

    ```bash
    npm install
    ```
    
   3. Start the frontend application:
    
    ```bash
    npm start
    ```
    
   The frontend will be running on http://localhost:3000.


   This will launch the application in your default web browser. You can then use the audio recorder to record, play, and upload audio recordings.

   Please note that the current recording time is limited to 4-5 seconds. We are working on extending this limit to allow longer recordings.


## Google Cloud Account Setup

 - This application uses Google Cloud Storage for storing audio recordings. Follow the steps below to set up a Google Cloud account and obtain the necessary credentials:

   1. Create a Google Cloud Account:
       - If you don't have a Google Cloud account yet, you can create one by following the instructions on the Google Cloud website.
   2.  Create a New Project:
        - Once you've signed in to your Google Cloud Console, create a new project by navigating to the Projects page and clicking on the "Create Project" button.
   3.  Enable Google Cloud Storage API:
       - In your project dashboard, navigate to the APIs & Services > Library page. Search for "Cloud Storage API" and enable it for your project.
   4.  Create Service Account:
       - Navigate to the IAM & Admin > Service Accounts page.
       - Click on "Create Service Account" and follow the prompts to create a new service account.
       - Assign the "Storage Object Admin" role to the service account.
   5.  Generate JSON Key File:
       - After creating the service account, click on the newly created service account email.
       - Navigate to the "Keys" tab and click on "Add Key > Create new key."
       - Select the key type as JSON and click "Create." This will download a JSON file containing your credentials.
   6.  Download JSON Key File:
       - Download the JSON key file and save it securely. This file will be used for authentication in your application.


## Routes


### Audio Routes

| Method | Endpoint             | Description              | 
| ------ | ---------------------| ------------------------ | 
| GET   | `/audio/`     |      Get all the Recording from the database   |
| POST   | `/audio/recordings`        | Add audio Recording to Cloud and Database  |


