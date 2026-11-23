// Chatbot Memory
let chatMemory = JSON.parse(localStorage.getItem("chatMemory")) || [];

function saveMemory(userMessage, botReply) {
    chatMemory.push({
        user: userMessage,
        bot: botReply
    });

    chatMemory = chatMemory.slice(-20);

    localStorage.setItem("chatMemory", JSON.stringify(chatMemory));
}
function startAssistant() {
    document.querySelector(".career-box").scrollIntoView({
        behavior: "smooth"
    });
}

function getCareer() {

    let name = document.getElementById("username").value;
    let education = document.getElementById("education").value;
    let skills = document.getElementById("skills").value;

    if (!name || !education || !skills) {
        alert("Please fill in all fields!");
        return;
    }

    let result = document.getElementById("result");

    result.innerHTML = `
        <h3>Hello ${name}!</h3>
        <p>Your Education: ${education}</p>
        <p>Your Skills: ${skills}</p>
        <h3>Career Assistant</h3>
        <p>Your career profile has been created successfully!</p>
        <p>Next, we will add smart career recommendations.</p>
    `;
}

function startAssistant() {
    document.querySelector(".career-box").scrollIntoView({
        behavior: "smooth"
    });
}

function getCareer() {

    let name = document.getElementById("username").value;
    let education = document.getElementById("education").value;
    let skills = document.getElementById("skills").value.toLowerCase();

    if (!name || !education || !skills) {
        alert("Please fill in all fields!");
        return;
    }

    let career = "";

    if (skills.includes("html") || skills.includes("css") ||
        skills.includes("javascript")) {
        career = "Web Developer";
    }
    else if (skills.includes("design")) {
        career = "Graphic Designer";
    }
    else if (skills.includes("marketing")) {
        career = "Digital Marketer";
    }
    else if (skills.includes("python")) {
        career = "Python Developer";
    }
    else if (skills.includes("seo")) {
        career = "SEO Specialist";
    }
    else {
        career = "Explore Web Development, Digital Marketing or IT.";
    }

    document.getElementById("result").innerHTML = `
        <h3>Hello ${name}!</h3>
        <p>Education: ${education}</p>
        <p>Skills: ${skills}</p>
        <h3>Your Suggested Career:</h3>
        <h2>${career}</h2>
        <p>Keep learning and improving your skills!</p>
    `;
}

function assessSkills() {

    let selectedSkills = [];

    document.querySelectorAll(
        '.skill-options input:checked'
    ).forEach(function(skill) {
        selectedSkills.push(skill.value);
    });

    if (selectedSkills.length === 0) {
        alert("Please select at least one skill!");
        return;
    }

    let career = [];

    if (selectedSkills.includes("HTML") ||
        selectedSkills.includes("CSS") ||
        selectedSkills.includes("JavaScript")) {
        career.push("Web Developer");
    }

    if (selectedSkills.includes("Python")) {
        career.push("Python Developer");
    }

    if (selectedSkills.includes("SEO") ||
        selectedSkills.includes("Digital Marketing")) {
        career.push("Digital Marketing Specialist");
    }

    if (selectedSkills.includes("Graphic Design")) {
        career.push("Graphic Designer");
    }

    if (selectedSkills.includes("Communication")) {
        career.push("Customer Support Specialist");
    }

    if (career.length === 0) {
        career.push("Explore more technical and professional skills.");
    }

    document.getElementById("skillResult").innerHTML = `
        <h3>Your Selected Skills:</h3>
        <p>${selectedSkills.join(", ")}</p>
        <h3>Recommended Careers:</h3>
        <p>${career.join("<br>")}</p>
    `;
}
function sendMessage() {

    let input = document.getElementById("chatInput");
    let messages = document.getElementById("chatMessages");

    let userMessage = input.value.trim();

    if (userMessage === "") {
        alert("Please enter a message!");
        return;
    }

    // User message
    let userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.textContent = userMessage;

    messages.appendChild(userDiv);
    saveChat();

    // Bot response
    let botDiv = document.createElement("div");
    botDiv.className = "bot-message";

    let question = userMessage.toLowerCase();

    if (question.includes("hello") ||
        question.includes("hi")) {

        botDiv.textContent =
            "Hello! Welcome. How can I help you?";

    } else if (question.includes("career")) {

        botDiv.textContent =
            "I can help you choose a career according to your education and skills.";

    } else if (question.includes("web developer")) {

        botDiv.textContent =
            "To become a Web Developer, learn HTML, CSS, JavaScript and React.";

    } else if (question.includes("germany")) {

        botDiv.textContent =
            "For a web developer job in Germany, improve your coding skills, build projects and prepare a professional CV.";

    } else if (question.includes("cv") ||
               question.includes("resume")) {

        botDiv.textContent =
            "A professional CV should include your education, skills, projects and experience.";

    } else if (question.includes("skills")) {

        botDiv.textContent =
            "Important skills include HTML, CSS, JavaScript, communication and problem solving.";

    } else {

        botDiv.textContent =
            "Sorry! I don't know this answer yet. Please ask about career, web development or Germany jobs.";

    }

    messages.appendChild(botDiv);
    if (document.getElementById("voiceReply").checked) {
    speakAnswer(botDiv.textContent);
}
    input.value = "";

    messages.scrollTop = messages.scrollHeight;
    saveChat();
}

