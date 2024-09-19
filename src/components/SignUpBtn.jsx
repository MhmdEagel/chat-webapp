import React from "react";
import { CircularProgress } from "@mui/material";


export default function SignupBtn({ isLoading }) {
  return isLoading ? (
    <button
      className="mt-4 cursor-not-allowed rounded-lg border-2 border-white py-2 text-white hover:border-blue-500"
      type="submit"
      disabled
    >
      <CircularProgress size={20} />
    </button>
  ) : (
    <button
      className="mt-4 rounded-lg border-2 border-white py-2 text-white hover:border-blue-500 hover:bg-white hover:text-black"
      type="submit"
    >
      SignUp
    </button>
  );
}
