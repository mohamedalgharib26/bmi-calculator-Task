document.addEventListener("DOMContentLoaded", function () {
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");

  const heightInput1 = document.getElementById("ImperialHeightInput1");
  const heightInput2 = document.getElementById("ImperialHeightInput2");
  const weightInput1 = document.getElementById("ImperialWeightInput1");
  const weightInput2 = document.getElementById("ImperialWeightInput2");

  const resultDiv = document.getElementById("result");
  const metricRadio = document.getElementById("metric");
  const imperialRadio = document.getElementById("Imperial");

  const metricInputs = document.getElementById("metric-inputs");
  const imperialInputs = document.getElementById("Imperial-inputs");

  // Function to display BMI result
  function displayResult(bmi, bmiCategory) {
    resultDiv.innerHTML = `
      <p>Your BMI is ${bmi.toFixed(2)}</p>
      <span>Your BMI suggests you're ${bmiCategory}</span>
    `;
  }

  // Function to display invalid input message
  function displayInvalidInput() {
    resultDiv.innerHTML = `
      <p>Invalid input</p>
      <span>Enter your height and weight to see your BMI result</span>
    `;
  }

  // Function to calculate BMI
  function calculateBMI() {
    let height = parseFloat(heightInput.value);
    let weight = parseFloat(weightInput.value);
    let feet = parseFloat(heightInput1.value);
    let inches = parseFloat(heightInput2.value);
    let stones = parseFloat(weightInput1.value);
    let pounds = parseFloat(weightInput2.value);

    let bmi;

    // Calculate BMI for metric system
    if (metricRadio.checked) {
      if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        displayInvalidInput();
        return;
      }
      height = height / 100; // Convert height from cm to meters
      bmi = weight / (height * height);
    }
    // Calculate BMI for imperial system
    else if (imperialRadio.checked) {
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
        displayInvalidInput();
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
      displayResult(bmi, bmiCategory);
    }
  }

  // Function to toggle between metric and imperial input fields
  function toggleRadio() {
    if (this === metricRadio && metricRadio.checked) {
      imperialRadio.checked = false;
      imperialInputs.classList.remove("d-flex");
      imperialInputs.classList.add("d-none");
      metricInputs.classList.remove("d-none");
      metricInputs.classList.add("d-flex");
    } else if (this === imperialRadio && imperialRadio.checked) {
      metricRadio.checked = false;
      metricInputs.classList.remove("d-flex");
      metricInputs.classList.add("d-none");
      imperialInputs.classList.add("d-flex");
      imperialInputs.classList.remove("d-none");
    }
    calculateBMI();
  }

  // Function to add event listeners for BMI calculation
  function addEventListeners() {
    const elements = [
      heightInput,
      weightInput,
      heightInput1,
      heightInput2,
      weightInput1,
      weightInput2,
      metricRadio,
      imperialRadio,
    ];

    elements.forEach((element) => {
      element.addEventListener("input", calculateBMI);
      element.addEventListener("change", calculateBMI);
    });

    metricRadio.addEventListener("change", toggleRadio);
    imperialRadio.addEventListener("change", toggleRadio);
  }

  // Initialize event listeners
  addEventListeners();
});
