export function _match_media(mediaquery: string) {
	return window.matchMedia(mediaquery).matches;
}
