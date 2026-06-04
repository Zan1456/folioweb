<script lang="ts">
	import '$lib/global.css';
	import Buttons from '$lib/components/Buttons.svelte';
	import { onMount } from 'svelte';
	import { checkCache, downloadsClient } from '$lib/downloadsClient';

	let appVersion = '1.0.9';

	$: appDownloadLinks = {
		arm64: `https://github.com/Zan1456/folio/releases/download/${appVersion}/app-arm64-v8a-github-release.apk`,
		armeabi: `https://github.com/Zan1456/folio/releases/download/${appVersion}/app-armeabi-v7a-github-release.apk`
	};

	const staticLinks = {
		chromestore: 'https://chromewebstore.google.com/detail/firxa/emafoaifbfppcccgfmpcoheonhjnpldj',
		firefox: 'https://addons.mozilla.org/hu/firefox/addon/firxa/'
	};

	onMount(async () => {
		checkCache();
		const versions = await downloadsClient();
		if (versions.appVersion && versions.appVersion !== 'unknown') {
			appVersion = versions.appVersion;
		}
	});

	let showToast = false;
	let toastMessage = '';
	let toastTimeout: any;

	function copyCommand(cmd: string) {
		navigator.clipboard.writeText(cmd);
		toastMessage = cmd;
		showToast = true;
		if (toastTimeout) clearTimeout(toastTimeout);
		toastTimeout = setTimeout(() => {
			showToast = false;
		}, 3000);
	}
</script>

<div class="main" id="anchor-downloads">
	<div class="title">
		<h2 class="font_web_h2">Töltsd le a Folio-t</h2>
		<p class="font_body_16px_regular">
			A mobil app elérhető Android telefonokon, a kedvenc böngésződbe letöltheted a bővítményt, a számítógéped termináljába a Folio CLI-t, és már készül az Asztali Alkalmazás is!
		</p>
	</div>
	<div class="cards">
		<div class="card">
			<div class="card-header">
				<div class="card-icon">
					<span class="ri-smartphone-line"></span>
				</div>
				<div>
					<h2 class="font_header_h2">Alkalmazás</h2>
					<p class="font_body_14px_regular version" id="app-ver"></p>
				</div>
			</div>
			<div class="divider"></div>
			<div class="card-section">
				<p class="font_header_14px label">Android</p>
				<div class="section-buttons">
					<Buttons
						label="Google Play"
						type="small_secondary"
						icon="ri:google-play-fill"
						disabled={true}
					></Buttons>
				</div>
				<div class="section-buttons">
					<Buttons
						id="arm64"
						label="arm64.apk"
						type="small_secondary"
						icon="/apk.svg"
						href={appDownloadLinks.arm64}
					></Buttons>
					<Buttons
						id="armeabi"
						label="armeabi.apk"
						type="small_secondary"
						icon="/apk.svg"
						href={appDownloadLinks.armeabi}
					></Buttons>
				</div>
			</div>
			<div class="card-section">
				<p class="font_header_14px label">Forráskód</p>
				<div class="section-buttons">
					<Buttons label="GitHub" href="https://github.com/Zan1456/folio" icon="ri:github-fill"></Buttons>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<div class="card-icon">
					<span class="ri-puzzle-line"></span>
				</div>
				<div>
					<h2 class="font_header_h2">Bővítmény</h2>
					<p class="font_body_14px_regular version" id="ext-ver"></p>
				</div>
			</div>
			<div class="divider"></div>
			<div class="card-section">
				<p class="font_header_14px label">Chromium (Chrome, Edge, stb.)</p>
				<div class="section-buttons">
					<Buttons
						label="Chrome Web Store"
						type="small_secondary"
						icon="ri:chrome-fill"
						href={staticLinks.chromestore}
					></Buttons>
				</div>
			</div>
			<div class="card-section">
				<p class="font_header_14px label">Firefox</p>
				<div class="section-buttons">
					<Buttons
						label="Firefox Add-ons"
						type="small_secondary"
						icon="ri:firefox-browser-fill"
						href={staticLinks.firefox}
						disabled={true}
					></Buttons>
				</div>
			</div>
			<div class="card-section">
				<p class="font_header_14px label">Forráskód</p>
				<div class="section-buttons">
					<Buttons label="GitHub" href="https://github.com/Zan1456/folio-extension" icon="ri:github-fill"></Buttons>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<div class="card-icon">
					<span class="ri-terminal-box-line"></span>
				</div>
				<div>
					<h2 class="font_header_h2">CLI</h2>
					<p class="font_body_14px_regular version" id="cli-ver">v1.0.5</p>
				</div>
			</div>
			<div class="divider"></div>
			<div class="card-section">
				<p class="font_header_14px label">Windows, Linux, Mac (Kattints a másoláshoz)</p>
				<div class="section-buttons">
					<Buttons
						label="Scoop"
						type="small_secondary"
						icon="ri:windows-fill"
						on:click={() => copyCommand('scoop bucket add folio https://github.com/CsPS0/folio-cli && scoop install folio')}
					></Buttons>
					<Buttons
						label="APT"
						type="small_secondary"
						icon="ri:ubuntu-fill"
						on:click={() => copyCommand('sudo apt update && sudo apt install folio-cli')}
					></Buttons>
					<Buttons
						label="AUR"
						type="small_secondary"
						icon="https://cdn.simpleicons.org/archlinux"
						on:click={() => copyCommand('yay -S folio-cli-bin')}
					></Buttons>
					<Buttons
						label="Brew"
						type="small_secondary"
						icon="ri:apple-fill"
						on:click={() => copyCommand('brew tap CsPS0/tap && brew install folio-cli')}
					></Buttons>
				</div>
			</div>
			<div class="card-section">
				<p class="font_header_14px label">Forráskód</p>
				<div class="section-buttons">
					<Buttons label="GitHub" href="https://github.com/CsPS0/folio-cli" icon="ri:github-fill"></Buttons>
				</div>
			</div>
		</div>

		<div class="card" style="filter: grayscale(1); opacity: 0.7; pointer-events: none;">
			<div class="card-header">
				<div class="card-icon">
					<span class="ri-computer-line"></span>
				</div>
				<div>
					<h2 class="font_header_h2">Asztali Alkalmazás</h2>
					<p class="font_body_14px_regular version" id="desktop-ver">Hamarosan...</p>
				</div>
			</div>
			<div class="divider"></div>
			<div class="card-section">
				<p class="font_header_14px label">Windows, Linux, Mac</p>
				<div class="section-buttons">
					<Buttons
						label="Készülőben"
						type="small_secondary"
						icon="ri:time-line"
						disabled={true}
					></Buttons>
				</div>
			</div>
		</div>
	</div>
