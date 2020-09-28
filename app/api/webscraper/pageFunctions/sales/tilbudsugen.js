
function tilbudsavisen() {

  const results = [];

  const itemDivs = $('.mx-0')

  itemDivs.each(function (index){

    const priceInfo = $(this).find('.product_price').text().trim().split(' ');
    const img = $(this).find('.local-badge-wrapper > img');

    results.push({
      title: $(this).find('.product_title').text(),
      price: priceInfo[2],
      unit: priceInfo[1],
      quantity: priceInfo[0],
      pricePrKg: $(this).find('small').text().trim(),
      chain:  $(this).find('.store_name').text(),
      img:  img.attr('src') || img.attr('data-src'),
      date:  $(this).find('.certificates_ctn_list span').text()
    })

  })

 // console.log(results)
  return results;
}

module.exports = tilbudsavisen;