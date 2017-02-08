/**
 * Created by Yigit Yesilpinar on 8.02.2017.
 *
 * View Utils
 *
 **/

// Implements auto-complete logic for keyword/vector search
export function displayVectorAutoComplete(searchVectorInput, matchText) {
    let vectorAutoComplete = document.getElementById("vectorAutoComplete");
    // if does not exist create
    if(vectorAutoComplete === null){
        vectorAutoComplete = document.createElement('span');
        vectorAutoComplete.setAttribute("id","vectorAutoComplete");
        vectorAutoComplete.innerHTML=`<span class="vectorMatch">${matchText}</span>`;
        searchVectorInput.parentNode.insertBefore(vectorAutoComplete, searchVectorInput.nextSibling);
        searchVectorInput.setAttribute("data-match", matchText );
    }
    else{
        vectorAutoComplete.innerHTML=`<span class="vectorMatch">${matchText}</span>`;
        searchVectorInput.setAttribute("data-match", matchText );
    }
}

export function destroyVectorAutoComplete(searchVectorInput) {
    let vectorAutoComplete = document.getElementById("vectorAutoComplete");
    // if does not exist create
    if(vectorAutoComplete != null){
        vectorAutoComplete.parentNode.removeChild(vectorAutoComplete);
    }
    searchVectorInput.setAttribute("data-match", " ");
}