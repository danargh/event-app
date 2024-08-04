import { CreateEventParams, Event } from "@/interfaces";
import { db } from "@/lib/database";

export const getEventById = async (id: string) => {
   try {
      const event = await db.event.findUnique({
         where: {
            id,
         },
         include: {
            category: true,
            user: true,
         },
      });
      return {
         ...event,
         categoryId: {
            id: event?.categoryId,
            name: event?.category?.name,
         },
         userId: {
            id: event?.userId,
            name: event?.user?.name,
            email: event?.user?.email,
         },
      };
   } catch (error) {
      return error;
   }
};

async function getCategoryByName(categoryName: string) {
   return await db.category.findUnique({
      where: { name: categoryName },
   });
}
export const getAllEvents = async (
   searchText: string,
   category: string,
   page: number,
   limit = 6
) => {
   try {
      const skipAmount = (page - 1) * limit;

      const titleCondition = searchText
         ? {
              title: {
                 contains: searchText,
                 mode: "insensitive" as const,
              },
           }
         : {};

      const categoryCondition = category
         ? await getCategoryByName(category)
         : null;

      const conditions = {
         AND: [
            titleCondition,
            categoryCondition ? { categoryId: categoryCondition.id } : {},
         ],
      };

      const events = await db.event.findMany({
         where: conditions,
         orderBy: { createdAt: "desc" },
         skip: skipAmount,
         take: limit,
         include: { category: true, user: true },
      });

      const eventsCount = await db.event.count({
         where: conditions,
      });

      return {
         data: events.map((event) => {
            return {
               ...event,
               categoryId: {
                  id: event?.categoryId,
                  name: event?.category?.name,
               },
               userId: { id: event?.userId, name: event?.user?.name },
            };
         }),
         totalPages: Math.ceil(eventsCount / limit),
      };
   } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
   }
};

export const getRelatedEventsByCategory = async (
   categoryId: string,
   eventId: string,
   limit = 3,
   page = 1
) => {
   try {
      const skipAmount = (page - 1) * limit;

      const events = await db.event.findMany({
         where: {
            AND: [{ categoryId }, { id: { not: eventId } }],
         },
         orderBy: {
            createdAt: "desc",
         },
         skip: skipAmount,
         take: limit,
         include: {
            category: true,
            user: true,
         },
      });

      const eventsCount = await db.event.count({
         where: {
            AND: [{ categoryId }, { id: { not: eventId } }],
         },
      });

      return {
         data: events.map((event) => {
            return {
               ...event,
               categoryId: {
                  id: event?.categoryId,
                  name: event?.category?.name,
               },
               userId: {
                  id: event?.userId,
                  name: event?.user?.name,
                  email: event?.user?.email,
               },
            };
         }),
         totalPages: Math.ceil(eventsCount / limit),
      };
   } catch (error) {
      console.error("Error fetching related events:", error);
      throw error;
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
      return error;
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
      return error;
   }
};
