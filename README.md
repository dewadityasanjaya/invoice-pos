# Invoice Point Of Sales System

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This is a fullstack web application built using React.js and Redux for the frontend, Node.js for the backend, and MySQL/PostgreSQL for the database. The application aims to provide a robust and scalable solution for an invoice module feature of a Point of Sales System.

## Features

- CRUD operations
- State management with Redux
- Responsive design with React.js
- RESTful API with Node.js
- Persistent data storage with PostgreSQL

## Technologies Used

### Frontend

- React.js
- Redux
- Axios

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL

## Installation

### Prerequisites

- Node.js
- npm
- PostgreSQL

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/dewadityasanjaya/invoice-pos.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd invoice-pos/backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure the database connection in `.env` file:
   ```env
   DB_HOST=your_database_host
   DB_PORT=5432
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```
5. Run the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the API endpoint in the environment file if necessary:
   ```env
   REACT_APP_API_URL=http://localhost:3001
   ```
4. Run the frontend server:
   ```bash
   npm start
   ```

### Database Setup

To set up the database, follow these instructions:

1. Create the Database
   Ensure that PostgreSQL is installed and running on your system.
   Use the database_setup.sql file in the database folder to create the necessary database and tables.

2. Run the Initialization Script
   Access your PostgreSQL instance using the command line or a GUI tool.
   Execute the database_setup.sql script:
   ```bash
   psql -U your_database_user -d your_database_name -f path/to/database_setup.sql database_setup.sql
   ```
   This SQL script will create the necessary database schema and tables. You can find this file in the database folder of the project.

## Usage

1. Ensure the backend server is running on `http://localhost:3001`.
2. Ensure the frontend server is running on `http://localhost:3000`.
3. Open your browser and navigate to `http://localhost:3000` to access the application.

## Folder Structure

```
invoice-pos/
│
├── backend/
│   ├── node_modules/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── index.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.css
│   │   └── index.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
├── database/
│   ├── database_setup.sql
│   └── README.md
│
└── README.md
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
