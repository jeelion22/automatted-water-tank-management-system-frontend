import "./UserRegister.css";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerUser, selectUserRegisterStatus } from "./userSlice";

const formFields = [
  "First name",
  "Last name",
  "Email",
  "Password",
  "Confirm Password",
];

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  firstname: Yup.string()
    .required("First name is required")
    .min(3, "Atleast 3 characters are required")
    .max(15, "Not to exceed more than 15 characters"),
  lastname: Yup.string().max(12, "Not to exceed more than 12 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least mix of 8 characters long")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires a uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol"),
  confirmPassword: Yup.string()
    .required("Confirm password required")
    .oneOf(
      [Yup.ref("password"), null],
      "Passwords don not match. Please try again"
    ),
});

export const FormField = ({ formik, field }) => {
  let name = field.split(" ").join("").toLowerCase();

  name = name === "confirmpassword" ? "confirmPassword" : name;

  let type;

  type = ["password", "confirmPassword"].includes(name)
    ? "password"
    : name === "email"
    ? "email"
    : "text";

  const isTouched = formik.touched[name];
  const hasError = formik.errors[name];

  return (
    <div className="form-floating mb-3">
      <Field
        name={name}
        type={type}
        className={`form-control ${
          isTouched ? (hasError ? "is-invalid" : "is-valid") : ""
        }`}
        id={name}
        placeholder=""
      />
      <label htmlFor={name}>{field}</label>

      <ErrorMessage name={name} className="text-danger" component="div" />
    </div>
  );
};

const UserRegister = ({ triggerToast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegistrationStatus = useSelector(selectUserRegisterStatus);

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    const { confirmPassword, ...rest } = values;
    dispatch(registerUser(rest))
      .unwrap()
      .then(() => {
        resetForm();

        setTimeout(() => {
          navigate("/login");
        }, 2000);

        triggerToast("Registration successful!");
      })
      .catch((error) => {
        console.log(error);
        triggerToast(error);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <div className="user-form-container register">
        <div className="form">
          <div className="form-icon-container">
            <i className="bi bi-person-add"></i>
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

                <button
                  type="submit"
                  class="btn btn-success mt-3 w-100"
                  disabled={userRegistrationStatus === "loading"}
                >
                  {userRegistrationStatus === "loading" ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        area-hidden="true"
                      ></span>
                      <span role="status">Registering...</span>
                    </>
                  ) : (
                    "Register"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default UserRegister;
