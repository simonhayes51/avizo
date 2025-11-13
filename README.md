
# Avizo – Full-stack MVP

This repo contains a full-stack MVP of Avizo ready to demo and iterate:

- **Backend:** FastAPI + SQLAlchemy + (Railway PostgreSQL or local SQLite)
- **Frontend:** React + Vite + Tailwind
- **Features:**
  - Coming soon page with real waitlist (saved in DB)
  - Login (email + password, stored in DB – simple demo auth)
  - Dashboard pulling jobs from API
  - Customers list with "add customer" form (saved in DB)
  - Inbox threads + send message (saved in DB)
  - Automation & Pricing pages ready for marketing

## Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `.env` for frontend with:

```bash
VITE_API_URL=http://localhost:8000
```

Then open `http://localhost:5173`.
