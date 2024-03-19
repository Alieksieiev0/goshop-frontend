<script lang="ts">
	import type { PageData } from './$types';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import { search } from '$lib/search';
	import snakecaseKeys from 'snakecase-keys';

	export let data: PageData;
	let categoryOptions: AutocompleteOption<string>[] = [];
	let query: string;
	let categoryId: string;
	let categoryName: string;

	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	$: categoryOptions;
	$: query,
		(async () => {
			categoryOptions = await search(query);
		})();

	function onCategorySelection(event: CustomEvent<AutocompleteOption<string>>): void {
		query = event.detail.label;
		categoryName = event.detail.label;
		categoryId = event.detail.value;
	}

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		if (event.currentTarget.search.value !== categoryName) {
			return;
		}
		let data = new FormData(event.currentTarget);
		data.set('categoryId', categoryId);

		let object: any = {};
		data.forEach((value, key) => (object[key] = value));
		let json = JSON.stringify(snakecaseKeys(object));

		const response = await fetch('http://localhost:3000/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: json
		});
		console.log(await response.json());
	}
</script>

<div class="card text-token m-4 mx-auto w-1/4 space-y-4 p-4">
	<form class="mx-auto max-w-sm" method="POST" on:submit|preventDefault={handleSubmit}>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" name="name" placeholder="Vest" required />
		</label>
		<label class="label">
			<span>Description</span>
			<textarea
				class="textarea"
				rows="4"
				name="description"
				placeholder="Limited collection vest"
			/>
		</label>
		<label class="label">
			<span>Code</span>
			<input class="input" type="text" name="code" placeholder="XYZ-123" required />
		</label>
		<label class="label">
			<span>Price</span>
			<input class="input" type="number" name="price" placeholder="0.00" step="0.01" required />
		</label>
		<label class="label">
			<span>Category</span>
			<input
				class="autocomplete input"
				type="search"
				name="search"
				bind:value={query}
				placeholder="Tools"
				use:popup={popupSettings}
			/>
		</label>
		<div
			data-popup="popupAutocomplete"
			class="card max-h-48 w-full max-w-sm overflow-y-auto p-4"
			tabindex="-1"
		>
			<Autocomplete
				bind:input={query}
				options={categoryOptions}
				on:selection={onCategorySelection}
			/>
		</div>
		<button type="submit" class="variant-filled btn my-4 w-full">Button</button>
	</form>
</div>
