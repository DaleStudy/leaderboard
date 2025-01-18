import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  url?: string;
  image?: string;
}

export default function Seo({ title, description, url, image }: SeoProps) {
  useEffect(() => {
    document.title = title;

    if (description) {
      let meta = document.querySelector(
        "meta[name='description']",
      ) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    if (url) {
      let ogUrl = document.querySelector(
        "meta[property='og:url']",
      ) as HTMLMetaElement;

      if (!ogUrl) {
        ogUrl = document.createElement("meta");
        ogUrl.setAttribute("property", "og:url");
        document.head.appendChild(ogUrl);
      }
      ogUrl.content = url;
    }
  }, [title, description, url, image]);

  return null;
}
