const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const fileArg = process.argv[2] || 'todos.csv';
const filePath = path.join(__dirname, fileArg);

const generateRandomDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + Math.floor(Math.random() * 7));
    return today.toISOString().split('T')[0];
};

const simulatedApiCall = (todo) => {
    console.log('Simulating API Call →', JSON.stringify(todo, null, 2));
};

const cleanAndSendTodos = () => {
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            if (!row.title || row.title.trim() === '') return;
            results.push({
                title: row.title.trim(),
                dueDate: row.dueDate && row.dueDate.trim() !== '' ? row.dueDate : generateRandomDate(),
                completed: false
            });
        })
        .on('end', () => {
            console.log("Processed todo csv file");
            results.forEach(simulatedApiCall);
        });
};

cleanAndSendTodos();