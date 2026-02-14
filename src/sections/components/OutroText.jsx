import React from "react";
import"../cards/CardStyle.css"

export default function OutroText() {
  return (
      <div
          style={{
              width: "90%",
              maxWidth: "1144px",
              margin: "80px auto 40px auto",
              padding: "40px 0",
              textAlign: "center",
              fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
              color: "rgba(255,255,255,0.85)",
          }}
      >
          {/* Heading */}
          <h2
              style={{
                  fontSize: "28px",
                  margin: 0,
                  lineHeight: 1.6,
                  fontWeight: 500,
              }}
          >
              Contact
          </h2>

          <p
              style={{
                  fontSize: "18px",
                  margin: "14px 0 0 0",
                  lineHeight: 1.8,
                  opacity: 0.85,
              }}
          >
              <a
                  href="mailto:liam.williams@hotmail.nl?subject=Portfolio%20Inquiry"
                  className="contact-link"
              >
                  liam.williams@hotmail.nl
              </a>
          </p>

          <p
              style={{
                  fontSize: "16px",
                  margin: "6px 0 0 0",
                  lineHeight: 1.8,
                  opacity: 0.75,
              }}
          >
              <a
                  href="tel:+31623305401"
                  className="contact-link"
              >
                  +31 6 23305401
              </a>
          </p>

      <p>
          <a
              href="https://linkedin.com/in/wil-liam-s"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
          >
              LinkedIn
          </a>

          &nbsp;·&nbsp;

          <a
              href="https://github.com/autoCaptain"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
          >
              GitHub
          </a>
      </p>
</div>
)
    ;
}
