import EventForm from "@/components/section/eventForm";
import { getEventByIdAction } from "@/actions/event.actions";
import { auth } from "@/lib/auth";

type UpdateEventProps = {
   params: {
      id: string;
   };
};

const UpdateEvent = async ({ params: { id } }: UpdateEventProps) => {
   const session = await auth();

   console.log(id);

   const userId = session?.user.id as string;
   const event = await getEventByIdAction(id);

   return (
      <>
         <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
            <h3 className="wrapper h3-bold text-center sm:text-left">
               Update Event
            </h3>
         </section>

         <div className="wrapper my-8">
            <EventForm
               type="Update"
               event={event}
               eventId={event.id}
               userId={userId}
            />
         </div>
      </>
   );
};

export default UpdateEvent;
