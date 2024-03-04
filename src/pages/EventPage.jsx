import React from "react";
import { Heading, Flex, Button } from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { EventCard } from "../components/EventCard";
import { UserCard } from "../components/UserCard";
import { DeleteEvent } from "../components/DeleteEvent";
import { EditEvent } from "../components/EditEvent";

export const EventPage = () => {
  const event = useLoaderData();
  const navigate = useNavigate();

  // Get post creator
  const userId = event.post.createdBy;
  const user = event.users.find(({ id }) => id === userId);

  // Function to handle edit action
  const handleEdit = () => {
    navigate(`/edit/${event.post.id}`);
  };

  // delete request
  const removeEvent = async () => {
    const response = await fetch(
      `http://localhost:3000/events/${event.post.id}`,
      {
        method: "DELETE",
      }
    );

    // error handling
    if (!response.ok) {
      throw new Error("failed to delete the event");
    }
    // navigate back to events list page
    navigate("/");
  };

  return (
    <>
      <Heading>Event</Heading>
      <Flex>
        <EventCard event={event.post}></EventCard>
        <UserCard user={user}></UserCard>
      </Flex>
      <Flex mt="4" gap="2em">
        <EditEvent
          event={event.post}
          eventId={event.post.id}
          onClick={handleEdit}
        />
        <DeleteEvent removeEvent={removeEvent}></DeleteEvent>
      </Flex>
    </>
  );
};
