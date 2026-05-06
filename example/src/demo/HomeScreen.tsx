import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  AdaptiveText,
  adaptiveRgb,
  hexToRgb,
  rgbToHex,
} from 'react-native-adaptive-text';
import {
  cardSurface,
  heroPillBg,
  heroPillBorder,
  heroPillText,
  previewDarkRow,
  previewLightRow,
  scaffoldDark,
} from './colors';
import { AppBar } from './AppBar';
import type { DemoRoute } from './types';

const DEMOS = [
  {
    title: 'AdaptiveText Widget',
    subtitle:
      'Drop-in Text replacement. Auto black or white on any background.',
    icon: '¶',
    accent: '#1A237E' as const,
    route: 'widget' as const,
  },
  {
    title: 'Palette-Aware',
    subtitle:
      'Pick the highest-contrast color from your design system palette.',
    icon: '🎨',
    accent: '#1B5E20' as const,
    route: 'palette' as const,
  },
  {
    title: 'Color Extension',
    subtitle: 'Call adaptiveRgb helpers on any RGB object.',
    icon: '⟨⟩',
    accent: '#4A148C' as const,
    route: 'extension' as const,
  },
  {
    title: 'APCA Algorithm',
    subtitle: 'Perceptual contrast — WCAG 3.0 style with Lc values.',
    icon: 'α',
    accent: '#263238' as const,
    route: 'apca' as const,
  },
];

function Pill({ label }: { label: string }): React.JSX.Element {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillText}>{label}</Text>
    </View>
  );
}

function SectionLabel({ label }: { label: string }): React.JSX.Element {
  return <Text style={styles.sectionLabel}>{label}</Text>;
}

type Props = { onNavigate: (route: Exclude<DemoRoute, 'home'>) => void };

export default function HomeScreen({ onNavigate }: Props): React.JSX.Element {
  return (
    <View style={styles.root}>
      <AppBar title="Examples" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.heroPill}>
          <Text style={styles.heroPillText}>REACT NATIVE PACKAGE</Text>
        </View>
        <Text style={styles.heroTitle}>react-native-adaptive-text</Text>
        <Text style={styles.heroSubtitle}>
          Smart text color that stays readable —{'\n'}
          WCAG 2.1 and APCA, pure JavaScript (no native modules).
        </Text>
        <View style={styles.pillRow}>
          <Pill label="WCAG 2.1" />
          <View style={{ width: 8 }} />
          <Pill label="APCA" />
          <View style={{ width: 8 }} />
          <Pill label="Pure JS" />
        </View>

        <View style={styles.blockSpacer} />
        <SectionLabel label="ADAPTS TO ANY BACKGROUND" />
        <View style={{ height: 14 }} />
        <View style={styles.tileRow}>
          {previewDarkRow.map((hex) => (
            <View key={hex} style={[styles.tile, { backgroundColor: hex }]}>
              <AdaptiveText
                backgroundColor={hex}
                style={styles.tileAa}>
                Aa
              </AdaptiveText>
            </View>
          ))}
        </View>
        <View style={{ height: 8 }} />
        <View style={styles.tileRow}>
          {previewLightRow.map((hex) => (
            <View key={hex} style={[styles.tile, { backgroundColor: hex }]}>
              <AdaptiveText
                backgroundColor={hex}
                style={styles.tileAa}>
                Aa
              </AdaptiveText>
            </View>
          ))}
        </View>
        <View style={{ height: 12 }} />
        <Text style={styles.previewCaption}>
          Black or white chosen automatically based on WCAG luminance.
        </Text>

        <View style={styles.blockSpacer} />
        <SectionLabel label="DEMOS" />
        <View style={{ height: 14 }} />
        {DEMOS.map((d) => {
          const accentRgb = hexToRgb(d.accent);
          const iconColor = rgbToHex(adaptiveRgb.adaptiveTextColor(accentRgb));
          return (
            <Pressable
              key={d.route}
              onPress={() => onNavigate(d.route)}
              style={({ pressed }) => [
                styles.demoCard,
                pressed && { opacity: 0.92 },
              ]}>
              <View style={styles.demoRow}>
                <View
                  style={[
                    styles.demoIconWrap,
                    { backgroundColor: d.accent },
                  ]}>
                  <Text style={[styles.demoIconGlyph, { color: iconColor }]}>
                    {d.icon}
                  </Text>
                </View>
                <View style={styles.demoTextCol}>
                  <Text style={styles.demoTitle}>{d.title}</Text>
                  <Text style={styles.demoSubtitle}>{d.subtitle}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </View>
            </Pressable>
          );
        })}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: scaffoldDark,
  },
  scrollView: { flex: 1 },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  blockSpacer: { height: 40 },
  heroPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: heroPillBg,
    borderWidth: 1,
    borderColor: heroPillBorder,
  },
  heroPillText: {
    color: heroPillText,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  heroTitle: {
    marginTop: 16,
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
    lineHeight: 38,
  },
  heroSubtitle: {
    marginTop: 10,
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    lineHeight: 22,
  },
  pillRow: {
    flexDirection: 'row',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  pillText: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 11,
    fontWeight: '600',
  },
  sectionLabel: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  tileRow: { flexDirection: 'row', gap: 6 },
  tile: {
    flex: 1,
    height: 72,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
  },
  tileAa: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  previewCaption: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 12,
  },
  demoCard: {
    backgroundColor: cardSurface,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  demoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  demoIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoIconGlyph: {
    fontSize: 20,
    fontWeight: '700',
  },
  demoTextCol: {
    flex: 1,
    marginLeft: 16,
  },
  demoTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  demoSubtitle: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    lineHeight: 17,
  },
  chevron: {
    color: 'rgba(255,255,255,0.2)',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});
