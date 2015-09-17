var objectArray = new Array;

var serverAddress = window.location.href; //have to figure out how to make this dynamic
var temp = serverAddress.split(":");
var serverAddress = 'http:'+temp[1];

console.log('SERVER ADDRESS: '+ serverAddress);

function Person(location, sex, notes){
  this.location =location;
  this.sex = sex;
  this.notes = notes;
}

function addRow(location){ 
    var radios = document.getElementsByName("GENDER");
    var notes = document.getElementById("notes");
    //var location = document.getElementById("location");
    var table = document.getElementById("myTableData");

    var sex = null;
 
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    
    for (var i = 0; i < radios.length; i++) {       
        if (radios[i].checked) {
            sex = radios[i].value;
            break;
        }
    }
 
    row.insertCell(0).innerHTML= '<input class="button med-btn" type="button" value = "Delete" onClick="Javacsript:deleteRow(this)">';
    row.insertCell(1).innerHTML= location;
    row.insertCell(2).innerHTML= sex;
    row.insertCell(3).innerHTML= notes.value;

    var place = new Person(location,sex,notes.value);
    JSON.stringify(place);
    objectArray.push(place);
    //objectArray.push("."); //delimeter between entries
}
 
function deleteRow(obj) {   
    var index = obj.parentNode.parentNode.rowIndex;
    var table = document.getElementById("myTableData");
    table.deleteRow(index);
    //objectArray = objectArray.remove(index);
    
    objectArray.splice(index,1); //something is schwifty here...
}
 
function load() {
    console.log("Page load finished");
    createPlaceButton();
}

function createPlaceButton(){
  console.log("placing buttons");
  var places=["Target","Walmart","Kohls","BestBuy","Starbucks","Safeway"];
  
  for(var i=0; i<places.length; i++){
    addButton("button",places[i],"placeButton");
  }
}

function addPlaceButton(){
  var textToAdd = document.getElementById("location");

  if(textToAdd.value){
    console.log("Create Button on user request");
    addButton("button", textToAdd.value,"placeButton");
    document.getElementById("location").value ='';
  }
  else{
    alert("Type in the Location in the text box.  Then push ADD.  Silly :)");
  }

}

function addButton(type,value,elementName) {
    //Create an input type dynamically.   
    var element = document.createElement('input');
    //Assign different attributes to the element. 
    
    element.type = type;
    element.value = value; 
    element.name = elementName;  
    element.onclick = function() {
        addRow(value);
    };

    var table = document.getElementById("places");

    table.appendChild(element);

    //Append the element in page (in span).  
    //foo.appendChild(element);
}

function dumpTable(){
  /*for(int i=0; i<= objectArray.length; i++){
    console.log("ObjectArray: "+objectArray.;
  }*/

  console.info(objectArray);
}

function SendPPLToServer(){
var socket = io.connect(serverAddress+':3000');

  socket.emit("objectTable", objectArray);
  /*
    socket.on('connection',function(){
    //console.log("Connected To Server...");
  });

  socket.on("objectTable", function () {
    console.log("Connected!");
    socket.emit("objectTable", objectArray);
    socket.disconnect();
  });
*/
}

function RequestStatsFromServer(){ 
  var socket = io.connect(serverAddress+':3000');
    socket.emit("requestSubmitted",'test');
    socket.on('requestSubmitted',function(objectListIn){
        console.info("OBJECTS: "+objectListIn+"\n ObjectCount: "+objectListIn.length);
        
        for(var i=0; i< objectListIn.length; i++){
         //var node = document.createElement("link");
         //var textnode = document.createTextNode(objectListIn[i]);
         //node.appendChild(textnode);
         //document.getElementById("output").innterHTML="<p>"+objectListIn[i]+"</p>);
          var leftDiv = document.createElement("div"); //Create left div
          leftDiv.id = "left"; //Assign div id
          leftDiv.setAttribute("style", "float:left; width:66.5%; line-height: 26px; text-align:left; font-size:12pt; padding-left:8px; height:26px;"); //Set div attributes
          leftDiv.style.background =  "#FF0000";
          a = document.createElement('a');
          a.href =  serverAddress+":8000/"+objectListIn[i]; // Insted of calling setAttribute 
          a.innerHTML = objectListIn[i] // <a>INNER_TEXT</a>
          leftDiv.appendChild(a); // Append the link to the div
          document.body.appendChild(leftDiv); // And append the div to the document body
        }
    });

}

function createUniqueUserToken(){
  
}