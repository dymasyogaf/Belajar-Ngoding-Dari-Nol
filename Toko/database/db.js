const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const dbPath = path.join(__dirname, '..', 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

// Create tables
db.serialize(() => {
  // Products table
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price TEXT NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL,
      affiliate_link TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Admin users table
  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert default admin user if not exists
  const bcrypt = require('bcryptjs');
  const defaultUsername = 'admin';
  const defaultPassword = 'admin123';

  db.get('SELECT * FROM admins WHERE username = ?', [defaultUsername], (err, row) => {
    if (err) {
      console.error('Error checking admin user:', err);
      return;
    }

    if (!row) {
      bcrypt.hash(defaultPassword, 10, (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
          return;
        }

        db.run('INSERT INTO admins (username, password_hash) VALUES (?, ?)',
          [defaultUsername, hash], (err) => {
          if (err) {
            console.error('Error creating default admin:', err);
          } else {
            console.log('✅ Default admin user created');
          }
        });
      });
    }
  });

  // Insert sample products if table is empty
  db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
    if (err) {
      console.error('Error checking products count:', err);
      return;
    }

    if (row.count === 0) {
      const sampleProducts = [
        {
          name: 'Ultimate Course Bundle',
          category: 'ebook',
          price: 'Rp 299.000',
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
          description: 'Koleksi lengkap course digital marketing, web development, dan entrepreneurship. Lebih dari 50+ jam konten video berkualitas tinggi.',
          affiliate_link: 'https://example.com/course-bundle'
        },
        {
          name: 'Premium Template Pack',
          category: 'hiburan',
          price: 'Rp 199.000',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
          description: 'Paket template website, landing page, dan UI kit premium untuk designer dan developer. Mudah customize dan responsive.',
          affiliate_link: 'https://example.com/template-pack'
        },
        {
          name: 'Adventure Photography Guide',
          category: 'adventure',
          price: 'Rp 149.000',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
          description: 'Panduan lengkap fotografi petualangan. Dari teknik dasar hingga tips profesional untuk menghasilkan foto yang menakjubkan.',
          affiliate_link: 'https://example.com/photo-guide'
        }
      ];

      const stmt = db.prepare(`
        INSERT INTO products (name, category, price, image, description, affiliate_link)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      sampleProducts.forEach(product => {
        stmt.run([
          product.name,
          product.category,
          product.price,
          product.image,
          product.description,
          product.affiliate_link
        ]);
      });

      stmt.finalize();
      console.log('✅ Sample products inserted');
    }
  });
});

module.exports = db;
