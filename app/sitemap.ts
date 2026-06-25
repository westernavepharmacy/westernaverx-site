import type { MetadataRoute } from "next";
import { POLICY_SLUGS, getAllProductHandles } from "@/lib/shopify";

const BASE = "https://westernaverx.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const pages = ["", "/home", "/shop", "/long-term-care", "/about", "/contact"];
  const policies = Object.keys(POLICY_SLUGS).map((slug) => `/policies/${slug}`);
  const weekly = new Set(["", "/home", "/shop"]);

  const staticEntries: MetadataRoute.Sitemap = [...pages, ...policies].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: weekly.has(path) ? "weekly" : "monthly",
    priority: path === "" ? 1 : weekly.has(path) ? 0.9 : 0.6,
  }));

  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const handles = await getAllProductHandles();
    productEntries = handles.map((h) => ({
      url: `${BASE}/products/${h}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch {
    productEntries = [];
  }

  return [...staticEntries, ...productEntries];
}
