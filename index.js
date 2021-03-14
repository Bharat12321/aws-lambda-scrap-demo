exports.handler = async (event) => {
// async function main(){

    // Sample Request Body:
    // {
    //     "url":"https://www.designmycodes.com/examples/angular-crud-app.html"
    // }
    
    const axios = require('axios')
    const metacall = require('html-metadata-parser');

    try{
        let urlToRequest = JSON.stringify(JSON.parse(event.body).url)
        urlToRequest = urlToRequest.replace(/^"|"$/g, '');
        let result = await metacall.parser(urlToRequest);

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
        
            // console.log(makeRes)
            return makeRes
        }catch(err){
            return {
                statusCode: 400,
                body: JSON.stringify(err)
            }
        }
    }catch(err1){
        return {
            statusCode: 400,
            body: JSON.stringify(err1)
        }
    }

};
// }
// main()
