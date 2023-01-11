const express = require('express');
const app = express();
const path = require('path');
const mainRouter = require('./routes/mainRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.static('public'));

app.listen( 3030, () => console.log('Server running on http://localhost:3030') );


app.use('/', mainRouter);

app.use('/account', userRouter); 

app.use('/products', productRouter); 