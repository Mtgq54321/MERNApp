const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/Store4', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use(express.static(path.join(__dirname, "./shop_front_end/build")))

app.get("*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./shop_front_end/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});