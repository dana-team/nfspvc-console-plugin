import * as React from "react";

const Section: React.FC<{ label: string }> = ({ label, children }) => (
    <div>
        <div className="co-form-section__label">{label}</div>
        <div className="co-form-subsection">{children}</div>
    </div>
);

export default Section;