import "./IoTComponents.css";
import { electronicComponents } from "./features/dashboard/electronicComponents";
import { useEffect, useState } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./features/users/userSlice";
import * as Yup from "yup";

const IoTComponents = ({ productID }) => {
  const [visibleComponents, setVisibleComponents] = useState([]);
  const [initialValues, setInitialValues] = useState({
    productID: productID,
    components: [],
  });

  const validationSchema = Yup.object().shape({
    productID: Yup.string().required("Product ID is required"),
    components: Yup.array().of(
      Yup.object().shape({
        deviceID: Yup.string().required("Device ID is required"),
        componentType: Yup.string().required("Component type is required"),
        componentName: Yup.string().required("Component name is required"),
        unit: Yup.string().required("Component unit is required"),

        min: Yup.number()
          .nullable()
          .when("state", {
            is: null,
            then: Yup.number().required("Minimum value is required"),
          }),

        max: Yup.number()
          .nullable()
          .when("state", {
            is: null,
            then: Yup.number().required("Maximum value is required"),
          })
          .test(
            "max-greater-than-min",
            "Max value must be greater than Min value",
            function (value) {
              const { min } = this.parent;
              return min === null || value === null || value > min;
            }
          ),

        state: Yup.mixed().nullable(),
      })
    ),
  });

  // handle component visibility
  const toggleVisibility = (index) =>
    setVisibleComponents((prev) =>
      prev.includes(index)
        ? prev.filter((id) => id !== index)
        : [...prev, index]
    );

  // current user
  const user = useSelector(selectCurrentUser);

  // A list of device ids corresponding to productID
  const deviceIDs =
    user.products.find((product) => product.productID === productID)?.devices ||
    [];

  // handle form values format

  const convertDataToAPIFormat = (values) => {
    const formatedComponents = {};

    values.components.forEach((component) => {
      formatedComponents[component.componentName] = {
        ...component,
        type: component.componentType.toLowerCase(),
      };

      delete formatedComponents[component.componentName].componentName;
      delete formatedComponents[component.componentName].componentType;

      if (formatedComponents[component.componentName].state === undefined) {
        delete formatedComponents[component.componentName].state;
      }
    });

    const resultData = {
      productID: values.productID,
      components: formatedComponents,
    };

    alert(JSON.stringify(resultData, null, 2));
  };

  // update initial values productID changes
  useEffect(() => {
    const exisitingComponents =
      user?.products?.find((product) => product.productID === productID)
        ?.components || [];

    setInitialValues({
      productID: productID,
      components: exisitingComponents,
    });
  }, [productID, user]);

  return (
    <div className="m-4 rounded p-4  border ">
      <h3 className="m-4 text-dark">Define Your IoT's Components</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          convertDataToAPIFormat(values);
        }}
      >
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <div className="form-floating mb-3">
              <Field
                className="form-control"
                type="text"
                disabled
                name="productID"
              />
              <label htmlFor="productID">Product ID</label>
            </div>

            <FieldArray
              name="components"
              render={(helperMethod) => (
                <div className="">
                  {formik.values.components?.map((component, index) => (
                    <div
                      key={index}
                      className="border p-3 mb-3 bg-light rounded"
                    >
                      <button
                        type="button"
                        className={`btn ${
                          visibleComponents?.includes(index)
                            ? "btn-secondary"
                            : "btn-primary"
                        } mb-3 w-100 `}
                        onClick={() => toggleVisibility(index)}
                      >
                        {visibleComponents.includes(index) ? "Hide" : "Show"}
                      </button>
                      {visibleComponents.includes(index) && (
                        <>
                          {/* select device ID */}
                          <div className="form-floating mb-3">
                            <Field
                              as="select"
                              name={`components[${index}].deviceID`}
                              className="form-select"
                            >
                              <option value="" disabled>
                                -- Select Device ID --
                              </option>

                              {deviceIDs.map((deviceID, index) => (
                                <option key={index} value={deviceID}>
                                  {deviceID}
                                </option>
                              ))}
                            </Field>

                            <label htmlFor={`components[${index}].deviceID`}>
                              Device ID
                            </label>
                          </div>
                          {/* Type select */}
                          <div className="form-floating mb-3">
                            <Field
                              as="select"
                              className="form-select"
                              name={`components[${index}.componentType]`}
                              onChange={(e) => {
                                formik.handleChange(e);

                                // updating component name and reset other fields
                                helperMethod.replace(index, {
                                  ...component,
                                  componentType: e.target.value,
                                  componentName: "",
                                  unit: "",
                                  min: undefined,
                                  max: undefined,
                                  state: undefined,
                                });
                              }}
                            >
                              <option value="" disabled>
                                -- Select Component Type --
                              </option>

                              {electronicComponents.map((category, index) => (
                                <option value={category.type} key={index}>
                                  {category.type}
                                </option>
                              ))}
                            </Field>

                            <label
                              htmlFor={`components[${index}].componentType`}
                            >
                              Component Type
                            </label>
                          </div>
                          {component.componentType && (
                            <div className="form-floating mb-3">
                              <Field
                                as="select"
                                className="form-select"
                                name={`components[${index}.componentName]`}
                                onChange={(e) => {
                                  formik.handleChange(e);

                                  const selectedComponentType =
                                    electronicComponents.find(
                                      (category) =>
                                        category.type ===
                                        component.componentType
                                    );

                                  const selectedComponent =
                                    selectedComponentType?.components.find(
                                      (comp) => comp.name === e.target.value
                                    );

                                  helperMethod.replace(index, {
                                    ...component,
                                    componentName: e.target.value,
                                    min:
                                      selectedComponent?.min !== undefined
                                        ? selectedComponent.min
                                        : undefined,
                                    max:
                                      selectedComponent?.max !== undefined
                                        ? selectedComponent.max
                                        : undefined,
                                    state:
                                      selectedComponent?.state !== undefined
                                        ? [false, true]
                                        : undefined,
                                    unit: "",
                                  });
                                }}
                              >
                                <option value="" disabled>
                                  -- Select Component --
                                </option>

                                {electronicComponents
                                  .find(
                                    (categorey) =>
                                      categorey.type === component.componentType
                                  )
                                  ?.components.map((comp, index) => (
                                    <option value={comp.name} key={index}>
                                      {comp.name}
                                    </option>
                                  ))}
                              </Field>

                              <label
                                htmlFor={`componets[${index}.componentName]`}
                              >
                                Component Name
                              </label>
                            </div>
                          )}
                          {/* Unit selection */}
                          {component.componentName && (
                            <div className="form-floating mb-3">
                              <Field
                                as="select"
                                className="form-select"
                                name={`components[${index}].unit`}
                                onChange={(e) => {
                                  formik.handleChange(e);
                                }}
                              >
                                <option value="" disabled>
                                  -- Select Unit --
                                </option>

                                {electronicComponents
                                  .find(
                                    (category) =>
                                      category.type === component.componentType
                                  )
                                  ?.components.find(
                                    (comp) =>
                                      comp.name === component.componentName
                                  )
                                  ?.unit?.map((unitOption, index) => (
                                    <option key={index} value={unitOption}>
                                      {unitOption}
                                    </option>
                                  ))}
                              </Field>
                              <label htmlFor={`components[${index}].unit`}>
                                Select Unit
                              </label>
                            </div>
                          )}

                          {/* Conditional Fields */}

                          {component.min !== undefined && (
                            <div className="form-floating mb-3">
                              <Field
                                type="number"
                                className="form-control"
                                name={`components[${index}].min`}
                              />
                              <label htmlFor={`components[${index}].min`}>
                                Mininum
                              </label>
                            </div>
                          )}

                          {component.max !== undefined && (
                            <div className="form-floating mb-3">
                              <Field
                                type="number"
                                className="form-control"
                                name={`components[${index}].max`}
                              />
                              <label htmlFor={`components[${index}].max`}>
                                Maximum
                              </label>
                            </div>
                          )}

                          {component.state !== undefined && (
                            <div className="form-check mb-3">
                              <Field
                                type="checkbox"
                                className="form-check-input"
                                name={`components[${index}].state`}
                              />
                              <label className="form-check-lable">State</label>
                            </div>
                          )}

                          {/* remove component btn */}

                          <button
                            className="btn btn-danger mb-3"
                            type="button"
                            onClick={() => helperMethod.remove(index)}
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  ))}

                  {/* add component btn */}
                  <button
                    className="btn btn-success mb-3"
                    type="button"
                    onClick={() =>
                      helperMethod.push({
                        deviceID: "",
                        componentType: "",
                        componentName: "",
                        unit: "",
                        min: undefined,
                        max: undefined,
                        state: undefined,
                      })
                    }
                    disabled={
                      deviceIDs.length === formik.values.components.length
                    }
                  >
                    Add Component
                  </button>
                </div>
              )}
            />

            <button type="submit" className="btn  btn-light mb-3 ">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default IoTComponents;
