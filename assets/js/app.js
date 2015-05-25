function Dancefloor(parseJSON) {
    // var r = new XMLHttpRequest();
    // r.open('GET', 'http://www.theyworkforyou.com/api/getMPs?key=E5L2aTCuvEZnAXuVfyGN83sM&output=js', true);
    // r.load = function () {
        // if (r.readyState === 4 && r.status === 200) {
            // parseJSON(r.responseText);

        // } else {
            // console.log('request failed');

        // }
    // };
    // r.send(null);
    $.getJSON('mp.json').done(function(data) {    
        parseJSON(data);
    });
}


function Tile(speed) {
    var self = this;
    this.interval = null;
    this.data = Dancefloor.data;
    this.speed = speed;

    this.init = function () {
        this.newMP();
    };
}        

Tile.prototype.load_json = function(callback) {
    var r = new XMLHttpRequest();
    r.open('GET', "mp.json", true);
    r.onreadystatechange = function () {
        if (r.readyState === 4 && r.status === 200) { // successfully
                //var json = JSON.parse(httpRequest.responseText);
                callback(r.responseText); // we're calling our method
        }
    };
    r.send(null);
};

Tile.prototype.newMP = function() {
    
    var bg_color;
    var d = Dancefloor.data;
    //for (i=0; i < d.length; i ++) {

      var div = document.createElement("div"); 
      document.getElementById('container').appendChild(div);
        
      this.interval = setTimeout(function a() {

        var id = Math.floor(Math.random() * d.length);
        //var first_name = d[id].name.split(' ')[0];  
        bg_color = d[id].party;
        
        div.className = 'tile ' + bg_color.replace('é', 'e');
        div.className = 'tile ' + bg_color.replace(/[\s+\/]/g, '-').toLowerCase();

        //div.innerHTML = first_name;        
        setTimeout(a, 500);
      }, 1000);
    //}
    //this.shuffle_tiles(data);
};

Tile.prototype.shuffle_tiles = function(data) {
  var d = data;
  console.log(d);
};

    
    // // sort by party
    // d.sort(function(a, b) {
    //     var a = a.party.toLowerCase(), b = b.party.toLowerCase();
    //     if (a < b) { return -1; }
    //     if (a > b) { return 1; }
    //     return 0;
    // })

    // for (i=0; i < d.length -1; i ++) {
    //     var m = d[i], name = m.name, party = m.party;
    //     var first_name = name.split(' ')[0], surname = name.split(' ')[1];

    //     var div = document.createElement("div");
    //     div.id = _.uniqueId('m'); 
    //     div.className = 'tile ' + party.replace(/\s+/g, '').toLowerCase();
    //     document.getElementById('container').appendChild(div);
    //     div.innerHTML = first_name;
    // }

Tile.prototype.stop = function() {
    clearInterval(this.interval);
};

var Dancefloor = new Dancefloor(function(response){
    Dancefloor.data = response;
    generate(650);
});

function generate(i) {     // self executing          
  setTimeout(function () {   
    var tile = new Tile();
    tile.init(); 
    if (--i) generate(i);   //  decrement i, 0 is falsy, will terminate at 0
  }, 10);                  // time between tile generation
}

// Verbose method of above
// function generate(i) { 
//   setTimeout(newTiles(i),10)
// }

// function newTiles(i) {
//   var tile = new Tile;
//   tile.init();
//   if (--i) {
//     generate(i);
//   }
// }

// generate(100);
