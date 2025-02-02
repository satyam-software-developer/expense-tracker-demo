## Expense Tracker Demo

This is an expense tracker application that allows users to manage their expenses, track income, and export reports to a PDF. The app includes user authentication, expense management (add, delete, list), and PDF export functionality. It is built with React.js for the frontend, Express.js with MySQL for the backend, and can scale for large datasets.

# Project Structure

expense-tracker-demo/
├── client/ # Frontend code (React.js)
├── server/ # Backend code (Node.js, Express.js, MySQL)
├── README.md # This file

# Technologies Used

- Frontend: React.js
- Backend: Node.js, Express.js
- Database: MySQL 8 (with ORM and migrations)
- PDF Export: PDF generation for expense reports
- Authentication: Email & password-based authentication with password hashing
- Libraries/Tools:
- Component libraries (e.g., Material UI, Shadcn UI)
  - bcryptjs for password hashing
  - pdfkit for PDF generation
  - Sequelize ORM for database interaction (optional)

# Features

1. User Authentication
   - Registration: Users can register using email and password.
   - Login: Users can log in with their credentials.
   - Password Hashing: Passwords are securely hashed using bcryptjs.
2. Expense Management

- Add Expense: Users can add an expense with:
  - Amount (required)
  - Category (required: "Income" or "Expense")
  - Description (optional)
- Delete Expense: Users can delete an expense.

- List Expenses: Users can view a table listing all expenses. The total income and expenses are summarized at the top of the table.

3. Export to PDF

- Users can export their expense report to a PDF. The report will include all the expenses, categorized by "Income" or "Expense", and displayed in a clean, readable format.

# Getting Started

Follow these steps to set up and run the project locally:

# Prerequisites

- Node.js (v14 or higher)
- MySQL 8 (or a MySQL-compatible database)
- npm or yarn (for managing frontend dependencies)

# Setting Up the Backend

1. Clone the repository:
   git clone https://github.com/satyam-software-developer/expense-tracker-demo.git
   cd expense-tracker-demo
   cd server
2. Install the required dependencies:
   npm install
3. Configure the database:

- Set up a MySQL database with a user for the application.
- Update the .env file in the server/ directory with your database credentials.

4. Run database migrations (if using an ORM like Sequelize):
   npx sequelize db:migrate
5. Start the server:
   nodemon index.js
   npm start
   The backend will run on http://localhost:5000.

# Setting Up the Frontend

1. Navigate to the client/ directory:
   cd client
2. Install the frontend dependencies:
   npm install
3. Start the frontend:
   npm start
   The frontend will run on http://localhost:3000.

# Usage

- Visit http://localhost:3000 to use the app.
- Register or log in with your credentials.
- Add, delete, and view your expenses.
- Export your expense report to a PDF.

# Deployment

To deploy the app:

- Deploy the backend (Express.js) to a platform like Heroku, Vercel, or DigitalOcean.
- Deploy the frontend (React.js) to a platform like Netlify or Vercel.
- Update the API URLs in the frontend code to match your deployed backend.

# Selection Criteria

Your project will be evaluated on the following:

- Core Features: Implementation of required functionalities (user authentication, expense management, PDF export).
- Scalability: Especially for the PDF export feature, handling large datasets (50k transactions per month).
- Code Quality: Maintainable, well-structured, and clean code with proper comments.
- Error Handling: Robust handling of edge cases in both frontend and backend.
- Security: Proper use of password hashing and secure authentication practices.

# License

This project is licensed under the MIT License.
