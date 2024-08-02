// USER INTERFACE

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
   userId: string;
   categoryId: string;
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
      startDateTime: Date | null;
      endDateTime: Date | null;
      price: string;
      isFree: boolean;
      url: string | null;
      userId: string;
      categoryId: string;
   };
   path: string;
}

// CATEGORY INTERFACE
export interface CreateCategoryParams {
   categoryName: string;
}
