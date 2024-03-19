<script lang="ts">
	export const formData = {
		name: '',
		description: ''
	};
</script>

<form class="modal-form space-y-4 border border-surface-500 p-4 rounded-container-token">
	<label class="label">
		<span>Name</span>
		<input class="input" type="text" bind:value={formData.name} placeholder="Enter name..." />
	</label>
	<label class="label">
		<span>Description</span>
		<input
			class="input"
			type="text"
			bind:value={formData.description}
			placeholder="Enter description..."
		/>
	</label>
</form>
