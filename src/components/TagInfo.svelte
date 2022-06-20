<script>
  import {Button } from '@svind/svelte'
  import AttributesModal from "./AttributesModal.svelte";
  import ExamplesModal from "./ExamplesModal.svelte";
  export let tag;

  let attributesModalOpen = false;
</script>

<tr class="hover:bg-blue-100 dark:hover:bg-[#404040] cursor-pointer transition-all duration-300">
  <td class="text-center">
    {tag.tag}
  </td>
  <td class="p-4">
    {tag?.description ?? "No description"}
  </td>
  <td>
    <Button on:click={() => attributesModalOpen = true}>View</Button>
  </td>
</tr>
<AttributesModal bind:open={attributesModalOpen} {tag} />
