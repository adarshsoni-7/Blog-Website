# Backend API Documentation

## User API Endpoints

### POST /users/signup

Creates a new user account with username, email, and password.

#### Request

**Method:** `POST`  
**Endpoint:** `/users/signup`  
**Content-Type:** `application/json`

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | string | Yes | User's unique username |
| `email` | string | Yes | User's email address |
| `password` | string | Yes | User's password |

#### Validation Rules

**Username**
- **Minimum Length:** 4 characters
- **Uniqueness:** Must be unique across all users
- **Required:** Yes

**Email**
- **Format:** Must be a valid email address format
- **Required:** Yes
- **Uniqueness:** Must be unique across all users

**Password**
- **Minimum Length:** 8 characters
- **Required Characters:**
  - At least one uppercase letter (A-Z)
  - At least one '@' symbol
- **Required:** Yes

#### Request Example

```json
{
    "username": "john_doe123",
    "email": "john.doe@example.com",
    "password": "MySecret@123"
}
```

#### Response

**Success Response (201 Created)**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NDgxNTdmOGIwNGQwOTI4MmFmZWMwNiIsImlhdCI6MTc0OTU1NDU1OSwiZXhwIjoxNzQ5NjQwOTU5fQ.2D-X5VV9YoLsj_A5WtWR-GLAmJFGvLxjtwyx5UhZUEE",
    "user": {
        "username": "john_doe123",
        "email": "john.doe@example.com",
        "_id": "6848157f8b04d09282afec06",
        "__v": 0
    }
}
```

**Response Fields:**
- `token`: JWT authentication token (expires in 24 hours)
- `user`: Created user object
  - `username`: The user's username
  - `email`: The user's email address
  - `_id`: Unique user identifier
  - `__v`: Version key (MongoDB)

**Error Responses (400 Bad Request)**

*Validation Errors*

```json
{
    "errors": [
        {
            "type": "field",
            "value": "usr",
            "msg": "Username must be at least 4 characters long",
            "path": "username",
            "location": "body"
        },
        {
            "type": "field",
            "value": "invalid-email",
            "msg": "Invalid email",
            "path": "email",
            "location": "body"
        },
        {
            "type": "field",
            "value": "weak",
            "msg": "Password must be at least 8 characters long",
            "path": "password",
            "location": "body"
        }
    ]
}
```

*Duplicate Email Error*

```json
{
    "message": "User already exists with this email address"
}
```

*Duplicate Username Error*

```json
{
    "message": "User already exists with john_doe123"
}
```

#### Possible Validation Error Messages

| Field | Error Message |
|-------|---------------|
| username | "Username must be at least 4 characters long" |
| email | "Invalid email" |
| password | "Password must be at least 8 characters long" |
| password | "Password must contain at least one uppercase letter" |
| password | "Password must contain at least one @ symbol" |

#### Status Codes

| Status Code | Description |
|-------------|-------------|
| 201 | Created - User successfully registered |
| 400 | Bad Request - Validation error or user already exists |

#### Example Usage

**cURL**

```bash
curl -X POST http://localhost:3000/users/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john_doe123",
    "email": "john.doe@example.com",
    "password": "MySecret@123"
  }'
```

---

### POST /users/login

Authenticates an existing user with email and password.

#### Request

**Method:** `POST`  
**Endpoint:** `/users/login`  
**Content-Type:** `application/json`

#### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | User's registered email address |
| `password` | string | Yes | User's password |

#### Validation Rules

**Email**
- **Format:** Must be a valid email address format
- **Required:** Yes

**Password**
- **Minimum Length:** 8 characters
- **Required Characters:**
  - At least one uppercase letter (A-Z)
  - At least one '@' symbol
- **Required:** Yes

#### Request Example

```json
{
    "email": "john.doe@example.com",
    "password": "MySecret@123"
}
```

#### Response

**Success Response (200 OK)**

```json
{
    "token": "your_token_here",
    "user": {
        "_id": "_your_id_here",
        "username": "john_doe123",
        "email": "john.doe@example.com",
        "password": "$2b$10$CEEPUSXbWk3HdY4Ps/xQD.AH/VzrzXFytbLxm3hGjwITAwyJKmYdm",
        "__v": 0
    }
}
```

**Response Fields:**
- `token`: JWT authentication token (expires in 24 hours)
- `user`: User object with complete details
  - `_id`: Unique user identifier
  - `username`: The user's username
  - `email`: The user's email address
  - `password`: Hashed password (bcrypt)
  - `__v`: Version key (MongoDB)

**Cookie:** The JWT token is also set as an HTTP cookie named `token`

**Error Responses (400 Bad Request)**

*Validation Errors*

```json
{
    "errors": [
        {
            "type": "field",
            "value": "invalid-email",
            "msg": "Invalid email",
            "path": "email",
            "location": "body"
        },
        {
            "type": "field",
            "value": "weak",
            "msg": "Password must be at least 8 characters long",
            "path": "password",
            "location": "body"
        }
    ]
}
```

*Authentication Errors*

```json
{
    "message": "Invalid email or password"
}
```

*Server Error*

```json
{
    "message": "Internal server error details"
}
```

#### Possible Validation Error Messages

| Field | Error Message |
|-------|---------------|
| email | "Invalid email" |
| password | "Password must be at least 8 characters long" |
| password | "Password must contain at least one uppercase letter" |
| password | "Password must contain at least one @ symbol" |

#### Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - User successfully authenticated |
| 400 | Bad Request - Validation error, invalid credentials, or server error |

#### Example Usage

**cURL**

```bash
curl -X POST http://localhost:3000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "MySecret@123"
  }'
```

**JavaScript (Fetch)**

```javascript
const response = await fetch('/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'john.doe@example.com',
    password: 'MySecret@123'
  })
});

const data = await response.json();
```

---

### GET /users/profile

Retrieves the authenticated user's profile information.

#### Request

**Method:** `GET`  
**Endpoint:** `/users/profile`  
**Authentication:** Required (JWT Token)

#### Headers

| Header | Value | Required | Description |
|--------|-------|----------|-------------|
| `Authorization` | `Bearer <token>` | Yes | JWT token from login/signup |

#### Request Example

```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer your_token_here"
```

#### Response

**Success Response (200 OK)**

```json
{
    "_id": "68484f817e098321fdec9700",
    "username": "john_doe123",
    "email": "john.doe@example.com",
    "__v": 0
}
```

**Response Fields:**
- `_id`: Unique user identifier
- `username`: The user's username
- `email`: The user's email address
- `__v`: Version key (MongoDB)

**Note:** Password field is excluded from the response for security

**Error Responses**

*Unauthorized (401)*

```json
{
    "message": "Access denied. No token provided."
}
```

*Invalid Token (401)*

```json
{
    "message": "Invalid token."
}
```

*Token Expired (401)*

```json
{
    "message": "Token expired."
}
```

<<<<<<< HEAD
#### Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Profile retrieved successfully |
| 401 | Unauthorized - Missing, invalid, or expired token |

#### Example Usage

**JavaScript (Fetch)**

```javascript
const response = await fetch('/users/profile', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

const userProfile = await response.json();
```

---

 
 
 
=======
 
>>>>>>> 1e27782c3d1e122424e9e9d1805cbc5d4cecbc53
