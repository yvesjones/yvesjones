import OpenAI from "openai";

function getClient() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export interface Opportunity {
  title: string;
  category: "festival" | "grant" | "radio" | "new_music";
  description: string;
  deadline: string | null;
  link: string | null;
}

export function stripHtml(html: string): string {
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export async function extractOpportunities(
  text: string,
): Promise<Opportunity[]> {
  const truncated = text.slice(0, 12000);

  const response = await getClient().chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `You extract music opportunities from web page text. Return a JSON object with an "opportunities" key containing an array of objects. Each object must have:
- "title": string (name of the opportunity)
- "category": one of "festival", "grant", "radio", "new_music"
- "description": string (brief summary)
- "deadline": string or null (application deadline if mentioned)
- "link": string or null (URL if mentioned in the text)

Categories:
- "festival": festival lineups, open calls, performance slots
- "grant": grants, funding, financial awards for musicians
- "radio": radio play opportunities, playlist submissions, radio shows
- "new_music": general music opportunities, competitions, showcases, residencies

If no opportunities are found, return {"opportunities": []}.`,
      },
      {
        role: "user",
        content: truncated,
      },
    ],
  });

  const content = response.choices[0]?.message?.content;
  if (!content) return [];

  try {
    const parsed = JSON.parse(content);
    return Array.isArray(parsed.opportunities) ? parsed.opportunities : [];
  } catch {
    return [];
  }
}
