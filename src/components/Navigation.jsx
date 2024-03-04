import React from "react";
import { Link } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Flex direction="row">
      <nav>
        <ul>
          <li>
            <Link to="/">Events</Link>
          </li>
          <li>
            <Link to="/event/1">Event</Link>
          </li>
        </ul>
      </nav>
    </Flex>
  );
};
