/*------------ Requires ------------*/
const express = require('express');
const app = express();
const mainRouter = require('./routes/mainRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const methodOverride = require('method-override');
const session = require('express-session');
const setUser = require('./middlewares/users/setUser');

/*------------ Template engine ------------*/
app.set('view engine', 'ejs');
app.set('views', './src/views');


/*------------ Middlewares ------------*/
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session( {secret: 'insertCoinTech'} ))
app.use(setUser);

/*------------ Route management ------------*/
app.use('/', mainRouter);
app.use('/account', userRouter); 
app.use('/products', productRouter); 

/*------------ Execution ------------*/
app.listen( 3030, () => console.log('Server running on http://localhost:3030') );