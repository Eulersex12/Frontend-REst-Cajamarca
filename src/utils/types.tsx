export interface ApiResponse {
    data: Product [] ;
}

export interface Product {
    id: number;
    title: string;
    description: string;
    url: string;
    precio: number;
  }