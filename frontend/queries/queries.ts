import { gql } from "@apollo/client";

export const Register = gql`
  mutation Register($email: String!, $first_name:String!, $last_name:String!,$password:String!, $profile_picture_url:String!, $activated:Boolean!){
    Register(input:{email:$email, first_name:$first_name, last_name:$last_name, password:$password , profile_picture_url: $profile_picture_url, activated: $activated})
  }
`

export const Login = gql`
  mutation Login($email:String!, $password:String!){
    Login(email:$email, password:$password)
  }
`

export const LoginWithoutPassword = gql `
  mutation LoginWithoutPassword($email:String!){
    LoginWithoutPassword(email:$email)
  }
`

export const Activate = gql`
  mutation ActivateAccount ($id:ID!){
  ActivateAccount(id:$id)
}
`

export const GetLink = gql`
  query getLink ($id:String!){
  getLink(id:$id){
    id,
    userID
  }
}
`

export const sendResetPassLink = gql`
  mutation sendResetPassLink ($email: String!){
    generateResetPassLink(userEmail:$email)
  }
`

export const resetPassword = gql`
  mutation resetPassword($id:String!, $newpass:String!){
    ResetPassword(id:$id, newPassword:$newpass)
  }
`

export const uploadProfilePicture = gql`
  mutation uploadProfilePicture($id:String!, $newProfilePicture:String!){
    UploadProfilePic(id:$id, newProfilePicture:$newProfilePicture)
  }
`

export const uploadBanner = gql`
  mutation uploadBanner($id:String!, $newBanner:String!){
    UploadBanner(id:$id, newBanner:$newBanner)
  }
`

export const createEducation = gql`
  mutation createEducation ($UserID:ID!, $School:String!, $Degree:String!, $FieldOfStudy:String!, $StartDate:String!, $EndDate:String!, $Grade:Float!, $Activities:String!, $Description:String!){
    createEducation(input:{
      UserID:$UserID,
      School:$School,
      Degree:$Degree,
      FieldOfStudy:$FieldOfStudy,
      StartDate:$StartDate,
      EndDate:$EndDate,
      Grade:$Grade,
      Activities:$Activities,
      Description:$Description
    })
  }
`

export const updateEducation = gql`
  mutation updateEducation ($id:String! $UserID:ID!, $School:String!, $Degree:String!, $FieldOfStudy:String!, $StartDate:String!, $EndDate:String!, $Grade:Float!, $Activities:String!, $Description:String!){
    updateEducation(id:$id,input:{
      UserID:$UserID,
      School:$School,
      Degree:$Degree,
      FieldOfStudy:$FieldOfStudy,
      StartDate:$StartDate,
      EndDate:$EndDate,
      Grade:$Grade,
      Activities:$Activities,
      Description:$Description
    })
  }
`

export const getUserEducation = gql`
  query getUserEducation($UserID:ID!){
    userEducation(userID:$UserID){
      ID,
      UserID,
      School,
      Degree,
      FieldOfStudy,
      StartDate,
      EndDate,
      Grade,
      Activities,
      Description
    }
  }
`

export const getUserByID = gql`
  query getUserByID ($UserID:ID!){
    getUser(id:$UserID){
      id,
      email,
      first_name,
      last_name,
      password,
      activated,
      profile_picture_url,
      banner_url,
      followed_user,
      connected_user,
      connect_request
    }
  }
`

export const getUserByEmail = gql`
  query getUserByEmail ($email:String!){
    getUserByEmail(email:$email){
      id,
      email,
      first_name,
      last_name,
      password,
      activated,
      profile_picture_url,
      followed_user,
      connect_request,
      connected_user
    }
  }
`

export const createExperience = gql`
  mutation CreateExperience($UserID:String!, $Title:String!, $EmploymentType:String!, $CompanyName:String!, $Location:String!, $Active:Boolean!, $StartYear:String!, $EndYear:String!, $Industry:String!, $Description:String!){
    createExperience(input:{
      UserID:$UserID,
      Title:$Title,
      EmploymentType:$EmploymentType,
      CompanyName:$CompanyName,
      Location:$Location,
      Active:$Active,
      StartYear:$StartYear,
      EndYear:$EndYear,
      Industry:$Industry,
      Description:$Description
    })
  }
`

export const getUserExperience = gql`
  query getUserExperience($UserID:ID!){
    userExperience(userID:$UserID){
      ID,
      UserID,
      Title,
      EmploymentType,
      CompanyName,
      Location,
      Active,
      StartYear,
      EndYear,
      Industry,
      Description
    }
  }
`

export const deleteEducation = gql`
  mutation deleteEducation($id:String!){
    deleteEducation(id:$id)
  }
`

export const deleteExperience = gql`
  mutation deleteExperience($id:ID!){
    deleteExperience(id:$id)
  }
`

