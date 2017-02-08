/**
 * Created by Yigit Yesilpinar on 06.02.2017.
 *
 * Filter products array
 *
 **/
// recursive filter for Title, Subtitle, if there is more than one word in the search pattern
// in each call filters products array for a single pattern, removes the pattern from patterns and calls with filtered products
function filterByPatterns(products, patterns) {

    let pattern = patterns.shift();

    let regex = new RegExp(pattern, "i");

    let filtered =  products.filter(product =>{
        let {TitleText, Subtitle} = product.data.Title;
        // filter condition
        let match = TitleText.match(regex);
        let isTitle = true;
        if(!match && Subtitle){
            match = (Subtitle.match(regex));
            isTitle =false;
        }
        if(match !=null) {
            if (!product.TitleMatches) {
                product.TitleMatches = [{
                    start: match.index,
                    end: match.index + pattern.length,
                    isTitle: isTitle,
                    match: match
                }];
            }
            else {
                product.TitleMatches.push({
                    start: match.index,
                    end: match.index + pattern.length,
                    isTitle: isTitle,
                    match: match
                });
            }
        }

        return  match;
    });

    if(filtered.length > 0){
        // if Title/Subtitle includes all the patterns(words)
        if(patterns.length === 0){
            // FOUND
            return filtered;
        }
       return filterByPatterns(filtered, patterns);
    }
    // no match
    return [];
}

export function filterByTitle(state) {
    // title search pattern
    let pattern = state.appState.titleSearchPattern;
    // simple deep copy of products
    let products = JSON.parse(JSON.stringify(state.products));
    // regex, if search pattern only includes ' ' (empty) chars
    if(pattern === "" || pattern.match(/^[\s]+$/)){
        // return unmodified products array
        return products;
    }

    // escape special characters
    let escaped = pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    // case insensitive regular expression
    let regex = new RegExp(escaped, "i");

    let filtered =  products.filter(product =>{
        let {TitleText, Subtitle} = product.data.Title;
        let match = TitleText.match(regex);
        let isTitle = true;
        if(!match && Subtitle){
            match = (Subtitle.match(regex));
            isTitle =false;
        }
        // keep match position in string to display the match
        if(match !=null){
            product.TitleMatches = [{
                start: match.index,
                end: match.index + pattern.length,
                isTitle: isTitle,
                match: match
            }];
        }
        // filter condition
        return  match;
    });

    if(filtered.length > 0){
        return filtered;
    }
    else{
        // if the pattern includes more than one words(sub-patterns), filter products which includes
        if(escaped.split(" ").length > 1){
            let patterns = escaped.split(" ");
            // remove empty space " " matches
            for (let i = patterns.length-1; i >= 0; i--) {
                if (patterns[i] === " " || patterns[i] === "") {
                    patterns.splice(i, 1);
                }
            }
            return filterByPatterns(products, patterns);
        }
        // no match
        return [];
    }


}