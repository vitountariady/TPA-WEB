package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/google/uuid"
	"github.com/vitountariady/TPA-WEB/graph/model"
)

// CreateActivationLink is the resolver for the createActivationLink field.
func (r *mutationResolver) CreateActivationLink(ctx context.Context, userID string) (*model.ActivationLink, error) {
	link := &model.ActivationLink{
		ID:     uuid.NewString(),
		UserID: userID,
	}
	return link, nil
}

// GetLink is the resolver for the getLink field.
func (r *queryResolver) GetLink(ctx context.Context, id string) (*model.ActivationLink, error) {
	model := new(model.ActivationLink)
	return model, r.DB.First(model, "id = ?", id).Error
}
