const axios = require('axios')
const metacall = require('html-metadata-parser');

async function callAPI(url){
    // Sample Request Body:
    // {
    //     "url":"https://www.designmycodes.com/examples/angular-crud-app.html"
    // }

    let result = await metacall.parser(url);
    try{
        var makeRes = {}
        makeRes['title'] = result['meta']['title']
        makeRes['description'] = result['meta']['description']
        makeRes['images'] = []
        
        for (let index = 0; index < result['images'].length; index++) {
            makeRes['images'].push(result['images'][index]['url'])
        }
        // add og images
        for (let index = 0; index < result['og']['images'].length; index++) {
            makeRes['images'].push(result['og']['images'][index]['url'])
        }
        return makeRes
    }catch(err){
        return {
            statusCode: 400,
            body: JSON.stringify(err)
        }
    }
}

exports.handler = async (event, context) => {
    try{
        let urlToRequest = JSON.stringify(JSON.parse(event.body).url)
        urlToRequest = urlToRequest.replace(/^"|"$/g, '');
        let result = await callAPI(urlToRequest)
        return result
    }catch(err1){
        return {
            statusCode: 400,
            body: JSON.stringify(err1)
        }
    }
};
