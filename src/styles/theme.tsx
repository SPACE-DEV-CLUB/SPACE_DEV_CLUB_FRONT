import { css } from 'styled-components';

export const lightTheme = {
  MAIN: '#6868AD',
  SUB: '#e8e8fa',
  BACKGROUND: '#f8f9fa',
  CARD_BACKGROUND: '#fff',
  MAIN_FONT: '#202124', //rgb(52, 58, 64)
  SUB_FONT: '#495057',
  POINT_FONT: '#868E96',
  ICON: '#868E96',
  BORDER: '#adb6bd',
  TOGGLE_BACKGROUND: '#fcfcfc',
};

export type Theme = typeof lightTheme;

export const darkTheme: Theme = {
  MAIN: '#6868AD',
  SUB: '#e8e8fa',
  BACKGROUND: '#202124',
  CARD_BACKGROUND: '#1e1e1e',
  MAIN_FONT: 'rgba(255, 255, 255, 0.87)',
  SUB_FONT: 'rgba(255, 255, 255, 0.6)',
  POINT_FONT: '#868E96',
  ICON: '#868E96',
  BORDER: '#dae4ed', //수정 될 가능성 높음
  TOGGLE_BACKGROUND: '#3b3b3b',
};
