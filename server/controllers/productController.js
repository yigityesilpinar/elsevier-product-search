/**
 * Created by Yigit on 5.02.2017.
 *
 * Handles the AppData (joins and organize) as a products array and returns
 *
 */
export function getProducts(appData) {

    let {versionFamiliesById, worksById, doisById} = appData;

    let products = [];
    let bookByISBN =[];


    for(let workId in worksById){

        let workData = worksById[workId];

        let workModel = {id:workId, data:workData};
        let type = 'work';
        // Is defined product class add property type, e.g : 'book'
        if( workData.PpmData && workData.PpmData.ProductClass){
            type =  workData.PpmData.ProductClass.toLocaleLowerCase();
        }

        Object.defineProperty(workModel, 'type', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: type
        });
        products.push(workModel);

    }

    // Join the articles of the same book together indexed by book ISBN
    for(let filename in doisById){
        // pop from array[1] gives doi object (article/chapter/work data)
        let doi = doisById[filename].pop();

        let foundIndex = bookByISBN.findIndex(book => book.ISBN === doi.isbnnorm);
        if(foundIndex === -1){
            // Book(ISBN) not found, add a new book
            bookByISBN.push({
                ISBN: doi.isbnnorm,
                articles: [doi],
                title: doi.srctitle.pop()
            });
        }
        else{
            // if book exist just push to articles (chapters) array
            bookByISBN[foundIndex].articles.push(doi);
        }
    }


    // Join the articles/chapters with products array
    bookByISBN.forEach(function (book) {
        let foundIndex=products.findIndex(product=> product.id === book.ISBN);

        Object.defineProperty(products[foundIndex], 'chapters', {
            enumerable: true,
            configurable: false,
            writable: false,
            value: book.articles
        });

    });

    // Join the version and vectors (If Exist) with products array
    for(let versionFamilyId in versionFamiliesById){

        let versionFamily = versionFamiliesById[versionFamilyId];
        let version = Object.keys(versionFamily)[0];

        Object.keys(versionFamily[version]).forEach(function (key) {
            // reference value for the version family, in for workById[`id`] where `id` is the productId
            // take the ID from the workById[`id`] string
            let productId = versionFamily[version][key].value.match(/^worksById\[([^\]]+)/)[1];
            let productIndex = products.findIndex(p => p.id === productId);

            Object.defineProperty(products[productIndex], 'version', {
                enumerable: true,
                configurable: false,
                writable: false,
                value: version
            });

            let vectorIndex =Object.keys(versionFamily)[1];
            if(vectorIndex)
            {
                Object.defineProperty(products[productIndex], 'vectors', {
                    enumerable: true,
                    configurable: false,
                    writable: false,
                    value: versionFamily[vectorIndex]
                });
            }
        });
    }

    return products;

}