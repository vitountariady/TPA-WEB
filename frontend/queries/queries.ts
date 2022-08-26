import { gql } from "@apollo/client";

export const Register = gql`
  mutation Register($email: String!, $first_name:String!, $last_name:String!,$password:String!){
    Register(input:{email:$email, first_name:$first_name, last_name:$last_name, password:$password})
  }
`

export const Login = gql`
  mutation Login($email:String!, $password:String!){
    Login(email:$email, password:$password)
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
      profile_picture_url
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