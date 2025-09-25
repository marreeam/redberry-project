export interface Product {
    id: number;
    name: string;
    description: string;
    release_year: string;
    cover_image: string;
    images: string[];
    price: number;
    available_colors: string[];
    available_sizes: string[];
  }
  
 export interface ProductsResponse {
    data: Product[];
    meta: {
      current_page: number;
      last_page: number;
      per_page: number;
      total: number;
    };
  }

  export  interface UseProductsOptions {
    page?: number;
    priceFrom?: number;
    priceTo?: number;
    sort?: string; 
  }