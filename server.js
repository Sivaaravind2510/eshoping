// const express = require('express');
// const app = express();
// app.use(express.json());
// let todo =[];
// app.post('/todo', (req, res)=>{
// const[{title, description}]=req.body;
// const newTodo={
//  id:todo.length+1,
//  title:title,
//  description:description};
// todo.push(newTodo);
// console.log(todo);wwwwwwwww
// res.status(201).json(newTodo);
// });
// const port =3000;
// app.listen(port, ()=>{
//     console.log('server is listen on port '+port);
//  });
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connecting to MongoDB
mongoose.connect('mongodb://localhost:27017/mern-app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('DB connected!');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

// Creating the schema
const toSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String
  },
  description: String
});

// Creating model
const To = mongoose.model('To', toSchema);

// Create a new todo item
app.post('/to', async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTo = new To({ title, description });
    await newTo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all items
app.get('/to', async (req, res) => {
  try {
    const to = await To.find();
    res.json(to);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ message: error.message });
  }
});

// Delete a todo item by ID
app.delete('/to/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Todo.findByIdAndDelete(id);
    if (result) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ message: error.message });
  }
});

// Start the server
const port = 3002;
app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
