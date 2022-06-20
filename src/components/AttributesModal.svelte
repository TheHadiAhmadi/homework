<script>
	import AttributesTable from './AttributesTable.svelte';
	import BcdTable from './BcdTable.svelte';
	import { Card, CardBody, CardTitle, Menu, Icon, Button, MenuItem, Modal } from '@svind/svelte';
import Repl from './Repl.svelte';

	export let tag;
	export let open;

  let activeAttribute = tag.attributes[0]

  $:console.log({activeAttribute})
</script>

<Modal bind:open>
  {#if open}
	<Card class="flex flex-col relative h-80vh col-12 min-w-sm overflow-hidden">
		<div class="card-body h-full">
			<div class="flex items-center justify-between">


			<CardTitle>
				Attributes
			</CardTitle>
			<Button on:click={() => open = false} square class="absolute top-0 right-0"><Icon icon="fa-solid:times" /></Button>
		</div>
			<Repl {tag}/>
		</div>
		<div class="h-6"></div>

<!-- 
				<div
					class={`flex flex-row h-96 overflow-hidden ${
						tag.attributes.length > 0 ? 'justify-between' : 'justify-evenly'
					}`}
				> -->
					<!-- {JSON.stringify(tag)} -->
					<!-- {#if tag.attributes.length > 0}
						<ul class="flex flex-col items-center px-4 overflow-y-scroll w-2/12">
							{#each tag.attributes as attribute (attribute.name)}
								<li class="w-full text-center py-3">
									 -->

                  <!-- <button
                                      class={`btn w-full ${
                    activeAttribute === attribute.name ? "btn-primary" : ""
                  }`}
                  on:click={() => {
                    activeAttribute = attribute.name;
                  }}
                >
                  {attribute.name}
                </button> -->
								<!-- </li> -->
							<!-- {/each} -->
						<!-- </ul> -->
					<!-- {/if} -->

					<!-- <CodeEditor examples={tag.examples} {code} {handleCodeChange} /> -->
					<!-- <div class=" overflow-hidden rounded-xl w-4/12">
          <h3 class="text-center pt-2">Result</h3>
          <div class="p-4">
            
          </div>
        </div> -->
				<!-- </div> -->
			<!-- </div> -->

			<!-- <div class="flex flex-col space-y-4 divide-y divide-blue-400"> -->
				<!-- <AttributesTable attributes={tag.attributes} /> -->
				<!-- <BcdTable bcd={tag.browsers} /> -->
			<!-- </div> -->
	</Card>
  {/if}

</Modal>
