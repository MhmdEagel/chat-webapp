import React, { useState } from "react";
import { Formik, Form, Field} from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import  {auth, db, storage } from "../configuration";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { Avatar, Button } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import SignupBtn from "../components/SignUpBtn";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("This field is required"),
  email: Yup.string()
    .email("Invalid email.")
    .required("This field is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long.")
    .required("This field is required"),
});

export default function SignUpPage() {
  const [isLoading, setisLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [previewAvatar, setPreviewAvatar] = useState("/assets/avatar.png");

  const navigate = useNavigate();

  return (
    <div className="flex h-[100vh] items-center justify-center bg-primaryBackground">
      <div className="w-fit min-w-[450px] rounded-lg bg-primaryColor px-16 py-12 text-center">
        <p className="mt-4 text-xl font-bold text-white">
          Create your account!
        </p>
        <Formik
          initialValues={{
            file: null,
            username: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            const file = values.file;
            const username = values.username;
            const email = values.email;
            const password = values.password;
            setisLoading(true);
            await createUserWithEmailAndPassword(auth, email, password)
              .then(async (userCredential) => {
                const user = userCredential.user.uid;
                const imageRef = ref(storage, `userImages/${user}`);
                let userImgUrl = null;
                if (file != null) {
                  await uploadBytes(imageRef, file).then(() => {
                    console.log("image uploaded!");
                  });
                  await getDownloadURL(imageRef)
                    .then((url) => {
                      userImgUrl = url;
                    })
                    .catch((error) => {
                      console.log(error.code);
                    });
                }
                setDoc(doc(db, "users", user), {
                  username: username,
                  email: email,
                  imgUrl: userImgUrl
                });
                navigate("/login", { state: { isCreated: true } });
              })
              .catch((error) => {
                setisLoading(false);
                const errorCode = error.code;
                if (errorCode == "auth/email-already-in-use") {
                  setErrorMsg("Email already in use.");
                } else {
                  setErrorMsg("Something went wrong.");
                }
              });
          }}
        >
          {({ errors, touched, setFieldValue}) => (
            <Form className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col items-center gap-2">
                <Avatar sx={{ width: 100, height: 100 }} src={previewAvatar} />
                <Button variant="contained" component="label">
                  Choose Avatar
                  <input
                    type="file"
                    name="file"
                    accept="image/*"
                    id="file"
                    onChange={(e) => {
                      setFieldValue("file", e.currentTarget.files[0]);
                      let reader = new FileReader();
                      let file = e.currentTarget.files[0];
                      reader.onloadend = () => {
                        setPreviewAvatar(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }}
                    hidden
                  />
                </Button>
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="userEmail" className="text-white">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  id="username"
                  className="w-full p-1 text-black"
                />
                {errors.username && touched.username ? (
                  <p className="text-sm font-semibold text-red-500">
                    {errors.username}
                  </p>
                ) : null}
              </div>
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
                <label htmlFor="password" className="text-white">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  className="w-full p-1 text-black"
                />

                {errors.password && touched.password ? (
                  <p className="text-sm font-semibold text-red-500">
                    {errors.password}
                  </p>
                ) : null}
              </div>
              <SignupBtn isLoading={isLoading} />
              {errorMsg != null || errorMsg != "" ? (
                <p className="text-sm font-semibold text-red-500">{errorMsg}</p>
              ) : null}
              <p className="text-white">
                Have an account?{" "}
                <NavLink to={"/login"} className={"text-blue-300 underline"}>
                  Login
                </NavLink>
                !
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
