import { Event } from "@/interfaces";
import React from "react";

type Props = {
   event: Event[];
};

export default function Test({ event }: Props) {
   console.log(event);
   return (
      <>
         {event.map((item, index) => {
            <ul key={index}>
               <li>{item.id}</li>
            </ul>;
         })}
      </>
   );
}
