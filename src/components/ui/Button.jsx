export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-5 py-3 font-semibold text-white transition hover:bg-slate-700 focus-visible:outline focus-visible:outline-4 focus-visible:outline-accent-400 focus-visible:outline-offset-4 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
