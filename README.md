# User Authentication Example (Stateful)

This example demonstrates how to implement user authentication in a stateful manner using Node.js, Express, and MongoDB. 

## Prerequisites

- Node.js
- MongoDB
- npm (Node Package Manager)

## Getting Started

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/auth-example.git
    cd auth-example
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables by creating a `.env` file in the root directory with the following content:

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/auth_example
    SESSION_SECRET=your_secret_key
    ```

### Running the Application

Start the application:

```bash
npm start


The server will start on http://localhost:3000.

auth-example/
│
├── models/
│   └── User.js
├── routes/
│   ├── auth.js
├── .env
├── app.js
├── package.json
└── README.md
