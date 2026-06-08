export default function PageShell({ title, description, children }) {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="hireloop-stars fixed inset-0 pointer-events-none" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-base text-gray-400 sm:text-lg">{description}</p>
        )}
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}
