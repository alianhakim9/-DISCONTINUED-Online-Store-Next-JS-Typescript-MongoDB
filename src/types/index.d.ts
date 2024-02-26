export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  stock: number;
  category: Category;
};

type User = {
  id: string;
  email: string;
  password: string;
  username: string;
  image: string;
};

type Category = {
  id: string;
  name: string;
};

export type Cart = {
  id: string;
  totalPrice: number;
  itemPrice: number;
  quantity: number;
  shippingPrice: number;
  userId: string;
  productId: string;
  createdAt: string;
};

type RootState = {
  loading: boolean;
  cartItems: Cart[];
};
