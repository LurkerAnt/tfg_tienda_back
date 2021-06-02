import {Router} from 'express';
import { adminStrategy, userStrategy } from "../middlewares/passport";
const router = Router();

import passport, { Strategy } from 'passport';
/*
router.get(
  "/admin",
  adminStrategy.authenticate("adminStrategy", { session:false, successRedirect: 'localhost:4200/lista-articulo-admin.component.html',
  failureRedirect: 'localhost:4200/user-login.component.html' }),
  (req, res) => {
    res.send("success");
  }
);
*/
export default router;