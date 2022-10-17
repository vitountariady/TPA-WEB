package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/vitountariady/TPA-WEB/config"
	"github.com/vitountariady/TPA-WEB/graph/model"
	"github.com/vitountariady/TPA-WEB/tools"
)

func UserCreate(ctx context.Context, input model.NewUser) (*model.User, error) {
	db := config.GetDB()

	input.Password = tools.HashPassword(input.Password)
	var emptyStringArr = []string{}
	user := model.User{
		ID:                uuid.NewString(),
		Email:             input.Email,
		FirstName:         input.FirstName,
		LastName:          input.LastName,
		Password:          input.Password,
		Activated:         input.Activated,
		ProfilePictureURL: input.ProfilePictureURL,
		BannerURL:         "https://firebasestorage.googleapis.com/v0/b/linkhedin-vt.appspot.com/o/banner%2Fbg_slc.png?alt=media&token=dad72216-b67e-457d-b1d8-21dd95797695",
		FollowedUser:      emptyStringArr,
		ConnectedUser:     emptyStringArr,
		ConnectRequest:    emptyStringArr,
		BlockedUser:       emptyStringArr,
	}

	err := db.Model(user).Create(&user).Error

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	db := config.GetDB()
	var user model.User
	err := db.Model(user).Where("email LIKE ?", email).Take(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func GetUserById(ctx context.Context, id string) (*model.User, error) {
	db := config.GetDB()
	var user model.User
	err := db.Model(user).Where("id LIKE ?", id).Take(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}
