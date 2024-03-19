<script lang="ts">
	import type { PageData } from './$types';
	import ProductForm from '$lib/ProductForm.svelte';
	import ProductTable from '$lib/ProductTable.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';

	export let data: PageData;
	let products: Product[] = data.products;
	let product: Product;
	let tabSet: number = 0;

	$: product,
		(() => {
			if (product) {
				products = [...products, product];
			}
		})();
</script>

<div class="m-4 grid grid-cols-4">
	<div class="card w-1/2 place-self-center p-4">
		<ProductForm bind:product />
	</div>

	<div class="card col-span-2 p-4">
		<TabGroup>
			<Tab bind:group={tabSet} name="products" value={0}>Products</Tab>
			<Tab bind:group={tabSet} name="categories" value={1}>Categories</Tab>
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<ProductTable bind:products />
				{:else if tabSet === 1}
					(tab panel 2 contents)
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</div>
