// ===== Mobile Menu =====
document.querySelector(".hamburger").addEventListener("click", () => {
	document.querySelector(".nav-links").classList.toggle("active");
});

// ==== Page Detection === 
document.addEventListener("DOMContentLoaded", function () {
	const currentPage = window.location.pathname.split("/").pop();
	const navLinks = document.querySelectorAll(".nav-links a");

	navLinks.forEach((link) => {
		if (link.getAttribute("href") === currentPage) {
			link.classList.add("active");
		}
	});
});

// ===== BMI Calculator =====
function calculateBMI() {
	// Retrieve the input values
	const weight = parseFloat(document.getElementById("weight").value);
	const heightFt = parseFloat(document.getElementById("heightFt").value);
	const result = document.getElementById("bmi-result");

	// Validate inputs
	if (!weight || !heightFt || weight <= 0 || heightFt <= 0) {
		result.innerText = "Please enter valid values for weight and height.";
		return;
	}

	// Convert height from feet to meters (1 ft = 0.3048 m)
	const heightM = heightFt * 0.3048;
	const bmi = weight / (heightM * heightM);
	const bmiRounded = parseFloat(bmi.toFixed(1));

	// Determine BMI category with fun emojis
	let category = "";
	if (bmi < 18.5) category = "Underweight 🍔";
	else if (bmi < 25) category = "Normal 🎉";
	else if (bmi < 30) category = "Overweight ⚠️";
	else category = "Obese 🚨";

	// Display the numeric result and category
	result.innerHTML = `
        <div class="bmi-result">
            <h3>Your BMI: ${bmiRounded}</h3>
            <p>Category: ${category}</p>
        </div>
    `;
}

// ===== Workout Timer ===== (For Programs Page)
let workoutTimer;
let isTimerRunning = false;
let remainingTime = 0;

function startTimer(duration) {
	if (isTimerRunning) return;

	if (remainingTime === 0) {
		remainingTime = duration * 60;
	}

	isTimerRunning = true;
	const display = document.getElementById("timer-display");

	workoutTimer = setInterval(() => {
		const minutes = Math.floor(remainingTime / 60);
		let seconds = remainingTime % 60;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		display.textContent = `${minutes}:${seconds}`;

		if (--remainingTime < 0) {
			stopTimer();
			resetTimer();
			display.innerHTML = "Time's up! 🎉<br>Great job! 💪";
		}
	}, 1000);
}

function stopTimer() {
	clearInterval(workoutTimer);
	isTimerRunning = false;
}

function resetTimer() {
	stopTimer();
	remainingTime = 0;
	document.getElementById("timer-display").textContent = "20:00";
}

// Add after your timer functions
function splitButton() {
	document.getElementById("coward-button").style.display = "none";
	const splitButtons = document.getElementById("split-buttons");
	splitButtons.style.display = "flex";
	startTimer(20);
}

// ===== Image Gallery Slider ===== (For Gallery Page)
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(n) {
	slides.forEach((slide) => (slide.style.display = "none"));
	currentSlide = (n + slides.length) % slides.length;
	slides[currentSlide].style.display = "block";
}

// Auto-advance slides every 5 seconds
setInterval(() => showSlide(currentSlide + 1), 5000);

// Gallery Filter Functionality
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => 
            btn.classList.remove('active'));
        button.classList.add('active');

        // Filter gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            if(filter === 'all' || item.dataset.category === filter) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// for membership form
function validateForm(event) {
	event.preventDefault();
	const form = event.target;

	// Show success message
	const success = document.createElement("div");
	success.className = "success-message";
	success.innerHTML = `
        <h3>🎉 Welcome to the Community!</h3>
        <p>Check your email for verification and next steps</p>
    `;
	form.parentNode.insertBefore(success, form.nextSibling);

	// Reset form
	form.reset();

	return false;
}

// Lightbox Functionality
function openLightbox(src) {
    document.getElementById('lightbox').style.display = 'block';
    document.getElementById('lightbox-img').src = src;
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

// Add click handlers to gallery items
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        openLightbox(img.src);
    });
});

// Close lightbox on ESC key
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeLightbox();
});

// ===== Calorie Calculator ===== (For Resources Page)
function calculateCalories() {
	// Get input values
	const age = parseFloat(document.getElementById("age").value);
	const weight = parseFloat(document.getElementById("cal-weight").value); // Changed to match HTML ID
	const heightFt = parseFloat(document.getElementById("cal-height").value); // Changed to match HTML ID
	const activity = parseFloat(document.getElementById("activity").value);

	if (!age || !weight || !heightFt || !activity) {
		document.getElementById("calorie-result").innerHTML =
			"<p class='error'>Please fill in all fields</p>";
		return;
	}

	const heightCm = heightFt * 30.48;

	// Harris Benedict formula
	const bmr = 88.362 + 13.397 * weight + 4.799 * heightCm - 5.677 * age;
	const calories = Math.round(bmr * activity);

	document.getElementById("calorie-result").innerHTML = `
        <h3>Daily Calorie Needs: ${calories} kcal</h3>
        <p>Macro Breakdown:</p>
        <ul>
            <li>Protein: ${Math.round((calories * 0.3) / 4)}g</li>
            <li>Carbs: ${Math.round((calories * 0.4) / 4)}g</li>
            <li>Fats: ${Math.round((calories * 0.3) / 9)}g</li>
        </ul>
    `;
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		document.querySelector(this.getAttribute("href")).scrollIntoView({
			behavior: "smooth",
		});
	});
});

// ===== Form Validation =====
function validateForm(event) {
	event.preventDefault();
	const email = document.getElementById("email").value;
	if (!email.includes("@")) {
		showToast("Please enter a valid email!", "error");
		return false;
	}
	showToast("Form submitted successfully!", "success");
	return true;
}

// ===== Toast Notifications =====
function showToast(message, type) {
	const toast = document.createElement("div");
	toast.className = `toast ${type}`;
	toast.textContent = message;
	document.body.appendChild(toast);

	setTimeout(() => toast.remove(), 3000);
}

// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const answer = button.nextElementSibling;
        
        // Toggle active class
        faqItem.classList.toggle('active');
        
        // Toggle answer visibility
        if (faqItem.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = 0;
        }
        
        // Close other items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = 0;
            }
        });
    });
});