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
} from "@chakra-ui/react";
import { Category } from "../components/Category";

export const EventCard = ({ event }) => {
  return (
    <>
      <Flex wrap="wrap" align="center" justify="center">
        <Card
          overflow="hidden"
          variant="outline"
          margin="0.1em"
          padding="1em"
          maxHeight="70vh"
          backgroundColor="#FAF9F6"
        >
          <CardBody>
            <Flex
              direction="column"
              alignItems="center"
              textAlign="center"
              gap="2"
              justify="space-evenly"
            >
              <Image
                src={event.image}
                boxSize="200px"
                objectFit="cover"
                borderRadius="full"
                border=" 5px solid black"
              />
              <Center height="10px">
                <Divider />
              </Center>
              <Flex direction="column" textAlign="center" gap="3">
                <Heading fontSize="1.5rem" textTransform="uppercase">
                  {event.title}
                </Heading>

                <Text as="i" fontSize="1em">
                  {event.description}
                </Text>
                <Category event={event}></Category>

                <Box bg="black" color="white" borderRadius="1em" height="2em">
                  <Text textTransform="uppercase" padding="0.3em">
                    {event.startTime.slice(0, 10)} ||{" "}
                    {event.startTime.slice(11, 16)} -{" "}
                    {event.endTime.slice(11, 16)}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};
