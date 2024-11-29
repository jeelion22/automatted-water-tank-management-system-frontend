import React from "react";
import "./CreateProduct.css";
import { Field, Form, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import productServices from "../services/productServices";

const initialValues = {
  name: "",
};

const CreateProduct = () => {
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

              .required("Required"),
          })}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            productServices
              .createProduct(values)
              .then((result) => {
                // storing product in in local storage
                if (result.data && result.data.data) {
                  alert(result.data.message);

                  // retrieve the existing products from localstorage
                  const existingProducts =
                    JSON.parse(localStorage.getItem("products")) || [];

                  // add new produuct to the products
                  existingProducts.push(result.data.data);

                  // save updated products arrays back to local storage
                  localStorage.setItem(
                    "products",
                    JSON.stringify(existingProducts)
                  );

                  // reset form
                  resetForm();
                } else alert("Unexpected response structure");
              })
              .catch((error) => {
                console.log("Error creating product:", error);
                alert("Failed to create product. Please try again.");
              })
              .finally(() => setSubmitting(false));
          }}
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

                <label htmlFor="name">Product Name</label>
              </div>

              <ErrorMessage
                name="name"
                className="text-danger"
                component="div"
              />

              <button type="submit" class="btn btn-dark  float-end">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateProduct;
