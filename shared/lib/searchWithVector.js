/**
 * Created by Yigit Yesilpinar on 7.02.2017.
 *
 * Search on products using vectors
 *
 **/

function normalizePattern(pattern) {

    let patterns = pattern.split(" ");
    // remove empty space " " matches and empty strings ""
    for (let i = patterns.length-1; i >= 0; i--) {
        if (patterns[i] === " " || patterns[i] === "") {
            patterns.splice(i, 1);
        }
    }
    return patterns;
}

export function searchWithVector(products,vectors, pattern) {

    const patterns = normalizePattern(pattern);
    let cleanPattern = patterns.join(" ");
    // if vectors not loaded yet, do not implement search return the same array
    if(vectors.length === 0 || !cleanPattern){
        return products;
    }

    const found = vectors.find(vector=> vector.name.startsWith(cleanPattern));

    if(found){
        let foundProduct = products.find(product => product.id === found.id);
        if(foundProduct){
            Object.defineProperty(foundProduct, 'vectorMatch', {
                enumerable: true,
                configurable: false,
                writable: false,
                value: found
            });
            Object.defineProperty(foundProduct, 'displayChapters', {
                enumerable: true,
                configurable: false,
                writable: false,
                value: true
            });
            let result = [];
            result.push(foundProduct);
            return result;
        }
    }
    else{
        // if no match
        return [];
    }

}
