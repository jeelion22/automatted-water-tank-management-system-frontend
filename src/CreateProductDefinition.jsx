import React, { useState, useEffect } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";

const componentsAvailable = [
  "Sensors",
  "Actuators",
  "Microcontroller",
  "Communication Module",
  "Power Consumption",
  "GPS Tracker",
  "Amplifier",
  "Medication Pods",
  "Medication Lids",
  "Speaker",
  "Buzzer",
  "Display",
  "Light",
  "Switch",
].sort();

const componentType = {
  Sensors: {
    fields: {
      type: ["Light Sensor", "Gas Sensor", "Temperature Sensor"], // Types for Sensors
      min: "",
      max: "",
      unit: ["Celsius", "Fahrenheit", "Lux", "PPM"], // Unit options for Sensors
    },
  },
  Actuators: {
    fields: {
      type: ["Motor", "Servo", "Pump"], // Types for Actuators
      min: "",
      max: "",
      unit: ["RPM", "Watts"],
    },
  },
  Microcontroller: {
    fields: {
      type: ["Arduino", "Raspberry Pi", "ESP32"],
      min: "",
      max: "",
      unit: ["Volts"],
    },
  },
  "Communication Module": {
    fields: {
      type: ["Bluetooth", "WiFi", "Zigbee", "LoRa"],
      min: "",
      max: "",
      unit: ["dBm"],
    },
  },
  "Power Consumption": {
    fields: {
      type: ["Low", "Medium", "High"],
      min: "",
      max: "",
      unit: ["Watts"],
    },
  },
  "GPS Tracker": {
    fields: {
      type: ["GPS", "GLONASS", "Galileo"],
      min: "",
      max: "",
      unit: ["m"],
    },
  },
  Amplifier: {
    fields: {
      type: ["Audio", "RF", "Video"],
      min: "",
      max: "",
      unit: ["dB"],
    },
  },
  "Medication Pods": {
    fields: {
      type: ["Standard", "Custom"],
      min: "",
      max: "",
      unit: ["mg", "ml"],
    },
  },
  "Medication Lids": {
    fields: {
      type: ["Automatic", "Manual"],
      min: "",
      max: "",
      unit: ["mg", "ml"],
    },
  },
  Speaker: {
    fields: {
      type: ["Mono", "Stereo", "Surround"],
      min: "",
      max: "",
      unit: ["dB"],
    },
  },
  Buzzer: {
    fields: {
      type: ["Piezo", "Magnetic"],
      min: "",
      max: "",
      unit: ["Hz"],
    },
  },
  Display: {
    fields: {
      type: ["LCD", "LED", "OLED"],
      min: "",
      max: "",
      unit: ["Inches", "Pixels"],
    },
  },
  Light: {
    fields: {
      type: ["LED", "Incandescent", "Fluorescent"],
      min: "",
      max: "",
      unit: ["Watts", "Lux"],
    },
  },
  Switch: {
    fields: {
      type: ["Toggle", "Push", "Rotary"],
      min: "",
      max: "",
      unit: [""],
    },
  },
};

const CreateProductDefinition = ({ productID }) => {
  const [selectedComponent, setSelectedComponent] = useState("");
  const [initialValues, setInitialValues] = useState({
    productID: productID,
    components: {},
  });

  useEffect(() => {
    if (selectedComponent) {
      setInitialValues((prevValues) => ({
        ...prevValues,
        components: {
          [selectedComponent]: {
            type: componentType[selectedComponent].fields.type[0],
            min: "",
            max: "",
            unit: componentType[selectedComponent].fields.unit[0],
          },
        },
      }));
    }
  }, [selectedComponent]);

  return (
    <div className="components-container">
      <div className="component-selection">
        <Formik initialValues={initialValues}>
          {(formik) => (
            <Form>
              <div className="form-floating mb-3">
                <Field
                  name="productID"
                  type="text"
                  className="form-control"
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
                  name="components"
                  className="form-control"
                  onChange={(e) => {
                    const selected = e.target.value;
                    setSelectedComponent(selected); // Update selected component
                    formik.setFieldValue("components", {
                      [selected]: {
                        type: componentType[selected]?.fields.type[0],
                        min: "",
                        max: "",
                        unit: componentType[selected]?.fields.unit[0],
                      },
                    });
                  }}
                >
                  <option value="" disabled>
                    -- Select Component --
                  </option>
                  {componentsAvailable.map((component, index) => (
                    <option key={index} value={component}>
                      {component}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="components"
                  className="text-danger"
                  component="div"
                />
              </div>

              {/* Dynamic Fields Based on Selected Component */}
              {selectedComponent && (
                <div>
                  <div className="form-floating mb-3">
                    <Field
                      as="select"
                      name={`components.${selectedComponent}.type`}
                      className="form-control"
                    >
                      {componentType[selectedComponent]?.fields.type.map(
                        (type, index) => (
                          <option key={index} value={type}>
                            {type}
                          </option>
                        )
                      )}
                    </Field>
                    <label htmlFor="type">Component Type</label>
                  </div>

                  <div className="form-floating mb-3">
                    <Field
                      name={`components.${selectedComponent}.min`}
                      type="number"
                      className="form-control"
                      placeholder="Min Value"
                    />
                    <label htmlFor="min">Min Value</label>
                  </div>

                  <div className="form-floating mb-3">
                    <Field
                      name={`components.${selectedComponent}.max`}
                      type="number"
                      className="form-control"
                      placeholder="Max Value"
                    />
                    <label htmlFor="max">Max Value</label>
                  </div>

                  <div className="form-floating mb-3">
                    <Field
                      as="select"
                      name={`components.${selectedComponent}.unit`}
                      className="form-control"
                    >
                      {componentType[selectedComponent]?.fields.unit.map(
                        (unit, index) => (
                          <option key={index} value={unit}>
                            {unit}
                          </option>
                        )
                      )}
                    </Field>
                    <label htmlFor="unit">Unit</label>
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateProductDefinition;
