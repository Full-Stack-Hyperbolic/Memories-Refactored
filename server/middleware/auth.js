import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// next = do something and move on to the next thing
const auth = async (req, res, next) => {
  try {
    console.log('AUTH', req.headers.authorization);
    // Check if the user is who they claim to be using JWT
    const token = req.headers.authorization.split(' ')[1];
    // Check if the token is from Google sign-in or our own - less than 500 is our own
    const isCustomAuth = token.length < 500;

    let decodedData;

    // If we're working with our own token
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decodedData.id;

      //   Else we're working with google OAuth token
    } else {
      decodedData = jwt.decode(token);

      // Set userId to Google unique user identification, differentiating google users
      req.userId = decodedData.sub;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
