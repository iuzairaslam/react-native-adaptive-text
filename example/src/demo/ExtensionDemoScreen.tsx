import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  BLACK,
  WHITE,
  adaptiveRgb,
  hexToRgb,
  rgbToHex,
} from 'react-native-adaptive-text';
import { cardSurface } from './colors';
import { CodeBlock } from './CodeBlock';
import { DemoScreenChrome } from './DemoScreenChrome';

const SWATCHES = [
  '#5C6BC0',
  '#00897B',
  '#6D4C41',
  '#F9A825',
  '#ECEFF1',
  '#37474F',
] as const;

type Props = { onBack: () => void };

export default function ExtensionDemoScreen({
  onBack,
}: Props): React.JSX.Element {
  const [hex, setHex] = useState<string>(SWATCHES[0]);

  const stats = useMemo(() => {
    const rgb = hexToRgb(hex);
    const lum = adaptiveRgb.relativeLuminance(rgb);
    const cw = adaptiveRgb.contrastRatioWith(rgb, WHITE);
    const cb = adaptiveRgb.contrastRatioWith(rgb, BLACK);
    const text = adaptiveRgb.adaptiveTextColor(rgb);
    const textHex = rgbToHex(text);
    return {
      lum,
      cw,
      cb,
      textHex,
      aaW: adaptiveRgb.meetsWcagWith(WHITE, rgb, { level: 'aa' }),
      aaB: adaptiveRgb.meetsWcagWith(BLACK, rgb, { level: 'aa' }),
      isLight: adaptiveRgb.isLight(rgb),
    };
  }, [hex]);

  return (
    <DemoScreenChrome title="adaptiveRgb" onBack={onBack}>
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.lead}>
          Same math as the widget, exposed as functions on plain RGB objects —
          mirrors Flutter extension-style helpers.
        </Text>

        <Text style={styles.section}>SWATCH</Text>
        <View style={styles.swatchWrap}>
          {SWATCHES.map((h) => (
            <Pressable
              key={h}
              onPress={() => setHex(h)}
              style={[
                styles.swatch,
                { backgroundColor: h },
                hex === h && styles.swatchRing,
              ]}
            />
          ))}
        </View>

        <View style={[styles.hero, { backgroundColor: hex }]}>
          <Text style={[styles.heroTitle, { color: stats.textHex }]}>
            Sample headline
          </Text>
          <Text style={[styles.heroSub, { color: stats.textHex, opacity: 0.85 }]}>
            Foreground for contrast: {stats.textHex.toUpperCase()}
          </Text>
        </View>

        <Text style={styles.section}>METRICS</Text>
        <View style={styles.grid}>
          <Metric label="Relative luminance" value={stats.lum.toFixed(4)} />
          <Metric
            label="Contrast vs white"
            value={`${stats.cw.toFixed(2)}:1`}
          />
          <Metric
            label="Contrast vs black"
            value={`${stats.cb.toFixed(2)}:1`}
          />
          <Metric
            label="WCAG AA vs white"
            value={stats.aaW ? 'Yes' : 'No'}
          />
          <Metric
            label="WCAG AA vs black"
            value={stats.aaB ? 'Yes' : 'No'}
          />
          <Metric
            label="isLight(bg)"
            value={stats.isLight ? 'true' : 'false'}
          />
        </View>

        <Text style={styles.section}>USAGE</Text>
        <CodeBlock>{`import { adaptiveRgb, hexToRgb } from 'react-native-adaptive-text';

const rgb = hexToRgb('${hex}');
adaptiveRgb.relativeLuminance(rgb);
adaptiveRgb.contrastRatioWith(rgb, { r: 255, g: 255, b: 255 });
adaptiveRgb.meetsWcagWith(fg, bg, { level: 'aa' });
adaptiveRgb.adaptiveTextColor(rgb);`}</CodeBlock>
        <View style={{ height: 32 }} />
      </ScrollView>
    </DemoScreenChrome>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}): React.JSX.Element {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
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
    marginTop: 22,
    marginBottom: 10,
    color: 'rgba(255,255,255,0.3)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  swatchWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  swatchRing: { borderColor: '#A78BFA' },
  hero: {
    borderRadius: 16,
    padding: 20,
    marginTop: 4,
  },
  heroTitle: { fontSize: 20, fontWeight: '800' },
  heroSub: { marginTop: 8, fontSize: 13 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metric: {
    width: '47%',
    backgroundColor: cardSurface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  metricLabel: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  metricValue: {
    marginTop: 6,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
