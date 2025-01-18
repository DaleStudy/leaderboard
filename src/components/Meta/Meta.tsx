import { useEffect } from "react";

interface MetaProps {
  title: string;
  description?: string;
  url?: string;
}

export default function Meta({ title, description, url }: MetaProps) {
  useEffect(() => {
    document.title = title;
    setMetaTag("meta[property='og:title']", "og:title", title);

    if (description) {
      setMetaTag("meta[name='description']", "description", description);
      setMetaTag(
        "meta[property='og:description']",
        "og:description",
        description,
      );
    }

    if (url) {
      setMetaTag("meta[property='og:url']", "og:url", url);
    }
  }, [title, description, url]);

  return null;
}

function setMetaTag(selector: string, nameOrProperty: string, value: string) {
  let meta = document.querySelector(selector) as HTMLMetaElement;

  if (!meta) {
    meta = document.createElement("meta");

    if (selector.includes("property")) {
      meta.setAttribute("property", nameOrProperty);
    } else {
      meta.name = nameOrProperty;
    }

    document.head.appendChild(meta);
  }

  meta.content = value;
}
