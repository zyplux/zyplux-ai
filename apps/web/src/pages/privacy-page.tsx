import { SubpageLayout } from '../components/layout/subpage-layout';
import { PRIVACY_PAGE } from '../content';

export const PrivacyPage = () => (
  <SubpageLayout>
    <h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-8'>
      <span className='text-gradient'>{PRIVACY_PAGE.headline}</span>
    </h1>
    <div className='space-y-4'>
      <p>{PRIVACY_PAGE.intro}</p>
      {PRIVACY_PAGE.sections.map(section => (
        <p key={section.lead}>
          <strong className='text-heading'>{section.lead}</strong> {section.body}
        </p>
      ))}
      <p>{PRIVACY_PAGE.closing}</p>
    </div>
  </SubpageLayout>
);
