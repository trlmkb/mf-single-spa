import React from "react";
import "./styles.css";

export default function Root(props) {
  return (
    <section className="homepage">
      I am <strong>[{props.name}]</strong> microfrontend
    </section>
  );
}
