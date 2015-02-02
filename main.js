var $input = $('input'),
    $ul    = $('ul'),
    url    = 'https://yspuku7qvh9u4cr3.firebaseio.com/.json';

$input.change(getUpdateAndSplit);
document.addEventListener('DOMContentLoaded', getUpdateAndSplit);

function getUpdateAndSplit(){
  var count = $input.val();

  $ul.empty();
  getJSON(url, function(res){
    var chunkedStudents = chunkData(res['c8-students'], count);
    $ul.append(createList(chunkedStudents));
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
  var groupList = [];

  _.forEach(array, function(team){
    var $ol = $('<ol></ol>');

    _.forEach(team, function(teamMember){
      var $li = $('<li>' + teamMember +'</li>');
      $ol.append($li);
    });

    groupList.push($ol);
  });

  return groupList;
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
