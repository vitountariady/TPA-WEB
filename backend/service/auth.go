package service

import (
	"context"

	"github.com/vektah/gqlparser/v2/gqlerror"
	"github.com/vitountariady/TPA-WEB/config"
	"github.com/vitountariady/TPA-WEB/graph/model"
	"github.com/vitountariady/TPA-WEB/tools"
	"gorm.io/gorm"
)

func UploadProfilePicture(ctx context.Context, id string, newProfilePicture string) (string, error) {
	user, err := GetUserById(ctx, id)
	db := config.GetDB()
	if err != nil {
		return "", err
	}
	user.ProfilePictureURL = (newProfilePicture)
	db.Save(&user)
	return "Profile Picture Update successful", nil
}

func UploadBanner(ctx context.Context, id string, newBanner string) (string, error) {
	user, err := GetUserById(ctx, id)
	db := config.GetDB()
	if err != nil {
		return "", err
	}
	user.BannerURL = (newBanner)
	db.Save(&user)
	return "Banner Update successful", nil
}

func ResetPassword(ctx context.Context, id string, newPassword string) (string, error) {
	user, err := GetUserById(ctx, id)
	link := new(model.Link)
	db := config.GetDB()
	if err != nil {
		return "", err
	}
	if err := db.Delete(link, "user_id=?", id).Error; err != nil {
		panic(err)
	}
	user.Password = tools.HashPassword(newPassword)
	db.Save(&user)
	return "Password reset successful", nil
}

func RegisterUser(ctx context.Context, input model.NewUser) (interface{}, error) {
	_, err := GetUserByEmail(ctx, input.Email)
	if err == nil {
		if err != gorm.ErrRecordNotFound {
			return nil, err
		}
	}

	createdUser, err := UserCreate(ctx, input)
	if err != nil {
		return nil, err
	}

	link, err := ActivationLinkCreate(ctx, createdUser.ID)
	if err != nil {
		return nil, err
	}

	// fmt.Print(link)

	sendEmail(createdUser.Email, link)
	return map[string]interface{}{
		"id": createdUser.ID,
	}, nil
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

	if !getUser.Activated {
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
