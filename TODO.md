# TODO - Render backend deployment + Vercel integration

- [x] Inspect backend structure (Express, mongoose, JWT cookie, Cloudinary).
- [x] Add Render-compatible start script in `BLOG-BACKEND/package.json`.
- [x] Make backend CORS origin configurable via `process.env.CORS_ORIGIN` in `BLOG-BACKEND/server.js`.
- [ ] Deploy `BLOG-BACKEND` to Render with env vars:
  - DB_URL
  - JWT_SECRET
  - CLOUD_NAME
  - API_KEY
  - API_SECRET
  - CORS_ORIGIN=https://blog-frontend-359v.vercel.app
- [ ] Update `BLOG-FRONTEND` to stop hardcoding `http://localhost:4000`.
  - Add `VITE_API_BASE_URL` and replace all localhost URLs with `${VITE_API_BASE_URL}`.
- [ ] Redeploy frontend (Vercel) after frontend URL update.
- [ ] Validate:
  - login sets httpOnly cookie
  - authenticated requests work cross-domain
  - article list and add/edit work

