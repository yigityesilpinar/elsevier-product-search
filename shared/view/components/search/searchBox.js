/**
 * Created by Yigit Yesilpinar on 6.02.2017.
 *
 * Reusable search component(documentElement) using incremental-dom
 *
 */


export default class SearcBox {
    /* constructor options
    {   // all optional
        placeholder: String,
        id: String, String // input id
        divId: String
    }
    */
    constructor(options){

        this.id = options.id;
        this.placeholder = options.placeholder || "Search in Elsevier Products";
        let inputStatics = ["type", "search", "placeholder", this.placeholder, "onfocus", "this.placeholder = ''", "onblur", "this.placeholder ='"+this.placeholder + "'"];
        if(this.id){
            inputStatics.push("id");
            inputStatics.push(this.id);
        }
        this.inputStatics = inputStatics;
        this.divId = options.divId;
        this.divStatics =["class", "search-product-div"];
        if(this.divId){
            this.divStatics.push("id");
            this.divStatics.push(this.divId);
        }
        this.render = this.render.bind(this);

    }

    // render searchBox
    // injected dependency @IDOM (incremental-dom)
    render(IDOM){
        IDOM.elementOpen('div', '', this.divStatics);
        IDOM.elementOpen('span', '', ['class', 'search-span']);
        IDOM.elementVoid('input', '', this.inputStatics);
        IDOM.elementClose('span');
        IDOM.elementClose('div');
    }

}