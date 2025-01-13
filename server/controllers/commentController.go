package controllers

import (
	"errors"
	"github.com/gofiber/fiber/v2"
	"github.com/zzdlklzz/cvwo/initializers"
	"github.com/zzdlklzz/cvwo/models"
	"gorm.io/gorm"
	"strconv"
)

func CreateComment(c *fiber.Ctx) error {
	// Get data off client
	var comment models.Comment
	if err := c.BodyParser(&comment); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Error parsing body",
		})
	}

	// Create comment
	result := initializers.DB.Create(&comment)

	if result.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Error creating comment",
		})
	}

	// Return comment
	return c.JSON(fiber.Map{
		"ID":      comment.ID,
		"body":    comment.Body,
		"user_id": comment.UserID,
		"post_id": comment.PostID,
	})
}

func ReadComment(c *fiber.Ctx) error {
	// Get comment id
	id := c.Params("id")

	// Get comment
	var comment models.Comment
	result := initializers.DB.Preload("User").Preload("Post").First(&comment, id)

	// Check if comment exists
	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Comment not found",
		})
	}

	// Return comment
	return c.JSON(fiber.Map{
		"Body": comment.Body,
		"User": comment.User,
		"Post": comment.Post,
	})

}

func ReadPostComments(c *fiber.Ctx) error {
	// Get post id
	id, _ := strconv.Atoi(c.Params("id"))

	// Get post and check if it exists
	var post models.Post
	checkPost := initializers.DB.First(&post, id)

	if errors.Is(checkPost.Error, gorm.ErrRecordNotFound) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Post not found",
		})
	}

	// Get comments
	var comments []models.Comment
	result := initializers.DB.Preload("Post").
		Preload("User").
		Where("post_id = ?", id).
		Find(&comments)

	if result.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Failed to read comments",
		})
	}

	// Return comments
	return c.JSON(comments)
}

func ReadUserComments(c *fiber.Ctx) error {
	// Get user id
	id, _ := strconv.Atoi(c.Params("id"))

	// Get user and check if it exists
	var user models.User
	checkUser := initializers.DB.First(&user, id)

	if errors.Is(checkUser.Error, gorm.ErrRecordNotFound) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "User not found",
		})
	}

	// Get comments
	var comments []models.Comment
	result := initializers.DB.Where("user_id = ?", id).Find(&comments)

	if result.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Failed to read comments",
		})
	}

	// Return comments
	return c.JSON(comments)
}

func UpdateComment(c *fiber.Ctx) error {
	// Get comment id
	id, _ := strconv.Atoi(c.Params("id"))

	// Get data off client
	comment := models.Comment{
		Model: gorm.Model{ID: uint(id)},
	}

	if err := c.BodyParser(&comment); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Error parsing body",
		})
	}

	// Update comment
	result := initializers.DB.Model(&comment).Updates(comment)

	if result.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Failed to update comment",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Comment updated successfully",
	})
}

func DeleteComment(c *fiber.Ctx) error {
	// Get comment id
	id, _ := strconv.Atoi(c.Params("id"))

	// Get comment and check if it exists
	var comment models.Comment
	result := initializers.DB.First(&comment, id)

	if errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Comment not found",
		})
	}

	// Delete comment
	deleteComment := initializers.DB.Delete(&comment)

	if deleteComment.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Failed to delete comment",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Comment deleted successfully",
	})
}

func DeleteAllComments(c *fiber.Ctx) error {
	result := initializers.DB.Where("1=1").Delete(&models.Comment{})

	if result.Error != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Failed to delete comments",
		})
	}
	return c.JSON(fiber.Map{
		"message": "All comments have been deleted successfully",
	})
}
