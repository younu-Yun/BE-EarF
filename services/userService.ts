import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models";

const saltRounds = 10;
const jwtSecret = process.env.JWT_TOKEN || "default_secret_key";

export default class UserService {
  public registerUser = async (
    id: string,
    password: string,
    name: string,
    email: string,
    phoneNumber: string
  ): Promise<IUser> => {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user: IUser = new User({
        id,
        password: hashedPassword,
        name,
        email,
        phoneNumber,
      });

      return await user.save();
    } catch (error) {
      console.log(error);
      throw new Error("해당 ID는 이미 존재하는 ID입니다.");
    }
  };

  public loginUser = async (id: string, password: string): Promise<string> => {
    try {
      const user: IUser | null = await User.findOne({
        id,
        password: { $exists: true },
      }).select("+password");
      if (!user) {
        throw new Error("User not found");
      }

      if (!user.password) {
        throw new Error("Password not set");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Incorrect password");
      }

      const token = jwt.sign({ userId: user._id }, jwtSecret!, {
        expiresIn: "1h",
      });
      return token;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to login");
    }
  };
}
