const express = require('express');
const app = express();
const fortune = require('./lib/fortune');

//set up handlebars view engine
const handlebars = require('express-handlebars')
			.create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


//Note: order in which routes and middleware are added is significant

//routes
app.get('/',(req,res)=>{
	res.render('home');
});

app.get('/about', (req,res)=>{
	res.render('about', {fortune: fortune.getFortune()});
});

	

//middleware
app.use(express.static('public'));


//middleware
//custom 404 page
app.use((req,res,next)=>{									//app.use is a method which express adds middleware
	res.status(404);
	res.render('404');
});

//middleware
//custom 500 page											//notice we use app.use for custom pages 404 and 500
app.use((err,req,res,next)=>{
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
	console.log(`listening on port ${port}`);
})