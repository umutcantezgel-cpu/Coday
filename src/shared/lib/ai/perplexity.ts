/**
 * Perplexity API Integration
 * Used for web search capabilities in the chatbot
 */

const PERPLEXITY_API_KEY =
  import.meta.env.PERPLEXITY_API_KEY || '';

export interface PerplexityMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface PerplexityResponse {
  id: string;
  model: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  citations?: string[];
}

/**
 * Call Perplexity API for web-enhanced responses
 */
export async function callPerplexity(
  messages: PerplexityMessage[],
  options: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    searchDomainFilter?: string[];
  } = {}
): Promise<{ content: string; citations: string[] }> {
  const {
    model = 'llama-3.1-sonar-large-128k-online',
    temperature = 0.2,
    maxTokens = 2048,
    searchDomainFilter = [],
  } = options;

  const url = 'https://api.perplexity.ai/chat/completions';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        search_domain_filter: searchDomainFilter.length > 0 ? searchDomainFilter : undefined,
        return_citations: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Perplexity API error: ${response.status} - ${errorText}`);
    }

    const data: PerplexityResponse = await response.json();

    return {
      content: data.choices?.[0]?.message?.content || '',
      citations: data.citations || [],
    };
  } catch (error) {
    console.error('[Perplexity] API call failed:', error);
    throw error;
  }
}

/**
 * Search the web for specific information
 */
export async function searchWeb(query: string): Promise<{ content: string; citations: string[] }> {
  return callPerplexity([
    {
      role: 'system',
      content: 'Du bist ein hilfreicher Recherche-Assistent. Antworte präzise und auf Deutsch.',
    },
    {
      role: 'user',
      content: query,
    },
  ]);
}

export default { callPerplexity, searchWeb };