// Enter key support
document.getElementById("chatInput")
.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});


let conversationHistory = [];


function clearChat() {

    let messages = document.getElementById("chatMessages");

    messages.innerHTML = `
        <div class="bot-message">
            Hello! Welcome to AI Career Assistant.
            How can I help you?
        </div>
    `;

    conversationHistory = [];
}
conversationHistory.push({
    role: "user",
    message: userMessage
});
conversationHistory.push({
    role: "bot",
    message: botDiv.textContent
});

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Your browser does not support voice recognition. Please use Google Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function() {
        document.getElementById("chatInput").placeholder =
            "Listening... Speak now";
    };

    recognition.onresult = function(event) {

        const transcript =
            event.results[0][0].transcript;

        document.getElementById("chatInput").value =
            transcript;

        sendMessage();
    };

    recognition.onerror = function() {
        alert("Voice recognition failed. Please try again.");
    };

    recognition.onend = function() {
        document.getElementById("chatInput").placeholder =
            "Type your question...";
    };

    recognition.start();
}

let recognition;

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Please use Google Chrome for voice recognition.");
        return;
    }

    recognition = new SpeechRecognition();

    // English voice recognition
    recognition.lang = "en-US";

    recognition.continuous = false;
    recognition.interimResults = false;

    const micButton = document.getElementById("micButton");

    recognition.onstart = function() {
        micButton.classList.add("listening");
        micButton.textContent = "🔴 Listening...";
    };

    recognition.onresult = function(event) {

        const transcript =
            event.results[0][0].transcript;

        document.getElementById("chatInput").value =
            transcript;

        sendMessage();
    };

    recognition.onerror = function(event) {
        console.log("Voice error:", event.error);
        alert("Voice recognition failed. Please try again.");
    };

    recognition.onend = function() {
        micButton.classList.remove("listening");
        micButton.textContent = "🎤 Speak";
    };

    recognition.start();
}

function speakAnswer(text) {

    if (!("speechSynthesis" in window)) {
        alert("Voice output is not supported in this browser.");
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}

function stopSpeaking() {
    window.speechSynthesis.cancel();
}

function clearChat() {

    let messages = document.getElementById("chatMessages");

    messages.innerHTML = "";

    localStorage.removeItem("careerChatHistory");

    alert("Chat history cleared!");

    window.speechSynthesis.cancel();

}

// Send message by pressing Enter
document.getElementById("chatInput").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});

function saveChat() {

    let messages = document.getElementById("chatMessages");

    localStorage.setItem(
        "careerChatHistory",
        messages.innerHTML
    );

}

function loadChat() {

    let messages = document.getElementById("chatMessages");

    let savedChat = localStorage.getItem("careerChatHistory");

    if (savedChat) {
        messages.innerHTML = savedChat;
    }

}

window.addEventListener("load", loadChat);

function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    let button = document.getElementById("themeBtn");

    if (document.body.classList.contains("dark-mode")) {

        button.textContent = "☀️ Light Mode";

        localStorage.setItem("websiteTheme", "dark");

    } else {

        button.textContent = "🌙 Dark Mode";

        localStorage.setItem("websiteTheme", "light");

    }

}

