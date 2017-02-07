/**
 * Created by Yigit Yesilpinar on 6.02.2017.
 *
 * Render products
 *
 **/
function ordinal_suffix_of(i) {
    let j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

function renderProduct(product, IDOM) {
    let {Title} = product.data;
    let isBook = product.type && product.type === 'book';
    IDOM.elementOpen('li','',['id','product__id__'+product.id, 'class', 'product']);
    if(isBook){
        IDOM.elementOpen('a','',['href','http://www.sciencedirect.com/science/book/'+product.id, 'class', 'book-link', 'target', '_blank']);
    }

    IDOM.elementOpen('span','',['class', 'title']);
    IDOM.text(Title.TitleText);
    IDOM.elementClose('span');

    if(Title.Subtitle){
        IDOM.elementOpen('span','',['class', 'subtitle']);
        IDOM.text(', '+Title.Subtitle);
        IDOM.elementClose('span');
    }
    if(product.version){
        IDOM.elementOpen('span','',['class', 'version']);
        IDOM.text(', '+ ordinal_suffix_of(product.version) + " Edition");
        IDOM.elementClose('span');
    }
    if(isBook){
        IDOM.elementClose('a');
    }
    IDOM.elementClose('li');
}

export function renderProducts(products, IDOM) {
        products.map(product => renderProduct(product, IDOM));
}

export function preRenderProducts(IDOM){

    IDOM.elementOpen('ul','',['class','product-list','id','productList']);
    IDOM.elementClose('ul');
}