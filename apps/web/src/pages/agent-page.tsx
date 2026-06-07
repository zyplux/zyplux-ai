import { EmailCapture } from '../components/forms/email-capture';
import { SubpageLayout } from '../components/layout/subpage-layout';
import { AGENT_PAGE } from '../content';

export const AgentPage = () => (
  <SubpageLayout>
    <h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-8'>
      <span className='text-gradient'>{AGENT_PAGE.headline}</span>
    </h1>
    <div className='space-y-4 text-lg mb-10'>
      {AGENT_PAGE.paragraphs.map(paragraph => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
    <EmailCapture button={AGENT_PAGE.button} emailLabel={AGENT_PAGE.emailLabel} formName='agent-updates' />
  </SubpageLayout>
);
