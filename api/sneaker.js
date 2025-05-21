import { urls } from "./urls";
import { generateHttpClient } from "./client";



export const getsneakerInfo = async (page = 1, limit = 10, brands=[]) => {
    const axiosInstance = generateHttpClient();
    const response = await axiosInstance.get(urls.sneaker.getshoes, {
      params: {
        page,
        limit,
        brands
      },
    });
    return response.data;
  };

export const getSneakerBrands = async () => {
    const axiosInstance = generateHttpClient();
    const response = await axiosInstance.get(urls.sneaker.brands);
    return response.data;
  };  

  export const getSneakerItem = async(id)=>{
    const axiosInstance = generateHttpClient();
    const response = await axiosInstance.get(`${urls.sneaker.item}/${id}`);
    return response.data;
  }