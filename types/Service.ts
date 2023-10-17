import Category from "./Category";

type Service = {
  id: string;
  name: string;
  description?: string;
  image: string;
  category: Category;
};

export default Service;
