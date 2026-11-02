import type { LucideIcon } from 'lucide-react';
import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';

import { HeroShell, Timeline, TimelineItem } from '@zyplux/ui/blocks';
import { CardGrid, Section, SectionIntro } from '@zyplux/ui/layout';
import { cx } from '@zyplux/ui/lib/style';
import { Entrance, Reveal } from '@zyplux/ui/motion';
import { ButtonLink, Disclosure, FeatureCard, ShowcasePanel, StepCard } from '@zyplux/ui/primitives';
import { avatar, heading, pill, prose } from '@zyplux/ui/recipes';
import {
  ArrowRight,
  Check,
  Cpu,
  Crosshair,
  LayoutDashboard,
  Lock,
  Map,
  MousePointerClick,
  Plug,
  RefreshCw,
  Repeat,
  ScrollText,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  UserCheck,
  Workflow,
} from 'lucide-react';
import { createContext, use } from 'react';
import { isValidElement } from 'react';
import flattenChildren from 'react-keyed-flatten-children';

import type { AuditFormCopy } from '@/components/forms/audit-form';

import founderPhoto from '@/assets/founder.jpg';
import { AuditForm } from '@/components/forms/audit-form';
import { MiniDashboard } from '@/components/ui/mini-dashboard';
import { SystemMap as SystemMapDiagram } from '@/components/ui/system-map';
import { BRAND_NAME, BRAND_POSITIONING } from '@/site';

import { PROSE_COMPONENTS } from './prose-components';

const ICONS = {
  click: MousePointerClick,
  cpu: Cpu,
  crosshair: Crosshair,
  dashboard: LayoutDashboard,
  lock: Lock,
  log: ScrollText,
  loop: RefreshCw,
  map: Map,
  plug: Plug,
  repeat: Repeat,
  server: Server,
  shield: ShieldCheck,
  smartphone: Smartphone,
  user: UserCheck,
  workflow: Workflow,
} satisfies Record<string, LucideIcon>;

type IconName = keyof typeof ICONS;

const ChildIndexContext = createContext(0);

const indexChildren = (children: ReactNode) =>
  flattenChildren(children).map((child, index) =>
    isValidElement(child) ? (
      <ChildIndexContext key={child.key} value={index}>
        {child}
      </ChildIndexContext>
    ) : (
      child
    ),
  );

type HeroProps = {
  children: ReactNode;
  microcopy: string;
  primaryCta: string;
  secondaryCta: string;
};

const Hero = ({ children, microcopy, primaryCta, secondaryCta }: HeroProps) => (
  <HeroShell>
    <Entrance className={pill({ class: 'px-4 py-2 mb-8', tone: 'accent' })} scale={0.8} y={0}>
      <Sparkles className='h-4 w-4' />
      <span className='font-medium'>{BRAND_POSITIONING}</span>
    </Entrance>

    <Entrance delay={0.3}>
      <h1 className={heading({ class: 'mb-6', scale: 'hero' })}>
        <span className='text-gradient animate-shimmer bg-size-[200%_auto]'>{BRAND_NAME}</span>
      </h1>
    </Entrance>

    <Entrance delay={0.6}>
      <div className='text-lg md:text-xl text-muted mb-12 max-w-3xl mx-auto'>{children}</div>
    </Entrance>

    <Entrance delay={0.9}>
      <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
        <ButtonLink className='flex items-center gap-2' href='#audit'>
          {primaryCta}
          <ArrowRight className='h-5 w-5' />
        </ButtonLink>

        <ButtonLink href='#week' intent='secondary'>
          {secondaryCta}
        </ButtonLink>
      </div>
      <p className='mt-4 text-sm italic text-muted'>{microcopy}</p>
    </Entrance>
  </HeroShell>
);

const CARD_ROW_CAPACITY = 3;

type CardsProps = { children: ReactNode; narrow?: boolean };

const Cards = ({ children, narrow = false }: CardsProps) => (
  <CardGrid
    className={cx(
      narrow && 'max-w-4xl',
      flattenChildren(children).length > CARD_ROW_CAPACITY && 'md:grid-cols-2 lg:grid-cols-3',
    )}
  >
    {indexChildren(children)}
  </CardGrid>
);

type CardProps = {
  children?: ReactNode;
  icon: IconName;
  title: string;
};

const Card = ({ children, icon, title }: CardProps) => (
  <FeatureCard icon={ICONS[icon]} index={use(ChildIndexContext)} title={title}>
    {children}
  </FeatureCard>
);

type BuildCardProps = {
  children: ReactNode;
  customerFacing?: boolean;
  icon: IconName;
  outcome: string;
  surface: string;
  title: string;
};

