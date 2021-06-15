import React from 'react';
import { ChakraProvider } from "@chakra-ui/react"
import { LoginPage } from './_components/pages/index';

export default function App() {
  return (
    <ChakraProvider>
      <LoginPage />
    </ChakraProvider>
  );
}


