const express = require('express');
const db = require('../database/db');

const router = express.Router();

// Admin dashboard
router.get('/', (req, res) => {
  db.all('SELECT * FROM products ORDER BY created_at DESC', (err, products) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).render('error', { error: 'Database error' });
    }

    res.render('admin/dashboard', {
      products,
      username: req.session.username
    });
  });
});

// Add product page
router.get('/products/new', (req, res) => {
  res.render('admin/product-form', {
    product: null,
    isEdit: false,
    username: req.session.username
  });
});

// Edit product page
router.get('/products/:id/edit', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).render('error', { error: 'Database error' });
    }

    if (!product) {
      return res.status(404).render('404');
    }

    res.render('admin/product-form', {
      product,
      isEdit: true,
      username: req.session.username
    });
  });
});

// Create product
router.post('/products', (req, res) => {
  const { name, category, price, image, description, affiliate_link } = req.body;

  if (!name || !category || !price || !image || !description || !affiliate_link) {
    return res.render('admin/product-form', {
      product: req.body,
      isEdit: false,
      error: 'Semua field harus diisi',
      username: req.session.username
    });
  }

  const query = `
    INSERT INTO products (name, category, price, image, description, affiliate_link)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [name, category, price, image, description, affiliate_link], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.render('admin/product-form', {
        product: req.body,
        isEdit: false,
        error: 'Gagal menambah produk',
        username: req.session.username
      });
    }

    res.redirect('/admin');
  });
});

// Update product
router.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, category, price, image, description, affiliate_link } = req.body;

  if (!name || !category || !price || !image || !description || !affiliate_link) {
    return res.render('admin/product-form', {
      product: { ...req.body, id },
      isEdit: true,
      error: 'Semua field harus diisi',
      username: req.session.username
    });
  }

  const query = `
    UPDATE products
    SET name = ?, category = ?, price = ?, image = ?, description = ?, affiliate_link = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [name, category, price, image, description, affiliate_link, id], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.render('admin/product-form', {
        product: { ...req.body, id },
        isEdit: true,
        error: 'Gagal mengupdate produk',
        username: req.session.username
      });
    }

    if (this.changes === 0) {
      return res.status(404).render('404');
    }

    res.redirect('/admin');
  });
});

// Delete product
router.delete('/products/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  });
});

// API endpoints for AJAX operations
router.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products ORDER BY created_at DESC', (err, products) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(products);
  });
});

router.get('/api/stats', (req, res) => {
  const stats = {};

  // Get total products
  db.get('SELECT COUNT(*) as total FROM products', (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    stats.totalProducts = row.total;

    // Get products by category
    db.all(`
      SELECT category, COUNT(*) as count
      FROM products
      GROUP BY category
    `, (err, categories) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      stats.categories = categories;

      // Get recent products
      db.all(`
        SELECT * FROM products
        ORDER BY created_at DESC
        LIMIT 5
      `, (err, recent) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        stats.recentProducts = recent;

        res.json(stats);
      });
    });
  });
});

module.exports = router;
