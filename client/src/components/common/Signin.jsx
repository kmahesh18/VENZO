import React from "react";
import { SignIn } from "@clerk/clerk-react";

function Signin() {
  return (
    <div className="mt-5">
      <div className="d-flex justify-content-center align-items-center h-100">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-[#E85F5C] hover:bg-[#667085]",
            card: "shadow-xl rounded-2xl border border-[#667085]",
            headerTitle: "text-[#667085] font-bold",
          },
        }}
        fallbackRedirectUrl="/"
        signUpUrl="/signup"
      />
    </div>
    </div>
  );
}

export default Signin;