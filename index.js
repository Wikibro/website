
function renderTable() {
    const studentsTableBody = document.querySelector('#studentsTable tbody');
    // Retrieve data from localStorage

    const studentsArray = JSON.parse(localStorage.getItem('students')) || [];

    const rows = studentsArray.map((student, index) => `
                <tr>
                     <td>${student.firstName}</td>
                    <td>${student.middleName}</td>
                    <td>${student.lastName}</td>
                    <td>${student.fatherName}</td>
                    <td>${student.email}</td>
                    <td>${student.id}</td>
                    <td>${student.address}</td>
                    <td>${student.city}</td>
                    <td>${student.age}</td>
                    <td>${student.Class}</td>
                    <td>${student.section}</td>
                   
                     <td><img src="${student.image}" alt=
                    "Student Image" style="width: 150px; height: auto;"></td>
                    <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})">Delete</button>
                </td>
                </tr>
            `).join('');

    studentsTableBody.innerHTML = rows;

}

let studentsArray = [];

document.getElementById('myform').addEventListener('submit', function (e) {
    e.preventDefault();
    const firstName = document.getElementById('Fname').value;
    const middleName = document.getElementById('Mname').value;
    const lastName = document.getElementById('Lname').value;
    const fatherName = document.getElementById('FAname').value;
    const email = document.getElementById('Email').value;
    const id = document.getElementById('Id').value;
    const address = document.getElementById('Address').value;
    const city = document.getElementById('City').value;
    const age = document.getElementById('Age').value;
    const Class = document.getElementById('Class').value;
    const section = document.getElementById('Section').value;
    const imageInput = document.getElementById('profile-picture').files[0]; // Get the file from input

    let image = ''; // Default empty

    if (imageInput) {
        const reader = new FileReader();

        reader.onloadend = function () {
            image = reader.result; // This is the base64 string of the image
            saveData(); // Save data once image is loaded
        };

        reader.readAsDataURL(imageInput); // Read the image as base64
    } else {
        saveData(); // Save data if no image is selected
    }

    function saveData() {
        const studentsArray = JSON.parse(localStorage.getItem('students')) || [];
        const hiddenIndex = document.getElementById('hiddenIndex').value;
        let result = {
            firstName,
            middleName,
            lastName,
            fatherName,
            email,
            id,
            address,
            city,
            age,
            Class,
            section,
            image,
        };




        if (hiddenIndex) {
            studentsArray[hiddenIndex] = result;
            localStorage.setItem('students', JSON.stringify(studentsArray));
            document.getElementById('hiddenIndex').value = ''; // Clear hidden index
            document.getElementById('submitButton').style.display = 'inline-block'; // Show submit button
            document.getElementById('updateButton').style.display = 'none'; // Hide update button
        } else {
            studentsArray.push(result);
            localStorage.setItem('students', JSON.stringify(studentsArray));
        }
        document.getElementById('myform').reset(); // Reset the form fields
        renderTable();
    }
});

// Function to delete a student
function deleteStudent(index) {
    const studentsArray = JSON.parse(localStorage.getItem('students')) || [];
    studentsArray.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(studentsArray));
    renderTable();
}

// Function to edit a student
function editStudent(index) {
    const studentsArray = JSON.parse(localStorage.getItem('students')) || [];
    const student = studentsArray[index];

    document.getElementById('Fname').value = student.firstName;
    document.getElementById('Mname').value = student.middleName;
    document.getElementById('Lname').value = student.lastName;
    document.getElementById('FAname').value = student.fatherName;
    document.getElementById('Email').value = student.email;
    document.getElementById('Id').value = student.id;
    document.getElementById('Address').value = student.address;
    document.getElementById('City').value = student.city;
    document.getElementById('Age').value = student.age;
    document.getElementById('Class').value = student.Class;
    document.getElementById('Section').value = student.section;

    document.getElementById('hiddenIndex').value = index;
    document.getElementById('submitButton').style.display = 'none'; // Hide submit button
    document.getElementById('updateButton').style.display = 'inline-block'; // Show update button
}

// Initial render of the table
// Function to toggle form visibility
document.addEventListener('DOMContentLoaded', () => {
    const toggleFormBtn = document.getElementById('toggleFormBtn');
    const myForm = document.getElementById('myform');
    
    toggleFormBtn.addEventListener('click', () => {
        if (myForm.style.display === 'none') {
            myForm.style.display = 'block';
            toggleFormBtn.textContent = 'Hide Form';
        } else {
            myForm.style.display = 'none';
            toggleFormBtn.textContent = 'Show Form';
        }
    });

    // Initial table render
    renderTable();
});




