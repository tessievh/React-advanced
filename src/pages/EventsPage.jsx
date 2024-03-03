import React, { useState } from "react";
import { Flex, Link } from "@chakra-ui/react";
import { SearchEvent } from "../components/SearchEvent";
import { EventCard } from "../components/EventCard";
import { useLoaderData } from "react-router-dom";
import { NewEvent } from "../components/NewEvent";

export const EventsPage = () => {
  const data = useLoaderData();

  const [eventList, setEventList] = useState(data.events);
  console.log(eventList);
  const [searchField, setSearchField] = useState("");
  const [filterArray, setFilterArray] = useState([]);

  //Filter buttons functionality.
  const clickFn = (categoryId) => {
    if (filterArray.includes(categoryId)) {
      setFilterArray(filterArray.filter((filter) => filter !== categoryId));
    } else {
      setFilterArray(filterArray.concat(categoryId));
    }
  };

  //Keeping track of searchfield
  const handleChange = (event) => setSearchField(event.target.value);

  //Filter based on categories.
  const filteredEvents = eventList.filter((event) => {
    if (filterArray.length === 0) {
      return true;
    }
    return filterArray.some((filter) => event.categoryIds.includes(filter));
  });

  //Filter based on search.
  const matchedEvents = () => {
    const temp = filteredEvents.filter((event) => {
      return event.title.toLowerCase().includes(searchField.toLowerCase());
    });
    //  setEventList(...temp);
  };

  const makeEvent = async (event) => {
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json;charset=utf-8" },
    });

    if (!response.ok) {
      throw new Error("failed to create the event");
    }

    event.id = (await response.json()).id;
    setEventList(eventList.concat(event));
  };

  console.log(`matched events: ${eventList[0].id}`);

  return (
    <Flex p="2rem" direction="column" alignItems="center" gap="2rem">
      {/* <SearchEvent
        changeFn={handleChange}
        clickFn={clickFn}
        filterArray={filterArray}
      />{" "} */}
      <Flex wrap="wrap" align="center" justify="center">
        {eventList.map((event) => (
          <div key={event.id}>
            <Link to={`event/${event.id}`}>
              <EventCard event={event} />
            </Link>
          </div>
        ))}
      </Flex>
      <NewEvent makeEvent={makeEvent} />
    </Flex>
  );
};
