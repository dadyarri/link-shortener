import type { NextPage } from "next";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon
} from "@chakra-ui/react";
import { BiShuffle } from "react-icons/bi";

const Home: NextPage = () => {
  const insertRandomSlug = () => {
    const randomString = makeid(5);

    const e = document.getElementById("slug-input");
    if (e) {
      e.setAttribute("value", randomString);
    }
  };

  const makeid = (length: number) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return (
    <Container mt={3}>
      <Flex alignItems={"center"} direction={"column"}>
        <Heading as={"h1"}>Сокращатель ссылок</Heading>

        <form method={"post"} action={"/api/shorten"}>
          <FormControl as={"fieldset"} mt={4}>
            <FormLabel as={"legend"} htmlFor={"url"}>
              Полный URL
            </FormLabel>
            <Input
              type={"url"}
              placeholder={"URL"}
              id={"url-input"}
              name={"url"}
            />
          </FormControl>

          <FormControl as={"fieldset"} mt={4}>
            <FormLabel as={"legend"} htmlFor={"slug-input"}>
              Слаг
            </FormLabel>
            <InputGroup>
              <InputLeftAddon>
                https://{window.location.hostname}/
              </InputLeftAddon>
              <Input id={"slug-input"} name={"slug"} />
              <InputRightAddon p={0}>
                <IconButton
                  p={2}
                  icon={<BiShuffle />}
                  aria-label={"random slug"}
                  variant={"outline"}
                  colorScheme={"gray"}
                  border={0}
                  onClick={insertRandomSlug}
                />
              </InputRightAddon>
            </InputGroup>

            <Button type={"submit"} mt={4}>
              Сократить!
            </Button>
          </FormControl>
        </form>
      </Flex>
    </Container>
  );
};

export default Home;
