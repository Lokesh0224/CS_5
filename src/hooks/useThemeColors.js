import { useTheme } from '@/context/ThemeContext'

export const useThemeColors = () => {
  const { theme } = useTheme()

  return {
    // Background colors
    bgPrimary: theme === 'teal' ? 'teal.600' : 'black',
    bgSecondary: theme === 'teal' ? 'teal.50' : 'gray.900',
    bgTertiary: theme === 'teal' ? 'teal.100' : 'gray.800',
    bgCard: theme === 'teal' ? 'white' : 'gray.800',
    bgCardHover: theme === 'teal' ? 'gray.50' : 'gray.700',

    // Text colors
    textPrimary: theme === 'teal' ? 'gray.800' : 'white',
    textSecondary: theme === 'teal' ? 'gray.600' : 'gray.300',
    textOnPrimary: 'white',

    // Accent colors
    accentColor: theme === 'teal' ? 'orange.300' : 'gray.300',
    accentColorDark: theme === 'teal' ? 'orange.500' : 'gray.400',
    buttonPalette: theme === 'teal' ? 'orange' : 'grey.400',
    badgeColor: theme === 'teal' ? 'teal' : 'gray',

    // Border colors
    borderColor: theme === 'teal' ? 'gray.200' : 'gray.700',

    // Shadow
    shadow: theme === 'teal' ? 'md' : 'dark-lg',

    // Theme type
    isDark: theme === 'bw',
    isTeal: theme === 'teal',
  }
}
