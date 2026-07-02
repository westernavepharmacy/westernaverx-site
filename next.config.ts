import type { NextConfig } from "next";

// Legacy product URLs from the 2026-07 duplicate-listing merge (33 pairs)
const MERGED_PRODUCT_REDIRECTS = [
      { source: "/products/durex-extra-sensitive-condoms-3-ct", destination: "/products/durex-extra-sensitive-thin-lubricated-condoms-3-count", permanent: true },
      { source: "/products/trojan-enz-non-lubricated-condoms-3-ct", destination: "/products/trojan-original-lubricant-free-condoms-3-count-formerly-enz", permanent: true },
      { source: "/products/trojan-magnum-large-condoms-3-ct", destination: "/products/trojan-magnum-large-size-lubricated-condoms-3-count", permanent: true },
      { source: "/products/trojan-bareskin-raw-condoms-3-ct", destination: "/products/trojan-raw-lubricated-condoms-americas-thinnest-latex-condom-3-count", permanent: true },
      { source: "/products/lifestyles-skyn-non-latex-condoms-3-ct", destination: "/products/skyn-original-non-latex-lubricated-condoms-3-count", permanent: true },
      { source: "/products/advanced-early-result-pregnancy-test-3-ct-gnp", destination: "/products/good-neighbor-pharmacy-early-result-pregnancy-test-3-tests", permanent: true },
      { source: "/products/one-step-pregnancy-test-2-ct-gnp", destination: "/products/good-neighbor-pharmacy-one-step-pregnancy-test-2-tests", permanent: true },
      { source: "/products/bengay-ultra-strength-pain-relief-cream-4-oz", destination: "/products/bengay-ultra-strength-topical-analgesic-cream-4-oz-113-g", permanent: true },
      { source: "/products/diphenhydramine-hcl-50-mg-allergy-capsules-100-ct", destination: "/products/diphenhydramine-hcl-50-mg-capsules-antihistamine-100-capsules", permanent: true },
      { source: "/products/banophen-allergy-diphenhydramine-25-mg-100-ct", destination: "/products/major-banophen-diphenhydramine-hcl-25-mg-antihistamine-100-minitabs", permanent: true },
      { source: "/products/afrin-no-drip-severe-congestion-menthol-15-ml", destination: "/products/afrin-no-drip-severe-congestion-nasal-pump-mist-plus-menthol-1-2-fl-oz-15-ml", permanent: true },
      { source: "/products/afrin-original-nasal-spray-15-ml", destination: "/products/afrin-original-nasal-spray-oxymetazoline-hcl-1-2-fl-oz-15-ml", permanent: true },
      { source: "/products/aspercreme-lidocaine-pain-patches-5-ct", destination: "/products/aspercreme-with-4-lidocaine-pain-relieving-patch-max-strength-large-6-patches", permanent: true },
      { source: "/products/salonpas-lidocaine-4-pain-patches-6-ct", destination: "/products/salonpas-lidocaine-4-pain-relieving-gel-patch-maximum-otc-strength-6-patches", permanent: true },
      { source: "/products/salonpas-pain-relieving-patches-20-ct", destination: "/products/salonpas-pain-relieving-patch-20-patches", permanent: true },
      { source: "/products/lidocaine-4-pain-relief-patches-5-ct", destination: "/products/bluepoint-lidocaine-pain-relieving-patch-topical-anesthetic-4-5-patches", permanent: true },
      { source: "/products/preservision-areds-2-eye-vitamin-softgels-120-ct", destination: "/products/preservision-areds-2-formula-mini-soft-gels-120-count", permanent: true },
      { source: "/products/systane-ultra-lubricant-eye-drops-10-ml", destination: "/products/systane-ultra-lubricant-eye-drops-fast-acting-dry-eye-relief-10-ml", permanent: true },
      { source: "/products/ketotifen-eye-itch-relief-drops-0-025-5-ml", destination: "/products/rugby-eye-itch-relief-ketotifen-antihistamine-eye-drops-0-025-0-17-fl-oz-5-ml", permanent: true },
      { source: "/products/midol-complete-gelcaps-24-ct", destination: "/products/midol-complete-multi-symptom-relief-24-gelcaps", permanent: true },
      { source: "/products/excedrin-extra-strength-caplets-24-ct", destination: "/products/excedrin-extra-strength-pain-reliever-24-caplets", permanent: true },
      { source: "/products/mucinex-dm-max-strength-14-ct", destination: "/products/mucinex-dm-maximum-strength-12-hour-dextromethorphan-60-mg-guaifenesin-1200-mg-14-tablets", permanent: true },
      { source: "/products/cetirizine-hcl-10-mg-allergy-tablets-30-ct", destination: "/products/bluepoint-allergy-cetirizine-hydrochloride-tablets-usp-10-mg-30-tablets", permanent: true },
      { source: "/products/theraflu-max-strength-daytime-relief-powder-6-ct", destination: "/products/theraflu-flu-relief-max-strength-daytime-honey-lemon-6-packets", permanent: true },
      { source: "/products/theraflu-max-strength-nighttime-relief-powder-6-ct", destination: "/products/theraflu-flu-relief-max-strength-nighttime-honey-lemon-6-packets", permanent: true },
      { source: "/products/fluticasone-24-hour-allergy-nasal-spray-11-1-ml-gnp", destination: "/products/good-neighbor-pharmacy-fluticasone-propionate-nasal-spray-50-mcg-72-metered-sprays-0-38-fl-oz", permanent: true },
      { source: "/products/nasal-decongestant-no-drip-spray-0-05-30-ml-gnp", destination: "/products/major-maximum-strength-nasal-decongestant-spray-no-drip-oxymetazoline-hcl-0-05-1-fl-oz-30-ml", permanent: true },
      { source: "/products/nasal-decongestant-spray-0-05-15-ml-gnp", destination: "/products/major-maximum-strength-nasal-decongestant-spray-oxymetazoline-hcl-0-05-1-2-fl-oz-15-ml", permanent: true },
      { source: "/products/ricola-original-herb-cough-drops-21-ct", destination: "/products/ricola-original-herb-cough-drops-21-drops", permanent: true },
      { source: "/products/ricola-berry-medley-cough-drops-19-ct", destination: "/products/ricola-berry-medley-throat-drops-19-drops", permanent: true },
      { source: "/products/germ-x-original-hand-sanitizer-8-oz", destination: "/products/germ-x-original-moisturizing-hand-sanitizer-with-vitamin-e-8-fl-oz-236-ml", permanent: true },
      { source: "/products/pink-bismuth-stomach-relief-liquid-4-oz-gnp", destination: "/products/good-neighbor-pharmacy-stomach-relief-original-strength-4-fl-oz", permanent: true },
      { source: "/products/loratadine-10-mg-allergy-tablets-30-ct", destination: "/products/bluepoint-loratadine-tablets-usp-10-mg-non-drowsy-24-hour-allergy-30-tablets", permanent: true },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  async redirects() {
    return MERGED_PRODUCT_REDIRECTS;
  },
};

export default nextConfig;