const BuildCard = ({ children, customerFacing = false, icon, outcome, surface, title }: BuildCardProps) => (
  <FeatureCard
    eyebrow={
      <span className={pill({ class: 'mb-5 w-fit text-xs font-medium', tone: customerFacing ? 'violet' : 'accent' })}>
        {surface}
      </span>
    }
    footer={<p className={pill({ class: 'mt-auto rounded-lg py-2', tone: 'success' })}>{outcome}</p>}
    icon={ICONS[icon]}
    index={use(ChildIndexContext)}
    title={title}
  >
    {children}
  </FeatureCard>
);

type ChildrenProps = { children: ReactNode };

const Steps = ({ children }: ChildrenProps) => <CardGrid>{indexChildren(children)}</CardGrid>;

type StepProps = { children: ReactNode; title: string };

const Step = ({ children, title }: StepProps) => (
  <StepCard step={use(ChildIndexContext) + 1} title={title}>
    {children}
  </StepCard>
);

const Week = ({ children }: ChildrenProps) => (
  <Timeline className='mx-auto max-w-2xl'>
    {flattenChildren(children).map((child, index) =>
      isValidElement(child) ? (
        <TimelineItem index={index} key={child.key}>
          {child}
        </TimelineItem>
      ) : (
        child
      ),
    )}
  </Timeline>
);

type SceneProps = {
  children: ReactNode;
  status: string;
  timestamp: string;
  title: string;
};

const Scene = ({ children, status, timestamp, title }: SceneProps) => (
  <>
    <h3 className='text-xl md:text-2xl font-semibold mb-3'>
      <span className='text-accent'>{timestamp}</span>
      <span className='text-heading'> — {title}</span>
    </h3>
    <div className='text-muted mb-4'>{children}</div>
    <p className={pill({ tone: 'success' })}>
      <Check aria-hidden className='h-4 w-4' />
      {status}
    </p>
  </>
);

const Bridge = ({ children }: ChildrenProps) => (
  <Reveal className='mx-auto mt-20 max-w-2xl text-center'>
    <div className='text-muted'>{children}</div>
  </Reveal>
);

type ShowcaseProps = {
  caption: string;
  children: ReactNode;
  growthNote: string;
  question: string;
  title: string;
};

const Showcase = ({ caption, children, growthNote, question, title }: ShowcaseProps) => (
  <Reveal className='mx-auto mt-16 max-w-4xl'>
    <ShowcasePanel demo={<MiniDashboard caption={caption} growthNote={growthNote} question={question} />} title={title}>
      {children}
    </ShowcasePanel>
  </Reveal>
);

type SystemMapProps = { caption: string };

const SystemMap = ({ caption }: SystemMapProps) => (
  <Reveal className='mb-16'>
    <SystemMapDiagram
      content={{
        badge: BRAND_NAME,
        captionPending: 'by hand',
        captionResolved: 'runs itself',
        figcaption: caption,
        nodes: [{ label: 'Order' }, { label: 'Fulfil' }, { label: 'Invoice', snag: true }, { label: 'Cash' }],
      }}
    />
  </Reveal>
);

type FounderProps = { children: ReactNode; photoAlt: string };

const Founder = ({ children, photoAlt }: FounderProps) => (
  <Reveal className='flex flex-col items-center gap-8 md:flex-row md:items-start'>
    <img alt={photoAlt} className={avatar({ class: 'size-40 shrink-0' })} height={400} src={founderPhoto} width={400} />
    <div className={prose({ size: 'base' })}>{children}</div>
  </Reveal>
);

const Faq = ({ children }: ChildrenProps) => <div className='space-y-4'>{children}</div>;

type FaqItemProps = { children: ReactNode; question: string };

const FaqItem = ({ children, question }: FaqItemProps) => (
  <Reveal>
    <Disclosure summary={question}>{children}</Disclosure>
  </Reveal>
);

type CtaProps = { children: ReactNode; href: string };

const Cta = ({ children, href }: CtaProps) => (
  <Reveal className='mt-16 text-center'>
    <ButtonLink className='inline-block' href={href}>
      {children}
    </ButtonLink>
  </Reveal>
);

const AuditFormBlock = (copy: AuditFormCopy) => (
  <Reveal>
    <AuditForm {...copy} />
  </Reveal>
);

export const HOME_COMPONENTS = {
  ...PROSE_COMPONENTS,
  AuditForm: AuditFormBlock,
  Bridge,
  BuildCard,
  Card,
  Cards,
  Cta,
  Faq,
  FaqItem,
  Founder,
  Hero,
  Intro: SectionIntro,
  Scene,
  Section,
  Showcase,
  Step,
  Steps,
  SystemMap,
  Week,
} satisfies MDXComponents;

declare global {
  type MDXProvidedComponents = typeof HOME_COMPONENTS;
}
