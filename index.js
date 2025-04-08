const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
const TODO_FILE = path.join(__dirname, 'todo.json');

const getTodos = () => JSON.parse(fs.readFileSync(TODO_FILE));
const saveTodos = (todos) => fs.writeFileSync(TODO_FILE, JSON.stringify(todos, null, 2));

// Get list of all todo tasks
app.get('/todos', (req, res) => {
    try {
        const todos = getTodos();
        const { due } = req.query;

        const filtered = due ? todos.filter(t => t.dueDate === due) : todos;

        res.status(200).json({
            status: 'success',
            count: filtered.length,
            data: filtered
        });
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
});

// Create a new todo task
app.post('/todos', (req, res) => {
    const { title, dueDate } = req.body;
    if (!title) {
        return res.status(400).json({ status: 'fail', message: 'Title is required' });
    }

    const todos = getTodos();
    const newTodo = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        title,
        dueDate: dueDate || null,
        completed: false
    };
    todos.push(newTodo);
    saveTodos(todos);

    res.status(201).json({
        status: 'success',
        message: 'Todo created successfully',
        data: newTodo
    });
});


// Delete a todo task
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todos = getTodos();
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) {
        return res.status(404).json({
            status: 'fail',
            message: `Todo with ID ${id} not found`
        });
    }

    todos.splice(index, 1);
    saveTodos(todos);

    res.status(200).json({
        status: 'success',
        message: `Todo with ID ${id} deleted`
    });
});

// Update a todo status
app.patch('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todos = getTodos();
    const todo = todos.find(t => t.id === id);

    if (!todo) {
        return res.status(404).json({
            status: 'fail',
            message: `Todo with id ${id} not found`
        });
    }

    todo.completed = true;
    saveTodos(todos);

    res.status(200).json({
        status: 'success',
        message: 'Todo marked as completed',
        data: todo
    });
});

app.listen(PORT, () => {
    console.log(`Server run on http://localhost:${PORT}`);
});