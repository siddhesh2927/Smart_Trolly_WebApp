# Smart Trolley Project

The **Smart Trolley** is an innovative retail solution designed to streamline the shopping experience. It features a self-scanning system where customers can scan items using their devices, manage their cart in real-time, and complete their shopping efficiently.

---

###  Frontend
The frontend is a modern web application designed for a seamless user experience.

- **Framework**: **React.js**
- **Routing**: **React Router DOM** for internal navigation.
- **Libraries**:
  - `html5-qrcode` & `qrcode.react`: Essential for scanning product barcodes and generating cart-related QR codes.
  - `Axios`: Used for robust API communication.
- **Styling**: **Vanilla CSS** for clean, custom interface design (located in `src/styles`).

###  Backend
The backend provides a secure and efficient API for data management.

- **Language**: **PHP**
- **Server Environment**: **XAMPP** (Local Apache server).
- **Database**: **MySQL/MariaDB** (connecting via `db.php` to the `smartcart_db` database).
- **API Structure**: A modular set of PHP scripts:
  - `login.php`: Secure user authentication.
  - `signup.php`: New user registration.
  - `fetch_products.php`: Dynamic retrieval of product details.
  - `admin_functions.php`: Specialized logic for administrative management.

### Communication
The frontend and backend bridge are built on standard web protocols:
- **Protocol**: HTTP/HTTPS
- **Method**: RESTful API requests via `fetch` or `Axios`.
- **Data Format**: JSON for all data exchanges.
- **Base Endpoint**: `http://localhost/smartcart-api/`

---

## Getting Started

### Prerequisites
- Node.js (for the frontend)
- XAMPP/WAMP (for the backend and database)

### Installation

1. **Frontend**:
   ```bash
   cd smartTrolly
   npm install
   npm start
   ```

2. **Backend**:
   - Move the `smartcart-api` folder to your server's root (e.g., `C:\xampp\htdocs\`).
   - Ensure MySQL is running and the database `smartcart_db` is created.

---

## Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder.
