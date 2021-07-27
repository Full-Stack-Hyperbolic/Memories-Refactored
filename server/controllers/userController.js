import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/userModel';

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist!" });

    // compare the form password with db user password using bcrypt to compare hashes
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: 'Invalid password' });

    // Get the JWT to send to the front-end providing to arguments (information to provide, the secrete key, options object (expires in: 1hour))
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      'test',
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong...' });
  }
};

export const signUp = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    // make sure user doesn't exist already
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    // Let's create the user...

    // Hash the password first
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the user
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    // Create a json web token
    const token = jwt.sign({ email: result.email, id: result._id }, 'test', {
      expiresIn: '1h',
    });

    // Return our new user and the token
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong... ' });
  }
};
