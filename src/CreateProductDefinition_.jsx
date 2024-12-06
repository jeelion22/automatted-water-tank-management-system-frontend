import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const components = {
  Sensors: {
    "Gas Sensor": { unit: ["PPM"], min: "", max: "" },
    "Temperature Sensor": {
      unit: ["Celsius", "Fahrenheit"],
      min: "",
      max: "",
    },
    "Light Sensor": { unit: ["Lux"], min: "", max: "" },
  },
};

const CreateProductDefinition = ({
  deviceID,
  initialValues,
  setInitialValues,
}) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedComponentType, setSelectedComponentType] = useState(null);

  const initialValues_ = {
    deviceID: deviceID,
    componentName: "",
    componentType: "",
    unit: "",
    min: "",
    max: "",
  };

  const handleSubmit = (values) => {
    const result = {
      component: {
        name: values.componentName,
        type: values.componentType,
        deviceID: values.deviceID,
        unit: values.unit,
        min: values.min,
        max: values.max,
      },
    };

    setInitialValues((prev) => ({
      ...prev,
      components: {
        [values.componentName]: {
          type: values.componentType,
          deviceID: values.deviceID,
          unit: values.unit,
          min: values.min,
          max: values.max,
        },
      },
    }));

    console.log(result);
  };

  return (
    <div className="components-container">
      <Formik initialValues={initialValues_} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            {/* Device ID field */}
            <div className="form-floating mb-3">
              <Field
                type="text"
                className="form-control"
                name="deviceID"
                id="deviceID"
                disabled
              />
              <label htmlFor="deviceID">Device ID</label>
              <ErrorMessage
                name="deviceID"
                className="text-danger"
                component="div"
              />
            </div>

            {/* Component Name Selection */}
            <div className="form-floating mb-3">
              <Field
                as="select"
                name="componentName"
                className="form-control"
                id="componentName"
                onChange={(e) => {
                  const componentName = e.target.value;
                  formik.setFieldValue("componentName", componentName);
                  setSelectedComponent(componentName);
                }}
              >
                <option value="" disabled selected>
                  -- Select Component Name --
                </option>
                {Object.keys(components).map((componentName, index) => (
                  <option key={index} value={componentName}>
                    {componentName}
                  </option>
                ))}
              </Field>
              <label htmlFor="componentName">Component Name</label>
            </div>

            {/* Component Type Selection */}
            {selectedComponent && (
              <div className="form-floating mb-3">
                <Field
                  as="select"
                  name="componentType"
                  className="form-control"
                  id="componentType"
                  onChange={(e) => {
                    const componentType = e.target.value;
                    formik.setFieldValue("componentType", componentType);
                    setSelectedComponentType(componentType);
                  }}
                >
                  <option value="" disabled selected>
                    -- Select Component Type --
                  </option>
                  {Object.keys(components[selectedComponent]).map(
                    (componentType, index) => (
                      <option key={index} value={componentType}>
                        {componentType}
                      </option>
                    )
                  )}
                </Field>
                <label htmlFor="componentType">Component Type</label>
              </div>
            )}

            {/* Unit, Min, Max Fields */}
            {selectedComponentType && (
              <div className="measurement-container">
                {/* Unit */}
                <div className="form-floating mb-3">
                  <Field
                    as="select"
                    name="unit"
                    className="form-control"
                    id="unit"
                  >
                    <option value="" disabled selected>
                      -- Select Unit --
                    </option>
                    {components[selectedComponent][
                      selectedComponentType
                    ].unit.map((unit, index) => (
                      <option key={index} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </Field>
                  <label htmlFor="unit">Unit</label>
                </div>

                {/* Minimum */}
                <div className="form-floating mb-3">
                  <Field
                    type="number"
                    name="min"
                    className="form-control"
                    id="min"
                  />
                  <label htmlFor="min">Minimum</label>
                </div>

                {/* Maximum */}
                <div className="form-floating mb-3">
                  <Field
                    type="number"
                    name="max"
                    className="form-control"
                    id="max"
                  />
                  <label htmlFor="max">Maximum</label>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn">
              Add
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProductDefinition;
