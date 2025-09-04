export default {
	async fetch(request, env, ctx) {
		// Serve static assets
		return env.ASSETS.fetch(request);
	},
};