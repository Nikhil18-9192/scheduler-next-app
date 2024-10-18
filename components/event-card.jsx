'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Trash, Link } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { deleteEvent } from '@/actions/events'
import useFetch from '@/hooks/use-fetch'

function EventCard({event, username, isPublic=false}) {
  const [isCopied, setCopied] = useState(false)
  const router = useRouter()

  const handleCopy = async() => {
    
    try {
        await navigator.clipboard.writeText(`${window.location.origin}/${username}/${event.id}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (error) {
        console.error("Failed to copy: ", error);
        
    } 
  }

  const {loading, fn: fnDeleteEvent} = useFetch(deleteEvent)
  const handleDelete = async() => {
    if(window.confirm("Are you sure you want to delete this event?") ){
      await fnDeleteEvent(event.id)
      router.refresh()
    } 
  }
  return (
    <Card className="flex flex-col justify-between cursor-pointer">
  <CardHeader>
    <CardTitle className="text-2xl">{event.title}</CardTitle>
    <CardDescription className="flex justify-between">
      <span>
        {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
      </span>
      <span>{event._count.bookings} Bookings</span>
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>{event.description.substring(0, event.description.indexOf("."))}</p>
  </CardContent>
  {!isPublic && (
    <CardFooter className="flex gap-2">
      <Button variant="outline" onClick={handleCopy}>
        <Link className='mr-2 h-4 w-4'/>
        {isCopied ? "Copied!" : "Copy Link"}
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={loading}>
        <Trash className='mr-2 h-4 w-4' />
        {loading ? "Deleting..." : "Delete"}
        </Button>
  </CardFooter>
  )}
</Card>

  )
}

export default EventCard