import { Input } from "@chakra-ui/react";

export const TextInput = ({ handleChange, ...props }) => {
  return (
    <>
      <Input
        onChange={handleChange}
        height={"3rem"}
        width={"30rem"}
        margin="auto"
        borderRadius={"10px"}
        backgroundColor={"white"}
        placeholder={"Search Events"}
        textAlign={"center"}
        {...props}
      ></Input>
    </>
  );
};
