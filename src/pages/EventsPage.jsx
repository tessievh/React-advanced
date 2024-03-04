import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { EventCard } from "../components/EventCard";
import { NewEvent } from "../components/NewEvent";
import { Link, useLoaderData } from "react-router-dom";
import { SearchEvent } from "../components/SearchEvent";

export const EventsPage = () => {
  const data = useLoaderData();

  // Create states
  const [events, setEvents] = useState(data.events);
  const [searchField, setSearchField] = useState("");
  const [filterArray, setFilterArray] = useState(
    data.categories.map((category) => category.id)
  );

  useEffect(() => {
    applyFilters();
  }, [filterArray, searchField]);

  // Apply filters based on search field and category filters
  const applyFilters = () => {
    let filteredEvents = data.events;

    if (searchField) {
      filteredEvents = filteredEvents.filter((event) =>
        event.title.toLowerCase().includes(searchField.toLowerCase())
      );
    }

    if (filterArray.length > 0) {
      filteredEvents = filteredEvents.filter((event) =>
        filterArray.some((categoryId) => event.categoryIds.includes(categoryId))
      );
    }

    setEvents(filteredEvents);
  };

  // Handle change in search field
  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  // Toggle category filters
  const toggleCategoryFilter = (categoryId) => {
    if (filterArray.includes(categoryId)) {
      setFilterArray(filterArray.filter((filter) => filter !== categoryId));
    } else {
      setFilterArray([...filterArray, categoryId]);
    }
  };

  // Create new event request
  const createEvent = async (event) => {
    try {
      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        body: JSON.stringify(event),
        headers: { "Content-Type": "application/json;charset=utf-8" },
      });

      if (!response.ok) {
        throw new Error("Failed to create the event");
      }

      const eventData = await response.json();
      setEvents([...events, eventData]); // Add new event to the event list
    } catch (error) {
      console.error("Error creating event:", error.message);
    }
  };

  return (
    <Flex direction="row" gap="2rem" padding="2em" alignItems="flex-start">
      <Flex direction="column" gap="1rem">
        <NewEvent createEvent={createEvent} />
        <SearchEvent
          onChange={handleChange}
          onClick={toggleCategoryFilter}
          filterArray={filterArray}
          categories={data.categories}
        />
      </Flex>
      <Flex direction="row" gap="1rem" flexWrap="wrap">
        {events.map((event) => (
          <div key={event.id} style={{ flex: "1 0 300px", minWidth: "300px" }}>
            <Link to={`event/${event.id}`}>
              <EventCard event={event} />
            </Link>
          </div>
        ))}
      </Flex>
    </Flex>
  );
};
