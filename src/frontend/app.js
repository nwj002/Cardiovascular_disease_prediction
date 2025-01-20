document.getElementById("predict-risk-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const cholesterol = document.getElementById("cholesterol").value;
    const systolicBP = document.getElementById("systolicBP").value;
    const diastolicBP = document.getElementById("diastolicBP").value;
    const smoker = document.getElementById("smoker").value;

    // Create the payload
    const payload = {
        age: parseInt(age),
        gender: gender,
        cholesterol: parseFloat(cholesterol),
        systolicBP: parseFloat(systolicBP),
        diastolicBP: parseFloat(diastolicBP),
        smoker: smoker === "yes"
    };

    try {
        // Send a POST request to the backend
        const response = await fetch("/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        // Parse the JSON response
        const data = await response.json();

        // Display the prediction result
        document.getElementById("result").innerText = `Predicted Risk: ${data.prediction}`;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerText = "An error occurred. Please try again.";
    }
});
