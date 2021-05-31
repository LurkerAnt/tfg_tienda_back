
import {Strategy, ExtractJwt, StrategyOptions} from 'passport-jwt'
import { Sequelize } from 'sequelize/types';
import Usuario from '../models/usuario.sequelize';
const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'tokenSecreto'
};

export default new Strategy(opts, async (payload, done) => {
    try {
      const user = await Usuario.findOne(payload.getDataValue("id"));
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      console.log(error);
    }
});