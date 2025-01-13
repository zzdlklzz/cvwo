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
		"topic": post.Topic,
		"title": post.Title,
		"body":  post.Body,
		"image": post.Image,
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
		"topic": post.Topic,
		"title": post.Title,
		"body":  post.Body,
		"image": post.Image,
		"user":  post.User,
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
	resultPost := initializers.DB.First(&post, id)

	if errors.Is(resultPost.Error, gorm.ErrRecordNotFound) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Post not found",
		})
	}

	// Get comments of post
	var comments []models.Comment
	resultComments := initializers.DB.Where("post_id = ?", id).Find(&comments)

	if errors.Is(resultComments.Error, gorm.ErrRecordNotFound) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Comments not found",
		})
	}

	// Delete comments of post
	if len(comments) != 0 {
		deleteComments := initializers.DB.Delete(&comments)

		if deleteComments.Error != nil {
			c.Status(400)
			return c.JSON(fiber.Map{
				"message": "Failed to delete post comments",
			})
		}
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
} // Also deletes comments associated to posts

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
} // Only used for administrative purposes
