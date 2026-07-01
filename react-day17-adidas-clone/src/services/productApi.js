const BASE_URL =
  "https://dummyjson.com/products";

export const getAllProducts =
  async (
    limit = 10,
    skip = 0
  ) => {

    const response =
      await fetch(
        `${BASE_URL}?limit=${limit}&skip=${skip}`
      );

    return response.json();
  };

export const getSingleProduct =
  async (id) => {

    const response =
      await fetch(
        `${BASE_URL}/${id}`
      );

    return response.json();
  };