const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// IMPORT MODELS
require('./models/Contact');

const app = express();

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`);
// let string1="mongodb+srv://rohan:<password>@cluster0-ltvyg.gcp.mongodb.net/test?retryWrites=true&w=majority"
// mongoose.connect(string1)

const string1="mongodb+srv://rohan:rohan123@cluster0-ltvyg.gcp.mongodb.net/test?retryWrites=true&w=majority "// add your database string here
mongoose.connect(string1,{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex: true,useFindAndModify:false}); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

//IMPORT ROUTES
require('./routes/contactRoute')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('FrontEnd/build'));

  const path = require('path');
  app.get('*', (req,res) => {
      res.sendFile(path.resolve(__dirname, 'FrontEnd', 'build', 'index.html'))
  })

}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});