import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../../models/index";
import dotenv from "dotenv";
dotenv.config();

const jwtOptions = {
  secretOrKey: process.env.JWTACCESS,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const accessJwt = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findOne({ id: payload.id });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

export default accessJwt;
