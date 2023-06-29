<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>{data.course.title} - {data.course.authorName}</title>
</svelte:head>

<section class="space-y-16">
	<div>
		<h1 class="text-4xl font-bold">{data.course.title}</h1>
		<p>By {data.course.authorName}</p>

		<p>
			<span>Released on: </span>
			<time datetime={data.course.releaseDate.toISOString()}
				>{data.course.releaseDate.toLocaleDateString()}</time
			>
		</p>
	</div>

	<p>{@html data.course.description}</p>
</section>
