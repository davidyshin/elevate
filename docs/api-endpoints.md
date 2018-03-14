# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

## JSON API

### Users

- `POST /api/users` - creates users

### Session

- `POST /api/session` - logs in user / creates session
- `DELETE /api/session` - logs out user

### Jobs

- `GET /api/jobs` - fetches all jobs for a user
- `POST /api/jobs` - create job
- `GET /api/jobs/:jobId` - fetch job
- `PATCH /api/jobs/:jobId` - edit/update job
- `DELETE /api/jobs/:jobId` - deletes job by id

