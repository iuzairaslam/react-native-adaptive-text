import React from 'react';
import {
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { scaffoldDark } from './colors';

export type AppBarProps = {
  title: string;
  /** When set, shows a leading back control (detail screens). */
  onBack?: () => void;
};

/**
 * Material-style top app bar used on every example screen for consistency.
 */
export function AppBar({ title, onBack }: AppBarProps): React.JSX.Element {
  const topPad =
    Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0;

  return (
    <View style={[styles.shell, { paddingTop: topPad }]}>
      <View style={styles.row}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            style={({ pressed }) => [
              styles.leading,
              pressed && styles.leadingPressed,
            ]}>
            <Text style={styles.backGlyph}>‹</Text>
          </Pressable>
        ) : (
          <View style={styles.leading} />
        )}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.trailing} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    backgroundColor: scaffoldDark,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.08)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    paddingHorizontal: 4,
  },
  leading: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leadingPressed: { opacity: 0.7 },
  backGlyph: {
    color: '#A78BFA',
    fontSize: 28,
    fontWeight: '300',
    marginTop: -2,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.15,
  },
  trailing: {
    width: 48,
    height: 48,
  },
});
