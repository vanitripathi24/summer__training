const app = document.getElementById("app");
const card = document.createElement("div");

card.className = "profile-card";
const image = document.createElement("img");

image.src = "images/profile.jpg";

image.alt = "Profile";

image.className = "profile-image";
const name = document.createElement("h2");

name.textContent = "Vani Tripathi";

name.className = "name";
const course = document.createElement("p");

course.textContent = "BTech Student";

course.className = "course";
const about = document.createElement("p");

about.textContent =
"Passionate about AI, Machine Learning and Web Development.";

about.className = "about";

const skillsTitle = document.createElement("h3");

skillsTitle.textContent = "Skills";

skillsTitle.className = "skills-title";
const skills = document.createElement("ul");

skills.className = "skills";
const skill1 = document.createElement("li");
skill1.textContent = "HTML";

const skill2 = document.createElement("li");
skill2.textContent = "CSS";

const skill3 = document.createElement("li");
skill3.textContent = "JavaScript";

const skill4 = document.createElement("li");
skill4.textContent = "Machine Learning";

skills.appendChild(skill1);
skills.appendChild(skill2);
skills.appendChild(skill3);
skills.appendChild(skill4);

const button = document.createElement("button");

button.textContent = "Contact Me";

button.className = "contact-btn";

card.appendChild(image);

card.appendChild(name);

card.appendChild(course);

card.appendChild(about);

card.appendChild(skillsTitle);

card.appendChild(skills);

card.appendChild(button);


app.appendChild(card);