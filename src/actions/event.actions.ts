"use server";

import { CreateEventParams, Event } from "@/interfaces";
import { handleError } from "@/utils/index";
import { db } from "@/lib/database";
import { createEvent, getEventsByUserId, getEventById } from "@/models/event";

export const createEventAction = async (
   event: CreateEventParams
): Promise<Event> => {
   try {
      await db.$connect();

      const newEvent = await createEvent(event);

      return JSON.parse(JSON.stringify(newEvent));
   } catch (error) {
      return handleError(error);
   }
};

export const getEventByIdAction = async (id: string) => {
   try {
      await db.$connect();

      const event = await getEventById(id);

      return JSON.parse(JSON.stringify(event));
   } catch (error) {
      return handleError(error);
   }
};

export const getEventsByUserIdAction = async (userId: string) => {
   try {
      await db.$connect();

      const events = await getEventsByUserId(userId);

      return JSON.parse(JSON.stringify(events));
   } catch (error) {
      return handleError(error);
   }
};
