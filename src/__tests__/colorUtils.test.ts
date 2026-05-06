import {
  ContrastAlgorithm,
  WHITE,
  getAdaptiveColor,
} from '../algorithm';
import {
  adaptiveTextHex,
  adaptiveTextHexFromRgb,
  colorValueToRgb,
  getExplicitColorFromStyle,
  hexToRgb,
  rgbToHex,
} from '../colorUtils';

describe('hexToRgb / rgbToHex', () => {
  it('parses #rgb', () => {
    expect(hexToRgb('#1a2')).toEqual({ r: 17, g: 170, b: 34 });
  });
  it('parses #rrggbb', () => {
    expect(hexToRgb('#1A237E')).toEqual({ r: 26, g: 35, b: 126 });
  });
  it('parses #rrggbbaa (drops alpha)', () => {
    expect(hexToRgb('#1A237EFF')).toEqual({ r: 26, g: 35, b: 126 });
  });
  it('round-trips', () => {
    const rgb = { r: 200, g: 10, b: 99 };
    expect(hexToRgb(rgbToHex(rgb))).toEqual(rgb);
  });
});

describe('colorValueToRgb (processColor path)', () => {
  it('parses named color via mocked processColor', () => {
    expect(colorValueToRgb('red')).toEqual({ r: 255, g: 0, b: 0 });
  });
  it('still parses #hex without processColor branch', () => {
    expect(colorValueToRgb('  #00FF00  ')).toEqual({ r: 0, g: 255, b: 0 });
  });
});

describe('adaptiveTextHex', () => {
  it('dark indigo background → white text hex', () => {
    expect(adaptiveTextHex('#1A237E').toLowerCase()).toBe(
      rgbToHex(WHITE).toLowerCase(),
    );
  });
  it('light yellow background → black text hex', () => {
    const black = getAdaptiveColor(hexToRgb('#FFEB3B'));
    expect(adaptiveTextHex('#FFEB3B').toLowerCase()).toBe(
      rgbToHex(black).toLowerCase(),
    );
  });
  it('respects palette (WCAG)', () => {
    const bg = '#E0E0E0';
    const palette = ['#1565C0', '#C62828'];
    const picked = getAdaptiveColor(hexToRgb(bg), {
      palette: palette.map(hexToRgb),
      algorithm: ContrastAlgorithm.wcag,
    });
    expect(adaptiveTextHex(bg, { palette })).toBe(rgbToHex(picked));
  });
  it('supports APCA algorithm flag', () => {
    const bg = '#121212';
    const h = adaptiveTextHex(bg, { algorithm: ContrastAlgorithm.apca });
    expect(h.startsWith('#')).toBe(true);
    expect(h.length).toBe(7);
  });
});

describe('adaptiveTextHexFromRgb', () => {
  it('matches adaptiveTextHex for same sRGB', () => {
    const rgb = hexToRgb('#004D40');
    expect(adaptiveTextHexFromRgb(rgb)).toBe(adaptiveTextHex('#004D40'));
  });
});

describe('getExplicitColorFromStyle', () => {
  it('returns undefined for empty style', () => {
    expect(getExplicitColorFromStyle(undefined)).toBeUndefined();
  });
  it('reads color from flat object', () => {
    expect(getExplicitColorFromStyle({ color: '#abc', fontSize: 12 })).toBe(
      '#abc',
    );
  });
  it('merges array styles last-wins', () => {
    expect(
      getExplicitColorFromStyle([{ color: 'red' }, { color: 'blue' }]),
    ).toBe('blue');
  });
});
