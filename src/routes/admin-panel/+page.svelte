<script lang="ts">
	import ProductTable from '$lib/ProductTable.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import CategoryTable from '$lib/CategoryTable.svelte';

	let tabSet: number = 0;
</script>

<div class="m-4 grid grid-cols-4">
	<div class="card col-span-2 p-4">
		<TabGroup>
			<Tab bind:group={tabSet} name="products" value={0}>Products</Tab>
			<Tab bind:group={tabSet} name="categories" value={1}>Categories</Tab>
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<ProductTable />
				{:else if tabSet === 1}
					<CategoryTable />
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</div>
