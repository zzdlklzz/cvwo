# Math Exchange

Math Exchange is a mathematics web forum where users can post any math questions that they might need help with, 
categorized into various topics such as algebra, calculus, and many more.

## Installation

After cloning this repository, follow the steps below to set up the application on your local device.

### Client Setup

1. Navigate to the `client` directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   npm install
   npm install react-router-dom 
   npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
   npm install react-hook-form
   ```

### Server Setup

1. Navigate to the `server` directory:

   ```bash
   cd ../server
   ```

2. Install dependencies:

   ```bash
   go get -u github.com/gofiber/fiber/v2
   go get -u gorm.io/gorm
   go get -u gorm.io/driver/mysql
   go get github.com/joho/godotenv
   go get github.com/gofiber/template/html/v2
   ```

3. Set up MySQL:

    - Open the `.env` file in the `server` directory.
    - Modify the `DB_URL` variable for your local database:

      ```
      DB_URL="root:3306@tcp(127.0.0.1:3306)/mathwebforum?charset=utf8mb4&parseTime=True&loc=Local"
      ```

      Replace `root:3306` with the username and password of your local MySQL instance, for example:

      ```
      DB_URL="my_user:my_password@tcp(127.0.0.1:3306)/mathwebforum?charset=utf8mb4&parseTime=True&loc=Local"
      ```
      If your MySQL is configured to listen to a port other than :3306, replace the port number with
      your local MySQL's port number, for example:
   
      ```
      DB_URL="root:3306@tcp(127.0.0.1:my_port)/mathwebforum?charset=utf8mb4&parseTime=True&loc=Local"
      ```
      Create a database in MySQL with the name `mathwebforum`, or replace the database name with your
      desired database name, for example:

      ```
      DB_URL="root:3306@tcp(127.0.0.1:3306)/my_database_name?charset=utf8mb4&parseTime=True&loc=Local"
      ```

## Running the Application

To start the application, simply run `main.go` by running the file, or navigating to the server directory 
`cd server` and running the command `go run main.go`. Ensure that your local MySQL server is running, and that
you have the appropriately named database created.

## Acknowledgements

This project was done on IntelliJ IDEA using the Vite plugin. MUI was used for the frontend, while the backend 
was implemented with GORM and GoFiber.