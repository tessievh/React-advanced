import {
  Card,
  CardBody,
  Flex,
  Text,
  Image,
  Heading,
  Center,
  Divider,
  Box,
  Link,
} from "@chakra-ui/react";
import { Category } from "../components/Category";

export const EventCard = ({ event }) => {
  console.log(`events: ${event}`);
  return (
    <>
      <Flex wrap="wrap" align="center" justify="center">
        {/* {events.map((event) => (
          <div key={event.id}>
            <Link to={`event/${event.id}`}> */}
        <Card
          overflow="hidden"
          variant="elevated"
          margin="1em"
          backgroundColor="#F5F1E3"
          padding="1em"
        >
          <CardBody bg="#1B9AA">
            <Flex
              direction="column"
              alignItems="center"
              textAlign="center"
              gap="1"
              justify="space-evenly"
            >
              <Image
                src={event.image}
                boxSize="300px"
                objectFit="cover"
                borderRadius="full"
                border=" 5px solid black"
              />
              <Center height="10px">
                <Divider />
              </Center>
              <Flex direction="column" textAlign="center" gap="3">
                <Heading size="xl" textTransform="uppercase">
                  {event.title}
                </Heading>

                <Text as="i" fontSize="1.1em">
                  {event.description}
                </Text>
                <Category event={event}></Category>
                <Divider width="10em" align="center" />
                <Box bg="black" color="white" borderRadius="1em">
                  <Text textTransform="uppercase" padding="1em">
                    {event.startTime.slice(0, 10)} ||{" "}
                    {event.startTime.slice(11, 16)} -{" "}
                    {event.endTime.slice(11, 16)}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        {/* </Link>
          </div>
        ))} */}
      </Flex>
    </>
  );
};
