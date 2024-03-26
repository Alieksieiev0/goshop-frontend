<script lang="ts">
	import { Autocomplete, getModalStore, popup } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption, ModalSettings, PopupSettings } from '@skeletonlabs/skeleton';
	import { search } from '$lib/search';

	let categoryOptions: AutocompleteOption<string>[] = [];
	let denyOptions: string[] = [];
	let query: string;
	export const formData = {
		name: '',
		description: '',
		code: '',
		price: 0,
		categories: [] as Category[]
	};

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
		let category = {} as Category;
		category.name = event.detail.label;
		category.id = event.detail.value;

		formData.categories = [category, ...formData.categories];
		denyOptions = [category.name, ...denyOptions];
	}

	function handleRemove(index: number) {
		console.log(formData.categories);
		formData.categories.splice(index, 1);
		denyOptions.splice(index, 1);
		console.log(formData.categories);
	}
</script>

<form class="modal-form space-y-4 border border-surface-500 p-4 rounded-container-token">
	<label class="label">
		<span>Name</span>
		<input
			class="input"
			type="text"
			bind:value={formData.name}
			placeholder="Enter name..."
			required
		/>
	</label>
	<label class="label">
		<span>Description</span>
		<textarea
			class="textarea"
			rows="4"
			bind:value={formData.description}
			placeholder="Enter description..."
		/>
	</label>
	<label class="label">
		<span>Code</span>
		<input
			class="input"
			type="text"
			bind:value={formData.code}
			placeholder="Enter code..."
			required
		/>
	</label>
	<label class="label">
		<span>Price</span>
		<input
			class="input"
			type="number"
			bind:value={formData.price}
			placeholder="Enter price..."
			step="0.01"
			min="0"
			required
		/>
	</label>
	<div class="container mx-auto">
		<p class="mb-4 text-xl font-bold">Selected Categories</p>
		<ul class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{#each formData.categories as category, i}
				<li class="rounded-md bg-gray-100 p-4 shadow-md">
					<span class="text-lg font-semibold">{category.name}</span>
					<button on:click={() => handleRemove(i)} class="ml-2 text-red-600 hover:text-red-700">
						Remove
					</button>
				</li>
			{/each}
		</ul>
	</div>
	<label class="label">
		<span>Category</span>
		<input
			class="autocomplete input"
			type="search"
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
			denylist={denyOptions}
			on:selection={handleCategorySelection}
		/>
	</div>
</form>
