import "./UserRegister.css";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { FormField } from "./UserRegister";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./userSlice";

const formFields = ["Email", "Password"];

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const UserLogin = ({ triggerToast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    dispatch(loginUser(values))
      .unwrap()
      .then(() => {
        triggerToast("Login successful!");
        setTimeout(() => {
          navigate("/dashboard");
          resetForm();
        });
      })
      .catch((error) => {
        triggerToast(error);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className=" user-form-container login ">
      <div className="form">
        <div className="form-icon-container">
          <i className="bi bi-person"></i>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              {formFields.map((field, index) => (
                <FormField key={index} field={field} formik={formik} />
              ))}

              <button type="submit" className="btn btn-success mt-3 w-100">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserLogin;
