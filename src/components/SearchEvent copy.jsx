import { useState } from "react";
import { TextInput } from "./TextInput";
import { EventCard } from "./EventCard";
import { useLoaderData } from "react-router-dom";
import {
  Button,
  Stack,
  Select,
  Checkbox,
  CheckboxGroup,
  Flex,
  Link,
} from "@chakra-ui/react";

export const SearchEvent = ({ events, clickFn }) => {
  // fetch data and set states
  const data = useLoaderData();
  const [searchField, setSearchField] = useState("");
  const [categoryId, setCategoryId] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  // handle textfield change
  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  // return matches for searchfield
  const searchFunction = () => {
    const search = events.filter((event) => {
      event.title.toLowerCase().includes(searchField.toLowerCase());
    });
    console.log(search);
    setFilteredEvents(...search);
    console.log(filteredEvents);
  };

  // handle filter function
  const selectCategory = (event) => {
    const category = event.map(Number);
    setCategoryId(...category);
  };

  const filterFunction = () => {
    const filtered = events.filter((e) => e.categoryIds.includes(categoryId));
    setFilteredEvents(...filtered);
  };
  console.log(`filteredEvents: ${filteredEvents}`);

  return (
    <>
      <TextInput onChange={handleChange} clickFn={searchFunction}></TextInput>
      <CheckboxGroup onChange={selectCategory}>
        <Stack spacing={[1, 5]} direction={["column", "row"]}>
          <Button colorScheme="teal" onClick={filterFunction}>
            Filter
          </Button>
          {data.categories.map((category) => (
            <Checkbox key={category.id} value={category.id.toString()}>
              {category.name.toUpperCase()}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>{" "}
    </>
  );
};
