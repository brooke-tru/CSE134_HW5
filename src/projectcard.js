//Define the ProjectCard web component
class ProjectCard extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'image', 'description', 'link', 'linkName'];
    }
    //Constructor is called when the element is created
    constructor() {
        super();

        //Create a shadow root
        this.attachShadow({ mode: 'open' });

    }

    //connectedCallback is called when (after) the element is attached to the DOM
    connectedCallback() {
        //Create the component's HTML structure
        //:host is a pesudo-class referring to the curr element itself
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --textColor: rgb(92,99,164);

                    --cardPadding: 1rem;
                    --cardWidth: 250px;
                    --cardHeight: 300px;
                    --cardPadding: 15px;
                    --borderRadius: 5px;

                    --imgWidth: 125px;
                    --imgHeight: 125px;
                    --imgPaddingTop: 5px;

                    --titleFontSize: 1.2rem;
                    --descriptionFontSize: 1rem;
                    --linkFontSize: 1rem;

                    display: block;
                    padding: var(--cardPadding);
                    color: var(--textColor, black);
                    width: var(--cardWidth);
                    height: var(--cardHeight);
                    padding: var(--cardPadding);
                }

                .card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    border-radius: var(--borderRadius);
                    width: var(--cardWidth);
                    height: var(--cardHeight);
                }
                
                .card img {
                    width: var(--imgWidth);
                    height: var(--imgHeight);
                    padding-top: var(--imgPaddingTop);
                }

                .card h2 {
                    font-size: var(--titleFontSize);
                }

                .card p {
                    font-size: var(--descriptionFontSize);
                }

                .card a {
                    font-size: var(--linkFontSize);
                    text-decoration: none;
                    color: darkblue;
                    font-weight: bold;
                }

            </style>

            <div class="card">
                <picture>
                    <img src="${this.getAttribute("image")}" alt="Logo image"/>
                </picture>
                <h2>${this.getAttribute("title")}</h2>
                <p>${this.getAttribute("description")}</p>
                <a href="${this.getAttribute("link")}">${this.getAttribute("linkName")}</a>
            </div>
        `;
    }
}

customElements.define('project-card', ProjectCard);

async function loadProjectsRemote() {
    const projectCardContainer = document.getElementById("projectcard-container");
    projectCardContainer.innerHTML = '';

   let projects = [];
   try{
        const response = await fetch("https://api.jsonbin.io/v3/b/67cf65e68a456b7966736c0a", {
            headers:{ 
                'X-Master-Key': "$2a$10$GbE3WnmlvsCV4RSLorx8LewJxyGtgT1g825ghGXvNEVzPL76zWxi6"
              }
        });
        const jsonResponse = await response.json();
        projects = jsonResponse.record;
   } catch (error) {
    console.error("Error loading projects");
   }

    projects.forEach(element => {
        const projectCard = document.createElement("project-card");
        projectCard.setAttribute("title", element.title);
        projectCard.setAttribute("image", element.image);
        projectCard.setAttribute("description", element.description);
        projectCard.setAttribute("link", element.link);
        projectCard.setAttribute("linkName", element.linkName)
        projectCardContainer.appendChild(projectCard);
    });
}

async function loadProjectsLocal() {
    const projectCardContainer = document.getElementById("projectcard-container");
    projectCardContainer.innerHTML = '';
    let projects = JSON.parse(localStorage.getItem("projects"));

    projects.forEach(element => {
        const projectCard = document.createElement("project-card");
        projectCard.setAttribute("title", element.title);
        projectCard.setAttribute("image", element.image);
        projectCard.setAttribute("description", element.description);
        projectCard.setAttribute("link", element.link);
        projectCard.setAttribute("linkName", element.linkName)
        projectCardContainer.appendChild(projectCard);
    });
}

/*Part 1 using Local storage*/
localStorage.setItem("projects", JSON.stringify([
    {
        "title": "r.e.m. beauty",
        "image": "media/rem_beauty_logo.webp",
        "description": "Beauty company by Ariana Grande",
        "link": "https://rembeauty.com",
        "linkName": "r.e.m. website"
    },
    {
        "title": "Round Lab",
        "image": "media/roundlab.webp",
        "description": "Korean skincare company",
        "link": "https://roundlab.com",
        "linkName": "Round Lab Website"
    },
    {
        "title": "Judydoll",
        "image": "media/judydoll.webp",
        "description": "Chinese makeup company",
        "link": "https://judydoll.com",
        "linkName": "Judydoll website"
    }
]));


document.addEventListener("DOMContentLoaded", loadProjectsLocal);

const loadRemoteBtn = document.getElementById("load-remote");
const loadLocalBtn = document.getElementById("load-local");

loadRemoteBtn.addEventListener("click", loadProjectsRemote);
loadLocalBtn.addEventListener("click", loadProjectsLocal);