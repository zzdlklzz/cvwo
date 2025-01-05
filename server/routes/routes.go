package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/zzdlklzz/cvwo/controllers"
)

func SetUpRoutes(app *fiber.App) {

	// Render app
	clientRoutes := []string{
		"/", "/algebra", "/calculus", "/geometry", "/numbertheory", "/probandstats", "/others",
	}
	for _, route := range clientRoutes {
		app.Get(route, controllers.Home)
	}

	// User routes
	app.Post("/api/register", controllers.CreateUser)
	app.Get("/api/login", controllers.LoginUser)

	// Post routes
	app.Post("/api/posts", controllers.CreatePost)
	app.Get("/api/posts", controllers.ReadAllPosts)
	app.Get("/api/posts/:id", controllers.ReadPost)
	app.Put("/api/posts/:id", controllers.UpdatePost)
	app.Delete("/api/posts/:id", controllers.DeletePost)
}