const createButton = document.getElementById("createButton");
const tableBody = document.getElementById("tableBody");
const addNewBookButton = document.getElementById("addNewBookButton");
const formCard = document.getElementById("formCard");
const form = document.querySelector(".create_form");
const updateDataButton = document.getElementById("updateDataButton");


function saveBookToLocalStorage(book) {
    let books = [];

  
    if (localStorage.getItem("books")) {
        books = JSON.parse(localStorage.getItem("books"));
    }

    // Add the new book to the array
    books.push(book);

    // Store the updated array of books in local storage
    localStorage.setItem("books", JSON.stringify(books));
}

// fetch and display 
function displayBooksFromLocalStorage() {
    if (localStorage.getItem("books")) {
        const books = JSON.parse(localStorage.getItem("books"));
        let rowNumber = 1;

        // Iterate through the books and create table rows for each book
        books.forEach(function(book) {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
                <th scope="row">${rowNumber}</th>
                <td>${book.titre}</td>
                <td>${book.auteur}</td>
                <td>${book.prix}</td>
                <td><button class="btn btn-primary">Editer</button></td>
                <td><button class="btn btn-danger">Supprimer</button></td>
            `;
            tableBody.appendChild(newRow);
            rowNumber++;
        });
    }
}

//  display books when the page loads :
displayBooksFromLocalStorage();

createButton.addEventListener("click", function() {
    const titre = document.getElementById("titre").value;
    const auteur = document.getElementById("auteur").value;
    const prix = document.getElementById("prix").value;

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <th scope="row">${tableBody.children.length + 1}</th>
        <td>${titre}</td>
        <td>${auteur}</td>
        <td>${prix}</td>
        <td><button class="btn btn-primary">Editer</button></td>
        <td><button class="btn btn-danger">Supprimer</button></td>
    `;

    tableBody.appendChild(newRow);

   
    const book = {
        titre: titre,
        auteur: auteur,
        prix: prix
    };

    saveBookToLocalStorage(book);

    document.getElementById("titre").value = "";
    document.getElementById("auteur").value = "";
    document.getElementById("prix").value = "";
});

formCard.style.display = "none";

addNewBookButton.addEventListener("click", function() {
    if (formCard.style.display === "none" || formCard.style.display === "") {
        formCard.style.display = "block";
    } else {
        formCard.style.display = "none";
    }
});

function populateFormWithRowData(row) {
    const titre = row.cells[1].textContent;
    const auteur = row.cells[2].textContent;
    const prix = row.cells[3].textContent;

    document.getElementById("titre").value = titre;
    document.getElementById("auteur").value = auteur;
    document.getElementById("prix").value = prix;
}

updateDataButton.addEventListener("click", function() {
    const updatedTitre = document.getElementById("titre").value;
    const updatedAuteur = document.getElementById("auteur").value;
    const updatedPrix = document.getElementById("prix").value;

    const selectedRow = document.querySelector("tr.selected");

    if (selectedRow) {
        updateTableRow(selectedRow, updatedTitre, updatedAuteur, updatedPrix);
    }

    document.getElementById("titre").value = "";
    document.getElementById("auteur").value = "";
    document.getElementById("prix").value = "";
});

function updateTableRow(row, titre, auteur, prix) {
    row.cells[1].textContent = titre;
    row.cells[2].textContent = auteur;
    row.cells[3].textContent = prix;
}

tableBody.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-primary")) {
        const row = event.target.closest("tr");

        if (row.classList.contains("selected")) {
            row.classList.remove("selected");
        } else {
          
            const selectedRows = document.querySelectorAll("tr.selected");
            selectedRows.forEach(function(selectedRow) {
                selectedRow.classList.remove("selected");
            });

            row.classList.add("selected");
            populateFormWithRowData(row);
        }
    }
});




function deleteTableRow(row) {
    row.remove();
}

tableBody.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-danger")) {
        const row = event.target.closest("tr");

        const confirmDelete = confirm("Are you sure you want to delete this row?");

        if (confirmDelete) {
            deleteTableRow(row);
        }
    }
});
