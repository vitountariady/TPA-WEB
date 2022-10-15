package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"time"

	"github.com/google/uuid"
	"github.com/samber/lo"
	"github.com/vitountariady/TPA-WEB/graph/generated"
	"github.com/vitountariady/TPA-WEB/graph/model"
)

// CreatePost is the resolver for the CreatePost field.
func (r *mutationResolver) CreatePost(ctx context.Context, input model.NewPost) (string, error) {
	var emptyStringArr = []string{}
	model := &model.Post{
		ID:        uuid.NewString(),
		Text:      input.Text,
		PhotoURL:  input.PhotoURL,
		VideoURL:  input.VideoURL,
		PosterID:  input.PosterID,
		Timestamp: time.Now(),
		Likes:     emptyStringArr,
	}
	err := r.DB.Create(model).Error
	if err != nil {
		return "Error", err
	} else {
		return "Post Created", nil
	}
}

// LikePost is the resolver for the LikePost field.
func (r *mutationResolver) LikePost(ctx context.Context, id string, userID string) (string, error) {
	post := new(model.Post)
	if err := r.DB.First(post, "id=?", id).Error; err != nil {
		return "failed", err
	}
	post.Likes = append(post.Likes, userID)
	if err := r.DB.Save(post).Error; err != nil {
		return "failed", err
	}
	return "success", nil
}

// UnlikePost is the resolver for the UnlikePost field.
func (r *mutationResolver) UnlikePost(ctx context.Context, id string, userID string) (string, error) {
	post := new(model.Post)
	if err := r.DB.First(post, "id=?", id).Error; err != nil {
		return "failed", err
	}

	new_arr := make([]string, (len(post.Likes) - 1))

	k := 0

	for i := 0; i < (len(post.Likes) - 1); {
		if post.Likes[i] != userID {
			new_arr[i] = post.Likes[k]
			k++
			i++
		} else {
			k++
		}
	}

	post.Likes = new_arr
	if err := r.DB.Save(post).Error; err != nil {
		return "failed", err
	}
	return "success", nil
}

// Timestamp is the resolver for the timestamp field.
func (r *postResolver) Timestamp(ctx context.Context, obj *model.Post) (string, error) {
	return obj.Timestamp.String(), nil
}

// Likes is the resolver for the likes field.
func (r *postResolver) Likes(ctx context.Context, obj *model.Post) ([]string, error) {
	return obj.Likes, nil
}

// GetPosts is the resolver for the GetPosts field.
func (r *queryResolver) GetPosts(ctx context.Context, id string, limit int, offset int) ([]*model.Post, error) {
	var posts []*model.Post
	modelUser := new(model.User)
	if err := r.DB.Find(modelUser, "id=?", id).Error; err != nil {
		return nil, err
	}
	arr := []string{}
	for _, i := range modelUser.FollowedUser {
		arr = append(arr, i)
	}
	for _, i := range modelUser.ConnectedUser {
		arr = append(arr, i)
	}
	arr = append(arr, id)
	arr = lo.Uniq(arr)
	err := r.DB.Model(posts).Limit(limit).Offset(offset).Order("timestamp DESC").Find(&posts, "poster_id in (?)", arr).Error

	if err != nil {
		return nil, err
	}

	return posts, nil
}

// SearchPosts is the resolver for the SearchPosts field.
func (r *queryResolver) SearchPosts(ctx context.Context, query string, limit int, offset int) ([]*model.Post, error) {
	var posts []*model.Post
	real_query := "%" + query + "%"
	err := r.DB.Model(posts).Limit(limit).Offset(offset).Order("timestamp DESC").Find(&posts, "lower(text) like lower(?)", real_query).Error
	if err != nil {
		return nil, err
	} else {
		return posts, nil
	}
}

// Post returns generated.PostResolver implementation.
func (r *Resolver) Post() generated.PostResolver { return &postResolver{r} }

type postResolver struct{ *Resolver }
