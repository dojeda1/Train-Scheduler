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

$("#submit").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#destination").val().trim();
    var trainTime = moment($("#firstTrainTime").val().trim(), "HHmm").format("X");
    var trainFrequency = $("#frequency").val().trim();

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log("Train Added");

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

});

database.ref().on("child_added", function (snapshot) {

    console.log(snapshot.val());

    // Store everything into a variable.
    var trainName = snapshot.val().name;
    var trainDestination = snapshot.val().destination;
    var trainTime = snapshot.val().time;
    var trainFrequency = snapshot.val().frequency;

    console.log("child added")
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

    var trainTimeFormatted = moment.unix(trainTime).format("HH:mm");
    console.log(trainTimeFormatted);

    var nextArrival = "12:00"
    var minutesAway = 15 + " min"

    var newRow = $("<div>");
    newRow.addClass("row")

    var newName = $("<p>").text(trainName);
    var newDestination = $("<p>").text(trainDestination);
    var newFrequency = $("<p>").text(trainFrequency);
    var newArrival = $("<p>").text(nextArrival);
    var newMinAway = $("<p>").text(minutesAway);

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

    // Append the new row to the table
    $("#new-train").append(newRow);
    $("#new-train").append(breakLine);



});