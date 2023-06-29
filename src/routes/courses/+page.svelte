<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>all courses</title>
</svelte:head>

<section class="space-y-16">
	<h1 class="text-4xl font-bold">all courses</h1>

	{#if data.courses && data.courses.length > 0}
		<div class="space-y-4">
			{#each data.courses as course (course.id)}
				<div>
					<h2 class="text-2xl font-semibold">
						<a href={`/courses/${course.slug}`} class="hover:underline">{course.title}</a>
					</h2>

					<p>By {course.authorName}</p>

					<p>
						<span>Released on: </span>
						<time datetime={course.releaseDate.toISOString()}
							>{course.releaseDate.toLocaleDateString()}</time
						>
					</p>
				</div>
			{/each}
		</div>
	{/if}
</section>
