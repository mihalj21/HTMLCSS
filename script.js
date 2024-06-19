/*const users = [
    {
      ime: 'Marko',
      prezime: 'Horvat',
      dob: 25,
      email: 'marko@example.com'
    },
    {
      ime: 'Ana',
      prezime: 'Kovač',
      dob: 30,
      email: 'ana@example.com'
    },
    {
      ime: 'Ivan',
      prezime: 'Novak',
      dob: 35,
      email: 'ivan@example.com'
    },
    {
      ime: 'Lucija',
      prezime: 'Marin',
      dob: 28,
      email: 'lucija@example.com'
    }
  ];

  const jsonUsers = JSON.stringify(users);
  localStorage.setItem('korisnici', jsonUsers);
 
  const storedUser = localStorage.getItem('korisnici');
*/

document.addEventListener('DOMContentLoaded', function(){
    let url = window.location.href;
    if(url.includes('index.html')){
        addTable();
    }else if (url.includes('updateUser.html')) {
        populateUpdateForm();
    }
})

const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.addEventListener('submit', addNewUser);
    }

    const updateUserForm = document.getElementById('updateUserForm');
    if (updateUserForm) {
        updateUserForm.addEventListener('submit', updateUser);
    }

  function addTable() {

    const tbody = document.getElementById('myTable');
    if (!tbody) {
        console.error('Table body (tbody) element not found.');
        return;
    }
    let newUsers = JSON.parse(localStorage.getItem('korisnici')) || [];
    tbody.innerHTML = '';

    newUsers.forEach((user, index) => {
        const row = document.createElement('tr');

        const ime = document.createElement('td');
        ime.textContent = user.ime;
        row.appendChild(ime);

        const prezime = document.createElement('td');
        prezime.textContent = user.prezime;
        row.appendChild(prezime);

        const dob = document.createElement('td');
        dob.textContent = user.dob;
        row.appendChild(dob);

        const email = document.createElement('td');
        email.textContent = user.email;
        row.appendChild(email);

        const actions = document.createElement('td');

       
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Edit';
        updateButton.addEventListener('click', () => openUpdatePage(index));
        actions.appendChild(updateButton);

        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteUser(index)); 
        actions.appendChild(deleteButton);


        row.appendChild(actions);

        tbody.appendChild(row);

        
    });
}



  function addNewUser(event) {

    event.preventDefault();

    const ime = document.getElementById('ime').value;
    const prezime = document.getElementById('prezime').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;

    const newUSer = {

        ime: ime,
        prezime: prezime,
        email: email,
        dob: dob
    };

    
    let newUsers = JSON.parse(localStorage.getItem('korisnici')) || [];

    newUsers.push(newUSer);


    localStorage.setItem('korisnici', JSON.stringify(newUsers));
   
    document.getElementById('addUserForm').reset();


  }


  function deleteUser(index) {
    console.log('Deleting user at index:', index);

    let users = JSON.parse(localStorage.getItem('korisnici')) || [];

    if (index >= 0 && index < users.length) {
        users.splice(index, 1);
        localStorage.setItem('korisnici', JSON.stringify(users));
        addTable(); 
    } else {
        console.error('Invalid index:', index);
    }
}
function getUserById(userId) {
    const users = JSON.parse(localStorage.getItem('korisnici')) || [];
    return users.find(user => user.userId === userId); 
}

function openUpdatePage(index) {
    window.location.href = `updateUser.html?index=${index}`;
}

function populateUpdateForm() {
    const urlParams = new URLSearchParams(window.location.search);
    const index = urlParams.get('index');

    let users = JSON.parse(localStorage.getItem('korisnici')) || [];
    const user = users[index];

    if (user) {
        document.getElementById('ime').value = user.ime;
        document.getElementById('prezime').value = user.prezime;
        document.getElementById('dob').value = user.dob;
        document.getElementById('email').value = user.email;
        document.getElementById('userId').value = index;
    } else {
        console.error('User not found:', index);
    }
}

function updateUser(event) {
    event.preventDefault();

    const ime = document.getElementById('ime').value;
    const prezime = document.getElementById('prezime').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const index = document.getElementById('userId').value;

    let users = JSON.parse(localStorage.getItem('korisnici')) || [];

    if (index >= 0 && index < users.length) {
        users[index] = {
            ime: ime,
            prezime: prezime,
            email: email,
            dob: dob
        };

        localStorage.setItem('korisnici', JSON.stringify(users));
        window.location.href = 'index.html';
    } else {
        console.error('Invalid index:', index);
    }
}