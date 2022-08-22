package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/vitountariady/TPA-WEB/config"
	"github.com/vitountariady/TPA-WEB/graph/model"
)

func ActivationLinkCreate(ctx context.Context, input string) (string, error) {
	db := config.GetDB()
	link := model.Link{
		ID:     uuid.NewString(),
		UserID: input,
	}
	err := db.Model(link).Create(&link).Error
	if err != nil {
		return "", err
	}
	return "http://127.0.0.1:5173/activate/" + link.ID, nil
}

func ResetPasswordLinkCreate(ctx context.Context, email string) (string, error) {
	db := config.GetDB()
	user, err := GetUserByEmail(ctx, email)
	if err != nil {
		return "", err
	}
	link := model.Link{
		ID:     uuid.NewString(),
		UserID: user.ID,
	}
	err = db.Model(link).Create(&link).Error
	if err != nil {
		return "", err
	}
	resetPassEmail(email, "http://127.0.0.1:5173/resetPassword/"+link.ID)
	return "http://127.0.0.1:5173/resetPassword/" + link.ID, nil
}
