import { EmailCapture } from '../components/forms/email-capture';
import { SubpageLayout } from '../components/layout/subpage-layout';
import { INSIGHTS_PAGE } from '../content';

export const InsightsPage = () => (
  <SubpageLayout>
    <h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-8'>
      <span className='text-gradient'>{INSIGHTS_PAGE.headline}</span>
    </h1>
    <div className='space-y-4 text-lg mb-10'>
      {INSIGHTS_PAGE.paragraphs.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
    <EmailCapture button={INSIGHTS_PAGE.button} emailLabel={INSIGHTS_PAGE.emailLabel} formName='insights-updates' />
  </SubpageLayout>
);
