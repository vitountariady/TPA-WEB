package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/google/uuid"
	"github.com/vitountariady/TPA-WEB/graph/model"
)

// AddHashtag is the resolver for the addHashtag field.
func (r *mutationResolver) AddHashtag(ctx context.Context, text string) (string, error) {
	var hashtags []*model.Hashtag

	_ = r.DB.Where("text = ?", text).Find(&hashtags).Error
	// fmt.Println("text : ", hashtags)
	if len(hashtags) > 0 {
		return "Dah ada", nil
	}

	model := &model.Hashtag{
		ID:   uuid.NewString(),
		Text: text,
	}
	err := r.DB.Create(model).Error
	if err != nil {
		return "Err", nil
	} else {
		return "Hashtag created", nil
	}
}

// GetPostsWithTags is the resolver for the getPostsWithTags field.
func (r *queryResolver) GetPostsWithTags(ctx context.Context, text *string) ([]*model.Post, error) {
	panic(fmt.Errorf("not implemented"))
}

// GetAllTags is the resolver for the getAllTags field.
func (r *queryResolver) GetAllTags(ctx context.Context) ([]*model.Hashtag, error) {
	var model []*model.Hashtag
	return model, r.DB.Find(&model).Error
}
