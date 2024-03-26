<script lang="ts">
	import { getModalStore, getToastStore } from '@skeletonlabs/skeleton';
	import type { SvelteComponent } from 'svelte';
	import camelcaseKeys from 'camelcase-keys';
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import ProductForm from './ProductForm.svelte';
	const modalStore = getModalStore();

	export let parent: SvelteComponent;
	let error: ResponseError;
	let formData = {
		name: '',
		description: '',
		code: '',
		price: 0,
		categories: [] as Category[]
	};

	async function handleSave(): Promise<void> {
		if (formData.categories.length === 0) {
			error = {
				error: 'Product must have at least 1 related category.'
			};
			return;
		}

		if (!formData.name) {
			error = {
				error: 'Name field is empty'
			};
			return;
		}

		if (!formData.code) {
			error = {
				error: 'Code field is empty'
			};
			return;
		}

		if (!formData.price) {
			error = {
				error: 'Incorrect price'
			};
			return;
		}

		let res = await fetch(PUBLIC_BASE_URL + '/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		});

		const product = camelcaseKeys((await res.json()) as ProductResponse);
		if ($modalStore[0].response) $modalStore[0].response(product);
		modalStore.close();
	}
</script>

{#if $modalStore[0]}
	<div class="modal-example-form card w-modal space-y-4 p-4 shadow-xl">
		<header class="text-2xl font-bold">{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<ProductForm bind:formData />
		{#if error}
			<p class="text-center text-lg text-red-600">{error.error}</p>
		{/if}
		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
				>{parent.buttonTextCancel}</button
			>
			<button class="btn {parent.buttonPositive}" on:click={handleSave}>Save</button>
		</footer>
	</div>
{/if}
