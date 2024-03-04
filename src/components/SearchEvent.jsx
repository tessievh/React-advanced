// SearchEvent.jsx
import React from "react";
import {
  Button,
  Collapse,
  Flex,
  Input,
  InputGroup,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";

export const SearchEvent = ({ onChange, onClick, filterArray, categories }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <InputGroup>
        <Input
          height="3rem"
          width="15rem"
          placeholder="Search events..."
          onChange={onChange}
        />
      </InputGroup>

      <Button
        bg="black"
        color="white"
        height="3rem"
        width="15rem"
        onClick={onToggle}
      >
        Filter by categories
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Flex
          direction="row"
          color="white"
          rounded="md"
          shadow="md"
          width="15rem"
          gap="1em"
          mt="1rem"
        >
          {categories.map((category) => (
            <Tag
              key={category.id}
              bg={filterArray.includes(category.id) ? "green.200" : "pink"}
              onClick={() => onClick(category.id)}
            >
              {category.name}
            </Tag>
          ))}
        </Flex>
      </Collapse>
    </>
  );
};
