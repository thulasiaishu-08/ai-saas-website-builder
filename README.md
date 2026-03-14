# 🚀 SiteForge — AI SaaS Website Builder

A full-stack SaaS platform where users generate fully responsive websites by filling a simple business form. Built with React + Vite, Node.js/Express, MySQL, and MongoDB.

---

## 📁 Project Structure

```
ai-saas-website-builder/
├── backend/
│   ├── config/
│   │   ├── mongodb.js          # MongoDB connection
│   │   ├── multer.js           # File upload config
│   │   └── mysql.js            # MySQL connection pool
│   ├── controllers/
│   │   ├── adminController.js  # Admin endpoints
│   │   ├── authController.js   # Signup / Login / Me
│   │   ├── contactController.js# Contact form handling
│   │   └── siteController.js   # CRUD for websites
│   ├── middlewares/
│   │   ├── auth.js             # JWT protect + adminOnly
│   │   └── errorHandler.js     # Global error handler
│   ├── models/
│   │   ├── Contact.js          # MongoDB Contact schema
│   │   └── Site.js             # MongoDB Site schema
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── contactRoutes.js
│   │   └── siteRoutes.js
│   ├── uploads/                # Uploaded logo images
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── templates/
│   │   │   │   ├── BusinessTemplate.jsx
│   │   │   │   ├── PortfolioTemplate.jsx
│   │   │   │   └── StartupTemplate.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── SiteCard.jsx
│   │   ├── pages/
│   │   │   ├── AdminPanelPage.jsx
│   │   │   ├── ContactMessagesPage.jsx
│   │   │   ├── CreateSitePage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── EditSitePage.jsx
│   │   │   ├── GeneratedSitePage.jsx
│   │   │   ├── LandingPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   ├── PreviewSitePage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── services/
│   │   │   ├── api.js          # Axios instance + interceptors
│   │   │   ├── authService.js
│   │   │   └── siteService.js
│   │   ├── utils/
│   │   │   ├── AuthContext.jsx # React auth context
│   │   │   └── ProtectedRoute.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── database/
│   └── mysql-schema.sql
└── README.md
```

---

## ✅ Prerequisites

- **Node.js** v18+
- **MySQL** 8.0+
- **MongoDB** 6.0+ (local) or MongoDB Atlas URI
- **npm** v9+

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-saas-website-builder.git
cd ai-saas-website-builder
```

---

### 2. Setup MySQL Database

Open MySQL CLI or a GUI like TablePlus / DBeaver and run:

```bash
mysql -u root -p < database/mysql-schema.sql
```

Or paste the contents of `database/mysql-schema.sql` into your MySQL client.

This creates:
- Database: `ai_website_builder`
- Table: `users` (id, name, email, password, role, created_at)
- Default admin user: `admin@websitebuilder.com` / `admin123`

---

### 3. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your credentials:

```env
PORT=5000
NODE_ENV=development

JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_root_password
MYSQL_DATABASE=ai_website_builder

MONGODB_URI=mongodb://localhost:27017/ai_website_builder

FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE=5242880
```

Start the backend:

```bash
npm run dev
```

Backend runs at: **http://localhost:5000**

---

### 4. Setup Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
```

`.env` contents (default works with Vite proxy):
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🌐 Access the App

| URL | Description |
|-----|-------------|
| http://localhost:5173 | Landing page |
| http://localhost:5173/signup | Create account |
| http://localhost:5173/login | Sign in |
| http://localhost:5173/dashboard | User dashboard |
| http://localhost:5173/dashboard/create | Create a new website |
| http://localhost:5173/site/:slug | View generated website |
| http://localhost:5173/admin | Admin panel (admin only) |

**Default admin credentials:**
- Email: `admin@websitebuilder.com`
- Password: `admin123`

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Create new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Sites
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/sites` | Get user's sites (+ search/filter) | ✅ |
| GET | `/api/sites/:id` | Get single site | ✅ |
| POST | `/api/sites/create` | Create new site (multipart/form-data) | ✅ |
| PUT | `/api/sites/update/:id` | Update site | ✅ |
| DELETE | `/api/sites/delete/:id` | Delete site | ✅ |
| GET | `/api/sites/public/:slug` | Get public site + track visit | ❌ |
| GET | `/api/sites/analytics/:id` | Get site analytics | ✅ |

### Contact
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/contact` | Submit contact form | ❌ |
| GET | `/api/contact/:siteId` | Get contact messages | ✅ |
| PUT | `/api/contact/read/:id` | Mark message as read | ✅ |

