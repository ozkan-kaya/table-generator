let tableDataArray = [];

loadTables();

function saveTables() {
    localStorage.setItem('tables', JSON.stringify(tableDataArray));
}

function loadTables() {
    tableDataArray = JSON.parse(localStorage.getItem('tables')) || [];
    tableDataArray.forEach(entries => {
        createTableFromData(entries);
    });
}

function createTableFromData(entries) {
    const tableDiv = document.createElement('div');
    tableDiv.className = 'table';
    tableDiv.innerHTML = `
        <table>
            <tr>
                <td></td>
                <td><button class="delete-table-button">Delete Table</button></td>
                <td><button class="clear-button">Clear</button></td>
                <td><button class="add-button">Add</button></td>
            </tr>
            <tr class="bold-text underline">
                <td>Name</td>
                <td>Surname</td>
                <td>Number</td>
                <td>Delete</td>
            </tr>
        </table>
    `;

    const table = tableDiv.querySelector('table');

    entries.forEach(entry => {
        addEntryToTable(table, entry);
    });

    document.querySelector('.generated-tables').appendChild(tableDiv);
    tableDiv.querySelector('.delete-table-button').addEventListener('click', () => deleteTable(tableDiv));
    tableDiv.querySelector('.clear-button').addEventListener('click', () => clearTable(table));
    tableDiv.querySelector('.add-button').addEventListener('click', (event) => addEntry(event, table));
}

function createTable() {
    const nameInputElement = document.querySelector('.name-input');
    const surnameInputElement = document.querySelector('.surname-input');
    const numberInputElement = document.querySelector('.number-input');

    if (!(nameInputElement.value && surnameInputElement.value && numberInputElement.value)) {
        alert('Fill the missing values.');
    } else {
        const newEntry = {
            name: nameInputElement.value,
            surname: surnameInputElement.value,
            number: numberInputElement.value
        };

        const newTable = [newEntry];
        tableDataArray.push(newTable);
        createTableFromData(newTable);

        nameInputElement.value = '';
        surnameInputElement.value = '';
        numberInputElement.value = '';

        saveTables();
    }
}

function deleteAllTables() {
    if (confirm('Are you sure you want to delete all tables?')) {
        document.querySelector('.generated-tables').innerHTML = '';
        tableDataArray = [];
        saveTables();
    }
}

function deleteTable(tableDiv) {
    const index = Array.from(document.querySelector('.generated-tables').children).indexOf(tableDiv);
    tableDataArray.splice(index, 1);
    tableDiv.remove();
    saveTables();
}

function clearTable(table) {
    const index = Array.from(document.querySelector('.generated-tables').children).indexOf(table.parentElement);
    tableDataArray[index] = [];
    Array.from(table.querySelectorAll('.entry')).forEach(entry => entry.remove());
    saveTables();
}

function addEntryToTable(table, entry) {
    const row = document.createElement('tr');
    row.className = 'entry';
    row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.surname}</td>
        <td>${entry.number}</td>
        <td><button class="delete-entry-button">Delete</button></td>
    `;
    table.appendChild(row);
    row.querySelector('.delete-entry-button').addEventListener('click', () => deleteEntry(row, table));
}

function addEntry(event, table) {
    const nameInputElement = document.querySelector('.name-input');
    const surnameInputElement = document.querySelector('.surname-input');
    const numberInputElement = document.querySelector('.number-input');

    if (!(nameInputElement.value && surnameInputElement.value && numberInputElement.value)) {
        alert('Fill the missing values.');
    } else {
        const newEntry = {
            name: nameInputElement.value,
            surname: surnameInputElement.value,
            number: numberInputElement.value
        };

        const index = Array.from(document.querySelector('.generated-tables').children).indexOf(table.parentElement);
        tableDataArray[index].push(newEntry);
        addEntryToTable(table, newEntry);

        nameInputElement.value = '';
        surnameInputElement.value = '';
        numberInputElement.value = '';

        saveTables();
    }
}

function deleteEntry(row, table) {
    const index = Array.from(document.querySelector('.generated-tables').children).indexOf(table.parentElement);
    const entryIndex = Array.from(table.querySelectorAll('.entry')).indexOf(row);
    tableDataArray[index].splice(entryIndex, 1);
    row.remove();
    saveTables();
}