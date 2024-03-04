import { Badge, Flex } from "@chakra-ui/react";

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
            variant="solid"
            fontSize="1em"
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
            variant="solid"
            fontSize="1em"
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
            variant="solid"
            fontSize="1em"
          >
            Relaxation
          </Badge>
        )}
      </Flex>
    </>
  );
};
