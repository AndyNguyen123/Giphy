const keyword = 'lofi';
let limit = 10;
const apiKey = 'gb4oRicOsjEcr63dKyDQzj585Ug48kB8';
const url = 'https://api.giphy.com/v1/gifs/search?q=' + keyword + '&apiKey=' + apiKey + '&limit=' + limit + '&rating=g&lang=en';

axios.get(url)
.then(function (resp) {
  console.log('success' + JSON.stringify(resp));
})
.catch(function (err) {
  console.log('error:' + err);
})