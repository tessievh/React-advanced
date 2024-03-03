import { Badge, Flex } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const Category = ({ event }) => {
  if (!event || !event.categoryIds) {
    console.log("Invalid event data");
    return null;
  }

  return (
    <>
      <Flex
        direction="row"
        wrap="wrap"
        alignItems="center"
        alignContent="center"
        justify="center"
        gap="3"
      >
        {event && Object.values(event.categoryIds).includes(1) && (
          <Badge
            colorScheme="purple"
            maxW="15em"
            borderRadius="1em"
            paddingRight="1em"
            paddingLeft="1em"
            variant="outline"
          >
            Sports
          </Badge>
        )}
        {event && Object.values(event.categoryIds).includes(2) && (
          <Badge
            colorScheme="pink"
            maxW="15em"
            borderRadius="1em"
            paddingRight="1em"
            paddingLeft="1em"
            variant="outline"
          >
            Games
          </Badge>
        )}
        {event && Object.values(event.categoryIds).includes(3) && (
          <Badge
            colorScheme="green"
            maxW="15em"
            borderRadius="1em"
            paddingRight="1em"
            paddingLeft="1em"
            variant="outline"
          >
            Relaxation
          </Badge>
        )}
      </Flex>
    </>
  );
};
