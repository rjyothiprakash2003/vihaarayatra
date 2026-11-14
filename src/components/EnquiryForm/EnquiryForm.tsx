import { useState, type FormEvent, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, MessageCircle } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { FORM_SUBMIT_EMAIL } from '@/config/forms';
import { buildWhatsAppUrl } from '@/utils/whatsapp';
import { Button } from '@/components/UI/Button';
import { cn } from '@/lib/cn';

interface FormFields {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  travellers: string;
  preferredDate: string;
  requirements: string;
}

type FieldKey = keyof FormFields;

const initialFields: FormFields = {
  fullName: '',
  email: '',
  phone: '',
  destination: '',
  travellers: '',
  preferredDate: '',
  requirements: '',
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

function buildWhatsAppEnquiryBody(fields: FormFields): string {
  const destLabel =
    destinations.find((d) => d.slug === fields.destination)?.name ?? fields.destination;

  const lines = [
    'Hello VihaaraYatra, I would like to submit a travel enquiry:',
    '',
    `Name: ${fields.fullName}`,
    `Email: ${fields.email}`,
    `Phone: ${fields.phone}`,
    `Destination: ${destLabel || 'Not specified'}`,
    `Travellers: ${fields.travellers}`,
  ];

  if (fields.preferredDate) lines.push(`Preferred travel date: ${fields.preferredDate}`);
  if (fields.requirements.trim()) lines.push(`Requirements: ${fields.requirements.trim()}`);

  return lines.join('\n');
}

function validate(fields: FormFields): Partial<Record<FieldKey, string>> {
  const errors: Partial<Record<FieldKey, string>> = {};

  if (!fields.fullName.trim()) errors.fullName = 'Please enter your full name.';
  if (!fields.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!fields.phone.trim()) errors.phone = 'Please enter a phone number with country code.';
  if (!fields.destination) errors.destination = 'Please select a destination.';
  if (!fields.travellers.trim()) {
    errors.travellers = 'Please enter the number of travellers.';
  } else if (!/^\d+$/.test(fields.travellers.trim()) || Number(fields.travellers) < 1) {
    errors.travellers = 'Enter a valid number of travellers (1 or more).';
  }

  return errors;
}

const fieldClass =
  'w-full rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-body shadow-sm transition-colors placeholder:text-muted/70 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20';

export function EnquiryForm({ className }: { className?: string }) {
  const [fields, setFields] = useState<FormFields>(initialFields);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [whatsappSent, setWhatsappSent] = useState(false);

  const update = (key: FieldKey, value: string) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submitViaWhatsApp = (body: string) => {
    const url = buildWhatsAppUrl(body);
    window.open(url, '_blank', 'noopener,noreferrer');
    setWhatsappSent(true);
    setStatus('success');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);
    setWhatsappSent(false);

    const nextErrors = validate(fields);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus('submitting');

    if (!FORM_SUBMIT_EMAIL) {
      submitViaWhatsApp(buildWhatsAppEnquiryBody(fields));
      return;
    }

    const destLabel =
      destinations.find((d) => d.slug === fields.destination)?.name ?? fields.destination;

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${FORM_SUBMIT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `VihaaraYatra enquiry - ${destLabel}`,
          _template: 'table',
          fullName: fields.fullName,
          email: fields.email,
          phone: fields.phone,
          destination: destLabel,
          travellers: fields.travellers,
          preferredDate: fields.preferredDate || 'Not specified',
          requirements: fields.requirements || 'None',
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to send enquiry. Please try WhatsApp instead.');
      }

      setStatus('success');
      setFields(initialFields);
    } catch {
      setStatus('error');
      setErrorMessage(
        'We could not send your enquiry by email. Please use WhatsApp - we typically respond fastest there.',
      );
    }
  };

  if (status === 'success') {
    return (
      <div
        className={cn(
          'rounded-2xl border border-teal/30 bg-white p-6 shadow-sm sm:p-8',
          className,
        )}
        role="status"
      >
        <div className="flex gap-3">
          <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-teal" aria-hidden />
          <div>
            <h3 className="font-display text-xl font-semibold text-navy">Enquiry received</h3>
            {whatsappSent || !FORM_SUBMIT_EMAIL ? (
              <p className="mt-2 text-muted">
                Your details have been prepared in WhatsApp. Send the message to complete your
                enquiry - our team will reply with availability and next steps.
              </p>
            ) : (
              <p className="mt-2 text-muted">
                Thank you - we have received your enquiry and will respond by email or phone
                shortly.
              </p>
            )}
            {!FORM_SUBMIT_EMAIL ? (
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                href={buildWhatsAppUrl(buildWhatsAppEnquiryBody(fields))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" aria-hidden />
                Open WhatsApp again
              </Button>
            ) : null}
            <button
              type="button"
              className="mt-4 block text-sm font-medium text-teal underline-offset-2 hover:underline"
              onClick={() => {
                setStatus('idle');
                setWhatsappSent(false);
              }}
            >
              Submit another enquiry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-5 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm sm:p-8', className)}
      noValidate
    >
      <header>
        <h3 className="font-display text-2xl font-semibold text-navy">Plan your trip</h3>
        <p className="mt-1 text-sm text-muted">
          Share a few details and we&apos;ll tailor options for your group.
          {!FORM_SUBMIT_EMAIL ? ' Enquiries are sent via WhatsApp for a quicker response.' : null}
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="fullName"
          label="Full name"
          required
          error={errors.fullName}
          className="sm:col-span-2"
        >
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            className={fieldClass}
            value={fields.fullName}
            onChange={(e) => update('fullName', e.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
          />
        </Field>

        <Field id="email" label="Email" required error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            value={fields.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </Field>

        <Field id="phone" label="Phone (with country code)" required error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            value={fields.phone}
            onChange={(e) => update('phone', e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
          />
        </Field>

        <Field id="destination" label="Destination" required error={errors.destination}>
          <select
            id="destination"
            name="destination"
            className={fieldClass}
            value={fields.destination}
            onChange={(e) => update('destination', e.target.value)}
            aria-invalid={Boolean(errors.destination)}
            aria-describedby={errors.destination ? 'destination-error' : undefined}
          >
            <option value="">Select a destination</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </Field>

        <Field id="travellers" label="Number of travellers" required error={errors.travellers}>
          <input
            id="travellers"
            name="travellers"
            type="number"
            min={1}
            className={fieldClass}
            value={fields.travellers}
            onChange={(e) => update('travellers', e.target.value)}
            aria-invalid={Boolean(errors.travellers)}
            aria-describedby={errors.travellers ? 'travellers-error' : undefined}
          />
        </Field>

        <Field id="preferredDate" label="Preferred travel date" className="sm:col-span-2">
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            className={fieldClass}
            value={fields.preferredDate}
            onChange={(e) => update('preferredDate', e.target.value)}
          />
        </Field>

        <Field id="requirements" label="Special requirements" className="sm:col-span-2">
          <textarea
            id="requirements"
            name="requirements"
            rows={4}
            className={cn(fieldClass, 'resize-y')}
            value={fields.requirements}
            onChange={(e) => update('requirements', e.target.value)}
            placeholder="Dietary needs, mobility access, hotel preferences, etc."
          />
        </Field>
      </div>

      {status === 'error' && errorMessage ? (
        <div className="flex gap-2 rounded-xl border border-sunset/40 bg-sunset/10 p-4 text-sm text-navy" role="alert">
          <AlertCircle className="size-5 shrink-0 text-sunset" aria-hidden />
          <div>
            <p>{errorMessage}</p>
            <Button
              variant="primary"
              size="sm"
              className="mt-3"
              href={buildWhatsAppUrl(buildWhatsAppEnquiryBody(fields))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" aria-hidden />
              Enquire on WhatsApp
            </Button>
          </div>
        </div>
      ) : null}

      <Button type="submit" variant="primary" size="lg" disabled={status === 'submitting'}>
        {status === 'submitting'
          ? 'Sending…'
          : FORM_SUBMIT_EMAIL
            ? 'Submit enquiry'
            : 'Continue on WhatsApp'}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required ? (
          <span className="text-sunset" aria-hidden>
            {' '}
            *
          </span>
        ) : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-sunset" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}