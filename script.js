
/* =====================================
   AI CAREER ASSISTANT
   COMPLETE JAVASCRIPT FILE
===================================== */

let conversationHistory = [];
let recognition = null;


// =====================================
// 1. GENERAL HELPER
// =====================================

function getValue(id) {
    const element = document.getElementById(id);
    return element ? element.value.trim() : "";
}

function showResult(id, message) {
    const element = document.getElementById(id);
    if (element) element.textContent = message;
}


// =====================================
// 2. START ASSISTANT
// =====================================

function startAssistant() {
    const chat = document.querySelector(".chatbot");

    if (chat) {
        chat.scrollIntoView({ behavior: "smooth" });
    }

    const input = document.getElementById("chatInput");
    if (input) input.focus();
}


// =====================================
// 3. DARK AND LIGHT MODE
// =====================================

function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    const button = document.getElementById("themeBtn");

    const dark = document.body.classList.contains("dark-mode");

    if (button) {
        button.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";
    }

    localStorage.setItem("careerTheme", dark ? "dark" : "light");
}

if (localStorage.getItem("careerTheme") === "dark") {
    document.body.classList.add("dark-mode");

    document.addEventListener("DOMContentLoaded", function () {
        const button = document.getElementById("themeBtn");
        if (button) button.textContent = "☀️ Light Mode";
    });
}


// =====================================
// 4. CHATBOT RESPONSES
// =====================================

function getBotResponse(message) {

    const q = message.toLowerCase();

    const has = (...words) =>
        words.some(word => q.includes(word));

    if (/^(hi|hello|hey|salam|assalam|assalamu alaikum)\b/.test(q)) {
        return "Hello! Welcome to AI Career Assistant. I can help you with careers, web development, programming, Germany jobs, visas, AI and education. How can I help you?";
    }

    if (has("germany job", "job in germany", "germany jobs", "german job")) {
        return "Germany offers opportunities for skilled web developers. Learn HTML, CSS, JavaScript and React. Build projects, prepare your CV and search on LinkedIn, Indeed and StepStone.";
    }

    if (has("visa", "blue card", "work permit")) {
        return "Germany work visa requirements depend on your qualifications and job offer. Check the official information at https://www.make-it-in-germany.com/";
    }

    if (has("html")) {
        return "HTML stands for HyperText Markup Language. It creates the structure of websites. Common tags include h1, p, div, section, img, a, input and button.";
    }

    if (has("css", "styling")) {
        return "CSS stands for Cascading Style Sheets. It controls website colors, fonts, backgrounds, spacing, layouts, borders and animations.";
    }

    if (has("javascript", "java script")) {
        return "JavaScript makes websites interactive. It is used for buttons, forms, calculators and chatbots. Learn variables, functions, arrays, objects and DOM.";
    }

    if (has("react", "jsx")) {
        return "React is a JavaScript library for building user interfaces. Learn components, props, state, hooks and event handling.";
    }

    if (has("bootstrap")) {
        return "Bootstrap is a CSS framework for responsive websites. It provides ready-made classes for grids, buttons, cards, navbars and forms.";
    }

    if (has("wordpress")) {
        return "WordPress is a Content Management System. You can create websites and blogs using themes, plugins, pages and posts.";
    }

    if (has("shopify", "ecommerce")) {
        return "Shopify is an e-commerce platform used to create online stores, add products, manage orders and sell products.";
    }

    if (q === "ai" || has("artificial intelligence", "machine learning")) {
        return "Artificial Intelligence enables computers to perform tasks that normally require human intelligence. Examples include chatbots, voice assistants and recommendation systems.";
    }

    if (has("digital marketing", "seo", "social media marketing")) {
        return "Digital marketing promotes businesses online. Important skills include SEO, social media marketing, content creation, email marketing and Google Ads.";
    }

    if (has("cybersecurity", "cyber security", "ethical hacking")) {
        return "Cybersecurity protects computers, websites, networks and information from digital attacks. Start with networking, Linux and security fundamentals.";
    }

    if (has("web development", "web developer", "website development")) {
        return "Web development is the process of creating websites. Front-end technologies include HTML, CSS, JavaScript and React. Back-end development uses servers and databases.";
    }

    if (has("german language", "learn german", "deutsch", "german")) {
        return "Start German with A1 level. Learn greetings, vocabulary, grammar and speaking. Then progress to A2 and B1.";
    }

    if (has("cv", "resume")) {
        return "A professional CV includes contact details, education, technical skills, projects, work experience and languages. Keep it clear and professional.";
    }

    if (has("interview")) {
        return "Prepare for interviews by practicing technical questions, explaining your projects and improving communication skills.";
    }

    if (has("project", "portfolio", "github")) {
        return "Beginner projects include a portfolio website, calculator, landing page, jewelry website and chatbot. Upload your projects to GitHub.";
    }

    if (has("salary", "income", "earning")) {
        return "Developer salaries depend on location, experience, skills and company. Compare current job listings to understand salary ranges.";
    }

    if (has("career", "education", "future", "job")) {
        return "I can help you explore careers according to your education, interests and skills. Tell me your education and career goals.";
    }

    if (has("programming", "coding", "code")) {
        return "Programming means writing instructions for computers. Popular languages include JavaScript, Python, Java and C++.";
    }

    if (has("skills", "technical skills")) {
        return "Important technical skills include HTML, CSS, JavaScript, React, Bootstrap, GitHub, responsive design and problem solving.";
    }

    if (has("thank", "thanks")) {
        return "You're welcome! I am happy to help. Ask me another question about technology or career guidance.";
    }

    return "Thank you for your question! I can help with HTML, CSS, JavaScript, React, Bootstrap, WordPress, Shopify, AI, Digital Marketing, Cybersecurity, Germany Jobs, Visa, German Language, CV and Career Guidance. Please ask me about one of these topics.";
}


