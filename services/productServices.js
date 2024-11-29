import { instance, protectedInstance } from "./instance";

const device_stop = {
  devices: [
    {
      deviceID: "fb8e6594-148b-45ae-a863-46460a2658a8",
      action: "stop",
    },
  ],
};

const device_start = {
  devices: [
    {
      deviceID: "fb8e6594-148b-45ae-a863-46460a2658a8",
      action: "start",
    },
  ],
};

const productServices = {
  createProduct: async (values) => {
    return await instance.post("/product/create-product", values);
  },

  getProductData: async () => {
    return await instance.post("/product/get-data", {
      productID: "3c5add95-a638-4481-803d-027791a6fd59",
    });
  },
  generateData: async () => {
    return await instance.post("/product/generate-data", {
      productID: "3c5add95-a638-4481-803d-027791a6fd59",
    });
  },

  stopDevice: async () => {
    return await instance.post(
      "https://iot1.innotrat.in/api/product/3c5add95-a638-4481-803d-027791a6fd59/start-device",

      device_stop
    );
  },

  startDevice: async () => {
    return await instance.post(
      "https://iot1.innotrat.in/api/product/3c5add95-a638-4481-803d-027791a6fd59/stop-device",

      device_start
    );
  },
  checkDeviceRunningStatus: async (productID) => {
    return await instance.post(
      "https://iot1.innotrat.in/api/product/check/device-running-status",
      { productID }
    );
  },

  createDevice: async (productID, values) => {
    const deviceCount = values["deviceCount"];

    return await instance.post(
      `https://iot1.innotrat.in/api/product/${productID}/create-device`,
      { deviceCount }
    );
  },
};

export default productServices;
