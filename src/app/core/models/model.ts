export interface IUser {
  _id?: string;
  username: string;
  email: string;
  password: string;
  role: 'owner' | 'company' | 'user';
  avatar?: string;
  phone?: string;
  address?: string;
  companyId?: string | null; // Reference to the company object or company ID
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IRegisterUser {
  _id?: String;
username: String;
  email:  String;
  password: String;
  confirmPassword?: String;
  role: 'owner' | 'company' | 'user';
  avatar?: String;
  phone?: String;
  address?: String;
  companyId?:ICompany | null; // Reference to the company object or company ID
  isActive?: Boolean;
  createdAt?: Date;
}
export interface ILoginUser {
  email: String;
  password: String;
}

export interface ICompany {
  _id?: string;
  name: string;
  logo: string;
  emailDomain: string;
  description: string;
  users: Array<IUser | null>;
  address: string;
  contactNumber: string;
  isApproved?: boolean;
  createdAt?: Date;
}

export interface IProduct {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  targetAudience: 'men' | 'women' | 'kids' | 'unisex';
  category: ICategory | null; // Category ID
  brand: IBrand | null; // Brand ID
  company?: ICompany | null; // Company ID
  createdBy?: string; // User ID
  images: string;
  discount?: number;
  newprice?: number; // This will be calculated based on the discount
  status?: 'pending' | 'approved' | 'notAvailable';
  isVisible?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICategory {
  _id?: string;
  name: string;
  suggestedBy?: ICompany | null; // Company ID or User ID
  isApproved?: boolean;
}

export interface IBrand {
  _id?: string;
  name: string;
  isaproved?: boolean;
  suggestedBy: string; // Company ID
}
export interface INotification {
  _id?: string;
  user: IUser | null; // User ID
  order: IOrder | null ; // Order ID
  type: 'order' | 'product' | 'stock';
  product: string; 
  message: string;
  isRead: boolean;
  createdAt?: Date;
}
export interface IOrder {
  _id?: string;
  user:  IUser | null; // User ID or populated user object
  products: Array<{
    product:  IProduct | null; // Product ID or populated product object
    quantity: number;
    price: number;
  }>;
  paymentMethod: 'cash' | 'online';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'canceled';
  // company?: string | ICompany; // Uncomment if needed
  shippingDetails: {
    address: string;
    phone: string;
  };
  totalAmount: number;
  createdAt?: Date;
}

export interface ICart {
  _id?: string;
  user: string | IUser; // User ID or populated user object
  items: Array<{
    price: number; // Price of the product at the time of adding to cart
    product:  IProduct | null; // Product ID or populated product object
    quantity: number;
  }>;
}
export interface IWishlist {
  _id?: string;
  user: string | IUser; // User ID or populated user object
  items: Array<{
    product:  IProduct | null; // Product ID or populated product object
  }>;
}
export interface ILogs {
  _id?: string;
  user: IUser | null; // User ID
  username: string;
  email: string;
  action: string;
  method?: string;
  url?: string;
  statusCode?: number;
  ip?: string;
  userAgent?: string;
  createdAt?: Date;
}
export interface Iopenview {
  _id?: string;
  user:  IUser | null; // User ID or populated user object
  rating: number; // 1 to 5
  comment: string; // max length 500, min length 4
  isApproved?: boolean;
  createdAt?: Date;
}

