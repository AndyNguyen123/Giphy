let keyword;
let limit = 10;
const apiKey = 'gb4oRicOsjEcr63dKyDQzj585Ug48kB8';
const initThemes = ['mustache', 'sneaker head', 'monday', 'hypebeast']
let url;

$(document).ready(function () {
  initThemes.forEach(function (theme) {
    generateButton(theme);
  });
})

$(document).on('click', '#addThemeBtn', function () {
  const input = $('#themeInput').val().trim();
  if (initThemes.indexOf(input) === -1 && input !== '') {
    initThemes.push(input)
    const lastElement = initThemes[initThemes.length - 1];
    const newBtn = $(`<button type="button" class="btn mr-3 themeBtn" id='${lastElement}'>${lastElement}</button>`);
    newBtn.on('click', getGIF);
    $('#themeBtns').append(newBtn);
  };
})

function generateButton(theme) {
  const newBtn = $(`<button type="button" class="btn mr-3 themeBtn" id='${theme}'>${theme}</button>`);
  newBtn.on('click', getGIF);
  $('#themeBtns').append(newBtn);
}

function getGIF() {
  console.log(this);
  keyword = $(this).attr('id');
  console.log('keyword: ' + keyword);
  url = 'https://api.giphy.com/v1/gifs/search?q=' + keyword + '&apiKey=' + apiKey + '&limit=' + limit + '&rating=g&lang=en';
  $('#displayArea').empty();
  axios.get(url)
    .then(function (resp) {
      console.log(resp);
      for (let i = 0; i <= 9; i++) {
        const imageURL = resp.data.data[i].images.original_still.url;
        const gifURL = resp.data.data[i].images.downsized_large.url;
        const imageDiv = $(`<img src='${imageURL}' class='images m-3' id='image-${i}' data-image='${imageURL}' data-gif='${gifURL}' data-state='still'>`);
        imageDiv.on('click', animate);
        $('#displayArea').append(imageDiv);
      }
    })
    .catch(function (err) {
      console.log('error:' + err);
    })
};

function animate() {
  let state = $(this).attr('data-state');
  if (state === 'still') {
    $(this).attr('src', $(this).attr('data-gif'));
    $(this).attr('data-state', 'animated');
  }
  else {
    $(this).attr('src', $(this).attr('data-image'));
    $(this).attr('data-state', 'still');
  }
}