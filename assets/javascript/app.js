// Initialize Firebase
var config = {
    apiKey: "AIzaSyBavmPOcdh0tsalbMuagsorXgYfjP0yBus",
    authDomain: "first-firebase-project-9eb14.firebaseapp.com",
    databaseURL: "https://first-firebase-project-9eb14.firebaseio.com",
    projectId: "first-firebase-project-9eb14",
    storageBucket: "first-firebase-project-9eb14.appspot.com",
    messagingSenderId: "766074423323"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event){
      event.preventDefault();

      var trainName = $("#train-name-input").val().trim();
      var trainDestination = $("#destination-input").val().trim();
      var trainFrequency = $("#frequency-input").val().trim();
      var trainTime = moment($("#first-time-input").val().trim(), "hh:mm").format("X");

      var newTrain = {
          name: trainName,
          destination: trainDestination,
          frequency: trainFrequency,
          time: trainTime,
      };

      database.ref().push(newTrain);
      console.log(newTrain.name);
      console.log(newTrain.destination);
      console.log(newTrain.frequency);
      console.log(newTrain.time);

      $("#train-name-input").val("");
      $("#destination-input").val("");
      $("#frequency-input").val("");
      $("#first-time-input").val("");
  });

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      console.log(childSnapshot.val());
  

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainFrequency = childSnapshot.val().frequency;
  var trainTime = childSnapshot.val().time;

  var trainTimePretty = moment.unix(trainTime);
  console.log("train" + trainTimePretty);
  
  var firstTimeConverted = moment(trainTimePretty).subtract(1, "years");
  console.log("first time: " + firstTimeConverted);

  var currentTime = moment();
  console.log("Current time:" + currentTime);

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("difference in time: " + diffTime);

  var tRemainder = diffTime % trainFrequency;
  console.log(tRemainder);
// 
  var trainMinutesAway = trainFrequency - tRemainder;
  console.log("minutes until train: " + trainMinutesAway)
    console.log("frequency: " + trainFrequency);
   

  var nextTrain = moment().add(trainMinutesAway, "minutes").format("hh:mm");
  console.log(trainMinutesAway);

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrain + "</td><td>" + trainMinutesAway + "</td></tr>")
  });