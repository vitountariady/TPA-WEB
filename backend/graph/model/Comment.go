package model

import (
	"time"

	"github.com/lib/pq"
)

type Comment struct {
	ID        string         `json:"id"`
	Text      string         `json:"text"`
	ReplyTo   string         `json:"replyTo"`
	Likes     pq.StringArray `json:"likes" gorm:"type:text[]"`
	UserID    string         `json:"userID"`
	PostID    string         `json:"postID"`
	Timestamp time.Time      `json:"timestamp"`
}
