import { EmailCapture as EmailCaptureForm } from '@zyplux/ui/forms';
import { SubmitSuccessNote } from '@zyplux/ui/forms';

import { FORM_ENDPOINT } from '@/config';
import { FORM_MESSAGES } from '@/site';

import { FormErrorNote } from './form-notes';

type EmailCaptureProps = {
  button: string;
  emailLabel: string;
  formName: FormName;
};

type FormName = 'agent-updates' | 'audit' | 'insights-updates';

export const EmailCapture = ({ button, emailLabel, formName }: EmailCaptureProps) => (
  <EmailCaptureForm
    buttonLabel={button}
    emailLabel={emailLabel}
    endpoint={FORM_ENDPOINT}
    error={<FormErrorNote />}
    formName={formName}
    placeholder={FORM_MESSAGES.emailPlaceholder}
    sendingLabel={FORM_MESSAGES.sending}
    success={<SubmitSuccessNote>{FORM_MESSAGES.captureSuccess}</SubmitSuccessNote>}
  />
);
