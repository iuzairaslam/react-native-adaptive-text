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
  AdaptiveTextTheme,
  BLACK,
  ContrastAlgorithm,
  WHITE,
  adaptiveRgb,
  getAdaptiveColor,
  getApcaContrast,
  getContrastRatio,
  hexToRgb,
  meetsWcag,
  rgbToHex,
  useAdaptiveForegroundColor,
} from 'react-native-adaptive-text';
import { cardSurface } from './colors';
import { CodeBlock } from './CodeBlock';
import { DemoScreenChrome } from './DemoScreenChrome';

const BG_SWATCHES = [
  '#1A237E',
  '#4A148C',
  '#004D40',
  '#E65100',
  '#263238',
  '#F5F5F5',
  '#FFFDE7',
  '#E3F2FD',
] as const;

const THEME_PALETTE = ['#1565C0', '#C62828', '#2E7D32'] as const;

function ThemedGlyph(): React.JSX.Element {
  const hex = useAdaptiveForegroundColor();
  return (
    <Text style={[styles.glyph, { color: hex }]} accessible={false}>
      ★
    </Text>
  );
}

type Props = { onBack: () => void };

export default function WidgetDemoScreen({ onBack }: Props): React.JSX.Element {
  const [bg, setBg] = useState<string>(BG_SWATCHES[0]);
  const [algo, setAlgo] = useState<'wcag' | 'apca'>('wcag');
  const resolvedAlgo =
    algo === 'apca' ? ContrastAlgorithm.apca : ContrastAlgorithm.wcag;

  const metrics = useMemo(() => {
    const bgRgb = hexToRgb(bg);
    const fgRgb = getAdaptiveColor(bgRgb, { algorithm: resolvedAlgo });
    const ratio = getContrastRatio(fgRgb, bgRgb);
    const apcaLc = getApcaContrast(fgRgb, bgRgb);
    const label =
      fgRgb.r === WHITE.r && fgRgb.g === WHITE.g && fgRgb.b === WHITE.b
        ? 'White'
        : fgRgb.r === BLACK.r && fgRgb.g === BLACK.g && fgRgb.b === BLACK.b
          ? 'Black'
          : 'Swatch';
    return {
      bgRgb,
      fgRgb,
      ratio,
      apcaLc,
      label,
      aa: meetsWcag(fgRgb, bgRgb, { level: 'aa' }),
      aaa: meetsWcag(fgRgb, bgRgb, { level: 'aaa' }),
      isLightBg: adaptiveRgb.isLight(bgRgb),
    };
  }, [bg, resolvedAlgo]);

  return (
    <DemoScreenChrome title="AdaptiveText" onBack={onBack}>
      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.lead}>
          Pick a background and a contrast model. Foreground is black, white, or
          the best palette match — WCAG uses luminance ratio; APCA maximizes
          perceptual Lc.
        </Text>

        <Text style={styles.section}>CONTRAST MODEL</Text>
        <View style={styles.algoRow}>
          {(['wcag', 'apca'] as const).map((key) => (
            <Pressable
              key={key}
              onPress={() => setAlgo(key)}
              style={[styles.algoChip, algo === key && styles.algoChipOn]}>
              <Text
                style={[styles.algoChipText, algo === key && styles.algoChipTextOn]}>
                {key.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.section}>BACKGROUND</Text>
        <View style={styles.swatchWrap}>
          {BG_SWATCHES.map((hex) => (
            <Pressable
              key={hex}
              onPress={() => setBg(hex)}
              style={[
                styles.swatch,
                { backgroundColor: hex },
                bg === hex && styles.swatchRing,
              ]}
            />
          ))}
        </View>

        <View style={[styles.heroCard, { backgroundColor: bg }]}>
          <AdaptiveText
            backgroundColor={bg}
            algorithm={resolvedAlgo}
            style={styles.heroHeadline}>
            Readable at a glance
          </AdaptiveText>
          <AdaptiveText
            backgroundColor={bg}
            algorithm={resolvedAlgo}
            style={styles.heroSub}>
            Same component, any surface — no guessing text color.
          </AdaptiveText>
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeMuted}>WCAG</Text>
              <AdaptiveText
                backgroundColor={bg}
                algorithm={resolvedAlgo}
                style={styles.badgeValue}>
                {metrics.ratio.toFixed(2)}:1
              </AdaptiveText>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeMuted}>APCA Lc</Text>
              <AdaptiveText
                backgroundColor={bg}
                algorithm={resolvedAlgo}
                style={styles.badgeValue}>
                {metrics.apcaLc >= 0 ? '+' : ''}
                {metrics.apcaLc.toFixed(1)}
              </AdaptiveText>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeMuted}>AA</Text>
              <AdaptiveText
                backgroundColor={bg}
                algorithm={resolvedAlgo}
                style={styles.badgeValue}>
                {metrics.aa ? 'Pass' : 'Fail'}
              </AdaptiveText>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeMuted}>AAA</Text>
              <AdaptiveText
                backgroundColor={bg}
                algorithm={resolvedAlgo}
                style={styles.badgeValue}>
                {metrics.aaa ? 'Pass' : 'Fail'}
              </AdaptiveText>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeMuted}>BG</Text>
              <AdaptiveText
                backgroundColor={bg}
                algorithm={resolvedAlgo}
                style={styles.badgeValue}>
                {metrics.isLightBg ? 'Light' : 'Dark'}
              </AdaptiveText>
            </View>
          </View>
          <Text style={[styles.fgHint, { color: rgbToHex(metrics.fgRgb) }]}>
            Foreground ({algo.toUpperCase()}): {metrics.label} (
            {rgbToHex(metrics.fgRgb).toUpperCase()})
          </Text>
        </View>

        <Text style={styles.section}>SIZES</Text>
        {[12, 16, 20, 28].map((size) => (
          <AdaptiveText
            key={size}
            backgroundColor={bg}
            algorithm={resolvedAlgo}
            style={[styles.sizeLine, { fontSize: size }]}>
            AdaptiveText — {size}px
          </AdaptiveText>
        ))}

        <Text style={styles.section}>AdaptiveTextTheme</Text>
        <Text style={styles.para}>
          Children inherit background, optional palette, and algorithm from
          theme — pass them only once.
        </Text>
        <AdaptiveTextTheme
          backgroundColor={bg}
          algorithm={resolvedAlgo}>
          <View style={styles.themeCard}>
            <AdaptiveText style={styles.themeLine}>
              Themed line (no explicit backgroundColor)
            </AdaptiveText>
          </View>
        </AdaptiveTextTheme>

        <Text style={styles.section}>Theme + palette + hook</Text>
        <AdaptiveTextTheme
          backgroundColor={bg}
          palette={[...THEME_PALETTE]}
          algorithm={resolvedAlgo}>
          <View style={styles.themeCard}>
            <View style={styles.iconRow}>
              <ThemedGlyph />
              <AdaptiveText style={styles.themeLine}>
                Palette-aware + useAdaptiveForegroundColor()
              </AdaptiveText>
            </View>
          </View>
        </AdaptiveTextTheme>

        <Text style={styles.section}>USAGE</Text>
        <CodeBlock>{`import { AdaptiveText, ContrastAlgorithm } from 'react-native-adaptive-text';

<AdaptiveText
  backgroundColor="${bg}"
  algorithm={ContrastAlgorithm.${algo}}
>
  Your copy
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
    marginBottom: 20,
  },
  section: {
    marginTop: 22,
    marginBottom: 10,
    color: 'rgba(255,255,255,0.3)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  para: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10,
  },
  algoRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  algoChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: cardSurface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  algoChipOn: {
    borderColor: '#A78BFA',
    backgroundColor: 'rgba(167,139,250,0.12)',
  },
  algoChipText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  algoChipTextOn: { color: '#FFFFFF' },
  swatchWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  swatch: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  swatchRing: {
    borderColor: '#A78BFA',
  },
  heroCard: {
    borderRadius: 16,
    padding: 20,
    marginTop: 4,
  },
  heroHeadline: {
    fontSize: 22,
    fontWeight: '800',
  },
  heroSub: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.92,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    minWidth: 72,
  },
  badgeMuted: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  badgeValue: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '700',
  },
  fgHint: {
    marginTop: 14,
    fontSize: 11,
    fontWeight: '600',
    opacity: 0.85,
  },
  sizeLine: {
    fontWeight: '600',
    marginBottom: 6,
  },
  themeCard: {
    backgroundColor: cardSurface,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  themeLine: { fontSize: 14, fontWeight: '600' },
  iconRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  glyph: { fontSize: 22 },
});
