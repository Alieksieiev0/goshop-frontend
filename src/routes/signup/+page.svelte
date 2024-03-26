<script lang="ts">
	import SignupForm from '$lib/SignupForm.svelte';

	let error: ResponseError;
</script>

<div class="card m-auto my-10 w-1/4 p-10">
	<h2 class="h2 pb-8 text-center">Sign in</h2>
	{#if error}
		<p class="text-center text-lg text-red-600">{error.error}</p>
	{/if}
	<SignupForm bind:error />
</div>
