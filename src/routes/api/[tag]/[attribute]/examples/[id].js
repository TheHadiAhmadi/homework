import minibase from '$lib/minibase'

export async function put({request, params}) {

    const {content} = await request.json();
    const {tag, attribute, id} = params;

    console.log({content})
    await minibase.remove('examples', id);

    const result = await minibase.insert('examples', {tag, attribute, content})

    console.log(result)
    return {
        body: {
            body: result
        }
    }   
}