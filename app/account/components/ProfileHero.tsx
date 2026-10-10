import ProfileAvatar from "@/app/account/components/ProfileAvatar";

type ProfileHeroProps = {
  fullName?: string | null;
  imageUrl?: string | null;
};

export default function ProfileHero({
  fullName,
  imageUrl,
}: ProfileHeroProps) {
  return (
    <section
      aria-label="Account profile"
      className="relative isolate flex min-h-[18rem] items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,var(--color-brand-white)_0%,var(--color-brand-ivory)_72%)] px-5 py-10 sm:min-h-[21rem]"
    >
      <span
        aria-hidden="true"
        className="engraved-wordmark pointer-events-none absolute left-1/2 top-1/2 max-w-full -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-heading text-[clamp(4.5rem,21vw,17rem)] leading-none tracking-[0.04em]"
      >
        ONRAVEL
      </span>

      <div className="relative z-10 flex max-w-full flex-col items-center text-center">
        <ProfileAvatar imageUrl={imageUrl} name={fullName} />
        {fullName ? (
          <h1 className="mt-4 max-w-full break-words font-heading text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-tight tracking-normal">
            {fullName}
          </h1>
        ) : (
          <p className="mt-4 text-sm text-neutral-600">
            Profile details will appear here when available.
          </p>
        )}
      </div>
    </section>
  );
}
