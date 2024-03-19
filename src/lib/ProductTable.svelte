<script lang="ts">
	import snakecaseKeys from 'snakecase-keys';
	import { fetchProducts } from './fetch';
	export let products: Product[] = [];

	async function handleDelete(index: number) {
		const product = products[index];
		await fetch(`http://localhost:3000/products/${product.id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(snakecaseKeys(product))
		});
		fetchProducts().then((response) => {
			console.log(response);
			products = response;
		});
	}
</script>

<div class="table-container">
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Name</th>
				<th>Description</th>
				<th>Code</th>
				<th>Price</th>
				<th>Created At</th>
				<th>Updated At</th>
				<th></th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each products as product, i}
				<tr>
					<td>{product.name}</td>
					<td>{product.description}</td>
					<td>{product.code} </td>
					<td>{product.price} </td>
					<td>{product.createdAt}</td>
					<td>{product.updatedAt} </td>
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