export const updateExperience = gql`
  mutation updateExperience($id:ID!,$UserID:String!,$Title:String!, $EmploymentType:String!, $CompanyName:String!, $Location:String!, $Active:Boolean!, $StartYear:String!, $EndYear:String!, $Industry:String!, $Description:String!){
    updateExperience(id:$id, input:{
      UserID:$UserID
      Title:$Title,
      EmploymentType:$EmploymentType,
      CompanyName:$CompanyName,
      Location:$Location,
      Active:$Active,
      StartYear:$StartYear,
      EndYear:$EndYear,
      Industry:$Industry,
      Description:$Description
    })
  }
`

export const requestConnect = gql`
  mutation requestConnect($id :String!, $recepient:String!){
    RequestConnect(id:$id, recepientID:$recepient)
  }
`

export const acceptConnect = gql`
  mutation acceptConnect($id:String!, $sender:String!){
    AcceptConnect(id:$id, senderID:$sender)
  }
`

export const follow = gql `
  mutation follow($id:String!, $follow:String!){
    Follow(id:$id, follow:$follow)
  }
`

export const unfollow = gql `
  mutation unfollow($id:String!, $unfollow:String!){
    Unfollow(id:$id, unfollow:$unfollow)
  }
`

export const UpdateName = gql `
  mutation updateName($id:String!, $newFirstName:String!, $newLastName:String!){
    UpdateName(id:$id, newLastName:$newLastName, newFirstName:$newFirstName)
  }
`

export const addJob = gql`
  mutation addJob($position:String!, $company:String!, $location:String!){
    addJob(input:{position:$position, company:$company, location:$location})
  }
`

export const getJobs = gql`
  query getJobs{
  getAllJobs{
      id,
      position,
      company,
      location,
    }
  }
`

export const createPost = gql`
  mutation createPost($text:String!, $photoURL:String!, $videoURL:String!, $posterID:String!){
  CreatePost(input:{
    text:$text,
    photoURL:$photoURL,
    videoURL:$videoURL,
    posterID:$posterID
  })
}
`

export const getPosts = gql`
  query getPost($id:String!, $limit:Int!, $offset:Int!){
  GetPosts(id:$id, limit:$limit, offset:$offset){
    id
    text,
    photoURL,
    videoURL,
    posterID,
    timestamp,
    likes,
  }
}
`

export const likePost = gql`
  mutation LikePost($id:String!, $UserID:String!){
    LikePost(id: $id, UserID: $UserID)
  }
`

export const unlikePost = gql`
  mutation UnlikePost($id:String!, $UserID:String!){
    UnlikePost(id: $id, UserID: $UserID)
  }
`

export const addComment = gql`
  mutation AddComment ($text:String!, $replyTo:String!,$userID:String!, $postID:String!){
    addComment(input:{text:$text, replyTo:$replyTo, userID:$userID, postID:$postID})
  }
`

export  const getComments = gql`
query getComments ($postID:String!, $limit:Int!, $offset:Int!){
    getComments(postID:$postID, limit:$limit, offset:$offset){
      id,
      text,
      replyTo,
      likes,
      userID,
      postID,
      timestamp
    }
  }
`

export const getCommentByID = gql`
  query getCommentByID($id:String!){
    getCommentByID(id:$id){
      id,
      text,
      replyTo,
      likes,
      userID,
      postID,
      timestamp
    }
  }
`

export const loadReplies = gql`
  query getReplies ($commentID:String!, $limit:Int!, $offset:Int!){
    loadReplies(commentID:$commentID, limit:$limit, offset:$offset){
      id,
      text,
      replyTo,
      likes,
      userID,
      postID,
      timestamp
    }
  }
`

export const likeComment = gql`
mutation likeComment($commentID:String!, $userID:String!){
  likeComment(commentID:$commentID, userID:$userID)
}
`

export const unlikeComment = gql`
mutation unlikeComment($commentID:String!, $userID:String!){
  unlikeComment(commentID:$commentID, userID:$userID)
}
`

export const makeHashtag = gql`
mutation AddHashtag($text:String!){
  addHashtag(text: $text)
}
`

export const getAllTags = gql`
  query getAllHashtags{
    getAllTags{
      id,
      text
    }
  }  
`

export const SearchUsers = gql`
  query SearchUser ($query:String!){
    searchUsers(query :$query){
          id,
          email,
          first_name,
          last_name,
          password,
          activated,
          profile_picture_url,
          followed_user,
          connect_request,
          connected_user
    }
  }
`

export const SearchPosts = gql`
query SearchPost ($query:String!, $limit:Int!, $offset:Int!){
  SearchPosts(query:$query, limit:$limit, offset:$offset){
    id,
    text,
    photoURL,
    videoURL,
    posterID,
    timestamp,
    likes
  }
}
`

export const getConnectedUser = gql`
query getConnectedUsers ($id:String!){
  getConnectedUsers(id:$id){
    id,
        email,
        first_name,
        last_name,
        password,
        activated,
        profile_picture_url,
        followed_user,
        connect_request,
    	  connected_user
  }
}
`