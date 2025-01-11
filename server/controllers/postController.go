package controllers

import (
	"errors"
	"github.com/gofiber/fiber/v2"
	"github.com/zzdlklzz/cvwo/initializers"
	"github.com/zzdlklzz/cvwo/models"
	"gorm.io/gorm"
	"strconv"
)

func CreatePost(c *fiber.Ctx) error {
	// Get data off client
	var post models.Post
	if err := c.BodyParser(&post); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Error parsing body",
		})
	}

	// Create post
	result := initializers.DB.Create(&post)

	if result.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Error creating post",
		})
	}

	// Return post
	return c.JSON(fiber.Map{
		"Topic": post.Topic,
		"Title": post.Title,
		"Body":  post.Body,
		"Image": post.Image,
	})
}

func ReadPost(c *fiber.Ctx) error {
	// Get post id
	id := c.Params("id")

	// Get post
	var post models.Post
	result := initializers.DB.Preload("User").Preload("Comments").First(&post, id)

	// Check if post exists
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Post not found",
		})
	}

	// Return post
	return c.JSON(fiber.Map{
		"Topic": post.Topic,
		"Title": post.Title,
		"Body":  post.Body,
		"Image": post.Image,
		"User":  post.User,
	})
}

func ReadAllPosts(c *fiber.Ctx) error {
	// Get posts
	var posts []models.Post
	result := initializers.DB.Preload("User").Preload("Comments").Find(&posts)

	if result.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Error reading posts",
		})
	}

	// Return posts
	return c.JSON(posts)
}

func ReadUserPosts(c *fiber.Ctx) error {
	// Get username
	id, _ := strconv.Atoi(c.Params("id"))

	// Get posts
	var posts []models.Post
	result := initializers.DB.Where("user_id = ?", id).Find(&posts)

	if result.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Failed to retrieve posts",
		})
	}

	// Return posts
	return c.JSON(posts)
}

func UpdatePost(c *fiber.Ctx) error {
	// Get post id
	id, _ := strconv.Atoi(c.Params("id"))

	// Get data off client
	post := models.Post{
		Model: gorm.Model{ID: uint(id)},
	}
	if err := c.BodyParser(&post); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Error parsing body",
		})
	}

	// Update post
	result := initializers.DB.Model(&post).Updates(post)

	if result.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Failed to update post",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Post updated successfully",
	})
}

func DeletePost(c *fiber.Ctx) error {
	// Get post id
	id, _ := strconv.Atoi(c.Params("id"))

	// Get post and check if it exists
	var post models.Post
	result := initializers.DB.First(&post, id)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Post not found",
		})
	}

	// Delete post
	deletePost := initializers.DB.Delete(&post)

	if deletePost.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Failed to delete post",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Post deleted successfully",
	})
}

func DeleteAllPosts(c *fiber.Ctx) error {
	result := initializers.DB.Where("1=1").Delete(&models.Post{})

	if result.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Failed to delete posts",
		})
	}
	return c.JSON(fiber.Map{
		"message": "All posts have been deleted successfully",
	})
}
