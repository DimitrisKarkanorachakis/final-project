Book CRUD Application
Welcome to the Book CRUD Application! This is a full-stack web application designed to manage a collection of books. It allows users to perform basic CRUD (Create, Read, Update, Delete) operations on books, with additional features like user authentication, role-based access control, and a user-friendly interface.
Whether you're an admin managing the book database or a regular user browsing the collection, this app has got you covered. Let's dive into the details!
________________________________________
Features
1. User Authentication
•	Login: Users can log in using their email and password.
•	Register: New users can register with an email, password, and role (either user or admin).
•	Logout: Users can log out, which invalidates their session token.
2. Role-Based Access Control
•	Admin Role: Admins can create, update, and delete books.
•	User Role: Regular users can only view or search for a book.
3. Book Management
•	View Books: All authenticated users can view the list of books.
•	Add Books: Admins can add new books to the collection.
•	Edit Books: Admins can update existing book details.
•	Delete Books: Admins can remove books from the collection.
4. Search and Pagination
•	Search: Users can search for books by title, author, or other fields.
•	Pagination: The book list is paginated for easier navigation.
5. Responsive UI
•	The application features a clean and responsive user interface built with Angular Material components.
6. Swagger API Documentation
•	The backend API is documented using Swagger, making it easy to understand and test the endpoints.
________________________________________
Technologies Used
Frontend
•	Angular: A powerful frontend framework for building dynamic web applications.
•	Angular Material: A UI component library for Angular, providing pre-built, customizable components like tables, forms, and buttons.
•	RxJS: Used for handling asynchronous operations and data streams.
•	JWT (JSON Web Tokens): For secure user authentication and session management.
Backend
•	Node.js: A JavaScript runtime for building scalable server-side applications.
•	Express.js: A web framework for Node.js, used to build the RESTful API.
•	MongoDB: A NoSQL database for storing book and user data.
•	Mongoose: An ODM (Object Data Modeling) library for MongoDB, used to define schemas and interact with the database.
•	JWT: Used for generating and verifying authentication tokens.
Other Tools
•	Swagger: For API documentation.
•	Bcrypt: For securely hashing user passwords.
•	Dotenv: For managing environment variables.
________________________________________
Getting Started
Prerequisites
Before you begin, ensure you have the following installed:
•	Node.js (v16 or higher)
•	Angular CLI (v15 or higher)
•	MongoDB (either locally or a cloud instance like MongoDB Atlas)
Installation
1.	Clone the Repository
2.	Install Dependencies
o	For the backend:
cd your directory
npm install
o	For the frontend:
cd your directory
npm install
3.	Run the Backend
cd your directory
npm start
The backend will start on http://localhost:3000.
4.	Run the Frontend
cd your directory
ng serve
The frontend will start on http://localhost:4200.
5.	Access the Application
o	Open your browser and navigate to http://localhost:4200.
________________________________________
API Documentation
The backend API is documented using Swagger. You can access the API documentation by navigating to:
http://localhost:3000/api-docs
This will provide a detailed overview of all available endpoints, request/response formats, and example payloads.
________________________________________
Folder Structure
Backend (server)
•	controller/: Contains the route handlers for book-related operations.
•	model/: Defines the MongoDB schemas for books and users.
•	middleware/: Contains authentication and role-based access control middleware.
•	routes/: Defines the API routes.
•	db/: Handles the MongoDB connection.
•	swagger.js: Configuration for Swagger API documentation.
Frontend (client)
•	src/app/: Contains Angular components, services, and routing.
o	auth/: Components and services related to authentication (login, register, guards).
o	book/: Components and services for managing books.
o	shared/: Shared interfaces and services.
o	navbar/: The navigation bar component.
o	admin/: Admin-specific components.
•	src/assets/: Static assets like images and styles.
•	src/environments/: Environment-specific configuration files.
________________________________________
License
This project is licensed under the MIT License. See the LICENSE file for more details.

