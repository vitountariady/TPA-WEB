package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/google/uuid"
	"github.com/vitountariady/TPA-WEB/graph/model"
)

// AddJob is the resolver for the addJob field.
func (r *mutationResolver) AddJob(ctx context.Context, input model.NewJob) (string, error) {
	model := &model.Job{
		ID:       uuid.NewString(),
		Position: input.Position,
		Company:  input.Company,
		Location: input.Location,
	}
	err := r.DB.Create(model).Error
	if err != nil {
		return "Error", err
	} else {
		return "Job Created", nil
	}
}

// GetAllJobs is the resolver for the getAllJobs field.
func (r *queryResolver) GetAllJobs(ctx context.Context) ([]*model.Job, error) {
	var models []*model.Job
	err := r.DB.Find(&models).Error
	if err != nil {
		return nil, err
	} else {
		return models, nil
	}
}
