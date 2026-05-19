# INVOFEST Backend API

Backend API untuk aplikasi INVOFEST (Informatics Vocational Festival) - festival tahunan yang bertujuan untuk menginspirasi dan memberdayakan generasi muda Indonesia dalam menghadapi era digital.

## Teknologi

- **Node.js** dengan **Express.js**
- **TypeScript** untuk type safety
- **CORS** untuk cross-origin requests
- In-memory storage (untuk development)

## Instalasi

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Authentication & Users

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "Saya adalah mahasiswa yang tertarik dengan teknologi AI",
  "event": "invofest"
}
```

**Response:**
```json
{
  "message": "Registrasi berhasil",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Saya adalah mahasiswa yang tertarik dengan teknologi AI",
    "event": "invofest",
    "createdAt": "2026-05-12T10:00:00.000Z"
  }
}
```

#### Login
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login berhasil",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "bio": "Saya adalah mahasiswa yang tertarik dengan teknologi AI",
    "event": "invofest",
    "createdAt": "2026-05-12T10:00:00.000Z"
  },
  "token": "dummy-token-1"
}
```

#### Get All Users
```http
GET /api/users
```

#### Get User by ID
```http
GET /api/users/:id
```

#### Delete User
```http
DELETE /api/users/:id
```

---

### Categories

#### Get All Categories
```http
GET /api/categories
```

#### Create Category
```http
POST /api/categories
Content-Type: application/json

{
  "name": "Workshop"
}
```

#### Get Category by ID
```http
GET /api/categories/:id
```

#### Update Category
```http
PUT /api/categories/:id
Content-Type: application/json

{
  "name": "Seminar"
}
```

#### Delete Category
```http
DELETE /api/categories/:id
```

---

### Events

#### Get All Events
```http
GET /api/events
```

#### Create Event
```http
POST /api/events
Content-Type: application/json

{
  "name": "Workshop AI",
  "category": 1,
  "date": "2026-06-15",
  "description": "Workshop tentang Artificial Intelligence"
}
```

#### Get Event by ID
```http
GET /api/events/:id
```

#### Update Event
```http
PUT /api/events/:id
Content-Type: application/json

{
  "name": "Workshop AI & Machine Learning",
  "category": 1,
  "date": "2026-06-15",
  "description": "Workshop tentang AI dan ML"
}
```

#### Delete Event
```http
DELETE /api/events/:id
```

---

### 🎤 Pembicara (Speakers)

#### Get All Pembicara
```http
GET /api/pembicaras
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Dr. Ahmad Zainudin",
    "title": "AI Research Scientist",
    "bio": "Expert in Machine Learning and Artificial Intelligence with 10+ years of experience",
    "photo": "/assets/zaim.png",
    "expertise": ["Machine Learning", "Deep Learning", "AI Ethics"]
  }
]
```

#### Create Pembicara
```http
POST /api/pembicaras
Content-Type: application/json

{
  "name": "Dr. Ahmad Zainudin",
  "title": "AI Research Scientist",
  "bio": "Expert in Machine Learning and Artificial Intelligence",
  "photo": "/assets/zaim.png",
  "expertise": ["Machine Learning", "Deep Learning"]
}
```

#### Get Pembicara by ID
```http
GET /api/pembicaras/:id
```

#### Update Pembicara
```http
PUT /api/pembicaras/:id
Content-Type: application/json

{
  "name": "Dr. Ahmad Zainudin",
  "title": "Senior AI Research Scientist"
}
```

#### Delete Pembicara
```http
DELETE /api/pembicaras/:id
```

---

### Seminars

#### Get All Seminars
```http
GET /api/seminars
```

#### Create Seminar
```http
POST /api/seminars
Content-Type: application/json

{
  "title": "AI for Future",
  "description": "Seminar tentang masa depan AI",
  "date": "2026-06-20",
  "time": "09:00",
  "location": "Auditorium Utama",
  "speaker": 1,
  "category": 1,
  "maxParticipants": 100
}
```

#### Get Seminar by ID
```http
GET /api/seminars/:id
```

#### Update Seminar
```http
PUT /api/seminars/:id
Content-Type: application/json

{
  "title": "AI for Future - Updated",
  "maxParticipants": 150
}
```

#### Delete Seminar
```http
DELETE /api/seminars/:id
```

#### Register to Seminar
```http
POST /api/seminars/:id/register
```

**Response:**
```json
{
  "message": "Berhasil mendaftar ke seminar",
  "seminar": {
    "id": 1,
    "title": "AI for Future",
    "registeredParticipants": 1,
    "maxParticipants": 100
  }
}
```

---

## Authentication Middleware

Untuk endpoint yang memerlukan authentication, tambahkan header:

```http
Authorization: Bearer dummy-token-1
```

Contoh penggunaan di routes:
```typescript
import { authenticate } from "../middlewares/authMiddleware";

router.post("/", authenticate, createEvent);
```

---

## Validasi

### Register User
- **name**: minimal 3 karakter
- **email**: format email valid
- **password**: minimal 8 karakter, harus berisi huruf dan angka
- **bio**: minimal 20 karakter
- **event**: wajib diisi

### Login
- **email**: wajib diisi
- **password**: wajib diisi

---

## Struktur Folder

```
be/
├── src/
│   ├── controllers/       # Business logic
│   │   ├── categoryController.ts
│   │   ├── eventController.ts
│   │   ├── pembicaraController.ts
│   │   ├── seminarController.ts
│   │   └── userController.ts
│   ├── middlewares/       # Middleware functions
│   │   └── authMiddleware.ts
│   ├── routes/           # API routes
│   │   ├── categoryRoutes.ts
│   │   ├── eventRoutes.ts
│   │   ├── pembicaraRoutes.ts
│   │   ├── seminarRoutes.ts
│   │   └── userRoutes.ts
│   ├── types/            # TypeScript interfaces
│   │   ├── category.ts
│   │   ├── event.ts
│   │   ├── pembicara.ts
│   │   ├── seminar.ts
│   │   └── user.ts
│   └── index.ts          # Entry point
├── package.json
├── tsconfig.json
└── README.md
```

---

## Development Notes

- Saat ini menggunakan **in-memory storage** untuk development
- Untuk production, implementasikan:
  - Database (PostgreSQL, MongoDB, dll)
  - JWT untuk authentication
  - Password hashing (bcrypt)
  - Input validation library (Joi, Zod)
  - Error handling middleware
  - Logging (Winston, Morgan)
  - Rate limiting
  - Environment variables (.env)

---

## Status Codes

- `200` - OK
- `201` - Created
- `204` - No Content
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

---

## Support

Untuk pertanyaan atau bantuan, hubungi tim INVOFEST.

---

**INVOFEST 2026** - *Beyond Limits, Beyond Intelligence: Innovate for a Smarter Tomorrow*
