# Backend API Documentation

## User API Endpoints

## POST /users/signup

Creates a new user account with username, email, and password.

### Request

**Method:** `POST`  
**Endpoint:** `/users/signup`  
**Content-Type:** `application/json`

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | string | Yes | User's unique username |
| `email` | string | Yes | User's email address |
| `password` | string | Yes | User's password |

### Validation Rules

#### Username
- **Minimum Length:** 4 characters
- **Uniqueness:** Must be unique across all users
- **Required:** Yes

#### Email
- **Format:** Must be a valid email address format
- **Required:** Yes
- **Uniqueness:** Must be unique across all users

#### Password
- **Minimum Length:** 8 characters
- **Required Characters:**
  - At least one uppercase letter (A-Z)
  - At least one '@' symbol
- **Required:** Yes

### Request Example

```json
{
    "username": "john_doe123",
    "email": "john.doe@example.com",
    "password": "MySecret@123"
}
```

### Response

#### Success Response (201 Created)

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

#### Error Responses (400 Bad Request)

##### Validation Errors

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

##### Duplicate Email Error

```json
{
    "message": "User already exists with this email address"
}
```

##### Duplicate Username Error

```json
{
    "message": "User already exists with john_doe123"
}
```

 
```

 