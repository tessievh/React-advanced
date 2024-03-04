import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Stack,
  Select,
  Button,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

import { useState } from "react";

export const NewEvent = ({ createEvent }) => {
  const data = useLoaderData();

  // create states and modal variables
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [createdBy, setCreatedBy] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // data massaging for category
  const categoryToNumber = (event) => {
    const category = event.map(Number);
    setCategoryIds(category);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // create new event
    createEvent({
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    });

    // Reset form fields.
    setCreatedBy("");
    setTitle("");
    setDescription("");
    setImage("");
    setCategoryIds([]);
    setLocation("");
    setStartTime("");
    setEndTime("");

    onClose();
  };
  return (
    <>
      <Button onClick={onOpen} colorScheme="pink" width="15rem">
        Create New Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Create New Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Event Title</FormLabel>
                <Input
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Description"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Image </FormLabel>
                <Input
                  placeholder="Image"
                  onChange={(e) => setImage(e.target.value)}
                />
                <FormHelperText>Insert link for the image</FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel>Category</FormLabel>
                <CheckboxGroup onChange={categoryToNumber}>
                  <Stack spacing={[1, 5]} direction={["column", "row"]}>
                    {data.categories.map((category) => (
                      <Checkbox
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </Checkbox>
                    ))}
                  </Stack>
                </CheckboxGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Location </FormLabel>
                <Input
                  placeholder="Location "
                  onChange={(e) => setLocation(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Start time </FormLabel>
                <Input
                  type="datetime-local"
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>End Time</FormLabel>
                <Input
                  type="datetime-local"
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Created by </FormLabel>
                <Select
                  placeholder="Select User"
                  onChange={(e) => setCreatedBy(Number(e.target.value))}
                >
                  {data.users.map((user) => (
                    <option key={user.id} value={user.id.toString()}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="pink">
                Submit
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
