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

export const getEvents = async () => {
   try {
      const events = await db.event.findMany();
      return events;
   } catch (error) {
      return null;
   }
};
