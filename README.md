
# Avizo

Avizo is a customer communication automation platform for small service businesses. Automate appointment confirmations, reminders, review requests, and more.

## Features

- **Customer Management** - Store and manage customer information
- **Job Scheduling** - Track appointments and scheduled jobs
- **Message Inbox** - Communicate with customers through message threads
- **Automation Rules** - Configure automated messaging workflows
- **Secure Authentication** - JWT-based authentication system

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Production database (SQLite for local dev)
- **JWT** - Secure token-based authentication
- **Bcrypt** - Password hashing

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing

## Getting Started

### Prerequisites
- Python 3.9+
- Node.js 16+
- PostgreSQL (for production)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file (see `.env.example`):
```bash
cp .env.example .env
```

5. Configure environment variables in `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/avizo
JWT_SECRET_KEY=your-secret-key-here
ALLOWED_ORIGINS=http://localhost:5173
```

**IMPORTANT**: Generate a secure JWT secret key:
```bash
openssl rand -hex 32
```

6. Run the development server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (see `.env.example`):
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
VITE_API_URL=http://localhost:8000
```

5. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Deployment

### Railway Deployment

#### Backend

1. Create a new project on [Railway](https://railway.app)
2. Add a PostgreSQL database service
3. Add environment variables:
   - `DATABASE_URL` - Auto-configured by Railway
   - `JWT_SECRET_KEY` - Generate with `openssl rand -hex 32`
   - `ALLOWED_ORIGINS` - Your frontend domain (e.g., `https://yourdomain.com`)

4. Deploy from GitHub or using Railway CLI:
```bash
railway up
```

#### Frontend

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder to your hosting provider (Vercel, Netlify, etc.)

3. Set the environment variable:
   - `VITE_API_URL` - Your backend API URL

### Environment Variables Reference

#### Backend
- `DATABASE_URL` - Database connection string
- `JWT_SECRET_KEY` - Secret key for JWT tokens (CRITICAL: Must be secure in production)
- `ALLOWED_ORIGINS` - Comma-separated list of allowed frontend domains

#### Frontend
- `VITE_API_URL` - Backend API base URL

## Security Notes

⚠️ **Before going to production:**

1. Generate a strong JWT secret key (minimum 32 characters)
2. Set proper CORS origins (never use `*` in production)
3. Use HTTPS for all production domains
4. Regularly update dependencies for security patches
5. Review database connection strings for security
6. Enable environment-specific logging and monitoring

## API Documentation

FastAPI auto-generates API documentation:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
avizo/
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI application
│   │   ├── auth.py          # Authentication & JWT
│   │   ├── models.py        # Database models
│   │   ├── schemas.py       # Pydantic schemas
│   │   ├── database.py      # Database configuration
│   │   ├── deps.py          # Dependencies
│   │   └── routers/         # API route handlers
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── api.js         # API client
│   │   └── App.jsx        # Main app component
│   └── package.json
└── README.md
```

## License

Private project - All rights reserved
