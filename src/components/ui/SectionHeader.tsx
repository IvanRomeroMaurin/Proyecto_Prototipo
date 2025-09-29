// components/ui/SectionHeader.tsx
import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
};

export default function SectionHeader({ title, subtitle, href, linkLabel }: Props) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-neutral-400">{subtitle}</p>}
      </div>
      {href && linkLabel && (
        <Link href={href} className="text-sm text-emerald-300 hover:text-emerald-200">
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
