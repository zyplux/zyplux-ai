import { act, cleanup, fireEvent, render, renderHook, waitFor } from '@testing-library/react';
import { TimelineItem } from '@zyplux/ui/blocks';
import { DiagramNode, DiagramPhaseContext, LoopRing, ResolveBadge, SpokeLine } from '@zyplux/ui/diagram';
import { HoneypotField, SubmitErrorNote, SubmitSuccessNote, useHostedForm } from '@zyplux/ui/forms';
import { useCountUp, useTypewriter } from '@zyplux/ui/hooks';
import { CardGrid } from '@zyplux/ui/layout';
import { cva, cx } from '@zyplux/ui/lib/style';
import { AnimatedBars, FeatureCard, SpotlightCard } from '@zyplux/ui/primitives';
import { PALETTE, TEXT_GRADIENT, toRgba } from '@zyplux/ui/tokens';
import { MotionConfig } from 'motion/react';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { vi } from 'vitest';
const STYLES_DIR = new URL('../../../packages/ui/src/styles/', import.meta.url);

const readCss = (file: string) => readFile(fileURLToPath(new URL(file, STYLES_DIR)), 'utf8');

const button = cva({
  base: 'rounded font-semibold',
  defaultVariants: { intent: 'primary' },
  variants: { intent: { primary: 'bg-accent', secondary: 'border' } },
});

const FormHarness = () => {
  const form = useHostedForm('/signup');
  return (
    <form aria-label='Signup' onSubmit={form.submit}>
      <HoneypotField />
      <input defaultValue='reader@example.com' name='email' />
      <output>{form.status}</output>
    </form>
  );
};

const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;

type SubmissionOptions = { isHoneypot?: boolean; isOffline?: boolean; status?: number };

const sendForm = async ({ isHoneypot = false, isOffline = false, status = HTTP_OK }: SubmissionOptions) => {
  const fetch = vi.fn<typeof globalThis.fetch>();
  if (isOffline) fetch.mockRejectedValue(new Error('Offline'));
  else fetch.mockResolvedValue(new Response('', { status }));
  vi.stubGlobal('fetch', fetch);
  const scene = render(createElement(FormHarness));
  try {
    const form = scene.getByRole('form');
    if (isHoneypot) fireEvent.change(scene.getByDisplayValue(''), { target: { value: 'spam' } });
    fireEvent.submit(form);
    await waitFor(() => {
      if (scene.getByRole('status').textContent === 'sending') throw new Error('Still sending');
    });
    return {
      fields: fetch.mock.calls[0]?.[1]?.body,
      status: scene.getByRole('status').textContent,
      wasRequested: fetch.mock.calls.length > 0,
    };
  } finally {
    cleanup();
    vi.unstubAllGlobals();
  }
};

const typeShortMessage = async () => {
  vi.useFakeTimers();
  const scene = renderHook(() => useTypewriter('Hi', { intervalMs: 1 }));
  try {
    const initial = scene.result.current;
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });
    const partial = scene.result.current;
    await act(async () => {
      await vi.advanceTimersByTimeAsync('Hi'.length);
    });
    return { final: scene.result.current, initial, partial };
  } finally {
    scene.unmount();
    vi.useRealTimers();
  }
};

const renderUiStates = () =>
  renderToStaticMarkup(
    <MotionConfig skipAnimations>
      <CardGrid>Plain content</CardGrid>
      <FeatureCard icon={undefined} title='Standalone feature' />
      <AnimatedBars bars={[{ id: 'pending', percent: 0 }]} revealed={false} />
      <AnimatedBars bars={[{ id: 'visible', percent: 0 }]} />
      <FeatureCard icon={undefined} title='Empty card' />
      <ol>
        <TimelineItem>First event</TimelineItem>
      </ol>
      <SubmitErrorNote>Try again</SubmitErrorNote>
      <SubmitSuccessNote>Thank you</SubmitSuccessNote>
      <svg>
        <DiagramPhaseContext value={{ drawn: true, resolved: true, still: false }}>
          <DiagramNode label='Resolved' snag x={0} y={0} />
          <LoopRing cx={0} cy={0} r={1} />
          <ResolveBadge label='Done' x={0} y={0} />
          <SpokeLine x1={0} x2={1} y1={0} y2={1} />
        </DiagramPhaseContext>
      </svg>
    </MotionConfig>,
  );

const moveSpotlight = () => {
  const scene = render(<SpotlightCard>Spotlight</SpotlightCard>);
  try {
    const card = scene.getByText('Spotlight').parentElement;
    if (!card) throw new Error('Missing spotlight card');
    fireEvent.mouseMove(card, { clientX: 1, clientY: 1 });
    return { x: card.style.getPropertyValue('--spot-x'), y: card.style.getPropertyValue('--spot-y') };
  } finally {
    cleanup();
  }
};

const readStaticHooks = () => {
  const scene = renderHook(() => ({
    count: useCountUp(0, { play: false }),
    defaultCount: useCountUp(0),
    message: useTypewriter(''),
  }));
  try {
    return scene.result.current;
  } finally {
    scene.unmount();
  }
};

const renderMissingDiagram = () => renderToStaticMarkup(<DiagramNode label='Invalid' x={0} y={0} />);

export const app = {
  button,
  cx,
  HTTP_BAD_REQUEST,
  moveSpotlight,
  PALETTE,
  readCss,
  readStaticHooks,
  renderMissingDiagram,
  renderUiStates,
  sendForm,
  TEXT_GRADIENT,
  toRgba,
  typeShortMessage,
};
