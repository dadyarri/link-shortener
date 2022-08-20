import type { NextPage } from "next";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon
} from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Container mt={3}>
      <Flex alignItems={"center"} direction={"column"}>
        <Heading as={"h1"}>Сокращатель ссылок</Heading>

        <FormControl as={"fieldset"} mt={4}>
          <FormLabel as={"legend"}>Полный URL</FormLabel>
          <Input type={"url"} placeholder={"URL"} />
        </FormControl>

        <FormControl as={"fieldset"} mt={4}>
          <FormLabel as={"legend"}>Слаг</FormLabel>
          <InputGroup>
            <InputLeftAddon>https://link.dadyarri.ru/</InputLeftAddon>
            <Input />
          </InputGroup>

          <Button type={"submit"} mt={4}>
            Сократить!
          </Button>
        </FormControl>
      </Flex>
    </Container>
  );
};

export default Home;
