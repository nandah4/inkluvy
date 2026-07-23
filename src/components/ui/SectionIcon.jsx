export default function SectionIcon({ icon: Icon, colorClass = "" }) {
  return (
    <div
      className={`flex size-9 shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-gradient-to-b to-white sm:size-10 ${colorClass}`}
    >
      <Icon className="size-4 sm:size-5" />
    </div>
  );
}
