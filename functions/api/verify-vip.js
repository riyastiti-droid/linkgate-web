export async function onRequestPost({ request, env }) {
  try {
    const { key } = await request.json();
    const validKeys = (env.VIP_KEYS || '')
      .split(',')
      .map(k => k.trim())
      .filter(Boolean);

    if (!key || !validKeys.includes(key.trim())) {
      return Response.json(
        { valid: false, message: 'Invalid or expired VIP key.' },
        { status: 401 }
      );
    }

    return Response.json({
      valid: true,
      tier: 'VIP Member',
      sessionToken: crypto.randomUUID(),
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000
    });
  } catch {
    return Response.json({ valid: false, message: 'Bad request.' }, { status: 400 });
  }
}
