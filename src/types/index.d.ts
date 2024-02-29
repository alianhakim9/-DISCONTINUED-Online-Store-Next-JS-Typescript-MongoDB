export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  stock: number;
  category: Category;
  stock: number;
  quantity: number;
  subTotal: number;
  shippingPrice: number;
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
  product: Product;
  productId: string;
  createdAt: string;
};

type RootState = {
  cart: {
    loading: boolean;
    cartItems: Product[];
    itemPrice: number;
    shippingPrice: number;
    totalPrice: number;
    subTotal: SubTotal[];
    quantity: Quantity[];
  };
};

type SubTotal = {
  id: string;
  count: number;
};

type Quantity = {
  id: string;
  count: number;
};
