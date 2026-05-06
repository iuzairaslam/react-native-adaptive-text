import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  AdaptiveText,
  ContrastAlgorithm,
  adaptiveRgb,
  getAdaptiveColor,
  getContrastRatio,
  hexToRgb,
  rgbToHex,
} from 'react-native-adaptive-text';
import { cardSurface } from './colors';
import { CodeBlock } from './CodeBlock';
import { DemoScreenChrome } from './DemoScreenChrome';

const PALETTES = {
  brand: ['#1565C0', '#C62828', '#2E7D32', '#6A1B9A', '#E65100'] as const,
  pastel: ['#90CAF9', '#F48FB1', '#A5D6A7', '#CE93D8', '#FFCC80'] as const,
  material: ['#2196F3', '#F44336', '#4CAF50', '#9C27B0', '#FF9800'] as const,
} as const;

type TabKey = keyof typeof PALETTES;

const PREVIEW_BGS = [
  '#FFFFFF',
  '#121212',
  '#E8EAF6',
  '#1B5E20',
  '#4A148C',
  '#263238',
] as const;

type Props = { onBack: () => void };

export default function PaletteDemoScreen({ onBack }: Props): React.JSX.Element {
  const [tab, setTab] = useState<TabKey>('brand');
  const palette = PALETTES[tab];
  const [chosen, setChosen] = useState<string>(palette[0]);
  const [previewBg, setPreviewBg] = useState<string>(PREVIEW_BGS[1]);

  React.useEffect(() => {
    setChosen(PALETTES[tab][0]);
  }, [tab]);

  const chosenRgb = useMemo(() => hexToRgb(chosen), [chosen]);
  const previewRgb = useMemo(() => hexToRgb(previewBg), [previewBg]);

  const fgRgb = useMemo(
    () =>
      getAdaptiveColor(previewRgb, {
        palette: [...palette].map(hexToRgb),
        algorithm: ContrastAlgorithm.wcag,
      }),
    [previewRgb, palette],
  );

  const ratio = useMemo(
    () => getContrastRatio(fgRgb, previewRgb),
    [fgRgb, previewRgb],
  );

  return (
    <DemoScreenChrome title="Palette-aware" onBack={onBack}>
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.lead}>
          Supply a small palette; the library picks the channel with the best
          WCAG contrast against the background.
        </Text>

        <View style={styles.tabRow}>
          {(Object.keys(PALETTES) as TabKey[]).map((k) => (
            <Pressable
              key={k}
              onPress={() => setTab(k)}
              style={[
                styles.tab,
                tab === k && styles.tabOn,
              ]}>
              <Text style={[styles.tabText, tab === k && styles.tabTextOn]}>
                {k.charAt(0).toUpperCase() + k.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.hero}>
          <View style={[styles.heroSwatch, { backgroundColor: chosen }]} />
          <Text style={styles.heroHex}>{chosen.toUpperCase()}</Text>
          <Text style={styles.heroCaption}>Selected palette color</Text>
          <View style={styles.chipRow}>
            <View style={styles.chip}>
              <Text style={styles.chipLabel}>On preview bg</Text>
              <Text style={styles.chipValue}>{ratio.toFixed(2)}:1</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipLabel}>Picked</Text>
              <Text style={styles.chipValue}>
                {rgbToHex(fgRgb).toUpperCase()}
              </Text>
            </View>
          </View>
        </View>

        <Text style={styles.section}>PALETTE</Text>
        <View style={styles.paletteRow}>
          {palette.map((hex) => (
            <Pressable
              key={hex}
              onPress={() => setChosen(hex)}
              style={[
                styles.pChip,
                { backgroundColor: hex },
                chosen === hex && styles.pChipRing,
              ]}
            />
          ))}
        </View>

        <Text style={styles.section}>PREVIEW BACKGROUND</Text>
        <View style={styles.swatchWrap}>
          {PREVIEW_BGS.map((hex) => (
            <Pressable
              key={hex}
              onPress={() => setPreviewBg(hex)}
              style={[
                styles.swatch,
                { backgroundColor: hex },
                previewBg === hex && styles.swatchRing,
              ]}
            />
          ))}
        </View>

        <View style={[styles.liveCard, { backgroundColor: previewBg }]}>
          <AdaptiveText
            backgroundColor={previewBg}
            palette={[...palette]}
            algorithm={ContrastAlgorithm.wcag}
            style={styles.liveTitle}>
            Live AdaptiveText
          </AdaptiveText>
          <AdaptiveText
            backgroundColor={previewBg}
            palette={[...palette]}
            style={styles.liveSub}>
            Foreground is the best palette match for this surface (WCAG
            luminance).
          </AdaptiveText>
        </View>

        <Text style={styles.section}>LUMINANCE (chosen)</Text>
        <View style={styles.themeCard}>
          <Text style={styles.mono}>
            L = {adaptiveRgb.relativeLuminance(chosenRgb).toFixed(4)}
          </Text>
        </View>

        <Text style={styles.section}>USAGE</Text>
        <CodeBlock>{`import { AdaptiveText, ContrastAlgorithm } from 'react-native-adaptive-text';

<AdaptiveText
  backgroundColor="${previewBg}"
  palette={${JSON.stringify([...palette])}}
  algorithm={ContrastAlgorithm.wcag}
>
  Brand copy
</AdaptiveText>`}</CodeBlock>
        <View style={{ height: 32 }} />
      </ScrollView>
    </DemoScreenChrome>
  );
}

const styles = StyleSheet.create({
  body: { padding: 20, paddingBottom: 40 },
  lead: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 16,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: cardSurface,
    borderRadius: 10,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabOn: { backgroundColor: 'rgba(167,139,250,0.2)' },
  tabText: { color: 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: '600' },
  tabTextOn: { color: '#FFFFFF' },
  hero: {
    alignItems: 'center',
    marginBottom: 8,
  },
  heroSwatch: {
    width: 88,
    height: 88,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  heroHex: {
    marginTop: 14,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
  heroCaption: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
  },
  chipRow: { flexDirection: 'row', marginTop: 16, gap: 10 },
  chip: {
    backgroundColor: cardSurface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  chipLabel: {
    color: 'rgba(255,255,255,0.35)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  chipValue: {
    marginTop: 4,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  section: {
    marginTop: 22,
    marginBottom: 10,
    color: 'rgba(255,255,255,0.3)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  paletteRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 4,
  },
  pChip: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  pChipRing: { borderColor: '#A78BFA' },
  swatchWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  swatchRing: { borderColor: '#A78BFA' },
  liveCard: { borderRadius: 16, padding: 18, marginTop: 4 },
  liveTitle: { fontSize: 18, fontWeight: '800' },
  liveSub: { marginTop: 8, fontSize: 13, opacity: 0.95 },
  themeCard: {
    backgroundColor: cardSurface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  mono: { color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: '600' },
});
