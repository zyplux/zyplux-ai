import { expect, it } from './stories';

it('3.1.1 sends signup fields and displays success', async ({ app }) => {
  const submission = await app.sendForm({});
  expect(submission.status).toBe('sent');
  expect(submission.wasRequested).toBe(true);
  expect(submission.fields).toBeInstanceOf(FormData);
});

it('3.1.2 displays a server rejection', async ({ app }) => {
  const submission = await app.sendForm({ status: app.HTTP_BAD_REQUEST });
  expect(submission.status).toBe('error');
});

it('3.1.3 displays a network failure', async ({ app }) => {
  const submission = await app.sendForm({ isOffline: true });
  expect(submission.status).toBe('error');
});

it('3.1.4 quietly discards honeypot submissions', async ({ app }) => {
  const submission = await app.sendForm({ isHoneypot: true });
  expect(submission.status).toBe('sent');
  expect(submission.wasRequested).toBe(false);
});

it('3.2.1 reveals text progressively until complete', async ({ app }) => {
  const message = await app.typeShortMessage();
  expect(message.initial).toEqual({ revealed: false, typedText: '' });
  expect(message.partial).toEqual({ revealed: false, typedText: 'H' });
  expect(message.final).toEqual({ revealed: true, typedText: 'Hi' });
});

it('3.3.1 renders completed diagram and standalone card states', ({ app }) => {
  const markup = app.renderUiStates();
  for (const text of ['Plain content', 'Standalone feature', 'Try again', 'Thank you', 'Resolved', 'Done']) {
    expect(markup).toContain(text);
  }
});

it('3.3.2 positions the spotlight under the pointer', ({ app }) => {
  expect(app.moveSpotlight()).toEqual({ x: '1px', y: '1px' });
});

it('3.3.3 keeps paused counters and empty text static', ({ app }) => {
  expect(app.readStaticHooks()).toEqual({ count: 0, defaultCount: 0, message: { revealed: true, typedText: '' } });
});

it('3.3.4 rejects diagram primitives outside their context', ({ app }) => {
  expect(app.renderMissingDiagram).toThrow('useDiagramPhase must be used inside a <Diagram>');
});
