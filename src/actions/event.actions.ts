"use server";

import { CreateEventParams, Event, UpdateEventParams } from "@/interfaces";
import { handleError } from "@/utils/index";
import { db } from "@/lib/database";
import {
   createEvent,
   getEventsByUserId,
   getEventById,
   getRelatedEventsByCategory,
   getAllEvents,
   updateEvent,
} from "@/models/event";

export const createEventAction = async (event: CreateEventParams) => {
   try {
      await db.$connect();

      const newEvent = await createEvent(event);

      return JSON.parse(JSON.stringify(newEvent));
   } catch (error) {
      handleError(error);
   }
};

export const getAllEventsAction = async (
   searchText: string,
   category: string,
   page: number
) => {
   try {
      await db.$connect();

      const events = await getAllEvents(searchText, category, page);

      return JSON.parse(JSON.stringify(events));
   } catch (error) {
      handleError(error);
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

export async function getRelatedEventsByCategoryAction(
   categoryId: string,
   eventId: string,
   limit = 3,
   page = 1
) {
   try {
      await db.$connect();
      const events = await getRelatedEventsByCategory(
         eventId,
         categoryId,
         limit,
         page
      );

      return JSON.parse(JSON.stringify(events));
   } catch (error) {
      return handleError(error);
   }
}

export const updateEventAction = async (
   userId: string,
   event: UpdateEventParams
) => {
   try {
      await db.$connect();

      const updatedEvent = await updateEvent(userId, event);

      return JSON.parse(JSON.stringify(updatedEvent));
   } catch (error) {
      return handleError(error);
   }
};
