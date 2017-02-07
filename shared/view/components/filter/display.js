/**
 * Created by Yigit Yesilpinar on 7.02.2017.
 *
 * Display/Highlight the match if there is, for Product Title/Subtitle Search
 *
 **/

// Highlight the Match if there is in Title/Subtitle
export function displayMatch(product, IDOM, subtitleMode = false) {
    const {Title} = product.data;
    const {TitleMatches} = product;
    // single match (sentence) in Title/Subtitle
    if(TitleMatches.length === 1){
        // Reconstruct the Title/Subtitle with the match wrapped by span class="title-match"
        const titleMatch = TitleMatches[0];
        // Subject of the match, Title or Subtitle
        const Subject = titleMatch.isTitle ?  Title.TitleText : Title.Subtitle;
        const prefix =  titleMatch.isTitle ?  "" : ", ";
        const stringBeforeMatch =Subject.slice(0,titleMatch.start);
        const matchString = Subject.slice(titleMatch.start, titleMatch.end);
        const stringAfterMatch =Subject.slice(titleMatch.end, Subject.length);
        IDOM.text(prefix + stringBeforeMatch);
        // Wrap the match with the span class="title-match"
        IDOM.elementOpen('span','',['class', 'title-match']);
        IDOM.text(matchString);
        IDOM.elementClose('span');
        IDOM.text(stringAfterMatch);
    }
    // multiple matches (words in different location)
    else{
        if(subtitleMode){
            let subtitleMatches =  TitleMatches.filter(match=> !match.isTitle);
            subtitleMatches && displayMultipleMatch(Title, sortAndOrganizeMatches(subtitleMatches), IDOM);  }
        else{
            let titleMatches = TitleMatches.filter(match=> match.isTitle);
            titleMatches && displayMultipleMatch(Title, sortAndOrganizeMatches(titleMatches), IDOM);
        }
    }

}

function displayMultipleMatch(Title, TitleMatches, IDOM, isFirst = true) {

    let titleMatch  = TitleMatches.shift();
    if(!titleMatch){
        return "";
    }
    // Subject of the match, Title or Subtitle
    const Subject =  titleMatch.isTitle ? Title.TitleText : Title.Subtitle;
    if(isFirst){
        // only the first time (isFirst true by default then false)
        const stringBeforeMatches = Subject.slice(0, titleMatch.start);
        let prefix = titleMatch.isTitle ? "": ", ";
        IDOM.text(prefix + stringBeforeMatches);
    }

    const matchString = Subject.slice(titleMatch.start, titleMatch.end);
    // Wrap the matches with the span class="title-match"
    IDOM.elementOpen('span','',['class', 'title-match']);
    IDOM.text(matchString);
    IDOM.elementClose('span');

    if(TitleMatches.length > 0){
        let nextTitleMatch  = TitleMatches[0];
        const stringAfterMatch = Subject.slice(titleMatch.end, nextTitleMatch.start);
        IDOM.text(stringAfterMatch);
        return displayMultipleMatch(Title, TitleMatches, IDOM, false);
    }
    else{
        // stop case for recursive function
        const stringAfterAllMatches =Subject.slice(titleMatch.end, Subject.length);
        IDOM.text(stringAfterAllMatches);
        return "";
    }


}

function makeUnique(TitleMatches) {
    let uniqueMatches = [];

    // sorted with pattern length DESC to check whether longer pattern includes shorter one or not
    const sortedMatches = TitleMatches.sort((match,match2) => match2.match[0].length - match.match[0].length);
    sortedMatches.forEach(titleMatch => {
        let found = uniqueMatches.find(unique => unique.match[0] === titleMatch.match[0]);
        let included = uniqueMatches.find(unique => unique.match[0].includes(titleMatch.match[0])
        && ( unique.start === titleMatch.start ||  unique.end > titleMatch.start));
        if(!found && !included){
            uniqueMatches.push(titleMatch);
        }
    });

    return uniqueMatches;
}

function sortAndOrganizeMatches(TitleMatches) {
    // Make TitleMatches array unique and sort matches by start indexes
    return makeUnique(TitleMatches).sort((match,match2) => match.start - match2.start);
}
