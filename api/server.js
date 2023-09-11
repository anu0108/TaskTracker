const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
 
mongoose.connect('mongodb+srv://anuragwadhwa786:anurag110017@cluster0.lunza1v.mongodb.net/react-todo', {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
const Todo = require('./models/Todo');

app.get('/',(req,res)=>{
	res.send("Hello")
})

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();
    // console.log(todos);
	// res.json(todos);
});

app.post('/todo/new', (req, res) => {
	try
	{const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);}
	catch(err ){
		console.log(err);
	}
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});
 

app.listen(3001);