// =====================================
// 5. SEND CHAT MESSAGE
// =====================================

function sendMessage() {

    const input = document.getElementById("chatInput");
    const messages = document.getElementById("chatMessages");

    if (!input || !messages) return;

    const userMessage = input.value.trim();

    if (!userMessage) {
        alert("Please enter a message!");
        return;
    }

    const userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.textContent = userMessage;

    messages.appendChild(userDiv);

    const botReply = getBotResponse(userMessage);

    const botDiv = document.createElement("div");
    botDiv.className = "bot-message";
    botDiv.textContent = botReply;

    messages.appendChild(botDiv);

    conversationHistory.push({
        user: userMessage,
        bot: botReply
    });

    input.value = "";
    messages.scrollTop = messages.scrollHeight;

    saveChat();

    const voice = document.getElementById("voiceReply");

    if (voice && voice.checked) {
        speakAnswer(botReply);
    }
}


// =====================================
// 6. CHAT ENTER KEY
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    const input = document.getElementById("chatInput");

    if (input) {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }

});


// =====================================
// 7. SAVE CHAT HISTORY
// =====================================

function saveChat() {

    const messages = document.getElementById("chatMessages");

    if (messages) {
        localStorage.setItem("careerChatHistory", messages.innerHTML);
    }
}


// =====================================
// 8. CLEAR CHAT
// =====================================

function clearChat() {

    const messages = document.getElementById("chatMessages");

    if (!messages) return;

    messages.innerHTML = `
        <div class="bot-message">
            Hello! Welcome to AI Career Assistant.
            How can I help you?
        </div>
    `;

    conversationHistory = [];

    localStorage.removeItem("careerChatHistory");

    stopSpeaking();
}


// =====================================
// 9. DOWNLOAD CHAT HISTORY
// =====================================

function exportChat() {

    const messages = document.getElementById("chatMessages");

    if (!messages || messages.children.length === 0) {
        alert("No chat history available!");
        return;
    }

    const text = Array.from(messages.children)
        .map(item => item.className + ": " + item.innerText)
        .join("\n\n");

    const blob = new Blob([text], {
        type: "text/plain"
    });

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "AI-Career-Chat-History.txt";

    link.click();

    URL.revokeObjectURL(link.href);
}


// =====================================
// 10. VOICE OUTPUT
// =====================================

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


// =====================================
// 11. STOP VOICE
// =====================================

function stopSpeaking() {

    if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
    }
}


