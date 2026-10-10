import Image from "next/image";
import { UserRound } from "lucide-react";

type ProfileAvatarProps = {
  imageUrl?: string | null;
  name?: string | null;
};

export default function ProfileAvatar({
  imageUrl,
  name,
}: ProfileAvatarProps) {
  return (
    <div className="relative size-24 overflow-hidden rounded-full border-4 border-brand-ivory bg-brand-white shadow-[0_2px_12px_rgb(11_11_11_/_0.1)] sm:size-28">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name ? `${name} profile photo` : "Profile photo"}
          fill
          sizes="(max-width: 640px) 96px, 112px"
          unoptimized
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex size-full items-center justify-center text-neutral-500"
        >
          <UserRound className="size-10 stroke-[1.25] sm:size-12" />
        </div>
      )}
    </div>
  );
}
