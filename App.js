import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LoginPage, HomePage, PrototypePage, AccountPage, MealsPage, DashboardPage, EatingHistoryPage, SignupPage, RegisterPage, EditRecipePage, ClientPage, EditMealPlanPage, RecipePage } from './_components/pages/index';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { store } from './_redux/store/store'; 
import Portal from '@burstware/react-native-portal'
import RootStackScreen from './_navigation/RootStackScreen';

export default function App() {
  // On start-up, app needs to load the fonts files first.
  const [isLoaded, error] = useFonts({Inter_400Regular, Inter_500Medium, Inter_600SemiBold});

  if (!isLoaded) {
    // shows error with loading fonts in the terminal, if any
    if (error) {
      console.log(error)
    }
    return <AppLoading />;
  }

  return (
    <Portal.Host>
      <PaperProvider>
        <Provider store={store}>
          <NavigationContainer>
            <RootStackScreen />
          </NavigationContainer>
        </Provider>
      </PaperProvider>
    </Portal.Host>
  )
}

    // <LoginPage />
    // <HomePage />
    // <PrototypePage />
    // <AccountPage />
    // <MealsPage />
    // <DashboardPage />
    // <EatingHistoryPage />
    // <RecipeEditPage/>
    // <SignupPage />
    // <RegisterPage />
    // <ClientPage />
    // <EditMealPlanPage />

