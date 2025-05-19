import { urls } from "./urls";
import { generateHttpClient } from "./client";



export const getsneakerInfo = async (page = 1, limit = 10) => {
    const axiosInstance = generateHttpClient();
    const response = await axiosInstance.get(urls.sneaker.getshoes, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  };

export const getsneakerBrands = async () => {
    const axiosInstance = generateHttpClient();
    const response = await axiosInstance.get(urls.sneaker.brands);
    return response.data;
  };  