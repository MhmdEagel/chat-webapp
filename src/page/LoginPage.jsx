import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configuration";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import LoginBtn from "../components/LoginBtn";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email.")
    .required("This field is required"),
  password: Yup.string().required("This field is required"),
});

export default function LoginPage() {
  const [isUserCreated, setIsUserCreated] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state)
    if (state != null) {
      setIsLogout(state.isLogout)
      setIsUserCreated(state.isCreated);
      return
    }
      setIsLogout(false)
      setIsUserCreated(false)
  }, []);

  const handleClose = (event, reason) => {
    if (reason == "clickaway") {
      return;
    }
    setIsUserCreated(false);
    setIsLogout(false);
  };

  return (
    <div className="flex h-[100vh] items-center justify-center bg-primaryBackground">
      <div className="w-fit rounded-lg bg-primaryColor px-16 py-12 text-center">
        <FontAwesomeIcon className="text-6xl text-white" icon={faComments} />
        <h5 className="mt-4 text-xl font-bold text-white">Welcome</h5>
        <p className="text-lg font-bold text-white">
          Let's join the conversation!
        </p>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            const email = values.email;
            const password = values.password;
            setisLoading(true)
            signInWithEmailAndPassword(auth, email, password)
              .then(() => {
                navigate("/");
              })
              .catch((error) => {
                setisLoading(false)
                const errorCode = error.code
                if(errorCode == "auth/invalid-credential") {
                  setErrorMsg("Invalid email or password.")
                  return
                } else {
                  setErrorMsg("Something went wrong.")
                  return
                }
              });
          }}
        >
          {({ errors, touched }) => (
            <Form className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="userEmail" className="text-white">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  id="userEmail"
                  className="w-full p-1 text-black"
                />
                {errors.email && touched.email ? (
                  <p className="text-sm font-semibold text-red-500">
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="userPassword" className="text-white">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  id="userPassword"
                  className="w-full p-1 text-black"
                />
                {errors.password && touched.password ? (
                  <p className="text-sm font-semibold text-red-500">
                    {errors.password}
                  </p>
                ) : null}
              </div>
              <LoginBtn isLoading={isLoading} />
              {errorMsg != null || errorMsg != "" ? (
                <p className="text-sm text-red-500 font-semibold">{errorMsg}</p>
              ) : null}
              <p className="text-white">
                Don't have an account? Start{" "}
                <NavLink to={"/signup"} className={"text-blue-300 underline"}>
                  create
                </NavLink>{" "}
                one!
              </p>
            </Form>
          )}
        </Formik>
      </div>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isUserCreated}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          User created successfully.
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isLogout}
        autoHideDuration={1000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Logout successfully.
        </Alert>
      </Snackbar>
    </div>
  );
}
