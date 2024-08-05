// USER INTERFACE
export interface User {
   id: string;
   name: string;
   email: string;
   password: string;
   role: string;
   createdAt: Date;
   updatedAt: Date;
}

// USER INTERFACE
export interface Event {
   id: string;
   title: string;
   description: string | null;
   location: string | null;
   imageUrl: string;
   startDateTime: Date | null;
   endDateTime: Date | null;
   price: string;
   isFree: boolean;
   url: string | null;
   userId: User;
   categoryId: Category;
   createdAt: Date;
   updatedAt: Date;
}
export interface CreateEventParams {
   userId: string;
   event: {
      title: string;
      description: string | null;
      location: string | null;
      imageUrl: string;
      startDateTime: Date | string;
      endDateTime: Date | string;
      price: string;
      isFree: boolean;
      url: string | null;
      categoryId: string;
   };
   path: string;
}
export interface UpdateEventParams {
   id: string;
   title: string;
   description: string | null;
   location: string | null;
   imageUrl: string;
   startDateTime: Date | string;
   endDateTime: Date | string;
   price: string;
   isFree: boolean;
   url: string | null;
   categoryId: string;
}

// CATEGORY INTERFACE
export interface Category {
   id: string;
   name: string;
}
export interface CreateCategoryParams {
   categoryName: string;
}

// URL QUERY PARAMS
// ====== URL QUERY PARAMS
export type UrlQueryParams = {
   params: string;
   key: string;
   value: string | null;
};

export type RemoveUrlQueryParams = {
   params: string;
   keysToRemove: string[];
};

export type SearchParamProps = {
   params: { id: string };
   searchParams: { [key: string]: string | string[] | undefined };
};
