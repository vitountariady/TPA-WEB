package model

type Link struct {
	ID     string `json:"id" gorm:"primaryKey"`
	UserID string `json:"userID"`
}
