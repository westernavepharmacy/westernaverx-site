import type { MetadataRoute } from "next";
import { POLICY_SLUGS } from "@/lib/shopify";

const BASE = "https://westernaverx.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/home", "/shop", "/long-term-care", "/about", "/contact"];
  const policies = Object.keys(POLICY_SLUGS).map((slug) => `/policies/${slug}`);
  const weekly = new Set(["", "/home", "/shop"]);

  return [...pages, ...policies].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: weekly.has(path) ? "weekly" : "monthly",
    priority: path === "" ? 1 : weekly.has(path) ? 0.9 : 0.6,
  }));
}
