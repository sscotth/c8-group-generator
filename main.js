var $input,
    $ul,
    url = 'https://yspuku7qvh9u4cr3.firebaseio.com/.json';

$(document).ready(init);

function init() {
  $input = $('input'),
  $ul    = $('ul');

  $input.change(getUpdateAndSplit);
  getUpdateAndSplit();
}

function getUpdateAndSplit(){
  var count = $input.val();

  $ul.empty();
  $.get(url, function(res){
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

