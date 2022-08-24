package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/vitountariady/TPA-WEB/graph/generated"
	"github.com/vitountariady/TPA-WEB/graph/model"
	"github.com/vitountariady/TPA-WEB/service"
)

// Login is the resolver for the Login field.
func (r *mutationResolver) Login(ctx context.Context, email string, password string) (interface{}, error) {
	return service.UserLogin(ctx, email, password)
}

// Register is the resolver for the Register field.
func (r *mutationResolver) Register(ctx context.Context, input model.NewUser) (interface{}, error) {
	return service.RegisterUser(ctx, input)
}

// ActivateAccount is the resolver for the ActivateAccount field.
func (r *mutationResolver) ActivateAccount(ctx context.Context, id string) (interface{}, error) {
	user := new(model.User)
	link := new(model.Link)
	if err := r.DB.First(user, "id=?", id).Error; err != nil {
		panic(err)
	}
	user.Activated = true
	if err := r.DB.Delete(link, "user_id=?", id).Error; err != nil {
		panic(err)
	}
	return user, r.DB.Save(user).Error
}

// ResetPassword is the resolver for the ResetPassword field.
func (r *mutationResolver) ResetPassword(ctx context.Context, id string, newPassword string) (string, error) {
	return service.ResetPassword(ctx, id, newPassword)
}

// UploadProfilePic is the resolver for the UploadProfilePic field.
func (r *mutationResolver) UploadProfilePic(ctx context.Context, id string, newProfilePicture string) (string, error) {
	return service.UploadProfilePicture(ctx, id, newProfilePicture)
}

// Users is the resolver for the Users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// TestMiddleware is the resolver for the testMiddleware field.
func (r *queryResolver) TestMiddleware(ctx context.Context) (string, error) {
	return "Success", nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
