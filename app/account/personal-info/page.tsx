"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ExternalLink,
  LogOut,
  MapPin,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import AccountEmptyState from "@/app/account/components/AccountEmptyState";
import AddressEditorDialog from "@/app/account/components/AddressEditorDialog";
import {
  ADDRESS_STORAGE_KEY,
  PROFILE_STORAGE_KEY,
  demoAddress,
  demoProfile,
  readStoredAddress,
  readStoredProfile,
  writeStoredAddress,
  type AccountProfile,
  type DeliveryAddress,
} from "@/app/account/components/account-data";

const emptyAddress: DeliveryAddress = {
  country: "",
  state: "",
  localGovernmentArea: "",
  city: "",
  streetAddress: "",
  additionalDirections: "",
  googleMapsUrl: "",
};

function formatAddressValue(value?: string | null) {
  return value && value.trim() ? value.trim() : "Not provided";
}

export default function PersonalInfoPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [profile, setProfile] = useState<AccountProfile>(() => readStoredProfile());
  const [address, setAddress] = useState<DeliveryAddress | null>(() => readStoredAddress());
  const [isSavingAddress, setIsSavingAddress] = useState(false);

  const isAddressEditorOpen = searchParams.get("address") === "edit";

  const addressSummary = useMemo(() => {
    if (!address) {
      return [] as string[];
    }

    return [
      address.streetAddress,
      [address.city, address.state].filter(Boolean).join(", "),
      [address.localGovernmentArea, address.country]
        .filter(Boolean)
        .join(", "),
    ].filter(Boolean);
  }, [address]);

  const updateAddressParam = (isOpen: boolean) => {
    const url = new URL(window.location.href);

    if (isOpen) {
      url.searchParams.set("address", "edit");
    } else {
      url.searchParams.delete("address");
    }

    router.push(`${pathname}${url.search}${url.hash}`, { scroll: false });
  };

  const handleAddressSubmit = async (values: DeliveryAddress) => {
    setIsSavingAddress(true);

    try {
      const nextAddress = writeStoredAddress(values);
      setAddress(nextAddress);
      updateAddressParam(false);
    } finally {
      setIsSavingAddress(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(PROFILE_STORAGE_KEY);
      window.localStorage.removeItem(ADDRESS_STORAGE_KEY);
    }

    setProfile(demoProfile);
    setAddress(demoAddress);
    router.push("/");
  };

  return (
    <section aria-labelledby="personal-info-heading">
      <p className="eyebrow">Your account</p>
      <h1
        id="personal-info-heading"
        className="mt-2 font-heading text-3xl font-normal tracking-normal sm:text-4xl"
      >
        Personal Info
      </h1>

      <div className="mt-8 space-y-8">
        <section className="border border-black/10 bg-brand-white p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative size-20 overflow-hidden rounded-full border border-black/10 bg-neutral-100 sm:size-24">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt={`${profile.fullName || "Profile"} profile`} 
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center text-neutral-500">
                    <UserRound className="size-9 stroke-[1.2]" aria-hidden="true" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-600">
                  Account details
                </p>
                <h2 className="mt-2 font-heading text-3xl font-normal tracking-normal text-brand-black">
                  {profile.fullName || "Account holder"}
                </h2>
                <p className="mt-2 text-sm text-neutral-600">
                  {profile.email || "No email address saved yet."}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  {profile.isEmailVerified ? (
                    <>
                      <span className="inline-flex items-center gap-1 border border-success/30 bg-success-light px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-success-dark">
                        <CheckCircle2 className="size-3.5" aria-hidden="true" />
                        Verified
                      </span>
                    </>
                  ) : (
                    <span className="inline-flex items-center gap-1 border border-warning/30 bg-warning-light px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-warning-dark">
                      <ShieldCheck className="size-3.5" aria-hidden="true" />
                      Not verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-none border border-black/10 bg-brand-ivory px-3 py-2 text-xs uppercase tracking-[0.12em] text-neutral-600">
              Secure account
            </div>
          </div>
        </section>

        <section className="border border-black/10 bg-brand-white p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-neutral-600">
                Delivery address
              </p>
              <h2 className="mt-2 font-heading text-3xl font-normal tracking-normal">
                Default address
              </h2>
            </div>
            <button
              type="button"
              onClick={() => updateAddressParam(true)}
              className="inline-flex min-h-11 items-center justify-center border border-brand-black px-4 text-xs font-medium uppercase tracking-[0.12em] transition-colors hover:bg-brand-black hover:text-brand-white"
            >
              Edit address
            </button>
          </div>

          {address ? (
            <div className="mt-5 space-y-5">
              <div className="flex flex-col gap-3 border-b border-black/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2 text-sm font-medium text-brand-black">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand-bronze" aria-hidden="true" />
                  <span>{addressSummary.join(" · ") || "Address details ready to update."}</span>
                </div>
                {address.googleMapsUrl ? (
                  <a
                    href={address.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand-bronze underline-offset-4 hover:underline"
                  >
                    View location on Google Maps
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                ) : null}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <InfoBlock label="Country" value={formatAddressValue(address.country)} />
                <InfoBlock label="State" value={formatAddressValue(address.state)} />
                <InfoBlock
                  label="Local government area"
                  value={formatAddressValue(address.localGovernmentArea)}
                />
                <InfoBlock label="City / locality" value={formatAddressValue(address.city)} />
                <InfoBlock
                  label="Street address"
                  value={formatAddressValue(address.streetAddress)}
                  className="sm:col-span-2"
                />
                {address.additionalDirections ? (
                  <InfoBlock
                    label="Delivery notes"
                    value={formatAddressValue(address.additionalDirections)}
                    className="sm:col-span-2"
                  />
                ) : null}
              </div>
            </div>
          ) : (
            <div className="mt-5">
              <AccountEmptyState
                icon={MapPin}
                title="No delivery address saved yet"
                description="Add your delivery details so we know where your order should be sent."
              />
            </div>
          )}
        </section>

        <div className="border-t border-black/10 pt-5">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 border border-black/10 bg-brand-white px-4 py-3 text-xs font-medium uppercase tracking-[0.16em] text-brand-black transition-colors hover:bg-brand-black hover:text-brand-white"
          >
            <LogOut className="size-4" aria-hidden="true" />
            Log out
          </button>
        </div>
      </div>

      <AddressEditorDialog
        open={isAddressEditorOpen}
        initialValues={address ?? emptyAddress}
        isSaving={isSavingAddress}
        onClose={() => updateAddressParam(false)}
        onSubmit={handleAddressSubmit}
      />
    </section>
  );
}

type InfoBlockProps = {
  label: string;
  value: string;
  className?: string;
};

function InfoBlock({ label, value, className = "" }: InfoBlockProps) {
  return (
    <div className={`rounded-none border border-black/10 bg-brand-ivory p-3 ${className}`}>
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.12em] text-neutral-600">
        {label}
      </p>
      <p className="mt-2 text-sm text-brand-black">{value}</p>
    </div>
  );
}
