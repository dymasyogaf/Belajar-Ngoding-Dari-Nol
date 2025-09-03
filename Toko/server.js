const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const db = require('./database/db');

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  store: new SQLiteStore({ db: 'sessions.db', dir: __dirname }),
  secret: 'digitalstore-secret-key-2024',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to check if user is admin
const requireAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    return next();
  }
  res.redirect('/login');
};

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/admin', requireAdmin, adminRoutes);

// Main routes
app.get('/', (req, res) => {
  const isAdmin = req.session.isAdmin || false;
  res.render('store', { isAdmin, currentFilter: 'home' });
});

app.get('/store', (req, res) => {
  const isAdmin = req.session.isAdmin || false;
  const filter = req.query.filter || 'all';
  res.render('store', { isAdmin, currentFilter: filter });
});

app.get('/login', (req, res) => {
  if (req.session.isAdmin) {
    return res.redirect('/admin');
  }
  res.render('login', { error: null });
});

app.get('/admin', requireAdmin, (req, res) => {
  res.render('admin/dashboard');
});

app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
    }
    res.redirect('/');
  });
});

// API Routes for AJAX requests
app.get('/api/products', (req, res) => {
  const filter = req.query.filter || 'all';
  db.all(`
    SELECT * FROM products
    WHERE category = ? OR ? = 'all'
    ORDER BY created_at DESC
  `, [filter, filter], (err, products) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(products);
  });
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 DigitalStore server running on http://localhost:${PORT}`);
});

module.exports = app;
