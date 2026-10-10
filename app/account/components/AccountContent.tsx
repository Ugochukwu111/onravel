import type { ReactNode } from "react";

type AccountContentProps = {
  children: ReactNode;
};

export default function AccountContent({ children }: AccountContentProps) {
  return (
    <div className="container w-full flex-1 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-4xl">{children}</div>
    </div>
  );
}
