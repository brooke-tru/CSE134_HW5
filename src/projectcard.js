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

async function loadProjects() {
    const projectCardContainer = document.getElementById("projectcard-container");
    let projects = JSON.parse(localStorage.getItem("projects"));

    try {
        const response = await fetch("projects.json");
        const data = await response.json();
        ///... syntax expands an array 
        projects = [...projects, ...data]
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

localStorage.setItem("projects", JSON.stringify([
    {
        "title": "Yesstyle",
        "image": "media/yesstyle.webp",
        "description": "Asian e-commerce company for beauty and fashion",
        "link": "https://yesstyle.com",
        "linkName": "Yesstyle website"
    }
]));

document.addEventListener("DOMContentLoaded", loadProjects);