document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const heightSlider = document.getElementById('height');
    const weightSlider = document.getElementById('weight');
    const heightValue = document.getElementById('height-value');
    const weightValue = document.getElementById('weight-value');
    const calculateBtn = document.getElementById('calculate-btn');
    const bmiValue = document.getElementById('bmi-value');
    const resultCategory = document.getElementById('result-category');
    const bmiIndicator = document.getElementById('bmi-indicator');
    const resultCircle = document.getElementById('result-circle');
    const bmiTips = document.getElementById('bmi-tips');

    // Update displayed values when sliders move
    heightSlider.addEventListener('input', function() {
        heightValue.textContent = `${this.value} cm`;
    });

    weightSlider.addEventListener('input', function() {
        weightValue.textContent = `${this.value} kg`;
    });

    // Calculate BMI when button clicked
    calculateBtn.addEventListener('click', calculateBMI);

    // Also calculate when sliders change (for real-time update)
    heightSlider.addEventListener('change', calculateBMI);
    weightSlider.addEventListener('change', calculateBMI);

    function calculateBMI() {
        const height = parseFloat(heightSlider.value) / 100; // Convert cm to m
        const weight = parseFloat(weightSlider.value);
        
        if (height && weight) {
            const bmi = (weight / (height * height)).toFixed(1);
            displayResults(bmi);
        }
    }

    function displayResults(bmi) {
        // Update BMI value display
        bmiValue.textContent = bmi;
        
        // Determine category and colors
        let category, color, tip;
        
        if (bmi < 18.5) {
            category = "Underweight";
            color = "var(--underweight)";
            tip = "Consider increasing calorie intake with nutrient-rich foods and strength training to build healthy muscle mass.";
        } else if (bmi >= 18.5 && bmi <= 24.9) {
            category = "Healthy Weight";
            color = "var(--healthy)";
            tip = "Great job! Maintain your healthy weight with regular exercise and balanced nutrition.";
        } else if (bmi >= 25 && bmi <= 29.9) {
            category = "Overweight";
            color = "var(--overweight)";
            tip = "Focus on moderate-intensity cardio and strength training. Consider portion control and reducing processed foods.";
        } else {
            category = "Obese";
            color = "var(--obese)";
            tip = "Consult with our trainers for a personalized plan. Start with low-impact activities and focus on gradual changes.";
        }
        
        // Update category display
        resultCategory.innerHTML = `
            <i class="ri-information-line"></i>
            <p>${category}</p>
        `;
        
        // Update visual indicator position (0-100% scale)
        let indicatorPosition;
        if (bmi < 15) indicatorPosition = 0;
        else if (bmi > 40) indicatorPosition = 100;
        else indicatorPosition = ((bmi - 15) / 25) * 100;
        
        bmiIndicator.style.left = `${indicatorPosition}%`;
        bmiIndicator.style.background = color;
        bmiIndicator.style.borderColor = color;
        
        // Update result circle
        resultCircle.style.border = `5px solid ${color}`;
        resultCircle.style.boxShadow = `0 0 20px ${color.replace(')', ', 0.3)')}`;
        
        // Update tips
        bmiTips.innerHTML = `
            <h3><i class="ri-lightbulb-flash-line"></i> HEALTH TIPS</h3>
            <p>${tip}</p>
        `;
        
        // Animate the result
        resultCircle.style.transform = "scale(1.1)";
        setTimeout(() => {
            resultCircle.style.transform = "scale(1)";
        }, 300);
    }
    
    // Initialize with default values
    calculateBMI();
});

function showsidebar(){
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "block";
}
function closesidebar(){
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
}