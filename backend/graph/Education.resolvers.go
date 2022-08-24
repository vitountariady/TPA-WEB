package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/vitountariady/TPA-WEB/graph/model"
	"github.com/vitountariady/TPA-WEB/middleware"
)

// CreateEducation is the resolver for the createEducation field.
func (r *mutationResolver) CreateEducation(ctx context.Context, input model.NewEducation) (string, error) {
	model := &model.Education{
		ID:           uuid.NewString(),
		UserID:       input.UserID,
		School:       input.School,
		Degree:       input.Degree,
		FieldOfStudy: input.FieldOfStudy,
		StartDate:    input.StartDate,
		EndDate:      input.EndDate,
		Grade:        input.Grade,
		Activities:   input.Activities,
		Description:  input.Description,
	}
	err := r.DB.Create(model).Error
	if err != nil {
		return "", err
	}
	return "Education Created", nil
}

// UpdateEducation is the resolver for the updateEducation field.
func (r *mutationResolver) UpdateEducation(ctx context.Context, id string, input model.NewEducation) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

// DeleteEducation is the resolver for the deleteEducation field.
func (r *mutationResolver) DeleteEducation(ctx context.Context, id string) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

// UserEducation is the resolver for the userEducation field.
func (r *queryResolver) UserEducation(ctx context.Context, userID string) ([]*model.Education, error) {
	var model []*model.Education
	return model, r.DB.Where("user_id = ?", userID).Find(&model).Error
}

// MyEducation is the resolver for the myEducation field.
func (r *queryResolver) MyEducation(ctx context.Context) ([]*model.Education, error) {
	val := *middleware.CtxValue(ctx)
	var models []*model.Education
	return models, r.DB.Where("user_id = ?", val.ID).Find(&models).Error
}
