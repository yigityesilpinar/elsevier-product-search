/**
 * Created by Yigit Yesilpinar on 8.02.2017.
 *
 * Display chapters of books
 *
 **/

import xpath from 'xpath';
import {DOMParser} from 'xmldom';

function displayChapterTitle(titleNodes, IDOM) {
    let titleClass = titleNodes[0].localName;
    let titleText = titleNodes[0].firstChild.data;
    const titleStatics = ['class',titleClass];
    IDOM.elementOpen('span','', titleStatics);
    IDOM.text(titleText);
    IDOM.elementClose('span');
}

function displayChapterLabel(labelNodes, IDOM) {
    if(labelNodes.length > 0){
        let labelClass = labelNodes[0].localName;
        let labelText = labelNodes[0].firstChild.data;
        const labelStatics = ['class',labelClass];
        IDOM.elementOpen('span','', labelStatics);
        IDOM.text(labelText+" ");
        IDOM.elementClose('span');
    }
}

function displayChapterSubtitle(subtitleNodes, IDOM) {
    if(subtitleNodes.length > 0){
        let subtitleClass = subtitleNodes[0].localName;
        let subtitleText = subtitleNodes[0].firstChild.data;
        const subtitleStatics = ['class',subtitleClass];
        IDOM.elementOpen('span','', subtitleStatics);
        IDOM.text(" "+ subtitleText);
        IDOM.elementClose('span');
    }
}

function displayChapter(chapter, IDOM) {

    // chapter has articletitle array with single item,  [0]=" <ce:title> <ce:label> <ce:italic>" XSL
    // Use xmlDOM and XPath
    let doc = new DOMParser().parseFromString(chapter.articletitle[0]);
    let titleNodes = xpath.select("/*[(name()='ce:title')]", doc);
    let labelNodes = xpath.select("/*[(name()='ce:label')]", doc);
    // let subtitleNodes = xpath.select("/*[(name()='ce:subtitle')]", doc);
    // let otherNodes = xpath.select("/*[not(name()='ce:title') and not(name()='ce:label') and not(name()='ce:subtitle') ]", doc);
    // chapter has piinorm for link
    IDOM.elementOpen('li','',['id','chapter__id__'+chapter.id, 'class', 'chapter']);
    IDOM.elementOpen('a','',['href','http://www.sciencedirect.com/science/article/pii/'+chapter.piinorm, 'class', 'chapter-link', 'target', '_blank']);
    displayChapterLabel(labelNodes, IDOM);
    displayChapterTitle(titleNodes, IDOM);
    //displayChapterSubtitle(subtitleNodes, IDOM);
    IDOM.elementClose('a');
    IDOM.elementClose('li');
}

export function displayChapters(product, IDOM) {
    let {chapters, displayChapters} = product;

    // display chapters when the book is the result for Vector Search
    // switch this if to if(chapters) to display chapters everywhere
    if(displayChapters != undefined){
        IDOM.elementOpen('ul','', ['class', 'chapter-list']);
        // concat to not mutate original array, sort (by sort order) and map chapters to displayChapter
        chapters
            .concat()
            .sort((a, b) => parseInt(a.sortorder) - parseInt(b.sortorder))
            .map(chapter => displayChapter(chapter, IDOM));
        IDOM.elementClose('ul');
    }
}