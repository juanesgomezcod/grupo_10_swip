// requires
const createError = require('http-errors');
const express = require("express");
const session = require("express-session");
const cookies = require("cookie-parser");
const path = require ("path");
const app = express();
const methodOverride =  require('method-override'); 

const userLoggedMiddleware = require('./src/middlewares/userLoggedMiddleware');



app.use(session({
    secret: 'es un secreto',
    resave: false,
    saveUninitialized: false
}));

//Use del Middleware Login y cookies

app.use(cookies());
app.use(userLoggedMiddleware);

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.set('views',(path.join(__dirname ,"./src/views"))); 
app.set('view engine', 'ejs');

//Requerimos las rutas

const mainRoutes = require('./src/routes/mainRoutes');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');


//Use de las rutas

app.use('/', mainRoutes);
app.use('/', userRoutes);
app.use('/', productRoutes);


//Servidor corriendo

app.listen(3000,() => console.log("Servidor corriendo"))


module.exports = app