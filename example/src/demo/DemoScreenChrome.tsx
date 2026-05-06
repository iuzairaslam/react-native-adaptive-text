import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppBar } from './AppBar';
import { scaffoldDark } from './colors';

type Props = {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
};

export function DemoScreenChrome({
  title,
  onBack,
  children,
}: Props): React.JSX.Element {
  return (
    <View style={styles.root}>
      <AppBar title={title} onBack={onBack} />
      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: scaffoldDark },
  body: { flex: 1 },
});
