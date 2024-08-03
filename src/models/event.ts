import { CreateEventParams, Event } from "@/interfaces";
import { db } from "@/lib/database";

export const getEventById = async (id: string) => {
   try {
      const event = await db.event.findUnique({
         where: {
            id,
         },
      });
      return event;
   } catch (error) {
      return null;
   }
};

export const getEventsByUserId = async (userId: string) => {
   try {
      const events = await db.event.findMany({
         where: {
            userId,
         },
      });
      return events;
   } catch (error) {
      return null;
   }
};

export const createEvent = async (newEvent: CreateEventParams) => {
   try {
      const event = await db.event.create({
         data: {
            title: newEvent.event.title,
            description: newEvent.event.description,
            location: newEvent.event.location,
            imageUrl: newEvent.event.imageUrl,
            startDateTime: newEvent.event.startDateTime,
            endDateTime: newEvent.event.endDateTime,
            price: newEvent.event.price,
            isFree: newEvent.event.isFree,
            url: newEvent.event.url,
            userId: newEvent.userId,
            categoryId: newEvent.event.categoryId,
         },
      });
      return event;
   } catch (error) {
      return null;
   }
};
