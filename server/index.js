const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const Customer = require('./models/customers');
const FakeDb = require('./fake-db');

const customerRoutes = require('./routes/customers');

mongoose.connect(config.DB_URI, { useNewUrlParser: true }).then(() => {
    const fakeDb = new FakeDb();
    fakeDb.seedDb();
});

//instantiate Express
const app = express();

app.use('/api/v1/customers', customerRoutes);

//routes
app.get('/rentals', function(req, res){
    res.json({'success': true});
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, function(){
    console.log('I am running!');
});