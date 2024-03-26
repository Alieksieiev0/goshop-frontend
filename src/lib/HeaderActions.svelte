<script lang="ts">
	let user: TokenUser;
	const storageUser = localStorage.getItem('user');
	if (storageUser) {
		user = JSON.parse(storageUser);
		console.log(user);
		if (user.exp <= Math.floor(Date.now() / 1000)) {
			localStorage.removeItem('user');
			window.location.href = '/signin';
		}
	}
</script>

{#if user}
	{#if user.role === 'admin'}
		<a
			href="/admin-panel"
			class="anchor rounded-full p-1 hover:bg-primary-200"
			title="Go to Admin Panel"
		>
			<svg
				class="h-[40px] w-[40px] text-gray-800 dark:text-white"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					fill-rule="evenodd"
					d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z"
					clip-rule="evenodd"
				/>
			</svg>
		</a>
	{/if}
	<a href="/cart" class="anchor rounded-full p-1 hover:bg-primary-200" title="Go to Cart">
		<svg
			class="h-[40px] w-[40px] text-gray-800 dark:text-white"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				fill-rule="evenodd"
				d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z"
				clip-rule="evenodd"
			/>
		</svg>
	</a>
{:else}
	<a href="/signin" class="anchor rounded-full p-1 hover:bg-primary-200" title="Sign in">
		<svg
			class="h-[40px] w-[40px] text-gray-800 dark:text-white"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				fill-rule="evenodd"
				d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
				clip-rule="evenodd"
			/>
		</svg>
	</a>
{/if}
