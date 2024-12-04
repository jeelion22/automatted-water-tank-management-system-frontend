import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

// const componentsAvailable = ["Sensors"];

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

const CreateProductDefinition = ({ productID }) => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedComponentType, setSelectedComponentType] = useState(null);
  const [selectedComponentUnit, setSelectedComponentUnit] = useState(null);

  const initialValues = {
    productID: productID,
    components: {},
  };

  return (
    <div className="components-container">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={(values) => console.log(values)}
      >
        {(formik) => (
          <Form>
            {/* Product ID field */}
            <div className="form-floating mb-3">
              <Field
                type="text"
                className="form-control"
                name="productID"
                id="productID"
                disabled
              />
              <label htmlFor="productID">Product ID</label>
              <ErrorMessage
                name="productID"
                className="text-danger"
                component="div"
              />
            </div>
            {/* Component Selection */}
            <div className="form-floating mb-3">
              <Field
                as="select"
                name="selectedComponent"
                className="form-control"
                id="components"
                onChange={(e) => {
                  const component = e.target.value;
                  setSelectedComponent(component);
                }}
              >
                <option value="" disabled selected>
                  -- Select Component --
                </option>
                {Object.keys(components).map((component, index) => (
                  <option key={index} value={component}>
                    {component}
                  </option>
                ))}
              </Field>
              <label htmlFor="components">Select Component</label>
            </div>

            {/* select component type */}

            {selectedComponent && (
              <div className="form-floating mb-3">
                <Field
                  as="select"
                  name="type"
                  className="form-control"
                  id="type"
                  onChange={(e) => {
                    const type = e.target.value;
                    setSelectedComponentType(type);
                  }}
                >
                  {Object.keys(components[selectedComponent]).map(
                    (type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    )
                  )}
                </Field>
                <label htmlFor="components">Select Component Type</label>
              </div>
            )}

            {selectedComponentType && (
              <div className="measurement-container">
                <div className="form-floating mb-3">
                  <Field
                    as="select"
                    name="unit"
                    className="form-control"
                    id="unit"
                    onChange={(e) => {
                      const unit = e.target.value;
                      setSelectedComponentUnit(unit);
                    }}
                  >
                    {components[selectedComponent][
                      selectedComponentType
                    ].unit.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </Field>
                  <label htmlFor="unit">Select Unit</label>
                </div>

                <div className="form-floating mb-3">
                  <Field
                    type="number"
                    name="min"
                    className="form-control"
                    id="min"
                    onChange={(e) => {
                      const min = e.target.value;
                    }}
                  />

                  <label htmlFor="min">Minimum</label>
                </div>

                <div className="form-floating mb-3">
                  <Field
                    type="number"
                    name="max"
                    className="form-control"
                    id="max"
                    onChange={(e) => {
                      const max = e.target.value;
                    }}
                  />

                  <label htmlFor="max">Maximum</label>
                </div>
              </div>
            )}

            <button type="submit" className="btn btn-dark w-100">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProductDefinition;