// =====================================
// 12. VOICE INPUT
// =====================================

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Voice input is not supported. Please use Google Chrome.");
        return;
    }

    recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function () {
        const button = document.getElementById("micButton");
        if (button) button.textContent = "🎤 Listening...";
    };

    recognition.onresult = function (event) {

        const transcript = event.results[0][0].transcript;

        const input = document.getElementById("chatInput");

        if (input) {
            input.value = transcript;
            sendMessage();
        }
    };

    recognition.onerror = function (event) {
        alert("Voice error: " + event.error);
    };

    recognition.onend = function () {
        const button = document.getElementById("micButton");
        if (button) button.textContent = "🎤 Speak";
    };

    recognition.start();
}


// =====================================
// 13. BASIC CAREER FINDER
// =====================================

function getCareer() {

    const name = getValue("username");
    const education = getValue("education");
    const skills = getValue("skills");

    if (!name || !education || !skills) {
        alert("Please enter your name, education and skills!");
        return;
    }

    showResult(
        "result",
        "Hello " + name + "! Based on your education (" +
        education + ") and skills (" + skills +
        "), consider Web Development, Digital Marketing or IT Support."
    );
}


// =====================================
// 14. CAREER RECOMMENDATION
// =====================================


function recommendCareer() {

    const name = getValue("studentName");
    const education = getValue("careerEducation");
    const skills = getValue("careerSkills");
    const interest = getValue("interest");

    if (!name || !education || !skills || !interest) {
        alert("Please complete all career form fields!");
        return;
    }

    const careers = {
        web: "Web Developer",
        design: "Graphic Designer",
        marketing: "Digital Marketer",
        business: "Business Entrepreneur",
        computer: "IT Professional"
    };

    const career = careers[interest] || "IT Professional";

    showResult(
        "careerResult",
        "Hello " + name +
        "! Your recommended career is " + career +
        ". Your education: " + education +
        ". Your skills: " + skills +
        ". Keep learning and build practical projects."
    );
}

// =====================================
// 15. SKILLS ASSESSMENT
// =====================================

function assessSkills() {

    const selected = document.querySelectorAll(
        ".skills-section input[type='checkbox']:checked"
    );

    const skills = Array.from(selected).map(item => item.value);

    if (skills.length === 0) {
        alert("Please select at least one skill!");
        return;
    }

    let career = "Technology and IT Professional";

    if (skills.includes("HTML") || skills.includes("CSS") ||
        skills.includes("JavaScript")) {
        career = "Front-End Web Developer";
    } else if (skills.includes("SEO") ||
               skills.includes("Digital Marketing")) {
        career = "Digital Marketing Specialist";
    } else if (skills.includes("Graphic Design")) {
        career = "Graphic Designer";
    }

    showResult(
        "skillResult",
        "Your selected skills: " + skills.join(", ") +
        ". Suggested career: " + career
    );
}


// =====================================
// 16. CAREER ROADMAP
// =====================================

function generateRoadmap() {

    const career = getValue("roadmapCareer");

    if (!career) {
        alert("Please select your career!");
        return;
    }

    const roadmaps = {

        web: "1. Learn HTML\n2. Learn CSS\n3. Learn Bootstrap\n4. Learn JavaScript\n5. Learn React\n6. Build Projects\n7. Learn GitHub\n8. Create Portfolio",

        design: "1. Learn Design Basics\n2. Learn Color Theory\n3. Learn Canva\n4. Learn Photoshop\n5. Practice Logo Design\n6. Build Portfolio",

        marketing: "1. Learn Marketing Basics\n2. Learn SEO\n3. Learn Social Media\n4. Learn Content Creation\n5. Learn Google Ads\n6. Build Campaigns",

        business: "1. Find a Business Idea\n2. Research Customers\n3. Make a Business Plan\n4. Learn Marketing\n5. Manage Budget\n6. Launch Your Business"
    };

    showResult("roadmapResult", roadmaps[career]);
}


// =====================================
// 17. JOB SEARCH
// =====================================

function searchJobs() {

    const category = getValue("jobCategory");
    const country = getValue("jobCountry");

    if (!category || !country) {
        alert("Please select job category and country!");
        return;
    }

    const query = encodeURIComponent(category + " jobs in " + country);

    const results = document.getElementById("jobResults");

    if (results) {
        results.innerHTML = `
            <p>Find current ${category} jobs in ${country}:</p>
            <p><a href="https://www.google.com/search?q=${query}" target="_blank" rel="noopener">Search Jobs on Google</a></p>
            <p><a href="https://www.linkedin.com/jobs/" target="_blank" rel="noopener">Find Jobs on LinkedIn</a></p>
        `;
    }
}


