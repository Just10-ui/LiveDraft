import pool from '../database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getRandomAvatar } from '../utils/utils.js';

dotenv.config();

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const avatar = getRandomAvatar();

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
    const existingUser = user.rows;

    if (existingUser.length > 0) {

      if (existingUser[0].username === username) {
        return res.status(400).json({field: 'username', message: 'Username is already used'})
      }

      if (existingUser[0].email === email) {
        return res.status(400).json({field: 'email', message: 'Email is already used'})
      }
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const result = await pool.query('INSERT INTO users(username, email, password, profile) VALUES ($1, $2, $3, $4) RETURNING *;', [username, email, hashPassword, avatar]);
    const token = jwt.sign({ userId: result.rows[0].id }, 
    process.env.JWT_SECRET, { expiresIn: '20h' });

    res.status(201).json({message: 'Signup successfully', token, user: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error'});
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
    const matchPassword = await bcrypt.compare(user.rows[0].password, password);
    const matchEmail = user.rows[0].email;
    
    if (matchEmail !== email) {
      return res.status(400).json({field: 'email', message: 'Email not found'});
    }

    if (!matchPassword) {
      return res.status(400).json({field: 'password', message: 'Password is incorrect'});
    }

    const token = jwt.sign(
      { userId: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: '20h' }
    )

    res.status(200).json({message: 'Login successfully', token, user: user.rows[0]});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error'});
  }
};

export const userProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1;', [userId]);

    res.status(200).json({message: 'Success', user: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server error'});
  }
};