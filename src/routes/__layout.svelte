<script>
	import {Page, PageBody, PageWrapper} from '@svind/svelte'

	import '@svind/svelte/styles.css';
	
	import 'virtual:windi.css'
</script>

<Page dark>
	<div class="page-body h-screen">
		<PageWrapper>
			<slot />
		</PageWrapper>
	</div>
</Page>

<style global>
	* {
		margin: 0;
	}

	.form-control:hover {
		background-color: #404040;
	}

	.form-control:focus {
		background-color: #444444;
	}
</style>