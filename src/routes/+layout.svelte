<script lang="ts">
	import type { ModalComponent } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { Toast, storePopup } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { Modal } from '@skeletonlabs/skeleton';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import '../app.pcss';
	import CategoryFormModal from '$lib/CategoryFormModal.svelte';
	import HeaderActions from '$lib/HeaderActions.svelte';
	import ProductFormModal from '$lib/ProductFormModal.svelte';

	initializeStores();
	const modalRegistry: Record<string, ModalComponent> = {
		categoryForm: { ref: CategoryFormModal },
		productForm: { ref: ProductFormModal }
	};

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<Modal components={modalRegistry} />
<Toast />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<a href="/" title="Go to Homepage">
					<h3 class="h3">Decadence Shop</h3>
				</a>
			</svelte:fragment>

			<svelte:fragment slot="trail">
				<HeaderActions />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
