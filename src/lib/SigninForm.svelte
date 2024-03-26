<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { jwtDecode } from 'jwt-decode';

	export let user: TokenUser;
	export let error: ResponseError;

	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		const res = await fetch(PUBLIC_BASE_URL + '/login', {
			method: 'POST',
			body: new FormData(event.currentTarget)
		});

		if (res.status !== 200) {
			error = (await res.json()) as ResponseError;
			return;
		}

		const token = (await res.json()) as ResponseToken;
		user = jwtDecode(token.token) as TokenUser;
		user.token = token.token;
	}
</script>

<form class="mx-auto max-w-sm" method="POST" on:submit|preventDefault={handleSubmit}>
	<label class="label py-2">
		<span class="text-lg">Email</span>
		<input class="input" type="email" name="email" placeholder="Enter email..." required />
	</label>
	<label class="label py-2">
		<span class="text-lg">Password</span>
		<input class="input" type="password" name="password" placeholder="Enter password..." required />
	</label>
	<button type="submit" class="variant-filled-primary btn mt-8 w-full">Continue</button>
	<div class="w-full pt-4 text-center">
		<a
			href="/signup"
			class="text-center font-medium text-blue-600 hover:underline dark:text-blue-500">Sign Up</a
		>
	</div>
</form>
