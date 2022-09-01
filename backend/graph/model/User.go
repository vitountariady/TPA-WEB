package model

import "github.com/lib/pq"

type User struct {
	ID                string         `json:"id" gorm:"primaryKey"`
	Email             string         `json:"email"`
	FirstName         string         `json:"first_name"`
	LastName          string         `json:"last_name"`
	Password          string         `json:"password"`
	Activated         bool           `json:"Activated"`
	ProfilePictureURL string         `json:"profile_picture_url"`
	BannerURL         string         `json:"banner_url"`
	FollowedUser      pq.StringArray `json:"followed_user" gorm:"type:text[]"`
	ConnectedUser     pq.StringArray `json:"connected_user" gorm:"type:text[]"`
	ConnectRequest    pq.StringArray `json:"connect_request" gorm:"type:text[]"`
}
