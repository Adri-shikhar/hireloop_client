/**
 * Inline script to apply saved theme before React hydrates — prevents flash of wrong theme.
 */
export default function ThemeScript() {
  const script = `
    (function() {
      try {
        var t = localStorage.getItem('hireloop-theme') || 'dark';
        var resolved = t;
        if (t === 'system') {
          resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.setAttribute('data-theme', resolved);
        document.documentElement.style.colorScheme = resolved;
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
