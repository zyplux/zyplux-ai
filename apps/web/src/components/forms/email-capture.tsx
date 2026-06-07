import type { FormName } from '../../content';

import { FORM_MESSAGES } from '../../content';
import { HoneypotField, SubmitErrorNote, useHostedForm } from './hosted-form';

export const EmailCapture = ({
  button,
  emailLabel,
  formName,
}: {
  button: string;
  emailLabel: string;
  formName: FormName;
}) => {
  const { status, submit } = useHostedForm();

  if (status === 'sent') {
    return (
      <p className='rounded-xl border border-success/30 bg-success/10 p-6 text-success' role='status'>
        {FORM_MESSAGES.captureSuccess}
      </p>
    );
  }

  return (
    <form className='space-y-3' onSubmit={submit}>
      <input name='form' type='hidden' value={formName} />
      <HoneypotField />
      <div className='flex flex-col gap-3 sm:flex-row'>
        <label className='sr-only' htmlFor={`${formName}-email`}>
          {emailLabel}
        </label>
        <input
          className='flex-1 rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-accent'
          id={`${formName}-email`}
          name='email'
          placeholder='you@company.com'
          required
          type='email'
        />
        <button
          className='rounded-lg bg-accent px-7 py-3 font-semibold text-background shadow-lg shadow-accent/30 transition-shadow hover:shadow-xl hover:shadow-accent/45 disabled:opacity-60'
          disabled={status === 'sending'}
          type='submit'
        >
          {status === 'sending' ? FORM_MESSAGES.sending : button}
        </button>
      </div>
      {status === 'error' && <SubmitErrorNote />}
    </form>
  );
};
