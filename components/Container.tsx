import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-[100px] ${className}`}>
      {children}
    </div>
  );
}
