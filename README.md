# 🔗 URL Shortener App

A simple URL shortening application that allows users to create, retrieve, and manage shortened URLs. The app provides a RESTful API for all operations and includes a graphical user interface for easy interaction.

## 🚀 Features

- Shorten long URLs with a single API call or through the GUI.
- Retrieve original URLs using a shortened ID.
- Track how many times a shortened URL has been accessed.
- Delete shortened URLs from the database.
- User-friendly graphical interface for managing URLs.

## 🧩 API Overview

**Base URLs**:

- Development: `http://localhost:4000/api/v1`
- Production: `/api/v1`

All API routes are grouped under the `URL` tag.

### 📄 Endpoints

#### `GET /url/`

**Description**: Retrieve a list of all shortened URLs.

**Response**:

- `200 OK`: Returns an array of URL objects.

#### `POST /url/`

**Description**: Creates a new shortened URL.

**Request Body (application/json)**:

```json
{
  "fullUrl": "https://www.youtube.com/",
  "shortUrl": "WgRwK0d3DN",
  "clicks": 0
}
```

### `POST /url/`

**Response**:

- `201 Created`: URL successfully shortened.

---

### `GET /url/{idShort}`

**Description**: Retrieves the original URL by its shortened ID and redirects the user.

**Path Parameter**:

- `idShort` (string): The unique identifier of the shortened URL.

**Responses**:

- `200 OK`: URL found and returned.
- `400 Bad Request`: URL ID not found.

---

### `DELETE /url/{idShort}`

**Description**: Deletes a shortened URL by its ID.

**Path Parameter**:

- `idShort` (string): The unique identifier of the shortened URL.

**Responses**:

- `200 OK`: URL deleted successfully.
- `400 Bad Request`: URL ID not found.

## 📘 Schema: URL Object

| Field    | Type   | Description                         |
| -------- | ------ | ----------------------------------- |
| fullUrl  | string | The original full-length URL        |
| shortUrl | string | The generated shortened identifier  |
| clicks   | number | Number of accesses to the short URL |

**Example**:

```json
{
  "fullUrl": "https://www.youtube.com/",
  "shortUrl": "WgRwK0d3DN",
  "clicks": 5
}
```

## 🖥️ Graphical Interface

A frontend web interface is included for user-friendly interaction with the app.

**Features**:

- Input and shorten new URLs
- View list of all shortened links
- Track click statistics
- Delete existing shortened URLs

> The GUI communicates with the API described above.

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **API Spec**: OpenAPI / Swagger
- **Frontend**: React
- **Database**: MongoDB

## 📦 Installation & Running Locally

```bash
# 1. Clone the repository
git clone https://github.com/mao404/url-shortener.git

# 2. Navigate into the project directory
cd url-shortener-app

# 3. Install backend dependencies
npm install

# 4. Start the development server
npm run dev
```

## ✅ To-Do

- [ ] Migrate to TypeScript
- [ ] Fix frontend issue (404 error not returned as expected)
- [ ] Implement user account
- [ ] Add Docker
