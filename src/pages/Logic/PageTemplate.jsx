import PageBackground from "./PageBackground.jsx";
import PageHeader from "./PageHeader.jsx";
import BackButton from "./BackButton.jsx";
import "./ProjectPage.css";

export default function PageTemplate({ title, children }) {
  return (
    <PageBackground>
      <PageHeader
        title={title}
        leftComponent={<BackButton />}
      />

      <div className="page-template">
        <div className="page-content">
          {children}
        </div>
      </div>
    </PageBackground>
  );
}

