import { marked } from "marked";

interface MDViewerProps {
  title: string;
  contents: string;
}
export const MDviewr = ({ title, contents }: MDViewerProps) => {
  console.log(`marked(contents)`, marked(contents));
  return (
    <article>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(contents) }} />
    </article>
  );
};
