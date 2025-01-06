package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name     string    `json:"name"`
	Password string    `json:"password"`
	Posts    []Post    `json:"posts";gorm:"foreignKey:UserID"`
	Comments []Comment `json:"comments";gorm:"foreignKey:UserID"`
}
type Post struct {
	gorm.Model
	Topic    string    `json:"topic"`
	Title    string    `json:"title"`
	Body     string    `json:"body"`
	Image    string    `json:"image"`
	UserID   string    `json:"user_id"`
	User     User      `json:"user";gorm:"foreignKey:UserID"`
	Comments []Comment `json:"comments";gorm:"foreignKey:PostID"`
}

type Comment struct {
	gorm.Model
	Body   string `json:"body"`
	PostID string `json:"post_id"`
	Post   Post   `json:"post";gorm:"foreignKey:PostID"`
	UserID string `json:"user_id"`
	User   User   `json:"user";gorm:"foreignKey:UserID"`
}
