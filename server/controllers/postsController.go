package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/zzdlklzz/cvwo/initializers"
	"github.com/zzdlklzz/cvwo/models"
)

func CreatePost(c *fiber.Ctx) error {
	// Get data off client

	// Create post
	post := models.Post{Title: "help me", Body: "idk what im doing"}

	result := initializers.DB.Create(&post)

	if err := result.Error; err != nil {
		return err
	}

	// Return post
	return c.JSON(post)
}
