package service

import (
	"context"

	"github.com/google/uuid"
	"github.com/vitountariady/TPA-WEB/config"
	"github.com/vitountariady/TPA-WEB/graph/model"
)

func ActivationLinkCreate(ctx context.Context, input string) (string, error) {
	db := config.GetDB()
	link := model.ActivationLink{
		ID:     uuid.NewString(),
		UserID: input,
	}
	err := db.Model(link).Create(&link).Error
	if err != nil {
		return "", err
	}
	return "http://127.0.0.1:5173/activate/" + link.ID, nil
}
