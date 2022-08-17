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