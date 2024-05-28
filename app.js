document.addEventListener("DOMContentLoaded", function () {
  console.log(5);
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");

  const heightInput1 = document.getElementById("ImperialHeightInput1");
  const heightInput2 = document.getElementById("ImperialHeightInput2");
  const weightInput1 = document.getElementById("ImperialWeightInput1");
  const weightInput2 = document.getElementById("ImperialWeightInput2");
  const resultDiv = document.getElementById("result");
  const metricRadio = document.getElementById("metric");
  const metricInputs = document.getElementById("metric-inputs");
  const ImperialInputs = document.getElementById("Imperial-inputs");
  const imperialRadio = document.getElementById("Imperial");

  function calculateBMI() {
    let height = parseFloat(heightInput.value);
    let weight = parseFloat(weightInput.value);

    // استدعاء الدالة عند تغيير أي من المدخلات

    let bmi;
    if (metricRadio.checked) {
      if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        resultDiv.innerHTML = `
        <p>Invalid input</p>
        <span>Enter your height and weight to see your BMI result</span>
      `;
        return;
      }
      // Metric system (height in cm, weight in kg)
      height = height / 100; // Convert height from cm to meters
      bmi = weight / (height * height);
    } else if (imperialRadio.checked) {
      const feet = parseFloat(heightInput1.value);
      const inches = parseFloat(heightInput2.value);
      const stones = parseFloat(weightInput1.value);
      const pounds = parseFloat(weightInput2.value);

      if (
        isNaN(feet) ||
        isNaN(inches) ||
        isNaN(stones) ||
        isNaN(pounds) ||
        feet < 0 ||
        inches < 0 ||
        stones < 0 ||
        pounds < 0
      ) {
        resultDiv.innerHTML = `
          <p>Invalid input</p>
          <span>Enter your height and weight to see your BMI result</span>
        `;
        return;
      }

      height = feet * 12 + inches; // Convert height to inches
      weight = stones * 14 + pounds; // Convert weight to pounds

      bmi = (weight / (height * height)) * 703;
    }

    let bmiCategory;
    if (bmi < 18.5) {
      bmiCategory = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      bmiCategory = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      bmiCategory = "Overweight";
    } else {
      bmiCategory = "Obese";
    }
    if (bmi) {
      resultDiv.innerHTML = `
      <p>Your BMI is ${bmi.toFixed(2)}</p>
      <span>Your BMI suggests you're ${bmiCategory}</span>
    `;
    }
  }
  function toggleRadio() {
    if (this === metricRadio && metricRadio.checked) {
      imperialRadio.checked = false;
      ImperialInputs.classList.remove("d-flex");
      ImperialInputs.classList.add("d-none");
      metricInputs.classList.remove("d-none");
      metricInputs.classList.add("d-flex");
    } else if (this === imperialRadio && imperialRadio.checked) {
      metricRadio.checked = false;
      metricInputs.classList.remove("d-flex");
      metricInputs.classList.add("d-none");
      ImperialInputs.classList.add("d-flex");
      ImperialInputs.classList.remove("d-none");
    }
    calculateBMI();
  }
  heightInput.addEventListener("input", calculateBMI);
  weightInput.addEventListener("input", calculateBMI);
  imperialRadio.addEventListener("change", calculateBMI);
  metricRadio.addEventListener("change", toggleRadio);
  imperialRadio.addEventListener("change", toggleRadio);

  heightInput1.addEventListener("change", calculateBMI);
  heightInput2.addEventListener("change", calculateBMI);
  weight1.addEventListener("change", calculateBMI);
  weight2.addEventListener("change", calculateBMI);
  metricRadio.addEventListener("change", calculateBMI);
});
