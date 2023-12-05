"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._match_media = void 0;
function _match_media(mediaquery) {
    return window.matchMedia(mediaquery).matches;
}
exports._match_media = _match_media;
