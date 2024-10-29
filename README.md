# CRM System API

This is a simple CRM system API that allows for user and client management, built using Node.js and MongoDB.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16 or higher recommended)
- **MongoDB**

### Dependencies

The following dependencies are included in this project:

```bash
dependencies: {'
    bcrypt: ^5.1.1,'
    cors: ^2.8.5,'
    dotenv: ^16.4.5,'
    express: ^4.21.1,'
    express-rate-limit: ^7.4.1,'
    express-session: ^1.18.1,'
    express-validator: ^7.2.0,'
    helmet: ^8.0.0,'
    jsonwebtoken: ^9.0.2,'
    mongodb: ^6.10.0,'
    mongoose: ^8.7.3,'
    morgan: ^1.10.0,'
    nodemailer: ^6.9.16,'
    winston: ^3.15.0,'
    winston-mongodb: ^6.0.0'
}'
```

## Installation and Setup

1. Clone the repository:
   ```bash
   gh repo clone nagiyev9/Mobile_Group_Task
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   npm start
   ```

4. Create a \`.env\` file in the root directory and set the following environment variables:
   ```bash
   MONGO_URI=<your_mongo_uri>
   JWT_SECRET_KEY=<your_jwt_secret>
   EMAIL_USER=<your_email_user>
   EMAIL_PASS=<your_email_password>
   ```

## Database Schema

### Client Requirements

```javascript
const ClientSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    client_name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
});
```

### User Requirements

```javascript
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: [\super user\, \user\]
    },
    password: {
        type: String,
        required: true,
    }
});
```

## API Endpoints

### Authentication

- **Sign Up**:  \`POST http://localhost:5000/api/auth/signup`

- **Confirm Account**:  \`POST http://localhost:5000/api/auth/signup/confirm`

- **Login**:  \`POST http://localhost:5000/api/auth/login`

### Client Management

- **Get All Clients**:  \`GET http://localhost:5000/api/client/all`

- **Get One Client**:  \`GET http://localhost:5000/api/client?clientID=...`

- **Add Client**:  \`POST http://localhost:5000/api/client/add`

## Authentication

The API uses JWT tokens for authentication. Protected routes require a valid token to access.

## Error Handling

Winston is used for error handling, and all errors are logged to the database for further analysis.

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
