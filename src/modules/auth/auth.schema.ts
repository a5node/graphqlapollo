'use strict';

import { buildSchema } from 'graphql';

export const typeUser = `type User {
  id: ID
  name: String
  email: String
  password: String
  order:[Order]
}`;

const schema = buildSchema(`
  ${typeUser}
  type Order {
    id: ID!
    products: [Product!]
    user: User!
}

type Product {
    id: ID!
    title: String!
    price: String!
    creator: User
    orders:[Order!]    
}

  input CreateInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String! 
  }

  type Query {  
    login( input: LoginInput): User
    logout(email: String!): User    
  }

  type Mutation {
    createUser(input: CreateInput): User   
  }

schema {
  query : Query
  mutation : Mutation
}
`);

export default schema;
