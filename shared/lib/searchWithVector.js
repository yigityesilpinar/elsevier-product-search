/**
 * Created by Yigit Yesilpinar on 7.02.2017.
 *
 * Search on products using vectors
 *
 **/

function normalizePattern(pattern) {
    let escaped = pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    let patterns = escaped.split(" ");
    // remove empty space " " matches
    for (let i = patterns.length-1; i >= 0; i--) {
        if (patterns[i] === " " || patterns[i] === "") {
            patterns.splice(i, 1);
        }
    }
    return patterns;
}

export function searchWithVector(products,vectors, pattern) {

    const patterns = normalizePattern(pattern);

    // if vectors not loaded yet
    if(vectors.length === 0){
        return products;
    }

    // TODO filtering logic for vector search

    // if no match
    return [];
}