// =====================================
// 18. SAVE CAREER PROFILE
// =====================================

function saveProfile() {

    const profile = {
        name: getValue("profileName"),
        education: getValue("profileEducation"),
        skills: getValue("profileSkills"),
        interest: getValue("profileInterest")
    };

    if (!profile.name || !profile.education ||
        !profile.skills || !profile.interest) {
        alert("Please complete your profile!");
        return;
    }

    localStorage.setItem("careerProfile", JSON.stringify(profile));

    showResult("profileResult", "Your career profile has been saved successfully!");
}


// =====================================
// 19. CV PDF GENERATOR
// =====================================

function downloadCV() {

    const name = getValue("cvName");
    const email = getValue("cvEmail");
    const phone = getValue("cvPhone");
    const education = getValue("cvEducation");
    const skills = getValue("cvSkills");
    const objective = getValue("cvObjective");

    if (!name || !email || !phone || !education || !skills) {
        alert("Please complete your CV details!");
        return;
    }

    if (!window.jspdf) {
        alert("PDF library is not loaded. Please refresh the page.");
        return;
    }

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text("PROFESSIONAL CV", 20, 20);

    pdf.setFontSize(12);

    pdf.text("Full Name: " + name, 20, 40);
    pdf.text("Email: " + email, 20, 50);
    pdf.text("Phone: " + phone, 20, 60);
    pdf.text("Education: " + education, 20, 70);

    pdf.text("Skills:", 20, 85);

    pdf.text(
        pdf.splitTextToSize(skills, 170),
        20,
        95
    );

    pdf.text("Career Objective:", 20, 125);

    pdf.text(
        pdf.splitTextToSize(objective || "To grow professionally.", 170),
        20,
        135
    );

    pdf.save(name.replace(/\s+/g, "_") + "_CV.pdf");

    showResult("cvResult", "Your CV PDF has been downloaded!");
}


// =====================================
// 20. INTERVIEW PREPARATION
// =====================================

function startInterview() {

    const career = getValue("interviewCareer");

    if (!career) {
        alert("Please select your career!");
        return;
    }

    const questions = {

        web: [
            "What is HTML?",
            "What is CSS?",
            "What is JavaScript?",
            "What is React?",
            "What is responsive design?"
        ],

        design: [
            "What is graphic design?",
            "What is color theory?",
            "What is typography?",
            "What is logo design?",
            "Which design tools do you use?"
        ],

        marketing: [
            "What is digital marketing?",
            "What is SEO?",
            "What is social media marketing?",
            "What is Google Ads?",
            "How do you measure campaign results?"
        ],

        software: [
            "What is programming?",
            "What is an algorithm?",
            "What is a database?",
            "What is debugging?",
            "What is object-oriented programming?"
        ]
    };

    const list = questions[career];

    const result = document.getElementById("interviewResult");

    if (result) {
        result.innerHTML = "<h3>Interview Questions</h3>" +
            list.map((item, index) =>
                `<p>${index + 1}. ${item}</p>`
            ).join("");
    }
}


// =====================================
// 21. ENGLISH LEARNING
// =====================================

function learnEnglish() {

    const word = getValue("englishWord");

    if (!word) {
        alert("Please enter an English word!");
        return;
    }

    const dictionary = {

        beautiful: "Meaning: Attractive or pleasing. Example: This is a beautiful flower.",

        happy: "Meaning: Feeling pleasure or joy. Example: I am happy today.",

        confident: "Meaning: Believing in yourself. Example: Be confident in your interview.",

        successful: "Meaning: Achieving your goals. Example: She is a successful developer.",

        intelligent: "Meaning: Having good understanding. Example: He is an intelligent student.",

        improve: "Meaning: To make something better. Example: I want to improve my English."
    };

    const answer = dictionary[word.toLowerCase()];

    showResult(
        "englishResult",
        answer || "Practice this word by using it in an English sentence. You can also check its meaning in an English dictionary."
    );
}


// =====================================
// 22. SKILL QUIZ
// =====================================

