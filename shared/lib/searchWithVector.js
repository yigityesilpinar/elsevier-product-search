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

    const findings = vectors.filter(vector => vector.name.startsWith(cleanPattern));

    if(findings.length > 0){
        let result = [];
        for(let found of findings){
            let foundProduct = products.find(product => product.id === found.id);
            // add to the list only if it is not added previously
            if(foundProduct && !result.find(product => product.id == found.id)){

                Object.defineProperty(foundProduct, 'vectorMatch', {
                    enumerable: true,
                    configurable: true,
                    writable: false,
                    value: found
                });
                Object.defineProperty(foundProduct, 'displayChapters', {
                    enumerable: true,
                    configurable: true,
                    writable: false,
                    value: true
                });

                result.push(foundProduct);
            }
        }
        return result;
    }
    else{
        // if no match
        return [];
    }

}
