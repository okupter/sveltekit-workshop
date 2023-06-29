<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;
</script>

<svelte:head>
	<title>new course</title>
</svelte:head>

<!-- - Title
- Release date
- Description
- Author
- Lessons -->

<section class="space-y-16">
	<h1 class="text-4xl font-bold">new course</h1>

	<form method="post" use:enhance class="flex flex-col gap-2 sm:w-8/12">
		{#if form?.error}
			<div class="px-4 py-2 mb-4 bg-red-50">
				<p>{form.message}</p>
			</div>
		{/if}

		<input type="text" name="title" placeholder="Title" required />
		<input type="date" name="releaseDate" placeholder="Release date" required />
		<input type="text" name="author" placeholder="Author" required />
		<textarea name="description" placeholder="Description" rows="7" required />

		<button type="submit" class="bg-gray-900 px-4 py-2 text-white w-fit !mt-8"
			>Create New Course</button
		>
	</form>
</section>
