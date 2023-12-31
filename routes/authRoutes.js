import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userSchema.js';
import { generateToken } from '../utils.js';

const authRouter = express.Router();

authRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
          console.log("in login before user")

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      console.log("in login with user")
      if (bcrypt.compareSync(req.body.password, user.password)) {
        console.log('success');
        res.send({
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
          email: user.email,
          token: generateToken(user),
        });
      }
      else{
        res.send("couldent compare");
      }
    } else {
      res.status(401).send({ message: 'Invalid Password/User' });
    }
  })
);

authRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    console.log(req.body)
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
     console.log(user)
    res.send({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user),
    });
  })
);

export default authRouter;
