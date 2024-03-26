<script lang="ts">
	import type { AutocompleteOption, PopupSettings } from '@skeletonlabs/skeleton';
	import { Autocomplete, popup } from '@skeletonlabs/skeleton';
	import { search } from './search';

	export const formData = {
		name: '',
		description: '',
		parentName: '',
		parentId: ''
	};
	let query: string;
	let categoryOptions: AutocompleteOption<string>[] = [];
	let popupSettings: PopupSettings = {
		event: 'focus-click',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};

	$: categoryOptions;
	$: query,
		(async () => {
			if (!query) {
				formData.parentName = '';
				formData.parentId = '';
				return;
			}
			categoryOptions = await search(query);
		})();

	function handleCategorySelection(event: CustomEvent<AutocompleteOption<string>>): void {
		query = event.detail.label;
		formData.parentName = event.detail.label;
		formData.parentId = event.detail.value;
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
		<input
			class="input"
			type="text"
			bind:value={formData.description}
			placeholder="Enter description..."
			required
		/>
	</label>

	<label class="label">
		<span>Parent Category</span>
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
			on:selection={handleCategorySelection}
		/>
	</div>
</form>
