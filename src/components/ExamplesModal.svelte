<script>
  import Modal from "./Modal.svelte";
  import CodeEditor from "./CodeEditor.svelte";
  export let tag;
  let activeAttribute = "";
  let code = `<${tag.tag}></${tag.tag}>`;
  function handleCodeChange(_code) {
    code = _code;
  }
  tag.examples = [
    {
      attribute: "href",
      code: `
      <a href=\"#\">
        <slot></slot>
      </a>
    `,
    },
    {
      attribute: "href",
      code: `
      <a href=\"#\">
        <slot></slot>
      </a>
    `,
    },
  ];
</script>

<Modal>
</Modal>
