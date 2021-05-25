import { StatusBar } from 'expo-status-bar';
import React , {useEffect} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import * as Sentry from 'sentry-expo';



export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  useEffect(()=>{
    Sentry.init({
      dsn: "https://ebd3eb3e697b44fbadb5538f68d43339@o566190.ingest.sentry.io/5708678",
      enableInExpoDevelopment: true,
      debug: true,
    });
  },[])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
