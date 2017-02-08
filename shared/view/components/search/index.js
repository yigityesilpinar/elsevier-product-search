/**
 * Created by User on 7.02.2017.
 */

import SearchBox from './searchBox';
export function renderSearch(IDOM) {
    // Custom component searchBox, constructs with options object which takes property options for inner input
    const searchTitleBox = new SearchBox({
        placeholder: "Search in Product Titles/Subtitles...",
        id: "searchProductTitle",
        spanId: "search_span_title"
    });

    // Custom component searchBox, constructs with options object which takes property options for inner input
    const searchKeywordBox = new SearchBox({
        placeholder: "Search with keywords/vectors...",
        id: "searchProductKeyword",
        spanId: "search_span_keyword"
    });
    IDOM.elementOpen('div', '', ["class", "search-product-div"]);
    searchTitleBox.render(IDOM);
    searchKeywordBox.render(IDOM);
    IDOM.elementClose('div');
}