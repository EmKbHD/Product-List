import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";
import User from "../../models/userModel.js";
import { GraphQLError } from "graphql";

export default {
  Query: {
    me: async (_, __, context) => {
      //Checking if user is authenticated
      if (!context.user) {
        throw new GraphQLError("User Not authenticated..");
      }
      try {
        const user = await User.findById(context.user.id);

        if (!user) {
          throw new GraphQLError("User not found");
        }
        return user;
      } catch (error) {
        throw new GraphQLError(error);
      }
    },
  },

  Mutation: {
    signUp: async (_, { input }) => {
      const { firstName, lastName, email, password } = input;
      try {
        const findUser = await User.findOne({ email });
        if (findUser) {
          throw new GraphQLError("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });

        // saving the user to the db
        await user.save();

        // generate user token
        const token = generateToken(user.id);
        return { user, token };
      } catch (error) {
        throw new GraphQLError(error);
      }
    },

    logIn: async (_, { input }) => {
      const { email, password } = input;
      const user = await User.findOne({ email });
      if (!user) {
        throw new GraphQLError("User not found");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new GraphQLError("Invalid credentials");
      }
      // generate user token
      const token = generateToken(user._id);
      return { user, token };
    },
  },
};
