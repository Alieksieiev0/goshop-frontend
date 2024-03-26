<script lang="ts">
	import SigninForm from '$lib/SigninForm.svelte';

	let user: TokenUser;
	let error: ResponseError;

	$: user,
		(() => {
			if (user) {
				console.log(localStorage);
				localStorage.setItem('user', JSON.stringify(user));
				window.location.href = '/';
			}
		})();
</script>

<div class="card m-auto my-10 w-1/4 p-10">
	<h2 class="h2 pb-8 text-center">Sign in</h2>
	{#if error}
		<p class="text-center text-lg text-red-600">{error.error}</p>
	{/if}
	<SigninForm bind:user bind:error />
</div>
