document.addEventListener("DOMContentLoaded", function () {
    fetch("family.json")
        .then(response => response.json())
        .then(data => {
            const treeContainer = document.getElementById("tree-container");
            treeContainer.appendChild(createNode(data));
        });

    function createNode(member) {
        let nodeDiv = document.createElement("div");
        nodeDiv.className = "node";

        let img = document.createElement("img");
        img.src = member.photo;
        img.alt = member.name;

        let name = document.createElement("p");
        name.textContent = member.name;

        nodeDiv.appendChild(img);
        nodeDiv.appendChild(name);

        if (member.children && member.children.length > 0) {
            let childrenDiv = document.createElement("div");
            childrenDiv.className = "children";

            member.children.forEach(child => {
                childrenDiv.appendChild(createNode(child));
            });

            nodeDiv.appendChild(childrenDiv);

            nodeDiv.onclick = function (event) {
                event.stopPropagation();
                childrenDiv.style.display = 
                    childrenDiv.style.display === "none" ? "block" : "none";
            };
        }

        return nodeDiv;
    }
});