function checkQuiz() {

    const answers = {
        q1: "a",
        q2: "b",
        q3: "a"
    };

    let score = 0;
    let attempted = 0;

    for (const question in answers) {

        const selected = document.querySelector(
            `input[name="${question}"]:checked`
        );

        if (selected) {
            attempted++;

            if (selected.value === answers[question]) {
                score++;
            }
        }
    }

    showResult(
        "quizResult",
        "Your Score: " + score + "/3. Questions attempted: " +
        attempted + "/3. " +
        (score === 3 ? "Excellent work!" :
         score === 2 ? "Good job! Keep practicing." :
         "Keep learning and try again!")
    );
}


// =====================================
// 23. STUDY PLANNER
// =====================================

function generateStudyPlan() {

    const course = getValue("studyCourse");
    const hours = Number(getValue("studyHours"));
    const duration = Number(getValue("studyDuration"));

    if (!course || !hours || !duration) {
        alert("Please complete all study planner fields!");
        return;
    }

    const totalHours = hours * duration;

    showResult(
        "studyResult",
        "Your Study Plan for " + course +
        "\nDaily Study Time: " + hours + " hours" +
        "\nDuration: " + duration + " days" +
        "\nTotal Study Time: " + totalHours + " hours" +
        "\n\nDaily Plan:\n" +
        "1. Learn a new topic.\n" +
        "2. Practice what you learned.\n" +
        "3. Complete a small exercise.\n" +
        "4. Revise previous lessons."
    );
}


// =====================================
// 24. MOTIVATION ASSISTANT
// =====================================

function generateMotivation() {

    const quotes = [
        "Believe in yourself. You can achieve great things!",
        "Every expert was once a beginner.",
        "Small steps every day create big results.",
        "Never stop learning. Your future is in your hands.",
        "Your hard work today will build your success tomorrow.",
        "Dream big, work hard and stay consistent."
    ];

    const random = Math.floor(Math.random() * quotes.length);

    showResult("motivationResult", quotes[random]);
}


// =====================================
// 25. FEEDBACK SUBMISSION
// =====================================

function submitFeedback() {

    const rating = getValue("userRating");
    const feedback = getValue("userFeedback");

    if (!rating || !feedback) {
        alert("Please select a rating and write your feedback!");
        return;
    }

    let feedbackList = JSON.parse(
        localStorage.getItem("careerFeedback") || "[]"
    );

    feedbackList.push({
        rating: rating,
        feedback: feedback,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem(
        "careerFeedback",
        JSON.stringify(feedbackList)
    );

    showResult("feedbackResult", "Thank you! Your feedback has been saved.");

    document.getElementById("userRating").value = "";
    document.getElementById("userFeedback").value = "";

    showFeedback();
}


// =====================================
// 26. SHOW FEEDBACK
// =====================================

function showFeedback() {

    const feedbackList = JSON.parse(
        localStorage.getItem("careerFeedback") || "[]"
    );

    const container = document.getElementById("adminFeedbackList");
    const total = document.getElementById("totalFeedback");

    if (total) {
        total.textContent = feedbackList.length;
    }

    if (!container) return;

    if (feedbackList.length === 0) {
        container.textContent = "No feedback available yet.";
        return;
    }

    container.innerHTML = "";

    feedbackList.forEach(item => {

        const div = document.createElement("div");

        div.textContent =
            "Rating: " + "⭐".repeat(Number(item.rating)) +
            " | Feedback: " + item.feedback +
            " | Date: " + item.date;

        container.appendChild(div);
    });
}


// =====================================
// 27. DELETE FEEDBACK
// =====================================

function deleteFeedback() {

    if (!confirm("Are you sure you want to delete all feedback?")) {
        return;
    }

    localStorage.removeItem("careerFeedback");

    showFeedback();

    showResult("feedbackResult", "All feedback has been deleted.");
}


// =====================================
// 28. LOAD SAVED SETTINGS
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    showFeedback();

    const savedProfile = localStorage.getItem("careerProfile");

    if (savedProfile) {

        const profile = JSON.parse(savedProfile);

        const fields = {
            profileName: profile.name,
            profileEducation: profile.education,
            profileSkills: profile.skills,
            profileInterest: profile.interest
        };

        Object.keys(fields).forEach(id => {
            const element = document.getElementById(id);

            if (element) {
                element.value = fields[id];
            }
        });
    }

});
