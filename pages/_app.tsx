import type {AppProps} from "next/app";
import {ChakraProvider} from "@chakra-ui/react";
import theme from "../libs/theme";


function Website({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export async function getServerSideProps(context: { res: { setHeader: (arg0: string, arg1: string) => void; }; }) {

  // set HTTP header
  context.res.setHeader('Access-Control-Allow-Origin', 'https://schedule.dadyarri.ru')

  return {
    props: {}, // will be passed to the page component as props
  }
}

export default Website;
