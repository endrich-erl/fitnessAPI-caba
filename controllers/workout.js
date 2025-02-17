const Workout = require("../models/Workout");

module.exports.addWorkout = (req,res) => {

	let newWorkout = new Workout({
		name : req.body.name,
		duration : req.body.duration
	});

	newWorkout.save()
	.then(savedWorkout => res.status(201).send(savedWorkout))
	.catch(saveErr => {

		console.error("Error in saving the workout: ", saveErr)
		return res.status(500).send({ error: 'Failed to save the workout' });
	})

};

module.exports.getMyWorkouts = (req, res) => {

	Workout.find({})
	.then(workout => {

	    if (workout.length > 0){
	        return res.status(200).send({ workout });
	    }
	    else {

	        return res.status(200).send({ message: 'No workouts found.' })
	    }

	}).catch(err => res.status(500).send({ error: 'Error finding workouts.' }));

};

module.exports.updateWorkout = (req, res) => {

	let workoutUpdates = {
        name: req.body.name,
        duration: req.body.duration
    }

    return Workout.findByIdAndUpdate(req.params.id, workoutUpdates)
    .then(updatedWorkout => {

        if (!updatedWorkout) {

            return res.status(404).send({ error: 'Workout not found' });

        }

        return res.status(200).send({ 
        	message: 'Workout updated successfully', 
        	updatedWorkout: updatedWorkout 
        });

    })
    .catch(err => {
		console.error("Error in updating an Workout : ", err)
		return res.status(500).send({ error: 'Error in updating an Workout.' });
	});
};

module.exports.deleteWorkout = (req, res) => {

    return Workout.deleteOne({ _id: req.params.id})
    .then(deletedResult => {

        if (deletedResult < 1) {

            return res.status(400).send({ error: 'No Workout deleted' });

        }

        return res.status(200).send({ 
        	message: 'Workout deleted successfully'
        });

    })
    .catch(err => {
		console.error("Error in deleting an Workout : ", err)
		return res.status(500).send({ error: 'Error in deleting an Workout.' });
	});
};

module.exports.completeWorkoutStatus = (req, res) => {

    let updateActiveField = {
        status: "Complete"
    }
    
    return Workout.findByIdAndUpdate(req.params.id, updateActiveField)
    .then(workout => {
        if (workout) {
           if (workout.isActive === "Complete"){
                return res.status(200).send({
                    message: "Workout already completed",
                    workout: workout
                });
            } else {
                res.status(200).send({
                    status: "Complete",
                    message: "Workout complete"
                });
            }
        } else {
            res.status(404).send({message: "Workout not found"})
        }
    })
    .catch(error => errorHandler(error, req, res));
};