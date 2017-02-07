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
        if(Subtitle){
            return   TitleText.match(regex) || Subtitle.match(regex);
        }
        return  TitleText.match(regex);
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
    // copy array products
    let products = [...(state.appState.products)];
    // regex, if search pattern only includes ' ' (empty) chars
    if(pattern === "" || pattern.match(/^[\s]+$/)){
        // return unmodified products array
        return products;
    }

    let matches = {};
    // escape special characters
    let escaped = pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    // case insensitive regular expression
    let regex = new RegExp(escaped, "i");

    let filtered =  products.filter(product =>{
        let {TitleText, Subtitle} = product.data.Title;
        let match = TitleText.match(regex);
        if(Subtitle){
            match = TitleText.match(regex) || Subtitle.match(regex);
        }
        // keep match position in string to display the match
        if(match !=null){
            matches[product.id] =  {
                start: match.index,
                end: match.index + pattern.length
            };
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

            return filterByPatterns(products, patterns);
        }
        // no match
        return [];
    }


}