import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';

type Props = { children: string };

/** Monospace snippet; pass template string as JSX children. */
export function CodeBlock({ children }: Props): React.JSX.Element {
  return (
    <Text
      selectable
      style={[
        styles.code,
        { fontFamily: Platform.select({ ios: 'Menlo', default: 'monospace' }) },
      ]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  code: {
    fontSize: 11,
    lineHeight: 16,
    color: 'rgba(255,255,255,0.75)',
    backgroundColor: 'rgba(0,0,0,0.35)',
    padding: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
