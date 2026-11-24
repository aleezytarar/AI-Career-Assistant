
let conversationHistory = [];

// Chatbot response function
function sendMessage() {

    let input = document.getElementById("chatInput");
    let messages = document.getElementById("chatMessages");

    if (!input || !messages) return;

    let userMessage = input.value.trim();

    if (userMessage === "") {
        alert("Please enter a message!");
        return;
    }

    // Display user message
    let userDiv = document.createElement("div");
    userDiv.className = "user-message";
    userDiv.textContent = userMessage;
    messages.appendChild(userDiv);

    let question = userMessage.toLowerCase();

    function hasAny(words) {
        return words.some(word => question.includes(word));
    }

    let botReply = "";

    // 1. Greetings
    if (/^(hi|hello|hey|salam|assalam|assalamu alaikum)\b/.test(question)) {

        botReply = "Hello! Welcome to AI Career Assistant. I can help you with Web Development, Germany Jobs, Visa, Programming, AI and Career Guidance. How can I help you?";

    }

    // 2. Germany Jobs
    else if (hasAny(["germany job", "job in germany", "germany jobs", "german job"])) {

        botReply = "Germany has opportunities for skilled web developers. Learn HTML, CSS, JavaScript and React. Build projects, prepare a professional CV and search for jobs on LinkedIn, Indeed and StepStone.";

    }

    // 3. Germany Work Visa
    else if (hasAny(["visa", "work permit", "blue card"])) {

        botReply = "For a Germany work visa, you generally need a suitable job offer and must meet the relevant visa requirements. Requirements depend on your qualifications and circumstances. Visit make-it-in-germany.com for official information.";

    }

    // 4. German Language
    else if (hasAny(["german language", "learn german", "deutsch", "german"])) {

        botReply = "Start German from A1 level. Learn greetings, vocabulary, grammar and speaking. Then progress to A2 and B1. German language skills can help with employment in Germany.";

    }

    // 5. HTML
    else if (hasAny(["html", "html tags"])) {

        botReply = "HTML stands for HyperText Markup Language. It creates the structure of a website. Important tags include h1, p, div, section, img, a, input, form and button.";

    }

    // 6. CSS
    else if (hasAny(["css", "styling"])) {

        botReply = "CSS stands for Cascading Style Sheets. It is used to design websites with colors, backgrounds, fonts, spacing, borders, layouts and animations.";

    }

    // 7. JavaScript
    else if (hasAny(["javascript", "java script"])) {

        botReply = "JavaScript is a programming language used to make websites interactive. It is used for buttons, forms, calculators, chatbots and animations. Learn variables, functions, arrays, objects and DOM.";

    }

    // 8. React
    else if (hasAny(["react", "jsx"])) {

        botReply = "React is a JavaScript library used to build interactive user interfaces. Important concepts include components, props, state, hooks and event handling.";

    }

    // 9. Bootstrap
    else if (hasAny(["bootstrap"])) {

        botReply = "Bootstrap is a CSS framework used to create responsive websites. It provides ready-made classes for grids, buttons, cards, navbars and forms.";

    }

    // 10. WordPress
    else if (hasAny(["wordpress", "wp website"])) {

        botReply = "WordPress is a Content Management System (CMS). You can create websites, blogs and online stores using themes, plugins, pages and website builders.";

    }

    // 11. Shopify
    else if (hasAny(["shopify", "ecommerce", "online store"])) {

        botReply = "Shopify is an e-commerce platform. You can create an online store, add products, manage orders, customize themes and sell products online.";

    }

    // 12. Artificial Intelligence
    else if (question === "ai" || hasAny(["artificial intelligence", "machine learning"])) {

        botReply = "Artificial Intelligence (AI) enables computers to perform tasks that normally require human intelligence. Examples include chatbots, voice assistants, image recognition and recommendation systems.";

    }

    // 13. Digital Marketing
    else if (hasAny(["digital marketing", "seo", "social media marketing"])) {

        botReply = "Digital marketing promotes businesses online. Important skills include SEO, social media marketing, content creation, email marketing and Google Ads.";

    }

    // 14. Cybersecurity
    else if (hasAny(["cybersecurity", "cyber security", "ethical hacking"])) {

        botReply = "Cybersecurity protects computers, websites, networks and data from digital attacks. Start with networking, Linux, security fundamentals and ethical hacking basics.";

    }

    // 15. Web Development
    else if (hasAny(["web development", "web developer", "website development"])) {

        botReply = "Web development is the process of creating websites. Front-end development uses HTML, CSS, JavaScript and React. Back-end development uses Node.js, Python and databases.";

    }

    // 16. CV and Resume
    else if (hasAny(["cv", "resume"])) {

        botReply = "A professional CV should include contact details, education, technical skills, projects, experience (if any) and languages. Keep it clear and professional.";

    }

    // 17. Interview
    else if (hasAny(["interview", "job questions"])) {

        botReply = "Prepare for interviews by practicing HTML, CSS, JavaScript, React and explaining your projects. Improve your communication skills and practice common technical questions.";

    }

    // 18. Projects and GitHub
    else if (hasAny(["project", "portfolio", "github"])) {

        botReply = "Projects are important for beginner web developers. Start with a personal portfolio, calculator, landing page, jewelry website and chatbot. Upload your projects to GitHub.";

    }

    // 19. Programming
    else if (hasAny(["programming", "coding", "code"])) {

        botReply = "Programming means writing instructions for computers. Popular languages include JavaScript, Python, Java and C++. Start with basic concepts and practice small projects.";

    }

    // 20. Skills
    else if (hasAny(["skills", "technical skills"])) {

        botReply = "Important web development skills include HTML, CSS, JavaScript, React, Bootstrap, GitHub, responsive design, problem solving and communication.";

    }

    // 21. Career Guidance
    else if (hasAny(["career", "future", "education", "job"])) {

        botReply = "I can help you explore career options according to your education, interests and skills. Tell me about your education, skills and career goals.";

    }

    // 22. Learning
    else if (hasAny(["how to learn", "beginner", "start learning", "course"])) {

        botReply = "Start with HTML, then learn CSS, Bootstrap and JavaScript. After that learn React, GitHub and build real projects. Practice daily.";

    }

    // 23. Salary
    else if (hasAny(["salary", "income", "earning"])) {

        botReply = "Web developer salaries depend on skills, experience, location and company. Research current job listings and build a strong portfolio to improve your opportunities.";

    }

    // 24. Thanks
    else if (hasAny(["thank you", "thanks"])) {

        botReply = "You're welcome! I am happy to help you. Ask me another question about technology, jobs or career guidance.";

    }

    // 25. General questions
    else {

        botReply = "Thank you for your question! I can help you with HTML, CSS, JavaScript, React, Bootstrap, WordPress, Shopify, AI, Digital Marketing, Cybersecurity, Germany Jobs, Work Visa, German Language, CV and Career Guidance. Please ask me about one of these topics.";

    }

    // Display bot reply
    let botDiv = document.createElement("div");
    botDiv.className = "bot-message";
    botDiv.textContent = botReply;

    messages.appendChild(botDiv);

    // Save conversation
    conversationHistory.push({
        user: userMessage,
        bot: botReply
    });

    // Voice response
    let voiceReply = document.getElementById("voiceReply");

    if (voiceReply && voiceReply.checked) {
        if (typeof speakAnswer === "function") {
            speakAnswer(botReply);
        }
    }

    // Clear input
    input.value = "";

    // Scroll messages
    messages.scrollTop = messages.scrollHeight;

    // Save chat
    if (typeof saveChat === "function") {
        saveChat();
    }
}


// Enter key support
document.getElementById("chatInput")
.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});
