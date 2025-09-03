const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../database/db');

const router = express.Router();

// Login page
router.get('/login', (req, res) => {
  if (req.session.isAdmin) {
    return res.redirect('/admin');
  }
  res.render('auth/login', { error: null });
});

// Login process
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find admin user
    db.get('SELECT * FROM admins WHERE username = ?', [username], async (err, admin) => {
      if (err) {
        console.error('Database error:', err);
        return res.render('auth/login', { error: 'Database error' });
      }

      if (!admin) {
        return res.render('auth/login', { error: 'Username atau password salah' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, admin.password_hash);
      if (!isValidPassword) {
        return res.render('auth/login', { error: 'Username atau password salah' });
      }

      // Set session
      req.session.isAdmin = true;
      req.session.adminId = admin.id;
      req.session.username = admin.username;

      res.redirect('/admin');
    });
  } catch (error) {
    console.error('Login error:', error);
    res.render('auth/login', { error: 'Terjadi kesalahan sistem' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

// API Login (for AJAX requests)
router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    db.get('SELECT * FROM admins WHERE username = ?', [username], async (err, admin) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isValidPassword = await bcrypt.compare(password, admin.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      req.session.isAdmin = true;
      req.session.adminId = admin.id;
      req.session.username = admin.username;

      res.json({
        success: true,
        message: 'Login berhasil',
        user: {
          id: admin.id,
          username: admin.username
        }
      });
    });
  } catch (error) {
    console.error('API Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Check auth status
router.get('/api/status', (req, res) => {
  if (req.session.isAdmin) {
    res.json({
      authenticated: true,
      user: {
        id: req.session.adminId,
        username: req.session.username
      }
    });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
