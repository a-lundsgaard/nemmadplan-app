import { RequestBody } from '../helpers/requestBody'

export default {
    getSales,
 };


    export function getSales(fieldsToQuery='', variables={}) {

        const query = `query($products: [String!]) {
            getSales(salesCrawlerInput: {
                products: $products
            }) {
                ${fieldsToQuery}
            } 
          }`
        
      //  return  {query: query, variables: variables };
        return new RequestBody(query, variables)

    }



