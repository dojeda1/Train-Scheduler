// Initialize Firebase
var config = {
    apiKey: "AIzaSyC_Sn5HKzXOJK4LhYCAC7IpZg_RNAjbh8k",
    authDomain: "awesome-train-scheduler.firebaseapp.com",
    databaseURL: "https://awesome-train-scheduler.firebaseio.com",
    projectId: "awesome-train-scheduler",
    storageBucket: "",
    messagingSenderId: "787171998514"
};
firebase.initializeApp(config);
var database = firebase.database();

var trainName = "";
var trainDestination = "";
var trainTime = "";
var trainFrequency = "";
var nextArrival = "";
var minutesAway = "";

var selectTrainName = $("#trainName");
var selectTrainDestination = $("#destination");
// form validation for Time using jQuery Mask plugin
var selectTrainTime = $("#firstTrainTime").mask("00:00");
var selectTrainFreq = $("#frequency").mask("000");




// Add train to Firebase
var storeTrainData = function (event) {
    event.preventDefault();

    var trainName = selectTrainName.val().trim();
    var trainDestination = selectTrainDestination.val().trim();
    var trainTime = moment(selectTrainTime.val().trim(), "HH:mm").subtract(1, "years").format("X");;
    var trainFrequency = selectTrainFreq.val().trim();

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway,
        date_added: firebase.database.ServerValue.TIMESTAMP
    };

    database.ref("/trains").push(newTrain);

    console.log("Train Added");

    selectTrainName.val("");
    selectTrainDestination.val("");
    selectTrainTime.val("");
    selectTrainFreq.val("");

};


// Event Listener for change in Firebase database
// updates current train Schedule
database.ref("/trains").on("child_added", function (snapshot) {

    console.log(snapshot.val());
    console.log("--------")
    console.log("Print Train")

    // Store everything into a variable.
    var trainName = snapshot.val().name;
    var trainDestination = snapshot.val().destination;



    var trainDiff = 0;
    var trainRemainder = 0;
    var minutesTillArrival = "";
    var nextTrainTime = "";
    var trainFrequency = snapshot.val().frequency;

    trainDiff = moment().diff(moment.unix(snapshot.val().time), "minutes");
    console.log("Train Diff: " + trainDiff)

    trainRemainder = trainDiff % trainFrequency;
    console.log('trainRemainder: ', trainRemainder);

    minutesTillArrival = trainFrequency - trainRemainder;
    console.log(' minutesTillArrival: ', minutesTillArrival);

    nextTrainTime = moment().add(minutesTillArrival, "m").format("hh:mm A");
    console.log('nextTrainTime: ', nextTrainTime);

    var newRow = $("<div>");
    newRow.addClass("row")

    var newName = $("<p>").text(trainName);
    var newDestination = $("<p>").text(trainDestination);
    var newFrequency = $("<p>").text(trainFrequency);
    var newArrival = $("<p>").text(nextTrainTime);
    var newMinAway = $("<p>").text(minutesTillArrival);

    $(newName).addClass("card-title col-sm-2 mx-auto my-0")
    $(newDestination).addClass("card-title col-sm-2 mx-auto my-0")
    $(newFrequency).addClass("card-title col-sm-2 mx-auto my-0")
    $(newArrival).addClass("card-title col-sm-2 mx-auto my-0")
    $(newMinAway).addClass("card-title col-sm-2 mx-auto my-0")

    newRow.append(
        newName,
        newDestination,
        newFrequency,
        newArrival,
        newMinAway,

    );

    var breakLine = $("<hr class='my-2'>")

    // Appends new row to the table
    $("#new-train").append(newRow);
    $("#new-train").append(breakLine);

    console.log("-------")

});

$("#submit").on("click", function (event) {
    // form validation - if empty - alert
    if (selectTrainName.val().length === 0 || selectTrainDestination.val().length === 0 || selectTrainTime.val().length === 0 || selectTrainFreq.val().length === 0) {
        console.log("all fields not added!");
    } else {
        // if form is filled out, run function
        storeTrainData(event);
    }
});