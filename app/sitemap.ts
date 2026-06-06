import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://english-with-thalia.site";
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: baseUrl,
          el: `${baseUrl}/el`,
        },
      },
    },
    {
      url: `${baseUrl}/el`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: baseUrl,
          el: `${baseUrl}/el`,
        },
      },
    },
  ];
}
