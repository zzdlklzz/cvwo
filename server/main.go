package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/template/html/v2"
	"github.com/zzdlklzz/cvwo/controllers"
	"github.com/zzdlklzz/cvwo/initializers"
	"github.com/zzdlklzz/cvwo/routes"
	"log"
	"os"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDatabase()
	initializers.SyncDB()
}

// Load templates
var engine = html.New("./views", ".html")

// App setup
var app = fiber.New(fiber.Config{
	Views: engine,
})

func main() {

	fmt.Println("Open application at http://localhost:" + os.Getenv("PORT"))

	// App config
	app.Static("/", "../public")
	app.Use(cors.New(cors.Config{
		AllowHeaders: "Origin, Content-Type, Accept",
		AllowMethods: "GET, POST, HEAD, PUT, DELETE, PATCH",
	}))

	// Routes
	routes.SetUpRoutes(app)

	// Administrative
	app.Delete("/deleteposts", controllers.DeleteAllPosts)
	app.Delete("/deletecomments", controllers.DeleteAllComments)

	// Start app
	log.Fatal(app.Listen(":" + os.Getenv("PORT")))
}
