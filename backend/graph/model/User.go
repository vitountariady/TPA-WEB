package model

type User struct {
	ID                string `json:"id" gorm:"primaryKey"`
	Email             string `json:"email"`
	FirstName         string `json:"first_name"`
	LastName          string `json:"last_name"`
	Password          string `json:"password"`
	Activated         bool   `json:"Activated"`
	ProfilePictureURL string `json:"profile_picture"`
}
