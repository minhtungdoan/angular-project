export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: {
    title: string;
  };
  rating: {
    rate: number;
    count: number;
  };
};
