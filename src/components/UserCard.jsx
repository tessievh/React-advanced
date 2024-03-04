import {
  Card,
  CardBody,
  Flex,
  Image,
  Heading,
  Center,
  Divider,
} from "@chakra-ui/react";

export const UserCard = ({ user }) => {
  return (
    <>
      <Card overflow="hidden" variant="outline" margin="1em" padding="1em">
        <CardBody>
          <Flex
            direction="column"
            alignItems="center"
            textAlign="center"
            gap="1"
            justify="space-evenly"
          >
            <Image
              src={user.image}
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
                {user.name}
              </Heading>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};
