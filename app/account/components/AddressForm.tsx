"use client";

import { useState } from "react";
import { AlertCircle, MapPinned } from "lucide-react";
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js/max";
import SortDropdown, { type SortOption } from "@/app/components/ui/SortDropdown";
import type { DeliveryAddress } from "@/app/account/components/account-data";

type AddressFormProps = {
  initialValues: DeliveryAddress;
  submitLabel: string;
  isSubmitting?: boolean;
  onSubmit: (values: DeliveryAddress) => Promise<void> | void;
  onCancel: () => void;
};

const emptyAddress: DeliveryAddress = {
  country: "",
  state: "",
  localGovernmentArea: "",
  city: "",
  streetAddress: "",
  additionalDirections: "",
  googleMapsUrl: "",
};

type AddressCountry = {
  name: string;
  flag: string;
  isoCode: CountryCode;
  callingCode: string;
};

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });
const addressCountries: AddressCountry[] = getCountries()
  .map((isoCode) => ({
    name: countryNames.of(isoCode) ?? isoCode,
    flag: String.fromCodePoint(
      ...isoCode.split("").map((character) => 127397 + character.charCodeAt(0)),
    ),
    isoCode,
    callingCode: `+${getCountryCallingCode(isoCode)}`,
  }))
  .sort((first, second) => first.name.localeCompare(second.name));

const countryOptions: SortOption[] = [
  { label: "Select a country", value: "" },
  ...addressCountries.map((country) => ({
    label: `${country.flag} ${country.name} ${country.callingCode}`,
    value: country.isoCode,
  })),
];

function findInitialCountry(values: DeliveryAddress) {
  const storedCountryCode = addressCountries.find(
    (country) => country.isoCode === values.phoneCountryCode,
  );

  return (
    storedCountryCode ??
    addressCountries.find(
      (country) => country.name.toLowerCase() === values.country.trim().toLowerCase(),
    )
  );
}

function getInitialPhoneNumber(value?: string, countryCode?: CountryCode) {
  if (!value?.startsWith("+")) {
    return value ?? "";
  }

  const parsedNumber = parsePhoneNumberFromString(value);
  return parsedNumber && parsedNumber.country === countryCode
    ? parsedNumber.nationalNumber
    : value;
}

