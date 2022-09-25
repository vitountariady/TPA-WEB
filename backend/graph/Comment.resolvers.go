package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/vitountariady/TPA-WEB/graph/generated"
	"github.com/vitountariady/TPA-WEB/graph/model"
)

// Timestamp is the resolver for the timestamp field.
func (r *commentResolver) Timestamp(ctx context.Context, obj *model.Comment) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

// AddComment is the resolver for the addComment field.
func (r *mutationResolver) AddComment(ctx context.Context, input model.NewComment) (string, error) {
	var emptyStringArr = []string{}
	model := &model.Comment{
		ID:        uuid.NewString(),
		Text:      input.Text,
		ReplyTo:   input.ReplyTo,
		Likes:     emptyStringArr,
		UserID:    input.UserID,
		PostID:    input.PostID,
		Timestamp: time.Now(),
	}
	err := r.DB.Create(model).Error
	if err != nil {
		return "Err", nil
	} else {
		return "Comment created", nil
	}
}

// GetComments is the resolver for the getComments field.
func (r *queryResolver) GetComments(ctx context.Context, postID string, limit int, offset int) ([]*model.Comment, error) {
// 	// var comments []*model.Comment
// 	// err:= r.DB.Model(comments).Limit(limit).Offset(offset).Order("timestamp DESC").Find(&comments, "")
// }

// GetCommentByID is the resolver for the getCommentByID field.
func (r *queryResolver) GetCommentByID(ctx context.Context, id string) (*model.Comment, error) {
	panic(fmt.Errorf("not implemented"))
}

// Comment returns generated.CommentResolver implementation.
func (r *Resolver) Comment() generated.CommentResolver { return &commentResolver{r} }

type commentResolver struct{ *Resolver }
