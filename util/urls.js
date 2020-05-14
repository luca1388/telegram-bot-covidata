const getCountryCovidDataUrl = (countryId) => `https://corona.lmao.ninja/v2/countries/${countryId}`;

exports.getItalyCovidDataUrl = getCountryCovidDataUrl('IT');
exports.getAllCovidDataUrl = "https://corona.lmao.ninja/v2/all";