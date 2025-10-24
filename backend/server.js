const express = require('express');
const cors = require('cors');
const axios = require('axios'); 

const app = express();
const PORT = 8080;


app.use(cors({
  origin: '*' 
}));

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello from the Express.js backend!');
});


 
app.post('/api/check-news', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'No text provided.' });
    }

    
    console.log('Forwarding request to Python ML service...');
    const pythonApiUrl = 'http://127.0.0.1:5000/predict'; 
    const pythonResponse = await axios.post(pythonApiUrl, {
      text: text,
    });

    
    const prediction = pythonResponse.data; 
    console.log('Received prediction:', prediction);

   
    res.json(prediction);
    
  } catch (error) {
    console.error('Error in /api/check-news:', error.message);
    if (error.code === 'ECONNREFUSED') {
      
      return res.status(500).json({ error: 'Could not connect to the Python ML service. Is it running?' });
    }
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Frontend (index.html) is separate. Backend is ready for requests.`);
  console.log(`Make sure the Python/Flask server is also running on port 5000!`);
});

