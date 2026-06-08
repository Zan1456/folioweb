import type { RequestHandler } from '@sveltejs/kit';

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
type CacheEntry = { value: string; expiresAt: number };
let cliCache: CacheEntry | undefined;

export const GET: RequestHandler = async () => {
	const now = Date.now();

	if (cliCache && cliCache.expiresAt > now) {
		return new Response(JSON.stringify({ version: cliCache.value }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		console.log(`cli: miss!`);

		const cliURL = 'https://api.github.com/repos/CsPS0/folio-cli/releases';
		const req = await fetch(cliURL, { headers: { Accept: 'application/vnd.github+json' } });
		if (!req.ok) return new Response('Failed to fetch releases', { status: 502 });

		const resp = (await req.json()) as Array<{ tag_name?: string }>;
		const cliVersion = resp?.[0]?.tag_name ?? 'unknown';

		cliCache = { value: cliVersion, expiresAt: now + CACHE_TTL_MS };

		return new Response(JSON.stringify({ version: cliVersion }), {
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err) {
		console.error('getcliversion error:', err);
		return new Response(JSON.stringify({ version: 'unknown' }), {
			status: 502,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
