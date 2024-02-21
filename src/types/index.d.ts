type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
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
