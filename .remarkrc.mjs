import { MDX_OPTIONS } from '@zyplux/mdx';
import remarkPresetLintRecommended from 'remark-preset-lint-recommended';

/**
@type {import('unified').Preset}
*/
const preset = { plugins: [...(MDX_OPTIONS.remarkPlugins ?? []), remarkPresetLintRecommended] };

export default preset;
