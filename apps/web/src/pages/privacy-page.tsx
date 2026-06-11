import { SubpageLayout } from '@/components/layout/subpage-layout';
import { PRIVACY_PAGE } from '@/content';

export const PrivacyPage = () => (
  <SubpageLayout>
    <h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-8'>
      <span className='text-gradient'>{PRIVACY_PAGE.headline}</span>
    </h1>
    <div className='space-y-4 [&_strong]:text-heading' dangerouslySetInnerHTML={{ __html: PRIVACY_PAGE.body }} />
  </SubpageLayout>
);
