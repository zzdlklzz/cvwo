package main

import (
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/template/html/v2"
	"github.com/zzdlklzz/cvwo/controllers"
	"github.com/zzdlklzz/cvwo/initializers"
	"log"
	"os"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDatabase()
	initializers.SyncDB()
}

func main() {
	fmt.Println("http://localhost:4000/test")

	// Load templates
	engine := html.New("./views", ".html")

	// App setup
	app := fiber.New(fiber.Config{
		Views: engine,
	})

	// App config
	app.Static("/", "./public")

	// Routes
	app.Get("/test", controllers.PostsIndex)
	app.Get("/", controllers.Home)

	// Start app
	log.Fatal(app.Listen(":" + os.Getenv("PORT")))
}
