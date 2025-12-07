// components/Footer.tsx
export default function Footer() {
    return (
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} MessageCraft — Developed by DSK</p>
          <p>
            <a href="https://github.com/DSrinivasKarthik/messagecraft" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{" "}
            |{" "}
            <a href="mailto:dsrinivaskarthik@gmail.com">
              Contact
            </a>
          </p>
        </div>
      </footer>
    );
  }
  