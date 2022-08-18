package service

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"github.com/vitountariady/TPA-WEB/graph/model"
	"github.com/vitountariady/TPA-WEB/tools"
	"gorm.io/gorm"
)

func RegisterUser(ctx context.Context, input model.NewUser) (interface{}, error) {
	_, err := GetUserByEmail(ctx, input.Email)
	if err == nil {
		if err != gorm.ErrRecordNotFound {
			return nil, err
		}
	}

	_, err = UserCreate(ctx, input)
	if err != nil {
		return nil, err
	}

	if err != nil {
		return nil, err
	}
	return map[string]interface{}{}, nil
}

func UserLogin(ctx context.Context, email string, password string) (interface{}, error) {
	getUser, err := GetUserByEmail(ctx, email)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "Email Not Found",
			}
		}
		return nil, err
	}

	if getUser.Activated == false {
		return nil, nil
	}

	if err := tools.ComparePassword(getUser.Password, password); err != nil {
		return nil, err
	}
	token, err := JwtGenerate(ctx, getUser.ID)
	if err != nil {
		return nil, err
	}
	return map[string]interface{}{
		"token": token,
		"user":  getUser,
	}, nil
}
