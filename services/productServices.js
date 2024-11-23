import { instance, protectedInstance } from "./instance";

const productServices = {
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
};

export default productServices;
