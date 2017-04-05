 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCDHJriFELii-zbCHB3d-W0NxmSd69adIc",
    authDomain: "train-scheduler-6fe47.firebaseapp.com",
    databaseURL: "https://train-scheduler-6fe47.firebaseio.com",
    projectId: "train-scheduler-6fe47",
    storageBucket: "train-scheduler-6fe47.appspot.com",
    messagingSenderId: "295462155327"
  };

  firebase.initializeApp(config);




// Create a variable to reference the database
  var database = firebase.database();

  $(":submit").on("click", display);

function display (){
		//get input values
		var displayName = $("#name").val().trim();
		var destination = $("#destination").val().trim();
		var firstTrain = $("#first-train").val().trim();
		var frequency = $("#frequency").val().trim();

		//setting up time


		
 

		 // Save the new price in Firebase
	    database.ref().push({
	      displayName: displayName,
	      destination: destination,
	      firstTrain: firstTrain, 
	      frequency: frequency,
	    
	    
	     
	    });


		$("#name").val('');
		$("#destination").val('');
		$("#first-train").val('');
		$("#frequency").val('');



}

 
// At the initial load, get a snapshot of the current data.
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

		


	  	//then at the initial load, get the current data.
	  	displayName = childSnapshot.val().displayName;
	  	destination = childSnapshot.val().destination;
	  	firstTrain = childSnapshot.val().firstTrain;
	  	frequency = childSnapshot.val().frequency;
	  	
	  	

	  	// First Time (pushed back 1 year to make sure it comes before current time)
	    var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
	    console.log(firstTimeConverted);

	    // Current Time
	    var currentTime = moment();
	    console.log("current " + moment(currentTime).format("hh:mm"));

	    // Difference between the times
	    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	    console.log("time difference " + diffTime);

	    // Time apart 
	    var tRemainder = diffTime % frequency;
	    console.log(tRemainder);

	    // Minute Until Train
	    var minutesAway = frequency - tRemainder;
	    console.log("minutes until next arrival: " + minutesAway);

	    // Next Train
	    var nextTrain = moment().add(minutesAway, "minutes");
	  	
	  	// Minute Until Train
	    var minutesAway = frequency - tRemainder;


		//display values in html
		$(".table").append("<tr>"+"<td>" + displayName + "</td>" + "<td>" + destination + "</td>" + "<td>" + firstTrain + "</td>"+ "<td>" + frequency + "</td>"+ "<td>" + minutesAway + "</td></tr>");
		console.log(displayName);

})




