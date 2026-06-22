import type { MetadataRoute } from "next";
import { POLICY_SLUGS } from "@/lib/shopify";

const BASE = "https://westernaverx.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/shop", "/long-term-care", "/about", "/contact"];
  const policies = Object.keys(POLICY_SLUGS).map((slug) => `/policies/${slug}`);

  return [...pages, ...policies].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/shop" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/shop" ? 0.9 : 0.6,
  }));
}
