var input = document.querySelector('input'),
    ul    = document.querySelector('ul'),
    url   = 'https://yspuku7qvh9u4cr3.firebaseio.com/.json';

input.addEventListener('change', getUpdateAndSplit);
document.addEventListener('DOMContentLoaded', getUpdateAndSplit);

function getUpdateAndSplit(){
  var count = input.value;

  ul.innerHTML = '';
  getJSON(url, function(res){
    var chunkedStudents = chunkData(res['c8-students'], count);
    ul.appendChild(createList(chunkedStudents));
  });
};

function chunkData(data, count){
  return _(data)
    .map(function(value){
      return value.firstName + ' ' + value.lastName[0] + '.';
    })
    .shuffle()
    .chunk(count)
    .value();
}

function createList(array) {
  var docFragment = document.createDocumentFragment();

  _.forEach(array, function(team){
    var ol = document.createElement('ol');

    _.forEach(team, function(teamMember){
      var li = document.createElement('li');
      var text = document.createTextNode(teamMember);
      li.appendChild(text);
      ol.appendChild(li);
    })

    docFragment.appendChild(ol);
  })

  return docFragment;
}

function getJSON(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);

  xhr.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      cb(JSON.parse(this.response));
    }
  };

  xhr.send()
}
