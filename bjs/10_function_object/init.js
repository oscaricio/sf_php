let firstNameNode = document.getElementById('firstNameOutput'),
    surnameNode = document.getElementById('surnameOutput'),
    lastNameNode = document.getElementById('lastNameOutput'),
    genderNode = document.getElementById('genderOutput'),
    professionNode = document.getElementById('professionOutput'),
    birthDateNode = document.getElementById('birthDateOutput'),
    firstNameDefaultText = firstNameNode.innerText,
    surnameDefaultText = surnameNode.innerText,
    lastNameDefaultText = lastNameNode.innerText,
    genderDefaultText = genderNode.innerText,
    professionDefaultText = professionNode.innerText,
    birthDateDefaultText = birthDateNode.innerText;

function init() {
    const initPerson = personGenerator.getPerson();
    firstNameNode.innerText = initPerson.firstName;
    surnameNode.innerText = initPerson.surname;
    lastNameNode.innerText = initPerson.lastName;
    genderNode.innerText = initPerson.gender;
    professionNode.innerText = initPerson.profession;
    birthDateNode.innerText = initPerson.birthDate + ' ' + initPerson.birthMonth + ' ' + initPerson.birthYear + ' года рождения';
}

function clearPerson() {
    firstNameNode.innerText = firstNameDefaultText;
    surnameNode.innerText = surnameDefaultText;
    lastNameNode.innerText = lastNameDefaultText;
    genderNode.innerText = genderDefaultText;
    professionNode.innerText = professionDefaultText;
    birthDateNode.innerText = birthDateDefaultText;
}

window.onload = function()
{
    init();

    //const initPerson = personGenerator.getPerson();
    // document.getElementById('firstNameOutput').innerText = initPerson.firstName;
    // document.getElementById('surnameOutput').innerText = initPerson.surname;
    // document.getElementById('lastNameOutput').innerText = initPerson.lastName;
    // document.getElementById('genderOutput').innerText = initPerson.gender;
    // document.getElementById('professionOutput').innerText = initPerson.profession;
    //
    // document.getElementById('birthDateOutput').innerText = initPerson.birthDate + ' ' + initPerson.birthMonth + ' ' + initPerson.birthYear + ' года рождения';
};

