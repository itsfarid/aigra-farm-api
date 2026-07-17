# AIGRA Farm Management API

Simple RESTful API to manage agricultural land (farm) data. Built with Node.js, Express, TypeScript, Sequelize, and SQLite.

## Tech Stack
- Node.js + TypeScript
- Express
- Sequelize (ORM)
- SQLite

## Setup & Run

1. Clone the repo and enter the directory
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.example` to `.env` (defaults work out of the box):
   ```
   cp .env.example .env
   ```
4. Run the dev server:
   ```
   npm run dev
   ```
5. Server runs at: http://localhost:3000

## Endpoints

| Method | Path        | Description                                   |
|--------|-------------|------------------------------------------------|
| GET    | /farms      | List all farms (pagination, location filter)   |
| GET    | /farms/:id  | Get a single farm by ID                         |
| POST   | /farms      | Create a new farm                               |
| PUT    | /farms/:id  | Update an existing farm                         |
| DELETE | /farms/:id  | Delete a farm                         |

### GET /farms
Query params: `skip` (default 0), `limit` (default 10, max 100), `location` (optional filter)

**Response 200:**
```json
[
  {
    "id": 1,
    "name": "Lahan Padi Sukamaju",
    "location": "Sukabumi",
    "area_hectare": 2.5,
    "crop_type": "Padi",
    "createdAt": "2026-07-17T10:08:51.198Z",
    "updatedAt": "2026-07-17T10:08:51.198Z"
  }
]
```

### GET /farms/:id
**Response 200:** single farm object (as above)
**Response 404:**
```json
{ "error": { "code": 404, "message": "Farm with id 999 not found" } }
```

### POST /farms
**Request body:**
```json
{
  "name": "Lahan Padi Sukamaju",
  "location": "Sukabumi",
  "area_hectare": 2.5,
  "crop_type": "Padi"
}
```
**Response 201:** created farm object
**Response 400** (missing required field):
```json
{ "error": { "code": 400, "message": "Field 'name' is required" } }
```

### PUT /farms/:id
**Request body:** any subset of fields to update
**Response 200:** updated farm object
**Response 404:** if farm not found
**Response 400:** if `name` is provided but empty

### DELETE /farms/:id
**Response 200:**
```json
{ "message": "Farm with id 1 deleted successfully" }
```
**Response 404:** if farm not found

## Notes
- Consistent error format across all endpoints: `{ "error": { "code": ..., "message": ... } }`
- Input validation on POST and PUT (`name` required and cannot be empty)
- SQLite used for simplicity; can be swapped to PostgreSQL/MySQL via Sequelize dialect config
- Basic security consideration: no raw SQL used (Sequelize ORM prevents SQL injection by default)
- Pagination and location filter implemented on GET /farms
- DELETE endpoint 

## Security Considerations

Basic security measures implemented in this API:

- **SQL Injection Prevention**: All database queries go through Sequelize ORM with parameterized queries; no raw SQL is used anywhere in the codebase.
- **Input Validation**: Required fields (e.g. `name`) are validated on POST and PUT requests before hitting the database. Empty or non-string values are rejected with a 400 response.
- **Security Headers**: `helmet` middleware is used to set standard HTTP security headers (Content-Security-Policy, X-Content-Type-Options, X-Frame-Options, HSTS, etc).
- **Rate Limiting**: `express-rate-limit` caps each IP to 100 requests per 15-minute window, returning a 429 response when exceeded, to mitigate basic abuse/DoS attempts.
- **Consistent Error Responses**: Errors never leak stack traces or internal implementation details to the client; only a code and a safe message are returned.
- **Environment Variables**: Sensitive configuration (database path, port) is kept in `.env`, excluded from version control via `.gitignore`, with `.env.example` provided as a template.