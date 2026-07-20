import * as React from "react";

export function EmailMobileStyles() {
  return (
    <style>{`
      @media only screen and (max-width: 480px) {
        .email-body {
          padding: 16px 0 !important;
        }

        .email-container {
          border-radius: 0 !important;
          width: 100% !important;
        }

        .email-header {
          padding: 20px 20px 8px !important;
        }

        .email-logo {
          max-width: 220px !important;
          width: 220px !important;
        }

        .email-content {
          padding: 4px 20px 24px !important;
        }

        .email-heading {
          font-size: 24px !important;
          line-height: 1.28 !important;
          margin: 8px 0 20px !important;
        }

        .email-button {
          font-size: 13px !important;
          padding: 10px 18px !important;
        }

        .email-footer {
          padding: 16px 20px !important;
        }
      }
    `}</style>
  );
}
