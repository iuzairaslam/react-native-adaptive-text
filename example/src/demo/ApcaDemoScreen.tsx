import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  AdaptiveText,
  getApcaContrast,
  getContrastRatio,
  hexToRgb,
} from 'react-native-adaptive-text';
import { cardSurface } from './colors';
import { CodeBlock } from './CodeBlock';
import { DemoScreenChrome } from './DemoScreenChrome';

/** Pairs tuned so WCAG ratio and APCA Lc can disagree (like the Flutter demo). */
const PAIRS = [
  { label: 'Yellow / purple', fg: '#FFEB3B', bg: '#4A148C' },
  { label: 'Orange / blue', fg: '#FF9800', bg: '#0D47A1' },
  { label: 'White / mid gray', fg: '#FFFFFF', bg: '#757575' },
] as const;

type Props = { onBack: () => void };

export default function ApcaDemoScreen({ onBack }: Props): React.JSX.Element {
  const [idx, setIdx] = useState(0);
  const { fg, bg, label } = PAIRS[idx];

  const wcag = useMemo(() => {
    const a = hexToRgb(fg);
    const b = hexToRgb(bg);
    return getContrastRatio(a, b);
  }, [fg, bg]);

  const apca = useMemo(() => {
    const a = hexToRgb(fg);
    const b = hexToRgb(bg);
    return getApcaContrast(a, b);
  }, [fg, bg]);

  return (
    <DemoScreenChrome title="WCAG vs APCA" onBack={onBack}>
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.lead}>
          WCAG 2.x uses relative luminance ratios. APCA (WCAG 3 direction) uses
          perceptual Lc — they can rank the same pair differently.
        </Text>

        <Text style={styles.section}>PRESETS</Text>
        <View style={styles.presetRow}>
          {PAIRS.map((p, i) => (
            <Pressable
              key={p.label}
              onPress={() => setIdx(i)}
              style={[styles.preset, idx === i && styles.presetOn]}>
              <Text
                style={[styles.presetText, idx === i && styles.presetTextOn]}
                numberOfLines={2}>
                {p.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View style={[styles.preview, { backgroundColor: bg }]}>
          <AdaptiveText backgroundColor={bg} style={styles.previewText}>
            {label}
          </AdaptiveText>
          <AdaptiveText
            backgroundColor={bg}
            style={[styles.previewSmall, { color: fg }]}>
            Foreground (fixed): {fg.toUpperCase()}
          </AdaptiveText>
        </View>

        <View style={styles.row2}>
          <View style={styles.card}>
            <Text style={styles.cardKicker}>WCAG 2.1</Text>
            <Text style={styles.cardBig}>{wcag.toFixed(2)}:1</Text>
            <Text style={styles.cardFoot}>getContrastRatio(fg, bg)</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardKicker}>APCA Lc</Text>
            <Text style={styles.cardBig}>
              {apca >= 0 ? '+' : ''}
              {apca.toFixed(1)}
            </Text>
            <Text style={styles.cardFoot}>getApcaContrast(fg, bg)</Text>
          </View>
        </View>

        <View style={styles.note}>
          <Text style={styles.noteText}>
            Same colors, two models. Use WCAG for regulatory AA/AAA checks; use
            APCA when you want a perceptual read on readability.
          </Text>
        </View>

        <Text style={styles.section}>USAGE</Text>
        <CodeBlock>{`import { getContrastRatio, getApcaContrast, hexToRgb } from 'react-native-adaptive-text';

const fg = hexToRgb('${fg}');
const bg = hexToRgb('${bg}');
getContrastRatio(fg, bg);   // ${wcag.toFixed(2)}:1
getApcaContrast(fg, bg);    // ${apca.toFixed(1)}`}</CodeBlock>
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
  section: {
    marginTop: 8,
    marginBottom: 10,
    color: 'rgba(255,255,255,0.3)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  presetRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  preset: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: cardSurface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    maxWidth: '48%',
  },
  presetOn: {
    borderColor: '#A78BFA',
    backgroundColor: 'rgba(167,139,250,0.12)',
  },
  presetText: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    fontWeight: '600',
  },
  presetTextOn: { color: '#FFFFFF' },
  preview: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  previewText: { fontSize: 18, fontWeight: '800' },
  previewSmall: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: '600',
  },
  row2: { flexDirection: 'row', gap: 10 },
  card: {
    flex: 1,
    backgroundColor: cardSurface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  cardKicker: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  cardBig: {
    marginTop: 8,
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '800',
  },
  cardFoot: {
    marginTop: 8,
    color: 'rgba(255,255,255,0.35)',
    fontSize: 11,
  },
  note: {
    marginTop: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(167,139,250,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(167,139,250,0.25)',
  },
  noteText: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 12,
    lineHeight: 18,
  },
});
