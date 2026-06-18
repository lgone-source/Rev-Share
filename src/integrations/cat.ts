import { RevShareEntry } from "../types";

// TODO: Replace mock data with real CAT API call once access is confirmed.
// Likely options:
//   1. REST API  → use CAT_API_URL + CAT_API_KEY from env
//   2. Direct DB → query the reporting replica
//   3. File export → parse CSV/Excel from S3 or Google Drive
export async function fetchRevShareData(
  partnerFilter?: string
): Promise<RevShareEntry[]> {
  const data = await getCATData();
  if (!partnerFilter) return data;
  const q = partnerFilter.toLowerCase();
  return data.filter((e) => e.partner.name.toLowerCase().includes(q));
}

async function getCATData(): Promise<RevShareEntry[]> {
  const catApiUrl = process.env.CAT_API_URL;
  const catApiKey = process.env.CAT_API_KEY;

  if (catApiUrl && catApiKey) {
    // Real CAT integration goes here once endpoint and auth are known.
    // Example:
    //   const res = await fetch(`${catApiUrl}/rev-share`, {
    //     headers: { Authorization: `Bearer ${catApiKey}` },
    //   });
    //   return res.json();
    throw new Error("CAT API integration not yet implemented. Remove this error once wired up.");
  }

  // Mock data — returned when CAT_API_URL / CAT_API_KEY are not set.
  const period = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(new Date());
  return [
    { partner: { id: "p1", name: "Partner Alpha" }, rate: 12.5, currency: "USD", period },
    { partner: { id: "p2", name: "Partner Beta" }, rate: 8.0, currency: "GBP", period },
    { partner: { id: "p3", name: "Partner Gamma" }, rate: 15.0, currency: "EUR", period },
    { partner: { id: "p4", name: "Partner Delta" }, rate: 10.25, currency: "USD", period },
  ];
}
