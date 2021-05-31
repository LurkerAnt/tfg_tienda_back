import User from "../models/usuario.moogose";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import passport from "passport";





const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'tokenSecreto'
};



export var adminStrategy = passport.use(
  "adminStrategy",
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user?.admin) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      console.log(error);
    }
  })
);

export var userStrategy = passport.use(
  "userStrategy",
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user?.admin) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      console.log(error);
    }
  })
);

export default new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});

