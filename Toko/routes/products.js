const express = require('express');
const db = require('../database/db');

const router = express.Router();

// Get all products (API)
router.get('/api', (req, res) => {
  const filter = req.query.filter || 'all';
  const query = filter === 'all'
    ? 'SELECT * FROM products ORDER BY created_at DESC'
    : 'SELECT * FROM products WHERE category = ? ORDER BY created_at DESC';

  const params = filter === 'all' ? [] : [filter];

  db.all(query, params, (err, products) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(products);
  });
});

// Get single product (API)
router.get('/api/:id', (req, res) => {
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

// Create product (Admin only)
router.post('/api', (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const { name, category, price, image, description, affiliateLink } = req.body;

  if (!name || !category || !price || !image || !description || !affiliateLink) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    INSERT INTO products (name, category, price, image, description, affiliate_link)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [name, category, price, image, description, affiliateLink], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({
      success: true,
      message: 'Product created successfully',
      productId: this.lastID
    });
  });
});

// Update product (Admin only)
router.put('/api/:id', (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const { id } = req.params;
  const { name, category, price, image, description, affiliateLink } = req.body;

  if (!name || !category || !price || !image || !description || !affiliateLink) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = `
    UPDATE products
    SET name = ?, category = ?, price = ?, image = ?, description = ?, affiliate_link = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [name, category, price, image, description, affiliateLink, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      success: true,
      message: 'Product updated successfully'
    });
  });
});

// Delete product (Admin only)
router.delete('/api/:id', (req, res) => {
  if (!req.session.isAdmin) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const { id } = req.params;

  db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  });
});

// Get products by category (for frontend filtering)
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  const isAdmin = req.session.isAdmin || false;

  db.all('SELECT * FROM products WHERE category = ? ORDER BY created_at DESC', [category], (err, products) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).render('error', { error: 'Database error' });
    }

    res.render('store', {
      isAdmin,
      currentFilter: category,
      products
    });
  });
});

module.exports = router;
