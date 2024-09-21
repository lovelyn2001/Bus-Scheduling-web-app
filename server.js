const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/checkout.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Checkout.html'));
})

app.get('/receipt.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'Receipt.html'));
})


// Start the server
app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });