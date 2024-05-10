import { MD3LightTheme, configureFonts } from "react-native-paper";


const baseFont = {
  fontFamily: 'Poppins-Regular',
} as const;

const baseVariants = configureFonts({ config: baseFont });

// Then, define custom fonts for different variants

const customVariants = {
  // Customize individual base variants:
  displayMedium: {
    ...baseVariants.displayMedium,
    fontFamily: 'Poppins-Bold',
  },

  // Add own tokens if required:
  bold: {
    ...baseVariants.bodyMedium,
    fontFamily: 'Poppins-Bold',
  },
  italic: {
    ...baseVariants.bodyMedium,
    fontFamily: 'Poppins-Italic',
  },
  boldItalic: {
    ...baseVariants.bodyMedium,
    fontFamily: 'Poppins-BoldItalic',
  },
} as const;


// Finally, merge base variants with your custom tokens
// and apply custom fonts to your theme.

const fonts = configureFonts({
  config: {
    ...baseVariants,
    ...customVariants,
  },
});

export const theme = {
  ...MD3LightTheme,
  myOwnProperty: true,
  fonts: fonts,
  "colors": {
    "primary": "rgb(0, 109, 67)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(142, 248, 187)",
    "onPrimaryContainer": "rgb(0, 33, 17)",
    "secondary": "rgb(43, 107, 41)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(173, 244, 161)",
    "onSecondaryContainer": "rgb(0, 34, 2)",
    "tertiary": "rgb(0, 97, 163)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(209, 228, 255)",
    "onTertiaryContainer": "rgb(0, 29, 54)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(251, 253, 248)",
    "onBackground": "rgb(25, 28, 26)",
    "surface": "rgb(251, 253, 248)",
    "onSurface": "rgb(25, 28, 26)",
    "surfaceVariant": "rgb(220, 229, 220)",
    "onSurfaceVariant": "rgb(64, 73, 66)",
    "outline": "rgb(113, 121, 114)",
    "outlineVariant": "rgb(192, 201, 192)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(46, 49, 46)",
    "inverseOnSurface": "rgb(240, 241, 237)",
    "inversePrimary": "rgb(114, 219, 161)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(238, 246, 239)",
      "level2": "rgb(231, 242, 234)",
      "level3": "rgb(223, 237, 228)",
      "level4": "rgb(221, 236, 226)",
      "level5": "rgb(216, 233, 223)"
    },
    "surfaceDisabled": "rgba(25, 28, 26, 0.12)",
    "onSurfaceDisabled": "rgba(25, 28, 26, 0.38)",
    "backdrop": "rgba(42, 50, 44, 0.4)"
  },

}

export default theme