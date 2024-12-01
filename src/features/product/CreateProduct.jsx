import React from "react";
import "./CreateProduct.css";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import productServices from "../../../services/productServices";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, selectCreateProductStatus } from "./productSlice";
import { getCurrentUser } from "../users/userSlice";

const initialValues = {
  name: "",
};

const CreateProduct = ({ triggerToast }) => {
  const status = useSelector(selectCreateProductStatus);

  const dispatch = useDispatch();

  const onSubmit = (values, { resetForm, setSubmitting }) => {
    dispatch(createProduct(values))
      .unwrap()
      .then(() => {
        triggerToast("Product created successfully!");
        resetForm();
      })
      .catch(() => {
        triggerToast("Failed creating product");
      })
      .finally(() => {
        setSubmitting(false);
        dispatch(getCurrentUser());
      });
  };

  return (
    <div className="create-product">
      <div className="form-title">
        <h3>Create Product</h3>
      </div>

      <div className="form-container">
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(3, "Must be at least 3 characters.")
              .max(50, "Must be 50 characters or less.")

              .required("Product name is required"),
          })}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit}>
              <div className="form-floating mb-3">
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter name of the product"
                  className={`form-control ${
                    formik.touched.name
                      ? formik.errors.name
                        ? "is-invalid"
                        : "is-valid"
                      : ""
                  }`}
                />

                <label htmlFor="name">Product name</label>
              </div>

              <ErrorMessage
                name="name"
                className="text-danger"
                component="div"
              />

              <button
                type="submit"
                class="btn btn-success mt-3 w-100"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      area-hidden="true"
                    ></span>
                    <span role="status">Creating...</span>
                  </>
                ) : (
                  "Create"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateProduct;
