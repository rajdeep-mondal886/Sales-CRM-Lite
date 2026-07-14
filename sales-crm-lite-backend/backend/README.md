# Sales CRM Backend

Backend API for a Sales CRM system with role-based modules:
- User module: authentication, lead/task management, pipelines
- Admin module: user management, lead supervision, analytics

## Tech Stack
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT auth
- Zod validation

## Project Structure
The source structure follows:
- `src/admin/*` for admin controllers/routes/services/validations
- `src/user/*` for user controllers/routes/services/validations
- `src/models/*` for Mongoose models
- `src/middlewares/*` for auth/role/validation/error handling
- `src/config/*` for env, db, jwt helpers
- `src/utils/*` for shared helpers

## Setup
1. Install dependencies:
   - `npm install`
2. Configure environment:
   - Copy `.env` values and update for your system
3. Run in development:
   - `npm run dev`
4. Build:
   - `npm run build`

## Main Routes
- `POST /api/v1/user/auth/register`
- `POST /api/v1/user/auth/login`
- `GET /api/v1/user/leads`
- `POST /api/v1/user/leads`
- `GET /api/v1/user/tasks`
- `POST /api/v1/user/tasks`
- `GET /api/v1/user/pipelines`
- `GET /api/v1/admin/users`
- `PATCH /api/v1/admin/users/:id/role`
- `GET /api/v1/admin/leads`
- `PATCH /api/v1/admin/leads/:id/stage`
- `GET /api/v1/admin/analytics/overview`
