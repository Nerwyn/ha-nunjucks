"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match_media = match_media;
function match_media(mediaquery) {
    return window.matchMedia(mediaquery).matches;
}
