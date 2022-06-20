<script>
	import { Card, CardTitle, Button, FormInput, CardFooter, Row, CardBody } from '@svind/svelte';

	async function onSubmit({ target }) {
		const tag = target.tag.value;
		const attr = target.attr.value;
		const content = target.content.value;
        
		const resp = await fetch(`/api/${tag}/${attr}/examples`, {
			method: 'POST',
			body: JSON.stringify({
				content
			})
		}).then((res) => res.json());
		console.log(resp);
        target.reset()
	}
</script>

<form class="card border border-primary" on:submit|preventDefault={onSubmit}>
	<Card z=3 title="add example">
        <CardBody>
            <CardTitle>Add Example</CardTitle>
			<Row>
				<FormInput col="6" label="tag" placeholder="a" name="tag" />
				<FormInput col="6" label="attribute" placeholder="href" name="attr" />

				<div class="col-12 h-36 flex flex-col form-group">
					<label for="text-area" class="label">content</label>
					<textarea
                        id="text-area"
						class="flex-1 form-control h-full"
						required
						placeholder="<a href='https://google.com'>Google</a>"
						name="content"
					/>
				</div>
			</Row>
		</CardBody>
		<CardFooter placement="end">
			<Button variant="primary" type="submit">Submit</Button>
		</CardFooter>
	</Card>
</form>
