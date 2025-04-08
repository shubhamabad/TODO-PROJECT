# TODO-PROJECT
# Todo List API with CLI Import (Node.js + Express)

This project is a simple, file-based RESTful API built with Node.js and Express to manage a to-do list. It supports:

- Creating, viewing, updating, and deleting tasks via API
- Importing tasks from a CSV file via a CLI script
- Optional filtering by due date
- Data persistence via a JSON file (no database required)

## Features

- **REST API Endpoints**:
  - `GET /todos` – Retrieve all tasks (with optional filtering by due date)
  - `POST /todos` – Create a new task
  - `PATCH /todos/:id` – Mark a task as completed
  - `DELETE /todos/:id` – Delete a task

- **CLI Script** (`import.js`):
  - Load todos from a CSV file
  - Normalize data (e.g., remove empty titles)
  - Simulate API call by printing formatted JSON
  - CLI flag to load custom input files: `node import.js tasks.csv`

- **Tech Stack**:
  - Node.js
  - Express
  - Native `fs` module (for file read/write)
  - In-memory + file-based data (no database)

## For Project Installation

- git clone https://github.com/your-username/TODO-PROJECT.git
- cd TODO-PROJECT
- npm install or npm i

## For Run The Server

- node index.js

## For Run CSV Import Script
- node import.js todos.csv OR node import.js

## NOTE ##
For API request/response sample please check **api-examples.http** file.

