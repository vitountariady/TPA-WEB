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

	user := model.User{
		ID:        uuid.NewString(),
		Email:     input.Email,
		FirstName: input.FirstName,
		LastName:  input.LastName,
		Password:  input.Password,
		Activated: false,
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
