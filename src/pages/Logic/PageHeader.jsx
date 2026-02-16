export default function PageHeader({ title, leftComponent = null }) {
  return (
    <header className="page-header">
      <div className="page-header-left">
        {leftComponent}
      </div>

      <div className="page-header-title">
        {title}
      </div>
    </header>
  );
}
