"use client";

import { Event } from "@/interfaces";
import React, { useEffect, useState } from "react";
import Card from "@/components/ui/card";
import Pagination from "./pagination";
import { getRelatedEventsByCategoryAction } from "@/actions/event.actions";

type CollectionProps = {
   // data: Event[];
   // emptyTitle: string;
   // emptyStateSubtext: string;
   // limit: number;
   // page: number | string;
   // totalPages?: number;
   // urlParamName?: string;
   collectionType?: "Events_Organized" | "My_Tickets" | "All_Events";
   eventId: string;
   categoryId: string;
};

const RelatedCollection = ({
   // data,
   // emptyTitle,
   // emptyStateSubtext,
   // page,
   // totalPages = 0,
   collectionType,
   // urlParamName,
   eventId,
   categoryId,
}: CollectionProps) => {
   // const relatedEvent = await getRelatedEventsByCategoryAction(
   //    categoryId,
   //    eventId
   // );

   const [relatedEvent, setRelatedEvent] = useState<any>();

   useEffect(() => {
      if (eventId && categoryId) {
         const getRelatedEvent = async () => {
            const relatedEventsData = await getRelatedEventsByCategoryAction(
               categoryId,
               eventId
            );
            setRelatedEvent(relatedEventsData);
         };
         getRelatedEvent();
      } else {
         console.error("Event or Category not found");
      }
   }, []);

   const totalPages = 0;

   console.log(relatedEvent);

   return <p>hai</p>;
};

export default RelatedCollection;
