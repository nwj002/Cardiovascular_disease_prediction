document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("riskForm");
    if (!form) {
        console.error("Form not found. Make sure the HTML file is loading correctly.");
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from reloading the page

        const formData = {
            age: parseInt(document.getElementById("age").value),
            education: parseInt(document.getElementById("education").value),
            currentSmoker: parseInt(document.getElementById("currentSmoker").value),
            cigsPerDay: parseFloat(document.getElementById("cigsPerDay").value),
            BPMeds: parseInt(document.getElementById("BPMeds").value),
            prevalentStroke: parseInt(document.getElementById("prevalentStroke").value),
            prevalentHyp: parseInt(document.getElementById("prevalentHyp").value),
            diabetes: parseInt(document.getElementById("diabetes").value),
            totChol: parseFloat(document.getElementById("totChol").value),
            sysBP: parseFloat(document.getElementById("sysBP").value),
            diaBP: parseFloat(document.getElementById("diaBP").value),
            BMI: parseFloat(document.getElementById("BMI").value),
            heartRate: parseFloat(document.getElementById("heartRate").value),
            glucose: parseFloat(document.getElementById("glucose").value)
        };

        console.log("Sending Data:", formData); // Debugging: Check if data is being sent correctly

        fetch("http://127.0.0.1:3000/predict/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error in response from backend");
                }
                return response.json();
            })
            .then(data => {
                console.log("Prediction Data Received:", data); // Debugging: Check response in console

                const bestModelProb = (data.best_model_probability * 100).toFixed(2);
                const finalModelProb = (data.final_model_probability * 100).toFixed(2);
                const averageProb = ((parseFloat(bestModelProb) + parseFloat(finalModelProb)) / 2).toFixed(2);

                let riskMessage;
                if (averageProb < 30) {
                    riskMessage = "Low Risk: It's unlikely you will develop cardiovascular disease in the next 10 years.";
                } else if (averageProb < 70) {
                    riskMessage = "Moderate Risk: You have a moderate chance of developing cardiovascular disease.";
                } else {
                    riskMessage = "High Risk: You are at high risk of developing cardiovascular disease.";
                }

                document.getElementById("result").innerHTML = `
                <h2>Prediction Results</h2>
                <p><strong>Best Model Probability:</strong> ${bestModelProb}%</p>
                <p><strong>Final Model Probability:</strong> ${finalModelProb}%</p>
                <p><strong>Average Probability:</strong> ${averageProb}%</p>
                <p><strong>Risk Level:</strong> ${riskMessage}</p>
            `;
            })
            .catch(error => {
                console.error("Error:", error);
                document.getElementById("result").innerHTML = `<p>Error: Could not retrieve prediction. Ensure backend is running.</p>`;
            });
    });
});
