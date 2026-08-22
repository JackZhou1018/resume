const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
};

function jsonError(message, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return jsonError('Method not allowed', 405);
    }

    if (!env.OPENAI_API_KEY) {
      return jsonError('OPENAI_API_KEY is not configured', 500);
    }

    let payload;
    try {
      payload = await request.json();
    } catch (error) {
      return jsonError('Invalid JSON body', 400);
    }

    const text = String(payload.text || '').trim();
    const allowedVoices = new Set([
      'alloy', 'ash', 'ballad', 'coral', 'echo', 'fable', 'onyx',
      'nova', 'sage', 'shimmer', 'verse', 'marin', 'cedar'
    ]);
    const voice = allowedVoices.has(payload.voice) ? payload.voice : 'coral';
    const instructions = String(payload.instructions || '').slice(0, 600);

    if (!text) {
      return jsonError('Missing text', 400);
    }
    if (text.length > 600) {
      return jsonError('Text is too long', 413);
    }

    const openaiResponse = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini-tts',
        voice,
        input: text,
        instructions,
        response_format: 'mp3'
      })
    });

    if (!openaiResponse.ok) {
      const detail = await openaiResponse.text();
      return jsonError(`OpenAI TTS failed: ${detail.slice(0, 240)}`, openaiResponse.status);
    }

    return new Response(openaiResponse.body, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-store'
      }
    });
  }
};
