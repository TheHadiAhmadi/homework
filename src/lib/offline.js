// import data from './offline-data.json'

export const getTags = (d) => ({
	name: d.tag,
	description: d.description
});

export const getAttributes = (d) =>
	d.attributes.localAttributes.map((attr) => ({
		name: attr.name,
		description: attr.description,
		tag: d.tag
	}));

export const getBC = (d) => {
	const features = Object.keys(d.BrowserCompatibility);
	const browsers = Object.keys(d.BrowserCompatibility[d.tag].support);

	return [
		...browsers.map((b) => {
			return features.map((feat) => ({
				tag: d.tag,
				attribute: feat === d.tag ? null : feat,
				browser: b,
				supports: !!d.BrowserCompatibility[feat].support[b].version_added
			}));
		})
	];
};