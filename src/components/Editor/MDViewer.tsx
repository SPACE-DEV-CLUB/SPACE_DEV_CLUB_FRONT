import { marked } from "marked";
import styles from "./editor.module.css";

interface MDViewerProps {
  title: string;
  contents: string;
}
export const MDviewr = ({ title, contents }: MDViewerProps) => {
  console.log(`contents`, contents);
  console.log(`marked(contents)`, marked(contents));
  return (
    <article className="styles.container editor">
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(contents) }} />
    </article>
  );
};
