import "./IoTComponents.css";
import { useState } from "react";
import { Formik, Field, Form } from "formik";

import { useSelector } from "react-redux";
import { selectCreateProduct } from "./features/product/productSlice";
import { selectCurrentUser } from "./features/users/userSlice";
import Input from "./Input";

const electronicComponents = {
  Sensors: {
    "Light Sensor": { unit: ["Lux"], min: "", max: "" },
    "Gas Sensor": { unit: ["PPM"], min: "", max: "" },
    "Temperature Sensor": { unit: ["Celsius", "Fahrenheit"], min: "", max: "" },
  },
  Actuators: {
    Motor: { unit: ["RPM", "Watts"], min: "", max: "" },
    Servo: { unit: ["RPM", "Watts"], min: "", max: "" },
    Pump: { unit: ["RPM", "Watts"], min: "", max: "" },
  },
};

const IoTComponents = ({ productID }) => {
  const [componentsList, setComponentsList] = useState([]);
  const [componentState, setComponentState] = useState({});

  const initialValues = {
    productID: productID,
    components: {},
  };

  const user = useSelector(selectCurrentUser);

  const deviceIds =
    user.products.find((product) => product.productID === productID)?.devices ||
    [];

  const handleAddComponent = () => {
    if (componentsList.length < deviceIds.length) {
      setComponentsList((prev) => [...prev, deviceIds[componentsList.length]]);
    }
  };

  const handleRemoveComponent = (deviceId, formik) => {
    // remove id from componentsList
    setComponentsList((prev) => prev.filter((id) => id != deviceId));

    // remove corresponding field from components in Formik's value
    const updatedComponents = { ...formik.values.components };

    for (const component in updatedComponents) {
      if (updatedComponents[component].deviceID === deviceId) {
        delete updatedComponents[component];
        break;
      }
    }

    // update Formik state
    formik.setFieldValue("components", updatedComponents);
  };

  return (
    <div>
      <div className="product-definition-form-container">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          {(formik) => (
            <Form
              className="product-controller  p-4"
              onSubmit={formik.handleSubmit}
            >
              {/* Product ID field */}

              <div className="productID-container">
                <div className="form-floating productID">
                  <Field
                    type="text"
                    className="form-control"
                    name="productID"
                    id="productID"
                    disabled
                  />
                  <label htmlFor="productID">Product ID</label>
                </div>

                <div className="btns d-flex gap-2">
                  <button
                    type="button"
                    className="btn"
                    onClick={handleAddComponent}
                    disabled={componentsList.length === deviceIds.length}
                  >
                    +
                  </button>
                  <button type="submit" className="btn">
                    Submit
                  </button>
                </div>
              </div>

              {componentsList.length > 0 && (
                <div className="  device-added-component-container">
                  {componentsList.map((deviceID) => {
                    const componentInfo = componentState[deviceID] || {};

                    return (
                      <div
                        className="create-product-defintion-container"
                        key={deviceID}
                      >
                        <div className="form-floating">
                          <Field
                            type="text"
                            className="form-control"
                            name="deviceID"
                            id="deviceID"
                            value={deviceID}
                            disabled
                          />
                          <label className="text-nowrap" htmlFor="productID">
                            Device ID
                          </label>
                        </div>

                        <Field
                          as="select"
                          className="form-select"
                          name={`componentType_${deviceID}`}
                          value={componentInfo.componentType || ""}
                          onChange={(event) => {
                            const componentType = event.target.value;
                            setComponentState((prev) => ({
                              ...prev,
                              [deviceID]: {
                                ...prev[deviceID],
                                componentType: componentType,
                              },
                            }));
                          }}
                        >
                          <option value="" disabled>
                            -- Select Component Type --
                          </option>

                          {Object.keys(electronicComponents).map(
                            (electronicComponent, index) => (
                              <option value={electronicComponent} key={index}>
                                {electronicComponent}
                              </option>
                            )
                          )}
                        </Field>

                        {componentInfo.componentType && (
                          <Field
                            as="select"
                            className="form-select"
                            name={`componentName_${deviceID}`}
                            value={componentInfo.componentName || ""}
                            onChange={(event) => {
                              const componentName = event.target.value;
                              setComponentState((prev) => ({
                                ...prev,
                                [deviceID]: {
                                  ...prev[deviceID],
                                  componentName: componentName,
                                },
                              }));
                              formik.setFieldValue("components", {
                                ...formik.values.components,
                                [componentName]: {
                                  deviceID: deviceID,
                                  type: componentInfo.componentType,
                                },
                              });
                            }}
                          >
                            <option value="" disabled>
                              -- Select Component --
                            </option>

                            {Object.keys(
                              electronicComponents[componentInfo.componentType]
                            ).map((componentName, index) => (
                              <option key={index} value={componentName}>
                                {componentName}
                              </option>
                            ))}
                          </Field>
                        )}

                        {componentInfo.componentType &&
                          componentInfo.componentName && (
                            <>
                              <Field
                                as="select"
                                className="form-select"
                                name={`componentUnit-${deviceID}`}
                                value={componentInfo.componentUnit || ""}
                                onChange={(event) => {
                                  const componentUnit = event.target.value;
                                  setComponentState((prev) => ({
                                    ...prev,
                                    [deviceID]: {
                                      ...prev[deviceID],
                                      componentUnit: componentUnit,
                                    },
                                  }));

                                  console.log(componentInfo);

                                  formik.setFieldValue("components", {
                                    ...formik.values.components,
                                    [componentInfo.componentName]: {
                                      ...formik.values.components[
                                        componentInfo.componentName
                                      ],
                                      unit: componentUnit,
                                    },
                                  });
                                }}
                              >
                                <option value="" disabled>
                                  -- Select Unit --
                                </option>

                                {electronicComponents[
                                  componentInfo.componentType
                                ][componentInfo.componentName].unit.map(
                                  (unit, index) => (
                                    <option value={unit} key={index}>
                                      {unit}
                                    </option>
                                  )
                                )}
                              </Field>

                              {(() => {
                                const componentField =
                                  electronicComponents[
                                    componentInfo.componentType
                                  ]?.[componentInfo.componentName];

                                if (!componentField) return null;

                                return Object.keys(componentField).map(
                                  (fieldName, index) => {
                                    if (fieldName === "min") {
                                      return (
                                        <Input
                                          key={index}
                                          deviceID={deviceID}
                                          name={`componentMin-${deviceID}`}
                                          label="Min"
                                          Field={Field}
                                          formik={formik}
                                          setComponentState={setComponentState}
                                          componentInfo={componentInfo}
                                        />
                                      );
                                    } else if (fieldName === "max") {
                                      return (
                                        <Input
                                          key={index}
                                          deviceID={deviceID}
                                          name={`componentMax-${deviceID}`}
                                          label="Max"
                                          Field={Field}
                                          formik={formik}
                                          setComponentState={setComponentState}
                                          componentInfo={componentInfo}
                                        />
                                      );
                                    }

                                    return null;
                                  }
                                );
                              })()}
                            </>
                          )}

                        <button
                          type="button"
                          className="btn"
                          onClick={() =>
                            handleRemoveComponent(deviceID, formik)
                          }
                        >
                          -
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default IoTComponents;
