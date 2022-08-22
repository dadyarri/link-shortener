import type {NextPage} from "next";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon
} from "@chakra-ui/react";
import {BiShuffle} from "react-icons/bi";
import axios from "axios";
import React, {FormEvent} from "react";

const Home: NextPage = () => {

  const [slugError, setSlugError] = React.useState(false);

  const insertRandomSlug = () => {

    const randomString = makeid(5);

    setSlugError(false);

    const element = document.getElementById("slug-input");
    if (element) {
      // @ts-ignore
      element.value = randomString;
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

  const shortenUrl = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // @ts-ignore
    const slug = document.getElementById("slug-input")?.value;
    // @ts-ignore
    const url = document.getElementById("url-input")?.value;

    await axios.post("/api/shorten", {slug, url}).then(res => {
      if (res.status === 200) {
        setSlugError(false);
      }
    }).catch(err => {
      if (err.response.status === 409) {
        setSlugError(true);
      }
    });
  }

  return (
    <Container mt={3}>
      <Flex alignItems={"center"} direction={"column"}>
        <Heading as={"h1"}>Сокращатель ссылок</Heading>

        <form method={"post"} onSubmit={shortenUrl}>
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

          <FormControl as={"fieldset"} mt={4} isInvalid={slugError}>
            <FormLabel as={"legend"} htmlFor={"slug-input"} id={"slug-label"}>
              Слаг
            </FormLabel>
            <InputGroup>
              <InputLeftAddon>
                https://link.dadyarri.ru/
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
            {slugError && (<FormErrorMessage>Слаг уже занят!</FormErrorMessage>)}

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
