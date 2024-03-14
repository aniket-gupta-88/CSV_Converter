const express = require('express');
const convertCsvToJson = require('./Converter.js');
const { insertData } = require('./dbAction.js');

const app = express()

const csvFilePath = "./demo_data.csv";

app.get('/', (req, res) => {
    res.send('Welcome to CSV Converter!');
  });

app.get('/convert', async (req, res) => {
    try {
        const jsonData = convertCsvToJson(csvFilePath);
        await insertData(jsonData)
        const formattedJsonData = JSON.stringify(jsonData, null, 2);
        res.send(formattedJsonData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})