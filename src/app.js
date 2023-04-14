/*------------ Requires ------------*/
const express = require('express');
const app = express();
const mainRouter = require('./routes/mainRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const productApiRouter = require('./routes/productApiRouter');
const userApiRouter = require('./routes/userApiRouter');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const isRemembered = require('./middlewares/users/isRemembered');
const setUser = require('./middlewares/users/setUser');


/*------------ Template engine ------------*/
app.set('view engine', 'ejs');
app.set('views', './src/views');


/*------------ Middlewares ------------*/
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session( {secret: 'insertCoinTech'} ));
app.use(cookieParser());
app.use(isRemembered);
app.use(setUser);

/*------------ Route management ------------*/
app.use('/', mainRouter);
app.use('/account', userRouter); 
app.use('/products', productRouter);
app.use('/api/users', userApiRouter);
app.use('/api/products', productApiRouter);

/*------------ Execution ------------*/
app.listen( 3030, () => console.log('Server running on http://localhost:3030') );