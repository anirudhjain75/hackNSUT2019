import { DefaultTheme } from 'react-native-paper';
import { Theme } from './constants';
import styles from './styles';

export {
  Theme,
  styles
};

export const papertheme = {
  ...DefaultTheme,
  roundness: 3,
  dark: false,
  colors: {
    primary: Theme.blue,
    accent: Theme.accent,
    background: Theme.background,
    surface: Theme.surface,
    text: Theme.text,
    error: Theme.red,
    disabled: Theme.disabled,
    placeholder: Theme.placeholder,
    backdrop: Theme.backdrop
  }
};

export const formtheme = {
  ...DefaultTheme,
  roundness: 1,
  dark: false,
  colors: {
    primary: Theme.blue,
    accent: Theme.accent,
    background: '#fff',
    surface: Theme.surface,
    text: Theme.textDark,
    error: Theme.red,
    disabled: Theme.disabled,
    placeholder: Theme.placeholder,
    backdrop: Theme.backdrop
  }
};
