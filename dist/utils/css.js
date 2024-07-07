"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match_media = void 0;
function match_media(mediaquery) {
    return window.matchMedia(mediaquery).matches;
}
exports.match_media = match_media;
