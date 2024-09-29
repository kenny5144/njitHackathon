const express = require('express');
const cors = require('cors');
require('dotenv').config();

const uploadRoutes = require('./routes/uploadRoutes'); 
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.use('/', uploadRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
