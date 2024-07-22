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