function isValidUrl(value: string) {
  if (!value.trim()) {
    return true;
  }

  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function AddressForm({
  initialValues,
  submitLabel,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: AddressFormProps) {
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    () => findInitialCountry(initialValues)?.isoCode ?? "",
  );
  const [values, setValues] = useState<DeliveryAddress>(() => {
    const country = findInitialCountry(initialValues);
    return {
      ...emptyAddress,
      ...initialValues,
      phoneNumber: getInitialPhoneNumber(initialValues.phoneNumber, country?.isoCode),
      phoneCountryCode: country?.isoCode ?? "",
      country: country?.name ?? initialValues.country,
    };
  });
  const [errors, setErrors] = useState<Partial<Record<keyof DeliveryAddress, string>>>({});
  const [submitError, setSubmitError] = useState("");

  const updateField = (
    field: keyof DeliveryAddress,
    value: string,
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError("");
  };

  const selectedCountry = addressCountries.find(
    (country) => country.isoCode === selectedCountryCode,
  );

  const handleCountryChange = (countryCode: string) => {
    const country = addressCountries.find((option) => option.isoCode === countryCode);
    setSelectedCountryCode(country?.isoCode ?? "");
    setValues((current) => ({
      ...current,
      country: country?.name ?? "",
      phoneCountryCode: country?.isoCode ?? "",
    }));
    setErrors((current) => ({
      ...current,
      country: undefined,
      phoneNumber: undefined,
    }));
    setSubmitError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof DeliveryAddress, string>> = {};
    const requiredFields: Array<keyof DeliveryAddress> = [
      "state",
      "localGovernmentArea",
      "city",
      "streetAddress",
    ];

    requiredFields.forEach((field) => {
      const value = values[field]?.trim();

      if (!value) {
        nextErrors[field] = "This field is required.";
      }
    });

    if (!selectedCountry) {
      nextErrors.country = "This field is required.";
    }

    const phoneNumber = values.phoneNumber?.trim() ?? "";
    const parsedPhoneNumber = selectedCountry
      ? parsePhoneNumberFromString(phoneNumber, {
          defaultCountry: selectedCountry.isoCode,
          extract: false,
        })
      : undefined;

    if (!selectedCountry) {
      nextErrors.phoneNumber = "Select a country before entering a phone number.";
    } else if (!phoneNumber) {
      nextErrors.phoneNumber = "This field is required.";
    } else if (
      !parsedPhoneNumber ||
      !parsedPhoneNumber.isValid() ||
      parsedPhoneNumber.country !== selectedCountry.isoCode
    ) {
      nextErrors.phoneNumber = `Enter a valid phone number for ${selectedCountry.name}.`;
    }

    if (values.googleMapsUrl && !isValidUrl(values.googleMapsUrl)) {
      nextErrors.googleMapsUrl = "Enter a valid http or https URL.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    try {
      setSubmitError("");
      await onSubmit({
        ...values,
        country: selectedCountry?.name ?? values.country.trim(),
        phoneCountryCode: selectedCountry?.isoCode,
        phoneNumber: parsedPhoneNumber?.number,
        state: values.state.trim(),
        localGovernmentArea: values.localGovernmentArea.trim(),
        city: values.city.trim(),
        streetAddress: values.streetAddress.trim(),
        additionalDirections: values.additionalDirections.trim(),
        googleMapsUrl: values.googleMapsUrl?.trim() || undefined,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to save your address right now. Please try again.";
      setSubmitError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <span className="mb-2 block text-sm font-medium text-brand-black">Country</span>
          <SortDropdown
            value={selectedCountryCode}
            onChange={handleCountryChange}
            options={countryOptions}
            label="Delivery country"
            className="!w-full min-w-0 appearance-none border border-black/10 bg-brand-white py-3 pl-3 pr-10 text-sm text-brand-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bronze"
          />
          {errors.country ? (
            <span className="mt-1.5 block text-xs text-error-dark">{errors.country}</span>
          ) : null}
        </div>
        <Field
          label="State"
          value={values.state}
          onChange={(value) => updateField("state", value)}
          error={errors.state}
          placeholder="Lagos State"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Local government area (LGA)"
          value={values.localGovernmentArea}
          onChange={(value) => updateField("localGovernmentArea", value)}
          error={errors.localGovernmentArea}
          placeholder="Eti-Osa"
        />
        <Field
          label="City / locality"
          value={values.city}
          onChange={(value) => updateField("city", value)}
          error={errors.city}
          placeholder="Lekki"
        />
      </div>

      <Field
        label="Street address"
        value={values.streetAddress}
        onChange={(value) => updateField("streetAddress", value)}
        error={errors.streetAddress}
        placeholder="12 Admiralty Way, Lekki Phase 1"
      />

      <Field
        label="Additional directions"
        value={values.additionalDirections}
        onChange={(value) => updateField("additionalDirections", value)}
        error={errors.additionalDirections}
        placeholder="Gate 4, call when you arrive, or leave with the security desk."
        multiline
      />

      <div>
        <label className="block text-sm text-brand-black">
          <span className="mb-2 block font-medium">Phone number</span>
          <div
            className={`flex min-h-[3.125rem] border bg-brand-white text-sm text-brand-black transition-colors focus-within:ring-2 focus-within:ring-brand-bronze ${
              errors.phoneNumber ? "border-error" : "border-black/10"
            }`}
          >
            <span
              className="inline-flex shrink-0 items-center border-r border-black/10 bg-brand-ivory px-3 text-sm"
              aria-label={selectedCountry ? `${selectedCountry.name} calling code` : "Calling code"}
            >
              {selectedCountry?.callingCode ?? "—"}
            </span>
            <input
              type="tel"
              autoComplete="tel-national"
              value={values.phoneNumber ?? ""}
              onChange={(event) => updateField("phoneNumber", event.target.value)}
              placeholder="Enter your phone number"
              aria-invalid={Boolean(errors.phoneNumber)}
              aria-describedby="delivery-phone-help delivery-phone-validation"
              className="min-w-0 flex-1 bg-transparent px-3 py-3 placeholder:text-neutral-500 focus-visible:outline-none"
            />
          </div>
        </label>
        <p id="delivery-phone-help" className="mt-2 text-xs leading-relaxed text-neutral-600">
          We use your phone number to coordinate deliveries and contact you about your order by
          phone or WhatsApp, helping us provide an excellent delivery experience.
        </p>
        <p className="mt-1 text-xs text-neutral-600">
          Format validation does not confirm that a number is active or reachable.
        </p>
        <div id="delivery-phone-validation" aria-live="polite">
          {errors.phoneNumber ? (
            <span className="mt-1.5 block text-xs text-error-dark">{errors.phoneNumber}</span>
          ) : null}
        </div>
      </div>

      <Field
        label="Google Maps URL (optional)"
        value={values.googleMapsUrl ?? ""}
        onChange={(value) => updateField("googleMapsUrl", value)}
        error={errors.googleMapsUrl}
        placeholder="https://maps.google.com/?q=..."
        icon={<MapPinned className="size-4 text-neutral-500" aria-hidden="true" />}
      />

      {submitError && (
        <div className="flex items-start gap-2 rounded-none border border-error/30 bg-error-light px-3 py-2 text-sm text-error-dark">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-black/10 pt-4 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex min-h-11 items-center justify-center border border-black/10 px-5 text-xs font-medium uppercase tracking-[0.16em] text-brand-black transition-colors hover:bg-black hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center bg-brand-black px-5 text-xs font-medium uppercase tracking-[0.16em] text-brand-white transition-colors hover:bg-brand-charcoal disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  multiline?: boolean;
  icon?: React.ReactNode;
};

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  multiline = false,
  icon,
}: FieldProps) {
  const sharedProps = {
    value,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(event.target.value),
    placeholder,
    className: `w-full border bg-brand-white px-3 py-3 text-sm text-brand-black transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bronze ${
      error ? "border-error" : "border-black/10"
    }`,
  };

  return (
    <label className="block text-sm text-brand-black">
      <span className="mb-2 block font-medium">{label}</span>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            {icon}
          </span>
        )}
        {multiline ? (
          <textarea
            {...sharedProps}
            rows={4}
            className={`${sharedProps.className} ${icon ? "pl-10" : ""}`}
          />
        ) : (
          <input
            {...sharedProps}
            type={label.toLowerCase().includes("url") ? "url" : "text"}
            className={`${sharedProps.className} ${icon ? "pl-10" : ""}`}
          />
        )}
      </div>
      {error ? (
        <span className="mt-1.5 block text-xs text-error-dark">{error}</span>
      ) : null}
    </label>
  );
}
