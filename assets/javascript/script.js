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
    var trainTime = moment($("#firstTrainTime").val().trim(), "HHmm").format("HH:mm");
    var trainFrequency = $("#frequency").val().trim();

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

});