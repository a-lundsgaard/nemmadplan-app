const runCrawler = require('./crawlers/baseCrawler');
const arla = require('./pageFunctions/arla');
const valdemarsro = require('./pageFunctions/valdemarsro');
const stinna = require('./pageFunctions/stinna');


//runCrawler("https://www.arla.dk/opskrifter/hakkeboffer-med-blomme--og-savojkalssaute/", arla).then(console.log).catch(console.error);
runCrawler("https://www.valdemarsro.dk/taerte-med-kylling/", valdemarsro)
  .then(res => console.log(res)).catch(console.error);

//runCrawler("https://stinna.dk/aftensmad/vegetarisk-paprikagryde.html", stinna).then(console.log).catch(console.error);