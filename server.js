const express = require('express');
const connectDB = require('./config/db'); // Import DB connection function

const app = express();
const PORT = process.env.PORT || 3000;

// middleware

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

const logger = require('./middleware/logger');
app.use(logger);

const authMiddleware = require('./middleware/auth');

app.use('/api/products', authMiddleware, productRoutes);




connectDB(); // Connect to MongoDB

app.use(express.json());

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
