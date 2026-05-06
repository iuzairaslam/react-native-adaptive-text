import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import ApcaDemoScreen from './src/demo/ApcaDemoScreen';
import ExtensionDemoScreen from './src/demo/ExtensionDemoScreen';
import HomeScreen from './src/demo/HomeScreen';
import PaletteDemoScreen from './src/demo/PaletteDemoScreen';
import type { DemoRoute } from './src/demo/types';
import WidgetDemoScreen from './src/demo/WidgetDemoScreen';
import { scaffoldDark } from './src/demo/colors';

export default function App(): React.JSX.Element {
  const [route, setRoute] = useState<DemoRoute>('home');

  return (
    <SafeAreaView style={styles.safeRoot}>
      <StatusBar barStyle="light-content" backgroundColor={scaffoldDark} />
      {route === 'home' && (
        <HomeScreen
          onNavigate={(r) => setRoute(r)}
        />
      )}
      {route === 'widget' && (
        <WidgetDemoScreen onBack={() => setRoute('home')} />
      )}
      {route === 'palette' && (
        <PaletteDemoScreen onBack={() => setRoute('home')} />
      )}
      {route === 'extension' && (
        <ExtensionDemoScreen onBack={() => setRoute('home')} />
      )}
      {route === 'apca' && (
        <ApcaDemoScreen onBack={() => setRoute('home')} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeRoot: { flex: 1, backgroundColor: scaffoldDark },
});
