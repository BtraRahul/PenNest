# Blog Platform

This project is a full-stack web application for a blog platform that allows users to create, view, search, and interact with blog posts. The platform is designed with a modern tech stack, featuring a React-based frontend and an Express.js backend, integrated with MongoDB for data storage and Firebase for image storage.

## Features

- **User Authentication**: Users can sign up, log in, and manage their profiles.
- **Blog Post Creation**: Users can create new blog posts with text and images.
- **Search Functionality**: Users can search for blog posts by title, author, description, or category.
- **Commenting System**: Users can comment on blog posts.
- **Like and Unlike**: Users can like and unlike blog posts.
- **Category and Author Pages**: Users can view blog posts filtered by categories or specific authors.
- **Responsive Design**: The application is designed to be responsive and user-friendly across various devices.

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for handling routing in React applications.
- **Axios**: A promise-based HTTP client for making requests to the backend.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A web application framework for Node.js.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **MongoDB**: A NoSQL database for storing blog posts, user data, and comments.
- **GridFS**: A specification for storing and retrieving files that exceed the BSON-document size limit of 16MB.
- **Multer**: A middleware for handling `multipart/form-data`, primarily used for uploading files.
- **JWT (JSON Web Tokens)**: For secure user authentication.

## Project Structure

### Frontend

#### `src`

- **components**: Contains reusable React components like `BlogPost`, `Comment`, `SearchResults`, etc.
- **pages**: Contains page components for different routes like `Home`, `Profile`, `Search`, etc.
- **App.jsx**: The main component that sets up routing and includes global providers.
- **index.js**: The entry point of the React application.


### Backend

#### `controllers`

- **blogController.js**: Handles logic for creating, retrieving, updating, deleting blogs, and searching blogs.
- **commentController.js**: Manages comments on blog posts.

#### `routes`

- **blogRoutes.js**: Defines routes for blog-related endpoints.
- **authRoutes.js**: Manages authentication-related routes.

#### `models`

- **blogModel.js**: Mongoose schema and model for blog posts.
- **userModel.js**: Mongoose schema and model for users.
- **commentModel.js**: Mongoose schema and model for comments.

#### `config`

- **gridFsConfig.js**: Configures GridFS for storing images.


### Running the Project

#### Prerequisites

- Node.js and npm installed
- MongoDB instance running

#### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blog-platform.git
   cd blog-platform
   ```
2. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

3. Install backend dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file and add your MongoDB connection string:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5555
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

#### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm start
   ```

### Deployment

For deployment, you can use platforms like Heroku, Vercel, or AWS for the backend and Netlify or Vercel for the frontend. Ensure that the environment variables are set correctly and that MongoDB is accessible from the deployed environment.

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.
