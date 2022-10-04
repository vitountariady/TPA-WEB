package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/vitountariady/TPA-WEB/graph/model"
	"github.com/vitountariady/TPA-WEB/service"
)

// CreateLink is the resolver for the createLink field.
func (r *mutationResolver) CreateLink(ctx context.Context, userID string) (*model.Link, error) {
	panic(fmt.Errorf("not implemented"))
}

// GenerateResetPassLink is the resolver for the generateResetPassLink field.
func (r *mutationResolver) GenerateResetPassLink(ctx context.Context, userEmail string) (string, error) {
	return service.ResetPasswordLinkCreate(ctx, userEmail)
}

// GetLink is the resolver for the getLink field.
func (r *queryResolver) GetLink(ctx context.Context, id string) (*model.Link, error) {
	model := new(model.Link)
	return model, r.DB.First(model, "id = ?", id).Error
}

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *mutationResolver) CreateActivationLink(ctx context.Context, userID string) (*model.Link, error) {
	link := &model.Link{
		ID:     uuid.NewString(),
		UserID: userID,
	}
	return link, nil
}
