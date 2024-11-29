import "./CreateDevice.css";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import productServices from "../services/productServices";

const CreateDevice = ({ productID }) => {
  const initialValues = {
    productID,
    deviceCount: 1,
  };

  const deviceCreateSchema = Yup.object({
    productID: Yup.string().required("Product Id is required"),
    deviceCount: Yup.number()
      .required("Device count is required")
      .positive("Device count must be a positive number")
      .integer("Device count must be an integer")
      .min(1, "Atleast 1 device is required")
      .max(10, "Cannot exceed 10 devices"),
  });

  return (
    <div className="container  create-device-container">
      <div className="row">
        <div className="col">
          <Formik
            initialValues={initialValues}
            validationSchema={deviceCreateSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              productServices
                .createDevice(productID, values)
                .then((result) => {
                  if (result.data && result.data.data) {
                    alert(result.data.message);
                  }

                  console.log(result);
                  resetForm();
                })
                .catch((error) => {
                  console.log("Error creating device", error);
                  alert("Failed to create device, please try again");
                })
                .finally(() => setSubmitting(false));
            }}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit}>
                <div className="form-floating mb-3">
                  <Field
                    name="productID"
                    type="input"
                    placeholder={`${productID}`}
                    className={`form-control ${
                      formik.touched.name
                        ? formik.errors.productID
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                    disabled={true}
                  />
                  <label htmlFor="productID">Product ID</label>

                  <ErrorMessage
                    name="productID"
                    className="text-danger"
                    component="div"
                  />
                </div>

                <div className="form-floating mb-3">
                  <Field
                    name="deviceCount"
                    type="number"
                    min={1}
                    max={10}
                    placeholder={1}
                    className={`form-control ${
                      formik.touched.name
                        ? formik.errors.deviceCount
                          ? "is-invalid"
                          : "is-valid"
                        : ""
                    }`}
                  />
                  <label htmlFor="productID">Device Count</label>

                  <ErrorMessage
                    name="deviceCount"
                    className="text-danger"
                    component="div"
                  />
                </div>

                <div className="text-center">
                  <button type="submit" class="btn btn-dark">
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateDevice;
