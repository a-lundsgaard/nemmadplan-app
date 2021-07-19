
function tilbudsavisen() {

    const results = [];
  
    //const itemDivs = $('.mx-0')

    //const itemDivs = $('.row.product_thumb.search_result_list.align-items-center');

    const itemDivs = $('.search_result_list');


    //"row product_thumb search_result_list align-items-center"
  
    itemDivs.each(function (index){
  
      const priceInfo = $(this).find('.product_price').text().trim().split(' ');
      const img = $(this).find('.local-badge-wrapper > img');
  
      try {

        results.push({
          title: $(this).find('.product_title').text(),
          price: parseFloat(priceInfo[2].replace(/,/g, '.')),
          unit: priceInfo[1],
          quantity: parseInt(priceInfo[0].replace(/,/g, '.')),
          pricePrKg: $(this).find('small').text().trim(),
          chain:  $(this).find('.store_name').text(),
          img:  img.attr('src') || img.attr('data-src'),
          date:  $(this).find('.certificates_ctn_list span').text()
        })

      } catch(e) {
        console.error('Could not push ingredient: ' + $(this).find('.product_title').text() )

      }

  
    })
  
   // console.log(results)
    return results;
  }
  
  module.exports = tilbudsavisen;