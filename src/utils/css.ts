export function match_media(mediaquery: string) {
	return window.matchMedia(mediaquery).matches;
}
