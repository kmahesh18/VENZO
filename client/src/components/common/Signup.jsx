import React from "react";
import { SignUp } from "@clerk/clerk-react";

function Signup() {
  const appearance = {
    layout: {
      logoPlacement: "inside",
      socialButtonsVariant: "iconButton",
      showOptionalFields: true,
    },
    variables: {
      colorPrimary: '#8b5cf6',          // Bootstrap primary blue
      colorTextOnPrimaryBackground: '#ffffff',
      colorBackground: '#ffffff',
      colorInputBackground: '#ffffff',
      colorInputText: '#8b5cf6',        // Bootstrap default text color
      colorTextSecondary: '#8b5cf6',    // Bootstrap secondary text
      colorTextLink: '#8b5cf6',         // Bootstrap primary blue
      colorDanger: '#8b5cf6',           // Bootstrap danger color
      fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", sans-serif',
    },
    elements: {
      card: "card shadow p-5 p-md-5",
      headerTitle: "h3 mb-3 fw-bold text-center",
      headerSubtitle: "text-secondary mb-4 text-center",
      formButtonPrimary: "btn btn-primary w-100 py-2 fw-semibold",
      formFieldLabel: "form-label fw-semibold",
      formFieldInput: "form-control",
      footerActionLink: "text-primary text-decoration-none fw-semibold",
      socialButtonsIconButton: "btn btn-outline-secondary w-100 mb-2",
      dividerLine: "border-top",
      dividerText: "text-secondary small px-2",
      alert: "alert alert-danger",
    },
  };

  return (
    <div className="container min-vh-100">
      <div className="row min-vh-100 align-items-center justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <SignUp 
            appearance={appearance}
            redirectUrl="/"
            signInUrl="/signin"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
