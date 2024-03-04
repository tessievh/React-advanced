import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  useToast,
  Input,
  Stack,
  Select,
  Button,
  Checkbox,
  CheckboxGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const EditEvent = ({ event, eventId }) => {
  const data = useLoaderData();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // States for formdata
  const [formData, setFormData] = useState({
    createdBy: [],
    title: "",
    description: "",
    image: "",
    categoryIds: [],
    location: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    // Fetch current data
    setFormData({
      title: event.title,
      description: event.description,
      image: event.image,
      categoryIds: event.categoryIds,
      location: event.location,
      startTime: event.startTime,
      endTime: event.endTime,
      createdBy: event.createdBy,
    });
  }, [event]);

  // track changes
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  // update request
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      // toast succesfull
      toast({
        title: "Success!",
        description: "Event updated succesfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating event:", error.message);

      // toast error
      toast({
        title: "Error",
        description: "Failed to update event",
        status: "failure",
        duration: 3000,
        isClosable: true,
      });
    }

    // refresh after toast
    setTimeout(function () {
      location.reload();
    }, 3000);

    onClose();
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="pink">
        Edit Event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Edit Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Event Title</FormLabel>
                <Input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Event Description</FormLabel>
                <Input
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Image</FormLabel>
                <Input
                  placeholder="Image"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <CheckboxGroup
                  onChange={(e) =>
                    handleInputChange("category", Number(e.target.value))
                  }
                >
                  <Stack spacing={[1, 5]} direction={["column", "row"]}>
                    {data.categories &&
                      data.categories.map((category) => (
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
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Start time </FormLabel>
                <Input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) =>
                    handleInputChange("startTime", e.target.value)
                  }
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>End time </FormLabel>
                <Input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Created by </FormLabel>
                <Select
                  placeholder="Select User"
                  value={formData.createdBy}
                  onChange={(e) =>
                    handleInputChange("createdBy", e.target.value)
                  }
                >
                  {data.users &&
                    data.users.map((user) => (
                      <option key={user.id} value={user.id.toString()}>
                        {user.name}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="pink" onClick={handleSubmit}>
                Save Changes
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
