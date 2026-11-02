import { cx as concatenate, type CVA, type CX, type CXOptions } from 'cva';
import { defineConfig } from 'cva/config';
import { extendTailwindMerge } from 'tailwind-merge';

const mergeThemeClasses = extendTailwindMerge<'text-gradient'>({
  extend: {
    classGroups: {
      animate: [{ animate: ['shimmer'] }],
      shadow: [{ shadow: ['glow'] }],
      'text-gradient': ['text-gradient'],
    },
  },
});

const styleConfig = defineConfig({ cx: (...inputs: CXOptions) => mergeThemeClasses(concatenate(...inputs)) });

export const cva: CVA = styleConfig.cva;
export const cx: CX = styleConfig.cx;
