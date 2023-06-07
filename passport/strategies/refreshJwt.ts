import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../../models/index";
import dotenv from "dotenv";
dotenv.config();

const jwtOptions = {
  secretOrKey: process.env.JWTREFRESH,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const refreshJwt = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    console.log("여기까지는 오는거야?");
    const user = await User.findOne(
      { id: payload.id },
      { refreshToken: 1, id: 1 }
    );
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});

export default refreshJwt;