// Save theme after refresh
window.addEventListener("load", function() {

    let savedTheme = localStorage.getItem("websiteTheme");

    let button = document.getElementById("themeBtn");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        button.textContent = "☀️ Light Mode";

    }

});

// Career Recommendation System

function recommendCareer() {

    let name = document.getElementById("studentName").value.trim();

    let education = document.getElementById("education").value;

    let skills = document.getElementById("skills").value;

    let interest = document.getElementById("interest").value;

    let result = document.getElementById("careerResult");

    if (name === "" || education === "" ||
        skills === "" || interest === "") {

        result.innerHTML =
            "Please fill all fields before submitting!";

        return;
    }

    let career = "";
    let nextSkills = "";

    if (interest === "web" || skills === "web") {

        career = "Web Developer";
        nextSkills = "React.js, Bootstrap, Git and GitHub";

    } else if (interest === "design" || skills === "design") {

        career = "Graphic Designer";
        nextSkills = "Photoshop, Illustrator and Canva";

    } else if (interest === "marketing" || skills === "marketing") {

        career = "Digital Marketing Specialist";
        nextSkills = "SEO, Social Media Marketing and Google Ads";

    } else if (interest === "business") {

        career = "Business Entrepreneur";
        nextSkills = "Communication, Management and Marketing";

    } else if (skills === "computer") {

        career = "IT Support Specialist";
        nextSkills = "Computer Networking and Troubleshooting";

    }

    result.innerHTML = `
        <h3>Hello ${name}!</h3>

        <h4>Your Education:</h4>
        <p>${education}</p>

        <h4>Recommended Career:</h4>
        <h2>${career}</h2>

        <h4>Skills to Learn Next:</h4>
        <p>${nextSkills}</p>

        <p>Keep learning and building your future!</p>
    `;

}
console.log("Career Recommendation JavaScript Loaded");


function recommendCareer() {

    let name = document.getElementById("studentName").value.trim();
    let education = document.getElementById("education").value;
    let skills = document.getElementById("skills").value;
    let interest = document.getElementById("interest").value;

    let result = document.getElementById("careerResult");

    // Check form fields
    console.log("Name:", name);
    console.log("Education:", education);
    console.log("Skills:", skills);
    console.log("Interest:", interest);

    if (name === "" || education === "" ||
        skills === "" || interest === "") {

        result.innerHTML = "Please fill all fields!";
        return;
    }

    let career = "";
    let nextSkills = "";

    if (interest === "web" || skills === "web") {
        career = "Web Developer";
        nextSkills = "React.js, Bootstrap, Git and GitHub";
    }
    else if (interest === "design" || skills === "design") {
        career = "Graphic Designer";
        nextSkills = "Photoshop, Illustrator and Canva";
    }
    else if (interest === "marketing" || skills === "marketing") {
        career = "Digital Marketing Specialist";
        nextSkills = "SEO, Social Media Marketing and Google Ads";
    }
    else if (interest === "business") {
        career = "Business Entrepreneur";
        nextSkills = "Communication and Management";
    }
    else if (skills === "computer") {
        career = "IT Support Specialist";
        nextSkills = "Networking and Troubleshooting";
    }

    result.innerHTML = `
        <h3>Hello ${name}!</h3>
        <h4>Education: ${education}</h4>
        <h2>Recommended Career: ${career}</h2>
        <h4>Skills to Learn Next:</h4>
        <p>${nextSkills}</p>
    `;
}

// Career Roadmap Generator

