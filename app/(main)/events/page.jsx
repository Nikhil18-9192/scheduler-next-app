import { getUserEvents } from "@/actions/events"
import EventCard from "@/components/event-card";
import { Suspense } from "react"

export default function EventsPage() {
  return(
    <Suspense fallback={<div>Loading Events...</div>}>
      <Events />
    </Suspense>
  )
}

const Events = async() =>{
  const {events, username} = await getUserEvents();

  if(events.length === 0){
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="text-2xl font-bold">No Events Found</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
    {events.map((event) => (
      <EventCard key={event.id} event={event} username={username} />
    ))}
    </div>
  )
}

