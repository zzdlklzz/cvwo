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

// Load templates
var engine = html.New("./views", ".html")

// App setup
var app = fiber.New(fiber.Config{
	Views: engine,
})

func SetUpRoutes() {
	clientRoutes := []string{
		"/", "/algebra", "/calculus", "/geometry", "/numbertheory", "/probandstats", "/others",
	}
	for _, route := range clientRoutes {
		app.Get(route, controllers.Home)
	}
}

func main() {
	fmt.Println("http://localhost:4000/test")
	fmt.Println("App can be found at http://localhost:4000")

	// App config
	app.Static("/", "../public")

	// Routes
	SetUpRoutes()

	// Posts
	app.Post("/test", controllers.CreatePost)

	// Start app
	log.Fatal(app.Listen(":" + os.Getenv("PORT")))
}
