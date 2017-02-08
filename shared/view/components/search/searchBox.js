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

        let spanStatics =['class', 'search-span'];
        this.spanId = options.spanId;
        if(this.spanId){
            spanStatics.push("id");
            spanStatics.push(this.spanId);
        }
        this.spanStatics = spanStatics;

        this.render = this.render.bind(this);

    }

    // render searchBox
    // injected dependency @IDOM (incremental-dom)
    render(IDOM){
        IDOM.elementOpen('span', '', this.spanStatics);
        IDOM.elementVoid('input', '', this.inputStatics);
        IDOM.elementClose('span');
    }

}