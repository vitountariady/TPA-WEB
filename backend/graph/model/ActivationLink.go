package model

type ActivationLink struct {
	ID     string `json:"id" gorm:"primaryKey"`
	UserID string `json:"userID"`
}
