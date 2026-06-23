<script lang="ts">
	import Buttons from '$lib/components/Buttons.svelte';
	import { onMount } from 'svelte';

	let cliVersion = '';

	onMount(async () => {
		try {
			const cached = localStorage.getItem('latestCliVersion');
			if (cached) cliVersion = cached;

			const resp = await fetch('/api/getcliversion');
			const data = await resp.json();
			if (data.version && data.version !== 'unknown') {
				cliVersion = data.version;
				localStorage.setItem('latestCliVersion', cliVersion);
			}
		} catch (err) {
			console.error('failed to fetch folio-cli version:', err);
		}
	});

	const projects = [
		{
			icon: 'ri:terminal-box-line',
			title: 'Folio CLI',
			author: 'CsPS',
			description: 'Parancssoros kliens a Folio-hoz, azoknak, akik a terminálból intéznék a tanulmányaikat.',
			url: 'https://github.com/CsPS0/folio-cli',
			version: () => cliVersion
		},
		{
			icon: 'ri:terminal-line',
			title: 'RozsdásFilc',
			author: 'jarjk',
			description: 'KRÉTA kliens Rust nyelven, gyors és könnyű, parancssori felülettel.',
			url: 'https://github.com/jarjk/rsfilc',
			version: null
		},
		{
			icon: 'ri:quill-pen-line',
			title: 'Firka',
			author: 'QwIT Development',
			description: 'A Folio elődje és a kiterjesztés alapja, amiből az egész projekt elindult.',
			url: 'https://github.com/qwIT-Development/firka',
			version: null
		},
		{
			icon: 'ri:computer-line',
			title: 'A Toll',
			author: 'Anasztázia',
			description:
				'Natív asztali KRÉTA kliens Windows, Linux és macOS rendszerre, jegyekkel, órarenddel és házi feladatokkal.',
			url: 'https://github.com/doomhyena/toll',
			version: null
		}
	];
</script>

<div class="main">
	<div class="title">
		<h2 class="font_web_h2">Közösségi projektek</h2>
		<p class="font_body_16px_regular subtitle">
			A KRÉTA körül kialakult közösség további projektjei
		</p>
	</div>
	<div class="cards">
		{#each projects as project}
			<div class="card">
				<div class="card-icon">
					<span class={project.icon.replace(':', '-')}></span>
				</div>
				<div class="card-body">
					<div class="card-header">
						<div class="title-row">
							<h2 class="font_web_h3">{project.title}</h2>
							{#if project.version && project.version()}
								<span class="font_body_12px_semibold version-pill">{project.version()}</span>
							{/if}
						</div>
						<p class="font_body_14px_regular author">Készítette: {project.author}</p>
						<p class="font_body_16px_regular">{project.description}</p>
					</div>
					<Buttons label="GitHub" type="small_secondary" href={project.url} icon="ri:github-fill"
					></Buttons>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	div.main {
		gap: 40px;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 820px;
	}

	.title {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.title h2 {
		color: var(--text_primary);
	}

	.subtitle {
		color: var(--text_secondary);
	}

	.cards {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		width: 100%;
	}

	/* M3 Filled Card */
	div.card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 24px;
		gap: 20px;
		border-radius: var(--shape-xl, 28px);
		background: var(--md-surface-container, var(--card_card));
		box-shadow: var(--elevation-1);
		flex: 0 1 calc(50% - 10px);
		min-width: 280px;
		transition: box-shadow 0.2s ease;
	}

	div.card:hover {
		box-shadow: var(--elevation-2);
	}

	.card-icon {
		width: 48px;
		height: 48px;
		border-radius: var(--shape-md, 12px);
		background: var(--md-primary-container, var(--accent_15));
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--md-on-primary-container, var(--accent_secondary));
		font-size: 22px;
		flex-shrink: 0;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 20px;
		flex: 1;
		width: 100%;
	}

	.card-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 6px;
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-wrap: wrap;
	}

	.card-header h2 {
		color: var(--text_primary);
	}

	.card-header p {
		color: var(--text_secondary);
	}

	.author {
		color: var(--text_teritary);
	}

	.version-pill {
		padding: 2px 10px;
		border-radius: var(--shape-full, 100px);
		background: var(--md-secondary-container, #CEE9DE);
		color: var(--md-on-secondary-container, var(--text_primary));
	}

	@media (max-width: 1540px) {
		div.main {
			align-items: center;
		}

		.title {
			text-align: center;
			align-items: center;
		}

		.cards {
			width: 90%;
			justify-content: center;
		}
	}

	@media (max-width: 825px) {
		.cards {
			width: 100%;
		}

		div.card {
			flex: 1 1 100%;
			width: 100%;
		}
	}
</style>
