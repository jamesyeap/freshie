import React, { useState, useEffect } from 'react';
import { LoginPage } from './_components/pages/index';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

export default function App() {
  // On start-up, app needs to load the fonts files first.
  const [isLoaded, error] = useFonts({Inter_400Regular, Inter_500Medium, Inter_600SemiBold});

  if (!isLoaded) {
    if (error) {
      console.log(error)
    }

    return <AppLoading />;
  }

  return (
    <LoginPage />
  )
}


