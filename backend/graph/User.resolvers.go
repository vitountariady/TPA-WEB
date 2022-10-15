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

// LoginWithoutPassword is the resolver for the LoginWithoutPassword field.
func (r *mutationResolver) LoginWithoutPassword(ctx context.Context, email string) (interface{}, error) {
	return service.UserLoginWithoutPassword(ctx, email)
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

// UploadBanner is the resolver for the UploadBanner field.
func (r *mutationResolver) UploadBanner(ctx context.Context, id string, newBanner string) (string, error) {
	return service.UploadBanner(ctx, id, newBanner)
}

// RequestConnect is the resolver for the RequestConnect field.
func (r *mutationResolver) RequestConnect(ctx context.Context, id string, recepientID string) (string, error) {
	user := new(model.User)
	err := r.DB.First(user, "id=?", recepientID).Error
	if err != nil {
		return "User not Found", err
	}
	user.ConnectRequest = append(user.ConnectRequest, id)
	return "Connect Request Sent", r.DB.Save(user).Error
}

// AcceptConnect is the resolver for the AcceptConnect field.
func (r *mutationResolver) AcceptConnect(ctx context.Context, id string, senderID string) (string, error) {
	recepient := new(model.User)
	sender := new(model.User)
	if err := r.DB.First(recepient, "id=?", id).Error; err != nil {
		return "failed", err
	}
	if err := r.DB.First(sender, "id=?", senderID).Error; err != nil {
		return "failed", err
	}
	new_arr := make([]string, (len(recepient.ConnectRequest) - 1))
	k := 0
	for i := 0; i < (len(recepient.ConnectRequest) - 1); {
		if recepient.ConnectRequest[i] != senderID {
			new_arr[i] = recepient.ConnectRequest[k]
			k++
			i++
		} else {
			k++
		}
	}
	recepient.ConnectRequest = new_arr
	sender.ConnectedUser = append(sender.ConnectedUser, id)
	recepient.ConnectedUser = append(recepient.ConnectedUser, senderID)
	if err := r.DB.Save(recepient).Error; err != nil {
		return "failed", err
	}
	if err := r.DB.Save(sender).Error; err != nil {
		return "failed", err
	}
	return "Success", nil
}

// IgnoreConnect is the resolver for the IgnoreConnect field.
func (r *mutationResolver) IgnoreConnect(ctx context.Context, id string, senderID string) (string, error) {
	recepient := new(model.User)
	if err := r.DB.First(recepient, "id=?", id).Error; err != nil {
		return "failed", err
	}
	new_arr := make([]string, (len(recepient.ConnectRequest) - 1))
	k := 0
	for i := 0; i < (len(recepient.ConnectRequest) - 1); {
		if recepient.ConnectRequest[i] != senderID {
			new_arr[i] = recepient.ConnectRequest[k]
			k++
			i++
		} else {
			k++
		}
	}
	recepient.ConnectRequest = new_arr
	if err := r.DB.Save(recepient).Error; err != nil {
		return "failed", err
	}
	return "success", nil
}

// Follow is the resolver for the Follow field.
func (r *mutationResolver) Follow(ctx context.Context, id string, follow string) (string, error) {
	user := new(model.User)
	if err := r.DB.First(user, "id=?", id).Error; err != nil {
		return "failed", err
	}
	user.FollowedUser = append(user.FollowedUser, follow)
	if err := r.DB.Save(user).Error; err != nil {
		return "failed", err
	}
	return "success", nil
}

// Unfollow is the resolver for the Unfollow field.
func (r *mutationResolver) Unfollow(ctx context.Context, id string, unfollow string) (string, error) {
	user := new(model.User)
	if err := r.DB.First(user, "id=?", id).Error; err != nil {
		return "failed", err
	}
	new_arr := make([]string, (len(user.FollowedUser) - 1))
	k := 0
	for i := 0; i < (len(user.FollowedUser) - 1); {
		if user.FollowedUser[i] != unfollow {
			new_arr[i] = user.FollowedUser[k]
			k++
			i++
		} else {
			k++
		}
	}
	user.FollowedUser = new_arr
	if err := r.DB.Save(user).Error; err != nil {
		return "failed", err
	}
	return "success", nil
}

// UpdateName is the resolver for the UpdateName field.
func (r *mutationResolver) UpdateName(ctx context.Context, newFirstName string, newLastName string, id string) (string, error) {
	return service.UpdateName(ctx, id, newFirstName, newLastName)
}

// Users is the resolver for the Users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// GetUser is the resolver for the getUser field.
func (r *queryResolver) GetUser(ctx context.Context, id string) (*model.User, error) {
	x, err := service.GetUserById(ctx, id)
	return x, err
}

// GetUserByEmail is the resolver for the getUserByEmail field.
func (r *queryResolver) GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	return service.GetUserByEmail(ctx, email)
}

// GetConnectedUsers is the resolver for the getConnectedUsers field.
func (r *queryResolver) GetConnectedUsers(ctx context.Context, id string) ([]*model.User, error) {
	x, _ := service.GetUserById(ctx, id)
	var users []*model.User
	var array []string
	array = x.ConnectedUser
	err := r.DB.Model(users).Find(&users, "id in (?)", array).Error
	if err != nil {
		return nil, err
	}
	return users, nil
}

// TestMiddleware is the resolver for the testMiddleware field.
func (r *queryResolver) TestMiddleware(ctx context.Context) (string, error) {
	return "Success", nil
}

// SearchUsers is the resolver for the searchUsers field.
func (r *queryResolver) SearchUsers(ctx context.Context, query string) ([]*model.User, error) {
	var users []*model.User
	real_query := "%" + query + "%"
	err := r.DB.Model(users).Find(&users, "lower(first_name) like lower(?) or lower(last_name) like lower(?)", real_query, real_query).Error
	if err != nil {
		return nil, err
	} else {
		return users, nil
	}
}

// FollowedUser is the resolver for the followed_user field.
func (r *userResolver) FollowedUser(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.FollowedUser, nil
}

// ConnectedUser is the resolver for the connected_user field.
func (r *userResolver) ConnectedUser(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.ConnectedUser, nil
}

// ConnectRequest is the resolver for the connect_request field.
func (r *userResolver) ConnectRequest(ctx context.Context, obj *model.User) ([]string, error) {
	return obj.ConnectRequest, nil
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
