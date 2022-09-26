package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/vitountariady/TPA-WEB/graph/generated"
	"github.com/vitountariady/TPA-WEB/graph/model"
)

// Likes is the resolver for the likes field.
func (r *commentResolver) Likes(ctx context.Context, obj *model.Comment) ([]string, error) {
	return obj.Likes, nil
}

// Timestamp is the resolver for the timestamp field.
func (r *commentResolver) Timestamp(ctx context.Context, obj *model.Comment) (string, error) {
	return obj.Timestamp.String(), nil
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
	var comments []*model.Comment
	err := r.DB.Model(comments).Limit(limit).Offset(offset).Order("timestamp DESC").Find(&comments, "post_id = ? and reply_to='' ", postID).Error
	if err != nil {
		return nil, err
	}
	return comments, nil
}

// GetCommentByID is the resolver for the getCommentByID field.
func (r *queryResolver) GetCommentByID(ctx context.Context, id string) (*model.Comment, error) {
	var comment *model.Comment
	err := r.DB.First(&comment, "id = ?", id).Error
	if err != nil {
		return nil, err
	} else {
		return comment, nil
	}
}

// LoadReplies is the resolver for the loadReplies field.
func (r *queryResolver) LoadReplies(ctx context.Context, commentID string, limit int, offset int) ([]*model.Comment, error) {
	var comments []*model.Comment
	err := r.DB.Model(comments).Limit(limit).Offset(offset).Order("timestamp DESC").Find(&comments, "reply_to = ?", commentID).Error
	if err != nil {
		return nil, err
	}
	return comments, nil
}

// Comment returns generated.CommentResolver implementation.
func (r *Resolver) Comment() generated.CommentResolver { return &commentResolver{r} }

type commentResolver struct{ *Resolver }
