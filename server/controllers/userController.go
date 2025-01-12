package controllers

import (
	"errors"
	"github.com/gofiber/fiber/v2"
	"github.com/zzdlklzz/cvwo/initializers"
	"github.com/zzdlklzz/cvwo/models"
	"gorm.io/gorm"
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
			"message": "Username already exists",
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
	// Get list of all users
	var users []models.User
	initializers.DB.Where("1=1").Find(&users)

	return c.JSON(users)
}

func ReadUser(c *fiber.Ctx) error {
	// Get username
	name := c.Params("name")

	// Get user
	var user models.User
	result := initializers.DB.Where("name = ?", name).First(&user)

	// Check if user exists
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	}

	// Return user
	return c.JSON(user)
}
