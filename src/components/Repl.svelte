<script>
	import { Badge, Button, Card, Icon, CardBody, CardHeader, CardTitle, Menu } from '@svind/svelte';

	export let tag;

    let activeIndex = 0
    let activeExample = 0;
    let content;

    let loading = false;


    function onAddButton() {
        adding = true
        activeAttribute.examples = [...activeAttribute.examples, {content: ""}];
        activeExample = activeAttribute.examples.length -1
    }

    async function onSaveButton() {
        adding = false

        loading = true;
        const result = await fetch(`/api/${tag.tag}/${activeAttribute.name}/examples`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content
            })
        }).then(res => res.json())

        loading = false;
        console.log(result.body)
        activeAttribute.examples[activeExample] = result.body

        // fetch
    }

    async function onEditButton() {
        let example = activeAttribute.examples[activeExample];
        let id = activeExample

        loading = true;
        const result = await fetch(`/api/${tag.tag}/${activeAttribute.name}/examples/${example.id}`, {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                content
            })
        }).then(res => res.json())
        
        loading = false;
        activeAttribute.examples[id] = result.body

    }

    function onCancelButton() {
        adding = false;
        activeAttribute.examples.pop();
        activeAttriubte.examples = activeAttribute.examples
    }

    let adding = false
    
    $: activeAttribute = tag.attributes[activeIndex ?? 0]
    $: code = activeAttribute?.examples[activeExample]?.content ?? ''
    $: content = code 

</script>

<div class="flex flex-col sm:flex-row h-full items-stretch w-full">

{#if loading}
<div class="absolute left-0 top-0 flex items-center justify-center w-full h-full bg-gray-900/50 text-xl" >Loading...</div>
{/if}

<Menu class="overflow-auto flex-row sm:flex-col sm:min-w-36">
	{#each tag.attributes as attr, index}
		<li
			class="menu-item"
			on:click={() => {activeIndex = index; activeExample = 0}}
			class:active={activeIndex === index}
			class:!text-white={activeIndex === index}
			class:!font-bold={activeIndex === index}
		>
			{attr.name}
            {#if attr.examples.length > 0}
            <Badge>{attr.examples.length}</Badge>
            {/if}
		</li>
	{/each}
</Menu>
<div class="dark w-full h-full bg-base">
	<div class="w-full h-full flex flex-col sm:flex-row gap-1 p-1 items-stretch">
        <Card class="flex flex-col flex-1">
            <div class="card-header flex justify-between">
                <CardTitle>Code ({activeAttribute.name})</CardTitle>
                <div>
                    {#if activeAttribute?.examples.length > 1}
                        <Button square variant="secondary" size="xs" on:click={() => activeExample = Math.max(activeExample - 1, 0)} disabled={activeExample == 0}>
                            <Icon icon="mdi:arrow-left"/>
                        </Button>
                        <Button square variant="secondary" size="xs" on:click={() => activeExample = Math.min(activeExample + 1,  activeAttribute.examples.length - 1)} disabled={activeExample == activeAttribute.examples.length - 1}>
                            <Icon icon="mdi:arrow-right"/>
                        </Button>
                    {/if}
                    {#if adding}
                        <Button on:click={onCancelButton} square variant="error" size="xs"><Icon icon="uil:times"/></Button>
                        <Button on:click={onSaveButton} square variant="success" size="xs"><Icon icon="mdi:check"/></Button>
                    {:else}
                        <Button on:click={onEditButton} square variant="info" size="xs"><Icon icon="mdi:pencil"/></Button>
                        <Button on:click={onAddButton} square variant="success" size="xs"><Icon icon="mdi:plus"/></Button>
                    {/if}
                </div>
            </div>
            <textarea bind:value={content}  class="form-control !bg-gray-900 text-gray-200 min-h-36 h-full" />
        </Card>
        <Card class="flex-1 flex flex-col">
            <CardHeader>
                <CardTitle>Output</CardTitle>
            </CardHeader>

                <iframe
				width="100%"
				srcdoc={code}
				src="/404"
				class="w-full h-full bg-white"
				title="example"
                />
        </Card>

	</div>
</div>
</div>
