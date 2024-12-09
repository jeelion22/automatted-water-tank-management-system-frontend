import "./CreateDevice.css";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import productServices from "../../../../services/productServices";
import { useDispatch, useSelector } from "react-redux";
import {
  createDevice,
  selectDeviceCreateStatus,
} from "../../product/productSlice";

import { getCurrentUser } from "../../users/userSlice";

const CreateDevice = ({ productID, triggerToast }) => {
  const status = useSelector(selectDeviceCreateStatus);

  const dispatch = useDispatch();

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

  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    dispatch(createDevice({ productId: productID, deviceCount: values }))
      .unwrap()
      .then(() => {
        triggerToast("Device(s) created successfully!");
        resetForm();
      })
      .catch((error) => triggerToast(error))
      .finally(() => {
        setSubmitting(false);
        dispatch(getCurrentUser());
      });
  };

  return (
    <div className="create-device-container">
      <h5>Create Device</h5>

      <Formik
        initialValues={initialValues}
        validationSchema={deviceCreateSchema}
        onSubmit={handleSubmit}
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

            <button type="submit" className="btn btn-dark w-100">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateDevice;
