/**
 * Created by Yigit Yesilpinar on 8.02.2017.
 *
 * View Utils
 *
 **/

function displayPopUp(searchVectorInput) {
    // pop up to give information about the Right Arrow for auto-complete
    let infoPopUp = document.getElementById("infoPopUp");
    if(infoPopUp === null) {
        infoPopUp = document.createElement('span');
        infoPopUp.setAttribute("id", "infoPopUp");
        infoPopUp.innerText='Use RIGHT ARROW to auto-complete';
        searchVectorInput.parentNode.insertBefore(infoPopUp, searchVectorInput.nextSibling);
        let fade = setInterval(function() {
            infoPopUp.style.opacity =(parseFloat(window.getComputedStyle(infoPopUp).opacity) -0.03 );
        }, 60);

        setTimeout(function() {
            if(infoPopUp){
                infoPopUp.parentNode.removeChild(infoPopUp);
                clearInterval(fade);
            }
        }, 2000); // display 2 seconds only
    }
}

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
        displayPopUp(searchVectorInput);
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

export function ordinal_suffix_of(i) {
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
