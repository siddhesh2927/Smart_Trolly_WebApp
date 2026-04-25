import { Link } from "react-router-dom"
import "../styles/global.css"

function HomePage() {
  return (
    <div className="homepage-container">
      {/* Navigation Bar */}
      <nav className="main-navbar">
        <div className="logo">Smart Cart</div>
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li>
            <a href="#features" className="nav-link">
              Features
            </a>
          </li>
          <li>
            <a href="#about" className="nav-link">
              About
            </a>
          </li>
          <li>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Header Section */}
      <header className="homepage-header">
        <h1>Welcome to Smart Cart</h1>
        <p>Your ultimate solution for smart shopping with barcode scanning and digital checkout.</p>
      </header>

      {/* Navigation Buttons */}
      <div className="homepage-nav">
        <Link to="/login" className="nav-button">
          Login
        </Link>
        <Link to="/signup" className="nav-button">
          Signup
        </Link>
      </div>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2 className="section-title">About Smart Cart</h2>
        <p>
          Smart Cart is designed to revolutionize the shopping experience by integrating advanced technology for
          seamless and efficient shopping. Our goal is to save your time and make shopping enjoyable.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2 className="section-title">Features</h2>
        <p>Discover the amazing features of Smart Cart:</p>
        <ul>
          <li>Fast and secure barcode scanning</li>
          <li>Real-time cart updates</li>
          <li>Hassle-free digital checkout</li>
          <li>Eco-friendly and paperless receipts</li>
        </ul>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2 className="section-title">Contact Us</h2>
        <p>Have questions or need support? Reach out to us:</p>
        <ul>
          <li>Email: support@smartcart.com</li>
          <li>Phone: +91-9834652354</li>
          <li>Address: MIT ADT, DESIGN & TECHNOLOGY UNIVERSITY
          LONI KALBHOR</li>
        </ul>
      </section>
    </div>
  )
}

export default HomePage
