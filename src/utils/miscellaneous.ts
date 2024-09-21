export function match_media(mediaquery: string) {
	return window.matchMedia(mediaquery).matches;
}

export function str(value: string) {
	return value.toString();
}