function generateRoadmap() {

    let career = document.getElementById("roadmapCareer").value;

    let result = document.getElementById("roadmapResult");

    if (career === "") {

        result.innerHTML = "Please select your career first!";
        return;
    }

    let roadmap = "";

    if (career === "web") {

        roadmap = `
            <h3>Web Developer Roadmap</h3>

            <h4>Step 1: Beginner</h4>
            <ul>
                <li>Learn HTML</li>
                <li>Learn CSS</li>
                <li>Learn Bootstrap</li>
            </ul>

            <h4>Step 2: Intermediate</h4>
            <ul>
                <li>Learn JavaScript</li>
                <li>Learn DOM Manipulation</li>
                <li>Build Website Projects</li>
            </ul>

            <h4>Step 3: Advanced</h4>
            <ul>
                <li>Learn React.js</li>
                <li>Learn Git and GitHub</li>
                <li>Build Professional Projects</li>
            </ul>

            <h4>Estimated Duration:</h4>
            <p>6 to 12 Months</p>
        `;

    } else if (career === "design") {

        roadmap = `
            <h3>Graphic Designer Roadmap</h3>

            <h4>Step 1: Beginner</h4>
            <ul>
                <li>Learn Design Basics</li>
                <li>Learn Color Theory</li>
                <li>Learn Canva</li>
            </ul>

            <h4>Step 2: Intermediate</h4>
            <ul>
                <li>Learn Photoshop</li>
                <li>Learn Illustrator</li>
                <li>Create Social Media Designs</li>
            </ul>

            <h4>Step 3: Advanced</h4>
            <ul>
                <li>Build a Design Portfolio</li>
                <li>Practice Professional Projects</li>
            </ul>

            <h4>Estimated Duration:</h4>
            <p>4 to 8 Months</p>
        `;

    } else if (career === "marketing") {

        roadmap = `
            <h3>Digital Marketing Roadmap</h3>

            <h4>Step 1: Beginner</h4>
            <ul>
                <li>Learn Digital Marketing Basics</li>
                <li>Learn Social Media Marketing</li>
            </ul>

            <h4>Step 2: Intermediate</h4>
            <ul>
                <li>Learn SEO</li>
                <li>Learn Content Marketing</li>
                <li>Learn Google Ads</li>
            </ul>

            <h4>Step 3: Advanced</h4>
            <ul>
                <li>Learn Analytics</li>
                <li>Run Marketing Campaigns</li>
                <li>Build a Portfolio</li>
            </ul>

            <h4>Estimated Duration:</h4>
            <p>4 to 8 Months</p>
        `;

    } else if (career === "business") {

        roadmap = `
            <h3>Business Entrepreneur Roadmap</h3>

            <h4>Step 1: Beginner</h4>
            <ul>
                <li>Learn Business Basics</li>
                <li>Learn Communication Skills</li>
            </ul>

            <h4>Step 2: Intermediate</h4>
            <ul>
                <li>Learn Marketing</li>
                <li>Learn Financial Management</li>
                <li>Understand Customers</li>
            </ul>

            <h4>Step 3: Advanced</h4>
            <ul>
                <li>Create a Business Plan</li>
                <li>Launch Your Business</li>
                <li>Build Your Brand</li>
            </ul>

            <h4>Estimated Duration:</h4>
            <p>6 to 12 Months</p>
        `;

    }

    result.innerHTML = roadmap;

}

// AI Job Search Assistant

function searchJobs() {

    let category = document.getElementById("jobCategory").value;
    let country = document.getElementById("jobCountry").value;

    let results = document.getElementById("jobResults");

    if (category === "" || country === "") {
        results.innerHTML = "<p>Please select job category and country!</p>";
        return;
    }

    let linkedinURL =
        "https://www.linkedin.com/jobs/search/?keywords=" +
        encodeURIComponent(category) +
        "&location=" +
        encodeURIComponent(country);

    let indeedURL =
        "https://www.indeed.com/jobs?q=" +
        encodeURIComponent(category) +
        "&l=" +
        encodeURIComponent(country);

    let googleURL =
        "https://www.google.com/search?q=" +
        encodeURIComponent(category + " jobs in " + country);

    results.innerHTML = `
        <h3>Job Search Results</h3>

        <p>Selected Career: ${category}</p>
        <p>Selected Country: ${country}</p>

        <a href="${linkedinURL}" target="_blank"
        rel="noopener noreferrer">
        Search Jobs on LinkedIn
        </a>

        <a href="${indeedURL}" target="_blank"
        rel="noopener noreferrer">
        Search Jobs on Indeed
        </a>

        <a href="${googleURL}" target="_blank"
        rel="noopener noreferrer">
        Search Jobs on Google
        </a>
    `;
}

// Save User Profile

function saveProfile() {

    let name = document.getElementById("profileName").value.trim();
    let education = document.getElementById("profileEducation").value;
    let skills = document.getElementById("profileSkills").value.trim();
    let interest = document.getElementById("profileInterest").value;

    let result = document.getElementById("profileResult");

    if (name === "" || education === "" || skills === "" || interest === "") {
        result.innerHTML = "Please fill all fields!";
        return;
    }

    let profile = {
        name: name,
        education: education,
        skills: skills,
        interest: interest
    };

    localStorage.setItem("careerUserProfile", JSON.stringify(profile));

    result.innerHTML = "Your profile has been saved successfully!";

}

