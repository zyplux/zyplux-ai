import { AUDIT_FORM, FORM_MESSAGES } from '../../content';
import { HoneypotField, SubmitErrorNote, useHostedForm } from './hosted-form';

const fieldClasses =
  'w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground transition-colors focus:border-accent';

export const AuditForm = () => {
  const { status, submit } = useHostedForm();

  if (status === 'sent') {
    return (
      <p className='rounded-xl border border-success/30 bg-success/10 p-6 text-success' role='status'>
        {FORM_MESSAGES.auditSuccess}
      </p>
    );
  }

  return (
    <form className='space-y-4 text-left' onSubmit={submit}>
      <input name='form' type='hidden' value='audit' />
      <HoneypotField />
      <label className='block'>
        <span className='mb-2 block text-sm font-medium text-heading'>{AUDIT_FORM.nameLabel}</span>
        <input className={fieldClasses} name='name' required type='text' />
      </label>
      <label className='block'>
        <span className='mb-2 block text-sm font-medium text-heading'>{AUDIT_FORM.emailLabel}</span>
        <input className={fieldClasses} name='email' required type='email' />
      </label>
      <label className='block'>
        <span className='mb-2 block text-sm font-medium text-heading'>{AUDIT_FORM.companyLabel}</span>
        <input className={fieldClasses} name='company' required type='text' />
      </label>
      <label className='block'>
        <span className='mb-2 block text-sm font-medium text-heading'>{AUDIT_FORM.taskLabel}</span>
        <textarea className={fieldClasses} name='task' rows={3} />
      </label>
      <button
        className='w-full rounded-lg bg-accent px-7 py-3.5 font-semibold text-background shadow-lg shadow-accent/30 transition-shadow hover:shadow-xl hover:shadow-accent/45 disabled:opacity-60'
        disabled={status === 'sending'}
        type='submit'
      >
        {status === 'sending' ? FORM_MESSAGES.sending : AUDIT_FORM.button}
      </button>
      {status === 'error' && <SubmitErrorNote />}
    </form>
  );
};
