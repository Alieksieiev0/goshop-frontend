<script lang="ts">
	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	let categories: Category[] = [];

	$: categories;

	function handleNewCategory() {
		new Promise<boolean>((resolve) => {
			const modal: ModalSettings = {
				title: 'Category',
				body: 'Complete the form below to create new product',
				type: 'component',
				component: 'categoryForm',
				response: (r: boolean) => {
					resolve(r);
				}
			};
			modalStore.trigger(modal);
		}).then((r: any) => {
			const category = r as Category;
			if (category) {
				categories = [category, ...categories];
			}
		});
	}

	async function handleDelete(index: number) {
		await fetch(`http://localhost:3000/category/${categories[index].id}`, {
			method: 'DELETE'
		});
	}
</script>

<button type="button" class="variant-ringed-primary btn my-4 w-full" on:click={handleNewCategory}>
	New Category
</button>

<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Name</th>
				<th>Description</th>
				<th>Parent</th>
				<th>Created At</th>
				<th>Updated At</th>
				<th></th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each categories as category, i}
				<tr>
					<td>{category.name}</td>
					<td>{category.description}</td>
					<td>
						{#if category.parent}
							{category.parent.name}
						{/if}
					</td>
					<td>{category.createdAt}</td>
					<td>{category.updatedAt} </td>
					<td>
						<button
							on:click={() => handleDelete(i)}
							class="font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</button
						>
					</td>
					<td class="px-6 py-4">
						<button
							on:click={() => handleDelete(i)}
							class="font-medium text-red-600 hover:underline dark:text-red-500">Delete</button
						>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