// Load Saved Profile

function loadProfile() {

    let savedProfile = localStorage.getItem("careerUserProfile");

    if (savedProfile) {

        let profile = JSON.parse(savedProfile);

        document.getElementById("profileName").value = profile.name;
        document.getElementById("profileEducation").value = profile.education;
        document.getElementById("profileSkills").value = profile.skills;
        document.getElementById("profileInterest").value = profile.interest;

        document.getElementById("profileResult").innerHTML =
            "Your saved profile is loaded!";
    }

}

window.addEventListener("load", loadProfile);

// AI Career CV Generator

function downloadCV() {

    let name = document.getElementById("cvName").value.trim();
    let email = document.getElementById("cvEmail").value.trim();
    let phone = document.getElementById("cvPhone").value.trim();
    let education = document.getElementById("cvEducation").value.trim();
    let skills = document.getElementById("cvSkills").value.trim();
    let objective = document.getElementById("cvObjective").value.trim();

    let result = document.getElementById("cvResult");

    if (!name || !email || !phone || !education || !skills || !objective) {
        result.innerHTML = "Please fill all fields!";
        return;
    }

    if (!window.jspdf) {
        result.innerHTML = "PDF library load nahi hui. Internet check karein.";
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("CAREER RESUME", 20, 20);

    doc.setFontSize(14);
    doc.text("Personal Information", 20, 40);

    doc.setFontSize(11);
    doc.text("Name: " + name, 20, 52);
    doc.text("Email: " + email, 20, 62);
    doc.text("Phone: " + phone, 20, 72);

    doc.setFontSize(14);
    doc.text("Education", 20, 92);

    doc.setFontSize(11);
    doc.text(doc.splitTextToSize(education, 170), 20, 102);

    doc.setFontSize(14);
    doc.text("Skills", 20, 125);

    doc.setFontSize(11);
    doc.text(doc.splitTextToSize(skills, 170), 20, 135);

    doc.setFontSize(14);
    doc.text("Career Objective", 20, 165);

    doc.setFontSize(11);
    doc.text(doc.splitTextToSize(objective, 170), 20, 175);

    let fileName = name.replace(/[^a-z0-9]/gi, "_");

    doc.save(fileName + "_CV.pdf");

    result.innerHTML = "Your CV PDF has been downloaded successfully!";
}

// AI Interview Preparation Assistant

function startInterview() {

    let career = document.getElementById("interviewCareer").value;
    let result = document.getElementById("interviewResult");

    if (career === "") {
        result.innerHTML = "<p>Please select your career first!</p>";
        return;
    }

    let interviewQuestions = {

        web: [
            {
                question: "What is HTML?",
                answer: "HTML stands for HyperText Markup Language. It is used to create the structure of web pages."
            },
            {
                question: "What is CSS?",
                answer: "CSS stands for Cascading Style Sheets. It is used to design and style web pages."
            },
            {
                question: "What is JavaScript?",
                answer: "JavaScript is a programming language used to make websites interactive."
            },
            {
                question: "What is Bootstrap?",
                answer: "Bootstrap is a CSS framework used to create responsive websites."
            }
        ],

        design: [
            {
                question: "What is Graphic Designing?",
                answer: "Graphic designing is the process of creating visual content using images, colors and typography."
            },
            {
                question: "What is Photoshop?",
                answer: "Photoshop is an image editing software developed by Adobe."
            },
            {
                question: "What is Canva?",
                answer: "Canva is an online design tool used to create graphics, presentations and social media posts."
            }
        ],

        marketing: [
            {
                question: "What is Digital Marketing?",
                answer: "Digital marketing means promoting products and services through online platforms."
            },
            {
                question: "What is SEO?",
                answer: "SEO stands for Search Engine Optimization. It helps websites rank higher in search engines."
            },
            {
                question: "What is Social Media Marketing?",
                answer: "It is the process of promoting brands and products through social media platforms."
            }
        ],

        software: [
            {
                question: "What is Software Development?",
                answer: "Software development is the process of designing, coding, testing and maintaining software."
            },
            {
                question: "What is a Programming Language?",
                answer: "A programming language is used to write instructions that computers can understand."
            },
            {
                question: "What is React?",
                answer: "React is a JavaScript library used to build user interfaces."
            }
        ]

    };

    let questions = interviewQuestions[career];

    result.innerHTML = "<h3>Your Interview Questions and Answers</h3>";

    questions.forEach(function(item, index) {

        result.innerHTML += `
            <div class="question-card">
                <h4>Question ${index + 1}: ${item.question}</h4>
                <p><strong>Sample Answer:</strong> ${item.answer}</p>
            </div>
        `;

    });

}

// AI English Learning Assistant

function learnEnglish() {

    let word = document.getElementById("englishWord").value.trim().toLowerCase();

    let result = document.getElementById("englishResult");

    if (word === "") {
        result.innerHTML = "<p>Please enter an English word!</p>";
        return;
    }

    let vocabulary = {

        beautiful: {
            meaning: "خوبصورت",
            sentence: "She is a beautiful girl.",
            translation: "وہ ایک خوبصورت لڑکی ہے۔"
        },

        happy: {
            meaning: "خوش",
            sentence: "I am very happy today.",
            translation: "میں آج بہت خوش ہوں۔"
        },

        intelligent: {
            meaning: "ذہین",
            sentence: "She is an intelligent student.",
            translation: "وہ ایک ذہین طالبہ ہے۔"
        },

        honest: {
            meaning: "ایماندار",
            sentence: "He is an honest person.",
            translation: "وہ ایک ایماندار شخص ہے۔"
        },

        hardworking: {
            meaning: "محنتی",
            sentence: "I am a hardworking student.",
            translation: "میں ایک محنتی طالبہ ہوں۔"
        },

        success: {
            meaning: "کامیابی",
            sentence: "Hard work brings success.",
            translation: "محنت کامیابی لاتی ہے۔"
        },

        confident: {
            meaning: "پراعتماد",
            sentence: "Be confident in your abilities.",
            translation: "اپنی صلاحیتوں پر اعتماد رکھیں۔"
        }

    };

    if (vocabulary[word]) {

        let data = vocabulary[word];

        result.innerHTML = `
            <div class="word-card">
                <h3>English Word: ${word}</h3>
                <p><strong>Urdu Meaning:</strong> ${data.meaning}</p>
                <p><strong>Example Sentence:</strong> ${data.sentence}</p>
                <p><strong>Urdu Translation:</strong> ${data.translation}</p>
            </div>
        `;

    } else {

        result.innerHTML = `
            <p>Sorry! This word is not available in our vocabulary.</p>
            <p>Try: Beautiful, Happy, Intelligent, Honest, Success.</p>
        `;

    }

}

// AI Career Skill Assessment

function checkQuiz() {

    let answers = {
        q1: "a",
        q2: "b",
        q3: "a"
    };

    let score = 0;
    let totalQuestions = 3;

    for (let question in answers) {

        let selected = document.querySelector(
            'input[name="' + question + '"]:checked'
        );

        if (selected && selected.value === answers[question]) {
            score++;
        }
    }

    let percentage = (score / totalQuestions) * 100;

    let level;

    if (percentage === 100) {
        level = "Excellent Skill Level!";
    } else if (percentage >= 60) {
        level = "Good Skill Level!";
    } else {
        level = "Beginner Skill Level. Keep Practicing!";
    }

    document.getElementById("quizResult").innerHTML = `
        <h3>Your Quiz Result</h3>
        <p>Your Score: ${score} / ${totalQuestions}</p>
        <p>Percentage: ${percentage}%</p>
        <p>Skill Level: ${level}</p>
    `;

}

// AI Study Planner

function generateStudyPlan() {

    let course = document.getElementById("studyCourse").value.trim();
    let hours = Number(document.getElementById("studyHours").value);
    let duration = Number(document.getElementById("studyDuration").value);

    let result = document.getElementById("studyResult");

    if (!course || !hours || !duration) {
        result.innerHTML = "<p>Please fill all fields!</p>";
        return;
    }

    let topics = [
        "Learn Basic Concepts",
        "Study Important Topics",
        "Practice Practical Exercises",
        "Complete Small Projects",
        "Revise Previous Lessons",
        "Take a Practice Test"
    ];

    let dailyTasks = "";

    for (let day = 1; day <= duration; day++) {

        let topicIndex = (day - 1) % topics.length;

        dailyTasks += `
            <div class="study-card">
                <h4>Day ${day}</h4>
                <p><strong>Course:</strong> ${course}</p>
                <p><strong>Task:</strong> ${topics[topicIndex]}</p>
                <p><strong>Study Time:</strong> ${hours} Hours</p>
            </div>
        `;
    }

    result.innerHTML = `
        <h3>Your Personal Study Plan</h3>
        <p><strong>Course:</strong> ${course}</p>
        <p><strong>Daily Study:</strong> ${hours} Hours</p>
        <p><strong>Total Duration:</strong> ${duration} Days</p>
        <hr>
        ${dailyTasks}
    `;

}

// AI Motivation Assistant

function generateMotivation() {

    let messages = [

        "Believe in yourself. You are capable of achieving great things!",

        "Every expert was once a beginner. Keep learning and improving.",

        "Your hard work today will create your success tomorrow.",

        "Don't be afraid of failure. Every mistake is a learning opportunity.",

        "Dream big, work hard and never give up on your goals.",

        "Small steps every day lead to big achievements.",

        "Your future depends on what you do today.",

        "Stay focused, stay positive and keep moving forward.",

        "You don't need to be perfect. You just need to keep improving.",

        "Success starts with believing that you can do it!"

    ];

    let randomIndex = Math.floor(Math.random() * messages.length);

    let result = document.getElementById("motivationResult");

    result.innerHTML = `
        <h3>Your Daily Motivation ✨</h3>
        <p>${messages[randomIndex]}</p>
    `;

}

// Export Chat History
function exportChat() {
    let messages = document.getElementById("chatMessages");

    if (!messages || messages.innerText.trim() === "") {
        alert("There is no chat history to download!");
        return;
    }

    let chatText = messages.innerText;

    let file = new Blob([chatText], {
        type: "text/plain"
    });

    let url = URL.createObjectURL(file);

    let link = document.createElement("a");
    link.href = url;
    link.download = "Career_Chat_History.txt";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}

// Submit Feedback Function
function submitFeedback() {

    let rating = document.getElementById("userRating").value;

    let feedback = document.getElementById("userFeedback").value;

    let result = document.getElementById("feedbackResult");

    if (rating === "" || feedback.trim() === "") {
        result.innerHTML = "Please select a rating and write feedback!";
        result.style.color = "red";
        return;
    }

    let feedbackData = {
        rating: rating,
        feedback: feedback,
        date: new Date().toLocaleString()
    };

    let allFeedback = JSON.parse(
        localStorage.getItem("careerFeedback") || "[]"
    );

    allFeedback.push(feedbackData);

    localStorage.setItem(
        "careerFeedback",
        JSON.stringify(allFeedback)
    );

    result.innerHTML = "Thank you! Your feedback has been submitted successfully.";
    result.style.color = "green";

    document.getElementById("userRating").value = "";
    document.getElementById("userFeedback").value = "";
}

// Show All Feedback
function showFeedback() {

    let allFeedback = JSON.parse(
        localStorage.getItem("careerFeedback") || "[]"
    );

    let feedbackList = document.getElementById("adminFeedbackList");

    let total = document.getElementById("totalFeedback");

    total.innerText = allFeedback.length;

    if (allFeedback.length === 0) {
        feedbackList.innerHTML = "No feedback available yet.";
        return;
    }

    feedbackList.innerHTML = "";

    allFeedback.forEach(function(item) {

        let card = document.createElement("div");

        card.className = "feedback-card";

        let rating = document.createElement("h3");
        rating.textContent = "Rating: " + "⭐".repeat(Number(item.rating));

        let message = document.createElement("p");
        message.textContent = "Feedback: " + item.feedback;

        let date = document.createElement("small");
        date.textContent = "Date: " + item.date;

        card.appendChild(rating);
        card.appendChild(message);
        card.appendChild(date);

        feedbackList.appendChild(card);

    });
}


// Delete All Feedback
function deleteFeedback() {

    let confirmDelete = confirm(
        "Are you sure you want to delete all feedback?"
    );

    if (confirmDelete) {

        localStorage.removeItem("careerFeedback");

        showFeedback();

        alert("All feedback deleted successfully!");

    }
}







