<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';
	export let error: ResponseError;

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		let res = await fetch(PUBLIC_BASE_URL + '/register', {
			method: 'POST',
			body: new FormData(event.currentTarget)
		});

		if (res.status !== 200) {
			error = (await res.json()) as ResponseError;
			return;
		}

		window.location.href = '/signin';
	}
</script>

<form class="mx-auto max-w-sm" method="POST" on:submit|preventDefault={handleSubmit}>
	<label class="label py-2">
		<span class="text-lg">Username</span>
		<input class="input" type="text" name="username" placeholder="Enter username..." required />
	</label>
	<label class="label py-2">
		<span class="text-lg">Email</span>
		<input class="input" type="email" name="email" placeholder="Enter email..." required />
	</label>
	<label class="label py-2">
		<span class="text-lg">Password</span>
		<input class="input" type="password" name="password" placeholder="Enter password..." required />
	</label>
	<button type="submit" class="variant-filled-primary btn mt-8 w-full">Continue</button>
</form>
