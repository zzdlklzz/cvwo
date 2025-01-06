package controllers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/zzdlklzz/cvwo/initializers"
	"github.com/zzdlklzz/cvwo/models"
	"strings"
)

func CreateUser(c *fiber.Ctx) error {
	var data map[string]interface{}
	var userData models.User

	if err := c.BodyParser(&data); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Error parsing data",
		})
	}

	// Check if user already exists
	initializers.DB.Where("name = ?", strings.TrimSpace(data["name"].(string))).First(&userData)
	if userData.ID != 0 {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "username already exists",
		})
	}

	// Create user
	user := models.User{
		Name:     data["name"].(string),
		Password: data["password"].(string),
	}

	// Store user in database
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Failed to create user",
		})
	}

	c.Status(200)
	return c.JSON(fiber.Map{
		"user":    user,
		"message": "User created successfully",
	})
}

func LoginUser(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Error parsing data",
		})
	}

	// Check if user already exists
	var user models.User
	initializers.DB.Where("name = ?", strings.TrimSpace(data["name"])).First(&user)
	if user.ID == 0 {
		c.Status(404)
		return c.JSON(fiber.Map{
			"message": "username does not exist, please create an account",
		})
	}

	// Check if password is correct
	if user.Password != data["password"] {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Incorrect password",
		})
	}

	return c.JSON(fiber.Map{
		"Name": user.Name,
	})
}
