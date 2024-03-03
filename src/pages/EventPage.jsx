import React from "react";
import { Heading, Flex } from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { EventCard } from "../components/EventCard";
import { UserCard } from "../components/UserCard";
import { DeleteEvent } from "../components/DeleteEvent";

export const EventPage = () => {
  const event = useLoaderData();
  const navigate = useNavigate();
  // Get post creator
  const userId = event.post.createdBy;

  const user = event.users.find(({ id }) => id === userId);

  // create edit button, open a modal or a same page + use form to edit

  // save edit to back-end

  // show succes or failure message using a toast

  // add delete button + extra check to make sure
  //delete request
  const removeEvent = async () => {
    const response = await fetch(
      `http://localhost:3000/events/${event.post.id}`,
      {
        method: "DELETE",
      }
    );

    //error handling
    if (!response.ok) {
      throw new Error("failed to delete the event");
    }
    //navigate back to eventslist page
    navigate("/");
  };
  // send delete request to the server after confirmation
  // redirect back to the events page
  return (
    <>
      <Heading>Event</Heading>
      <Flex>
        <EventCard event={event.post}></EventCard>
        <UserCard user={user}></UserCard>
      </Flex>
      <DeleteEvent removeEvent={removeEvent}></DeleteEvent>
    </>
  );
};
