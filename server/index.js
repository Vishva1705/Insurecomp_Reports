const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
app.use(cors()); 
app.use(bodyParser.json());

const PORT = 5000;


app.get('/api/salesData', async (req, res) => {
  try {
    const response = await axios.get('https://insurecomp.com/sales-data.txt');
    res.json(response.data);
    console.log(response.data);
    
  } catch (error) {
    console.error('Error fetching sales data:', error.message);
    res.status(500).json({ message: 'Error fetching sales data' });
  }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
