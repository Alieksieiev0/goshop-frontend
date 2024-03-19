<script lang="ts">
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import CategoryForm from './CategoryForm.svelte';
	import camelcaseKeys from 'camelcase-keys';

	export let parent: SvelteComponent;
	let formData = {
		name: '',
		description: ''
	};

	async function handleSave(): Promise<void> {
		let res = await fetch('http://localhost:3000/categories', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});

		const category = camelcaseKeys((await res.json()) as Category);
		if ($modalStore[0].response) $modalStore[0].response(category);
		modalStore.close();
	}
	const modalStore = getModalStore();
</script>

{#if $modalStore[0]}
	<div class="modal-example-form card w-modal space-y-4 p-4 shadow-xl">
		<header class="text-2xl font-bold">{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<CategoryForm bind:formData />
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
			<button class="btn {parent.buttonPositive}" on:click={handleSave}>Save</button>
		</footer>
	</div>
{/if}
