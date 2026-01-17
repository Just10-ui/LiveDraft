import pool from '../database/db.js';
import bcrypt from 'bcrypt';

export const userSignup = async (req, res) => {
  const { username, email, password} = req.body;
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query('INSERT INTO users(username, email, password_hash) VALUES ($1, $2, $3) RETURNING *;', [username, email, hashPassword]);
    res.status(201).json({message: 'User signed up', details: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server is not responding!!'});
  }
};

export const userLogin = async (req, res) => {
  const {email, password} = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (isMatch) {
      res.status(200).json({message: 'Log in successfully'});
    } else {
      res.status(400).json({message: 'Incorrect password'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server is not responding!!'});
  }
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const hashPassword = await bcrypt.hash(newPassword, 10);
  const userId = req.params.userId;

  try {
    const password = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = password.rows[0];
    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);

    if (isMatch) {
      const result = await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2 RETURNING *;', [hashPassword, userId]);
      res.status(200).json({message: 'Updated successfully', password: result.rows[0]});
    } else {
      res.status(400).json({message: 'Invalid credentials'});
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server is not responding!!'});
  }
};

export const deleteAccount = async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *;', [userId]);

    res.status(200).json({message: 'Account deleted successfully', account: result.rows[0]});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server is not responding!!'});
  }
};