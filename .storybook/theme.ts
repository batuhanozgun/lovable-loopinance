
import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  brandTitle: 'Loopinance UI',
  brandUrl: './',
  brandTarget: '_self',
  
  // UI
  appBg: '#F6F9FC',
  appContentBg: '#FFFFFF',
  appBorderColor: 'rgba(0,0,0,.1)',
  appBorderRadius: 4,
  
  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: 'monospace',
  
  // Colors
  colorPrimary: '#3b82f6',
  colorSecondary: '#1e293b',
});
