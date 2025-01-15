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

      Replace `root:3306` with the username and password of your local MySQL instance. If your MySQL is configured 
      to listen to a port other than the default port `3306`, replace the port number with your local MySQL's port 
      number. Finally, create a database in MySQL with the name `mathwebforum`, or replace the database name with your
      desired database name, for example:

      ```
      DB_URL="my_user:my_password@tcp(127.0.0.1:my_port)/my_database_name?charset=utf8mb4&parseTime=True&loc=Local"
      ```
      

## Running the application

To start the application, simply run `main.go` by running the file, or navigating to the server directory 
`cd server` and running the command `go run main.go`. Ensure that your local MySQL server is running, and that
you have the appropriately named database created.

## Navigating the code

This is the main file structure:
```
.
├── node_modules
├── public/
│   ├── background.jpg
│   ├── categories/
│   │   ├── algebra.png
│   │   ├── calculus.png
│   │   ├── geometry.png
│   │   ├── number theory.png
│   │   ├── others.png
│   │   └── probability and statistics.png
│   ├── assets/
│   │   ├── mathwebforum.js
│   │   └── style.css
│   └── index.html
├── client/
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── public/ 
│   │   ├── background.jpg
│   │   └── categories/
│   │       ├── algebra.png
│   │       ├── calculus.png
│   │       ├── geometry.png
│   │       ├── number theory.png
│   │       ├── others.png
│   │       └── probability and statistics.png
│   ├── src/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── types.tsx
│   │   ├── Pages/   
│   │   │   ├── Algebra.tsx
│   │   │   ├── Calculus.tsx
│   │   │   ├── CommentForm.css
│   │   │   ├── CreatePost.css
│   │   │   ├── CreatePost.tsx
│   │   │   ├── EditPost.css
│   │   │   ├── EditPost.tsx
│   │   │   ├── Geometry.tsx
│   │   │   ├── Homepage.tsx
│   │   │   ├── Login.css
│   │   │   ├── Login.tsx
│   │   │   ├── NumberTheory.tsx
│   │   │   ├── Others.tsx
│   │   │   ├── ProbAndStats.tsx
│   │   │   ├── Register.css
│   │   │   ├── Register.tsx
│   │   │   ├── UserCommentList.tsx
│   │   │   ├── UserPostList.tsx
│   │   │   ├── Components/
│   │   │   │   ├── BackButton.tsx
│   │   │   │   ├── CommentsList.tsx
│   │   │   │   ├── MenuBar.tsx
│   │   │   │   ├── TitleCard.tsx
│   │   │   │   ├── TopicCard.tsx
│   │   │   │   ├── TopicPageFormat.tsx
│   │   │   │   └── TopicPostList.tsx
│   │   │   └── functions/
│   │   │       └── ImageToBase64.tsx
│   │   └── vite-env.d.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── server/
    ├── main.go
    ├── go.mod
    ├── go.sum
    ├── .env
    ├── controllers/
    │   ├── commentController.go
    │   ├── homeController.go
    │   ├── postController.go
    │   └── userController.go
    ├── initializers/
    │   ├── db.go
    │   └── envVars.go
    ├── models/
    │   └── models.go
    ├── routes/
    │   └── routes.go
    └── views/
        └── index.html

```
Brief description of important directories:
- `public` folder in the root contains the output from executing run build via the vite plugin.
- `client` contains code used for the frontend.
  - `public` contains pictures used in the project.
  - `src` folder is where the main code body is.
    - `main.tsx` is where the root of the application is.
    - `App.tsx` is where the browser routing was done.
    - `Pages` contains a list of routed pages, along with corresponding stylesheets.
      - `Components` contains a list of components used.
- `server` contains code used for the backend.
  - `main.go` is where the main application will be run.
  - `go.mod` contains the list of dependencies used for the backend.
  - `.env` is where the environment variables are stored. The port number is configured to `4000`, and 
     the `DB_URL` to be configured is stored here as well.
  - `controllers` contains the list of controllers for models in this application.
  - `initializers` contains functions to be run on starting the application.
  - `models` contains the struct of objects used.
  - `routes` is where routing for each controller is done.
  - `views` contains the html template required to render the frontend.


## Acknowledgements

This project was done on IntelliJ IDEA using the vite plugin. MUI was used for the frontend, while the backend 
was implemented with GORM and GoFiber.