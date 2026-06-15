// Select root container

const app = document.getElementById("app");


// Create Toggle Button

const toggleBtn = document.createElement("button");

toggleBtn.textContent = "🌙 Dark Mode";

toggleBtn.className = "contact-btn";


// Create Profile Card

const card = document.createElement("div");

card.className = "profile-card";


// Create Profile Image

const image = document.createElement("img");

image.src = "images/profile.jpg";

image.alt = "Profile Picture";

image.className = "profile-image";


// Create Name

const name = document.createElement("h2");

name.textContent = "Vani Tripathi";

name.className = "name";


// Create Course

const course = document.createElement("p");

course.textContent = "BTech Student | AI & ML Enthusiast";

course.className = "course";


// Create About Section

const about = document.createElement("p");

about.textContent =
"Passionate about Artificial Intelligence, Machine Learning, Web Development and solving real-world problems through technology.";

about.className = "about";


// Skills Heading

const skillsTitle = document.createElement("h3");

skillsTitle.textContent = "Skills";

skillsTitle.className = "skills-title";


// Skills List

const skills = document.createElement("ul");

skills.className = "skills";


// Skill Items

const skill1 = document.createElement("li");
skill1.textContent = "HTML";

const skill2 = document.createElement("li");
skill2.textContent = "CSS";

const skill3 = document.createElement("li");
skill3.textContent = "JavaScript";

const skill4 = document.createElement("li");
skill4.textContent = "Machine Learning";

const skill5 = document.createElement("li");
skill5.textContent = "React (Learning)";


// Add Skills to UL

skills.appendChild(skill1);
skills.appendChild(skill2);
skills.appendChild(skill3);
skills.appendChild(skill4);
skills.appendChild(skill5);


// Contact Button

const contactBtn = document.createElement("button");

contactBtn.textContent = "Contact Me";

contactBtn.className = "contact-btn";


// Add Everything To Card

card.appendChild(image);

card.appendChild(name);

card.appendChild(course);

card.appendChild(about);

card.appendChild(skillsTitle);

card.appendChild(skills);

card.appendChild(contactBtn);


// Add Button and Card To Page

app.appendChild(toggleBtn);

app.appendChild(card);


// Dark Mode Toggle

toggleBtn.addEventListener("click", () => {

    card.classList.toggle("dark-mode");

    if (card.classList.contains("dark-mode")) {

        toggleBtn.textContent = "☀️ Light Mode";

    } else {

        toggleBtn.textContent = "🌙 Dark Mode";

    }

});