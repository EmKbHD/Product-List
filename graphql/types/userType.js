const userType = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  input SignUpInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input LogInInput {
    email: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Authpayload {
    user: User
    token: String
  }

  type Mutation {
    signUp(input: SignUpInput): Authpayload
    logIn(input: LogInInput): Authpayload
  }

`;

export default userType;
