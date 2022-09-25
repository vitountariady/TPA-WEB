package model

import (
	"time"

	"github.com/lib/pq"
)

type Post struct {
	ID        string         `json:"id"`
	Text      string         `json:"text"`
	PhotoURL  string         `json:"photoURL"`
	VideoURL  string         `json:"videoURL"`
	PosterID  string         `json:"posterID"`
	Timestamp time.Time      `json:"timestamp"`
	Likes     pq.StringArray `json:"likes" gorm:"type:text[]"`
}
