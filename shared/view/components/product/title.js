/**
 * Created by Yigit Yesilpinar on 7.02.2017.
 *
 * Display Title/Subtitle for product
 *
 **/

import {displayMatch} from '../filter/display';

export function displayTitle(product, IDOM) {
    const {TitleMatches} = product;
    const {TitleText} = product.data.Title;
    IDOM.elementOpen('span','',['class', 'title']);
    // if there is a match and the match(es) is/are in the Title (else subtitle or no match)
    if(TitleMatches &&  TitleMatches[0] && TitleMatches.find(titleMatch => titleMatch.isTitle)){
        displayMatch(product, IDOM);
    }
    else{
        IDOM.text(TitleText);
    }
    IDOM.elementClose('span');
}

export function displaySubtitle(product, IDOM) {

    const {Subtitle} = product.data.Title;
    if(!Subtitle){
        return "";
    }
    const {TitleMatches} = product;
    const subtitlePrefix = ", ";
    IDOM.elementOpen('span','',['class', 'subtitle']);
    // if there is a match and the match(es) is/are in the Subtitle
    if(TitleMatches && TitleMatches[0] && TitleMatches.find(titleMatch => !titleMatch.isTitle)){
        // true indicates for displayMatch function it is called from Subtitle, subtitleMode, default false
        displayMatch(product, IDOM , true);
    }
    else{
        IDOM.text(subtitlePrefix + Subtitle);
    }
    IDOM.elementClose('span');
}