</div>

{#if showToast}
	<div class="toast">
		<span class="ri-check-line toast-icon"></span>
		<div class="toast-content">
			<p class="font_body_14px_semibold">Sikeresen vágólapra másolva!</p>
			<p class="font_body_14px_regular toast-cmd">{toastMessage}</p>
		</div>
	</div>
{/if}

<style>
	div.main {
		display: flex;
		width: 820px;
		flex-direction: column;
		align-items: flex-start;
		gap: 48px;
	}

	div.title {
		display: flex;
		width: 460px;
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;
	}

	.title h2 {
		color: var(--text_primary);
	}

	.title p {
		color: var(--text_secondary);
	}

	div.cards {
		display: grid;
		grid-template-columns: repeat(2, 400px);
		grid-auto-rows: 1fr;
		justify-content: center;
		gap: 20px;
		align-self: stretch;
	}

	/* M3 Filled Card */
	div.card {
		display: flex;
		width: 400px;
		padding: 24px;
		flex-direction: column;
		align-items: flex-start;
		gap: 20px;
		border-radius: var(--shape-xl, 28px);
		background: var(--md-surface-container, var(--card_card));
		box-shadow: var(--elevation-1);
		transition: box-shadow 0.2s ease, background 0.2s ease;
	}

	div.card:hover {
		box-shadow: var(--elevation-2);
	}

	.card-header {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 16px;
		align-self: stretch;
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

	.card-header h2 {
		color: var(--text_primary);
	}

	.version {
		color: var(--text_teritary);
		margin-top: 2px;
	}

	.divider {
		width: 100%;
		height: 1px;
		background: var(--md-outline-variant, #BFC9C4);
		opacity: 0.6;
	}

	.card-section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 10px;
		align-self: stretch;
	}

	.label {
		color: var(--text_teritary);
		letter-spacing: 0.5px;
		text-transform: uppercase;
		font-size: 11px;
	}

	.section-buttons {
		display: flex;
		align-items: flex-start;
		align-content: flex-start;
		gap: 8px;
		align-self: stretch;
		flex-wrap: wrap;
	}

	@media (max-width: 1540px) {
		div.main {
			width: 100%;
			flex-direction: column;
			align-items: center;
			gap: 40px;
		}

		div.title {
			flex-direction: column;
			align-items: center;
			text-align: center;
			width: 360px;
		}

		div.cards {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		div.card {
			width: 360px;
		}
	}

	.toast {
		position: fixed;
		bottom: 32px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 16px 24px;
		background: var(--md-surface-container, var(--card_card));
		color: var(--text_primary);
		border-radius: var(--shape-sm, 12px);
		box-shadow: var(--elevation-3);
		border: 1px solid var(--md-outline-variant, #BFC9C4);
		z-index: 1000;
		animation: slideUp 0.3s cubic-bezier(0.2, 0, 0, 1);
	}

	.toast-icon {
		font-size: 24px;
		color: var(--md-on-primary-container, var(--accent_secondary));
	}

	.toast-content {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.toast-cmd {
		color: var(--text_secondary);
		font-family: monospace;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translate(-50%, 20px);
		}
		to {
			opacity: 1;
			transform: translate(-50%, 0);
		}
	}
</style>
