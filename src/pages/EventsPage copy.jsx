import React from "react";
import { Flex, Heading, Button } from "@chakra-ui/react";
import { Link, useLoaderData, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { EventCard } from "../components/EventCard";
import { NewEvent } from "../components/NewEvent";
import { SearchEvent } from "../components/SearchEvent";

// https://github.com/VictoriousVI/react-advanced-project/blob/main/src/components/CreateEvent.jsx

export const EventsPage = () => {
  const { events } = useLoaderData();

  const [eventList, setEventList] = useState(events);
  const [searchField, setSearchField] = useState("");

  const handleChange = (event) => setSearchField(event.target.value);

  //Filter based on search.
  const matchedEvents = filteredEvents.filter((event) => {
    return event.title.toLowerCase().includes(searchField.toLowerCase());
  });
  // add event button with pop-up/modal + update back-end
  const createEvent = async (event) => {
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });

    if (!response.ok) {
      throw new Error("Can't create event");
    }

    event.id = (await response.json()).id;
    setEventList(eventList.concat(event));
  };
  // add search function

  // add filter function based on categories

  // The only data available is the routes that are currently rendered. If you ask for data from a route that is not currently rendered, the hook will return undefined. >> Outlet ?
  return (
    <>
      <Heading>UPCOMING EVENTS</Heading>

      <NewEvent createEvent={createEvent}></NewEvent>
      <SearchEvent events={eventList} clickFn={setEventList}></SearchEvent>

      <Flex wrap="wrap" align="center" justify="center">
        {events.map((event) => (
          <div key={event.id}>
            <Link to={`event/${event.id}`}>
              <EventCard event={event} />
            </Link>
          </div>
        ))}
      </Flex>
    </>
  );
};
