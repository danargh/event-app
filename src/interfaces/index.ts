export interface Event {
   id: string;
   title: string;
   description: string | null;
   location: string | null;
   imageUrl: string;
   startDateTime: Date;
   endDateTime: Date;
   price: string;
   isFree: boolean;
   url: string | null;
   userId: string;
   categoryId: string;
   createdAt: Date;
   updatedAt: Date;
}
