/**
 * Created by Yigit Yesilpinar on 06.02.2017.
 *
 * Product Api to consume Rest API for the products
 *
 **/


// axios for simplified XHR
import * as axios from "axios";
import {Observable} from "rxjs/Rx";
// action creators
import * as actions from '../actions/';
let baseURL = window.location.origin;

// load products async using redux-observable
export function handleLoad() {

    // handleLoad must return Observable Action Stream, since its an epic

    const client = axios.create({baseURL: baseURL});
    // get request, create an Observable from the promise
    const ajax = Observable.fromPromise(client.get("/api/products").then(
        function (response) {
            return response;
        }
    ).catch(
        // do not throw error, instead return the response with error data
        function (response) {
            return response;
        }
    ));
    // handle response, return action$ depending on status code
    return ajax.map(response => {
        if(response.status === 200){
            return actions.loadProductsSuccess(response);
        }
        else{
            return actions.loadProductsFail(response);
        }
    });

}

export function handleVectorLoad() {


    const client = axios.create({baseURL: baseURL});

    const ajax = Observable.fromPromise(client.get("/api/vectors").then(
        function (response) {
            return response;
        }
    ).catch(
        // do not throw error, instead return the response with error data
        function (response) {
            return response;
        }
    ));

    return ajax.map(response => {
        if(response.status === 200){
            return actions.loadVectorsSuccess(response);
        }
        else{
            return actions.loadVectorsFail(response);
        }
    });
}