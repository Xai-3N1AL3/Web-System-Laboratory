const API_URL = '/api/workouts';

// Fetch and display all workouts
async function fetchWorkouts() {
    try {
        const response = await fetch(API_URL);
        const workouts = await response.json();

        const workoutsContainer = document.getElementById('workouts');
        workoutsContainer.innerHTML = '';

        workouts.forEach(workout => {
            const workoutElement = document.createElement('div');
            workoutElement.className = 'workout-item';
            workoutElement.innerHTML = `
                <div>
                    <strong>${workout.title}</strong>
                    <p>Reps: ${workout.reps}, Load: ${workout.load}kg</p>
                </div>
                <div>
                    <button class="edit-button" onclick="editWorkout('${workout._id}', '${workout.title}', ${workout.reps}, ${workout.load})">Edit</button>
                    <button onclick="deleteWorkout('${workout._id}')">Delete</button>
                </div>
            `;
            workoutsContainer.appendChild(workoutElement);

            // Fade-in effect for new workouts
            setTimeout(() => {
                workoutElement.style.opacity = 1;
            }, 100);
        });
    } catch (error) {
        console.error('Error fetching workouts:', error);
    }
}

// Add a new workout
async function addWorkout() {
    const title = document.getElementById('title').value;
    const reps = document.getElementById('reps').value;
    const load = document.getElementById('load').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, reps, load })
        });

        if (response.ok) {
            document.getElementById('title').value = '';
            document.getElementById('reps').value = '';
            document.getElementById('load').value = '';
            fetchWorkouts();
        } else {
            const error = await response.json();
            alert(error.error);
        }
    } catch (error) {
        console.error('Error adding workout:', error);
    }
}

// Delete a workout
async function deleteWorkout(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchWorkouts();
        } else {
            const error = await response.json();
            alert(error.error);
        }
    } catch (error) {
        console.error('Error deleting workout:', error);
    }
}

// Edit a workout
async function editWorkout(id, title, reps, load) {
    const newTitle = prompt('Edit Title:', title);
    const newReps = prompt('Edit Reps:', reps);
    const newLoad = prompt('Edit Load (kg):', load);

    if (newTitle && newReps && newLoad) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: newTitle, reps: newReps, load: newLoad })
            });

            if (response.ok) {
                fetchWorkouts();
            } else {
                const error = await response.json();
                alert(error.error);
            }
        } catch (error) {
            console.error('Error updating workout:', error);
        }
    }
}

// Initialize
fetchWorkouts();
