export function Link({ href, children, className = "" }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
