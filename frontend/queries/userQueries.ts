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