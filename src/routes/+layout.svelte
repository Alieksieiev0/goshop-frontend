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

	initializeStores();
	const modalRegistry: Record<string, ModalComponent> = {
		categoryForm: { ref: CategoryFormModal }
	};

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<Modal components={modalRegistry} />
<Toast />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			(title)
			<svelte:fragment slot="trail">(actions)</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
