import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';
import logo from "../../assets/logo.png";
function Footer() {
  return (
    <footer className="bg-footer">
      <div className="footer-wave"></div>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-main">
            <Link to="/" className="footer-logo">
              <img
                src={logo}
                width="100px"
                alt="logo"
              />
              <span className="footer-brand">VENZO</span>
            </Link>
            <p className="footer-description">
              A platform for sharing knowledge, stories, and ideas. Join our community
              of writers and readers to explore diverse perspectives.
            </p>
            <div className="footer-socials">
              <a href="https://github.com/kmahesh18/" className="social-icon" aria-label="Github">
                <FiGithub />
              </a>
              <a href="https://x.com/xnor404" className="social-icon" aria-label="Twitter">
                <FiTwitter />
              </a>
              <a href="https://www.linkedin.com/in/mahesh-kumar-0a2b47290/" className="social-icon" aria-label="LinkedIn">
                <FiLinkedin />
              </a>
              <a href="mailto:maheshkolli888@gmail.com" className="social-icon" aria-label="Email">
                <FiMail />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-section-title">Quick Links</h3>
            <div className="footer-links">
              <div className="footer-link">
                <Link to="/">Home</Link>
              </div>
              <div className="footer-link">
                <Link to="/">About</Link>
              </div>
              <div className="footer-link">
                <Link to="/">Contact : +91 9346968655</Link>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-section-title">Categories</h3>
            <div className="footer-links">
              <div className="footer-link">
                <Link to="/">Technology</Link>
              </div>
              <div className="footer-link">
                <Link to="/">Lifestyle</Link>
              </div>
              <div className="footer-link">
                <Link to="/">Travel</Link>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-section-title">Support</h3>
            <div className="footer-links">
              <div className="footer-link">
                <Link to="/">FAQ</Link>
              </div>
              <div className="footer-link">
                <Link to="/">Privacy Policy</Link>
              </div>
              <div className="footer-link">
                <Link to="/">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} VENZO. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/" className="footer-bottom-link">
                Privacy Policy
              </Link>
              <Link to="/" className="footer-bottom-link">
                Terms of Service
              </Link>
              <Link to="/" className="footer-bottom-link">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
