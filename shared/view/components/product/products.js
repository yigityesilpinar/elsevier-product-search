/**
 * Created by Yigit Yesilpinar on 6.02.2017.
 *
 * Render products
 *
 **/

import {displayTitle, displaySubtitle} from './title';
//import {ordinal_suffix_of} from '../../utils';
import {displayChapters} from './chapters';

function renderProduct(product, IDOM) {
    let isBook = product.type && product.type === 'book';
    let productClass ='product';
    isBook && (productClass+=" book");
    IDOM.elementOpen('li','',['id','product__id__'+product.id, 'class', productClass]);
    if(isBook){
        IDOM.elementOpen('a','',['href','http://www.sciencedirect.com/science/book/'+product.id, 'class', 'book-link', 'target', '_blank']);
    }

    displayTitle(product, IDOM);

    displaySubtitle(product, IDOM);
    /*
    if(product.version){
        IDOM.elementOpen('span','',['class', 'version']);
        IDOM.text(', '+ ordinal_suffix_of(product.version) + " Edition");
        IDOM.elementClose('span');
    }*/
    if(isBook){
        IDOM.elementClose('a');
        displayChapters(product, IDOM);
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