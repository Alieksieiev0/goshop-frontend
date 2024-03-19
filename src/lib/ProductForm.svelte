<script lang="ts">
	import { Autocomplete, getModalStore, getToastStore, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, ModalSettings, PopupSettings } from '@skeletonlabs/skeleton';
	import { search } from '$lib/search';
	import snakecaseKeys from 'snakecase-keys';
	import camelcaseKeys from 'camelcase-keys';

	const modalStore = getModalStore();
	const toastStore = getToastStore();
	export let product: Product;
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

	function handleCategorySelection(event: CustomEvent<AutocompleteOption<string>>): void {
		query = event.detail.label;
		categoryName = event.detail.label;
		categoryId = event.detail.value;
	}

	function handleNewCategory() {
		new Promise<boolean>((resolve) => {
			const modal: ModalSettings = {
				title: 'Category',
				body: 'Complete the form below to create new category',
				type: 'component',
				component: 'categoryForm',
				response: (r: boolean) => {
					resolve(r);
				}
			};
			modalStore.trigger(modal);
		}).then((r: any) => {
			const category = r as Category;
			query = category.name;
			categoryName = category.name;
			categoryId = category.id;
		});
	}

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		if (event.currentTarget.search.value !== categoryName) {
			toastStore.trigger({
				message: 'Selected category is not valid, or category is not selected at all.',
				hoverable: true,
				background: 'variant-filled-error'
			});
			return;
		}

		let requestProduct: any = {};
		new FormData(event.currentTarget).forEach((value, key) => (requestProduct[key] = value));
		requestProduct['categories'] = [{ id: categoryId } as Category];

		let json = JSON.stringify(snakecaseKeys(requestProduct));
		let res = await fetch('http://localhost:3000/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: json
		});

		product = camelcaseKeys((await res.json()) as Product);
	}
</script>

<form class="mx-auto max-w-sm" method="POST" on:submit|preventDefault={handleSubmit}>
	<label class="label">
		<span>Name</span>
		<input class="input" type="text" name="name" placeholder="Enter name..." required />
	</label>
	<label class="label">
		<span>Description</span>
		<textarea class="textarea" rows="4" name="description" placeholder="Enter description..." />
	</label>
	<label class="label">
		<span>Code</span>
		<input class="input" type="text" name="code" placeholder="Enter code..." required />
	</label>
	<label class="label">
		<span>Price</span>
		<input
			class="input"
			type="number"
			name="price"
			placeholder="Enter price..."
			step="0.01"
			required
		/>
	</label>
	<label class="label">
		<span>Category</span>
		<input
			class="autocomplete input"
			type="search"
			name="search"
			bind:value={query}
			placeholder="Enter category name..."
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
			on:selection={handleCategorySelection}
		/>
	</div>

	<button type="button" class="variant-ringed-primary btn my-4 w-full" on:click={handleNewCategory}
		>New Category</button
	>
	<button type="submit" class="variant-filled-primary btn w-full">Submit Form</button>
</form>
