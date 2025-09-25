import { useQueryApi } from "@/hook/useQueryApi";
import { ProductsResponse, UseProductsOptions } from "@/types/Product";



export const useProducts = ({ page = 1, priceFrom, priceTo, sort }: UseProductsOptions) => {
  const queryParams = new URLSearchParams({
    ...(page && { page: page.toString() }),
    ...(priceFrom !== undefined && { "filter[price_from]": priceFrom.toString() }),
    ...(priceTo !== undefined && { "filter[price_to]": priceTo.toString() }),
    ...(sort && { sort }),
  });

  return useQueryApi<ProductsResponse>({
    url: `/products?${queryParams.toString()}`,
  });
};
