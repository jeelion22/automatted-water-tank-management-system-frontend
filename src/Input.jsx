import React from "react";
import PropTypes from "prop-types";

const Input = ({
  deviceID,
  name,
  label,
  Field,
  formik,
  setComponentState,
  componentInfo,
}) => {
  const fieldName = label.toLowerCase();

  return (
    <div className="form-floating">
      <Field
        type="number"
        name={name}
        className="form-control"
        onChange={(event) => {
          const targetValue = event.target.value;

          // Update component state
          setComponentState((prev) => ({
            ...prev,
            [deviceID]: {
              ...prev[deviceID],
              [fieldName]: targetValue,
            },
          }));

          // Update Formik state
          formik.setFieldValue("components", {
            ...formik.values.components,
            [componentInfo.componentName]: {
              ...formik.values.components[componentInfo.componentName],
              [fieldName]: targetValue,
            },
          });
        }}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Input;
