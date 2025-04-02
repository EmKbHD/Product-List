import bcrypt from "bcryptjs";
import User from "../../models/userModel.js";
import generateToken from "../../utils/generateToken.js";

export default {
  Query: {
    me: async (_, __, context) => {
      //Checking if user is authenticated
      if (!context.user) {
        throw new Error("User Not authenticated..");
      }
      try {
        const user = await User.findById(context.user.id);

        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    signUp: async (_, { input }) => {
      const { firstName, lastName, email, password } = input;
      try {
        const findUser = await User.findOne({ email });
        if (findUser) {
          throw new Error("User already exists");
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
        throw new Error(error);
      }
    },
  },
};
