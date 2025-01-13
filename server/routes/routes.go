package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/zzdlklzz/cvwo/controllers"
)

func SetUpRoutes(app *fiber.App) {

	// Render app
	clientRoutes := []string{
		"/", "/home", "/algebra", "/calculus", "/geometry", "/numbertheory", "/probandstats", "/others",
		"/register", "/createpost", "/userposts", "/editpost", "/usercomments",
	}
	for _, route := range clientRoutes {
		app.Get(route, controllers.Home)
	}

	// User routes
	app.Post("/api/register", controllers.CreateUser)
	app.Get("/api/login", controllers.LoginUser)
	app.Get("/api/users/:name", controllers.ReadUser)

	// Post routes
	app.Post("/api/posts", controllers.CreatePost)
	app.Get("/api/posts", controllers.ReadAllPosts)
	app.Get("/api/posts/:id", controllers.ReadPost)
	app.Put("/api/posts/:id", controllers.UpdatePost)
	app.Delete("/api/posts/:id", controllers.DeletePost)
	app.Get("/api/posts/user/:id", controllers.ReadUserPosts)

	// Comment routes
	app.Post("/api/comments", controllers.CreateComment)
	app.Get("/api/posts/comments/:id", controllers.ReadPostComments)
	app.Get("/api/user/comments/:id", controllers.ReadUserComments)
	app.Get("/api/comments/:id", controllers.ReadComment)
	app.Put("/api/comments/:id", controllers.UpdateComment)
	app.Delete("/api/comments/:id", controllers.DeleteComment)
}
