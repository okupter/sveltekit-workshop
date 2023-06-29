<script>
	import '$styles/app.postcss';

	export let data;
</script>

<nav class="container flex items-center justify-between px-4 py-4 mx-auto">
	<div class="flex items-center gap-4">
		<a href="/">Home</a>
		<a href="/courses">All Courses</a>
	</div>


	<div class="flex items-center gap-4">
		{#if !data.authUser}
			<a href="/auth/signup">Signup</a>
			<a href="/auth/login">Login</a>
		{:else}
			<a href="/courses/new">New Course</a>

			<form>
				<button type="submit" class="text-sm font-bold">Logout</button>
			</form>
		{/if}
	</div>
</nav>

<main class="container px-4 py-12 mx-auto">
	<slot />
</main>

<style>
	nav a {
		@apply text-sm font-bold;
	}
</style>
