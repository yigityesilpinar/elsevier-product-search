/**
 * Created by Yigit Yesilpinar on 5.02.2017.
 *
 * Events helper library
 *
 */

// Polyfill for matches, for IE and Edge
/* eslint-disable no-empty */
if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            let matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;

            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}

export function listen(eventName, selector, handler) {
    document.body.addEventListener(eventName, event => {
        if(event.target.matches(selector)) {
            return handler(event);
        }
    });
}
