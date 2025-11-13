
export default function Card({ children, className = '' }) {
  return <div className={`glass-panel p-4 sm:p-5 ${className}`}>{children}</div>;
}