### Admin
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/admin/stats` | Platform stats | 🔐 Admin |
| GET | `/api/admin/users` | All users | 🔐 Admin |
| GET | `/api/admin/sites` | All sites | 🔐 Admin |
| GET | `/api/admin/contacts` | All messages | 🔐 Admin |
| DELETE | `/api/admin/users/:id` | Delete user | 🔐 Admin |

---

## 📊 Example API Responses

### POST `/api/auth/login`
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Admin",
    "email": "admin@websitebuilder.com",
    "role": "admin"
  }
}
```

### GET `/api/sites`
```json
{
  "success": true,
  "sites": [
    {
      "_id": "657abc123...",
      "userId": 2,
      "siteName": "Acme Design Studio",
      "slug": "acme-design-studio",
      "template": "business",
      "description": "Award-winning design agency...",
      "services": ["Web Design", "Branding", "SEO"],
      "contact": {
        "phone": "+1 555 000 0000",
        "email": "hello@acme.com",
        "address": "123 Main St, NYC"
      },
      "logo": "/uploads/1703123456-logo.png",
      "status": "published",
      "analytics": { "visits": 42, "contactRequests": 7 },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "stats": {
    "total": 3,
    "published": 2,
    "drafts": 1
  }
}
```

### GET `/api/sites/public/acme-design-studio`
```json
{
  "success": true,
  "site": { "...all site fields..." }
}
```

---

## 🧪 Sample Test Data

After setup, you can create test websites via the dashboard. Here's an example payload for `POST /api/sites/create`:

```
Content-Type: multipart/form-data

siteName: "Pixel & Co."
template: "portfolio"
description: "Creative digital studio specializing in bold brand identities."
services: ["Brand Identity", "UI/UX Design", "Motion Graphics"]
phone: "+44 20 7946 0958"
email: "hello@pixelco.studio"
address: "12 Shoreditch High St, London E1 6JE"
colorScheme: {"primary": "#7c3aed"}
status: "published"
logo: [file upload optional]
```

The generated site is then accessible at:
`http://localhost:5173/site/pixel-co`

---

## 🎨 Templates

| Template | Best For | Color Style |
|----------|----------|-------------|
| **Business** | Companies, agencies, services | Professional blue |
| **Portfolio** | Freelancers, creatives, artists | Elegant purple |
| **Startup** | Tech startups, SaaS, apps | Bold orange/dark |

---

## 🔑 Key Features Summary

- ✅ JWT authentication with bcrypt password hashing
- ✅ MySQL for user data, MongoDB for site content
- ✅ 4-step website creation wizard
- ✅ Logo upload with multer (stored in `/uploads`)
- ✅ 3 fully different responsive templates
- ✅ Dynamic public site URLs: `/site/:slug`
- ✅ Visit counter analytics per site
- ✅ Contact form with message inbox per site
- ✅ Search + filter sites by status
- ✅ Admin panel: users, sites, messages, stats
- ✅ Device preview (desktop/tablet/mobile)
- ✅ Protected routes with React Router

---

## 🐛 Troubleshooting

**MySQL connection failed:**
- Ensure MySQL is running: `sudo systemctl start mysql`
- Check credentials in `backend/.env`
- Run schema: `mysql -u root -p < database/mysql-schema.sql`

**MongoDB connection failed:**
- Ensure MongoDB is running: `sudo systemctl start mongod`
- Or use MongoDB Atlas: set `MONGODB_URI` to your Atlas connection string

**CORS errors:**
- Make sure `FRONTEND_URL=http://localhost:5173` in `backend/.env`
- Vite proxy is set up in `vite.config.js` to forward `/api` and `/uploads` to port 5000

**Logo images not loading:**
- Backend must be running (serves static files from `/uploads`)
- Check `API_URL` in `frontend/src/services/api.js`

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite, React Router v6, Bootstrap 5 |
| Backend | Node.js, Express.js |
| Auth DB | MySQL 8 + mysql2 |
| Content DB | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Uploads | Multer |
| Styling | Custom CSS + Bootstrap Icons |
| Fonts | Plus Jakarta Sans + Syne (Google Fonts) |

---

## 📝 License

MIT License — free to use, modify, and distribute.
