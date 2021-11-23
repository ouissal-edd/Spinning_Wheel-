const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');
textarea.focus();

textarea.addEventListener('keyup', (e) => {
    // create a tag for all the inputs separated by a comma
    createTags(e.target.value);

    // check if the enter key is pressed
    if (e.key === 'Enter') {
        setTimeout(() => {
            // e.target.value = '';
            document.getElementById("myForm").style.display = "block";
            wiin = document.querySelector(".highlight").innerText;
            zone = document.getElementById("affichage_win");
            zone.innerHTML = wiin;

        }, 6000)

        randomSelect();
    }
});

function createTags(input) {
    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim());
    // clean up the tags first
    tagsEl.innerHTML = '';

    // map over the tags and add them to the tagsEl container
    tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.classList.add('tag');
        tagEl.innerText = tag;
        tagsEl.appendChild(tagEl);

    })
}

function randomSelect() {
    const times = 30;

    const interval = setInterval(() => {
        const randomTag = pickRandomTag();

        highlightTag(randomTag);

        // remove the highlight after a while
        setTimeout(() => {
            unhighlightTag(randomTag);
        }, 100);
    }, 100);

    // then pick another tag
    setTimeout(() => {
        clearInterval(interval);

        setTimeout(() => {
            const randomTag = pickRandomTag();

            highlightTag(randomTag)
        }, 100);
    }, times * 100);




}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag');
    return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
    tag.classList.add('highlight');


}

function unhighlightTag(tag) {
    tag.classList.remove('highlight');

}




// add elements 
btn_json = document.getElementById("btn_json");
btn_json.addEventListener('click', e => {
    e.preventDefault();

    namee = document.getElementById("affichage_win");
    subject = document.getElementById("subj");
    date = document.getElementById("date");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({
        nom: namee.innerText,
        sujet: subject.value,
        date: date.value,
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
    };

    fetch("http://localhost:8000/users", requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));


})

// Animation btn restart
restart = document.getElementById('reset');
restart.addEventListener('click', e => {
    e.preventDefault();
    var deg = Math.floor(Math.random() * (150 - 200)) + 398;
    restart.style.transform = "rotate(" + deg + "deg)";



})

// read data
async function read_candidat() {

    const res = await fetch('http://localhost:8000/users')
    const candidat = await res.json()

    document.getElementById('myPopup').innerHTML += ` <tr>
    <th style="text-align:center">Nom</th>
    <th style="text-align:center">Sujet</th>
    <th style="text-align:center">date</th>
    <th style="text-align:center">Classement</th>
</tr>`

    for (let i = 0; i < candidat.length; i++) {
        document.getElementById('myPopup').innerHTML +=
            ` 
            <tr>
            <td> ${candidat[i].nom}</td>
            <td>${candidat[i].sujet}</td>
            <td>${candidat[i].date}</td>
            <td class="id_candidat">${candidat[i].id}</td>
          </tr>
       `

    }

}
read_candidat();

// Get today
function getDay() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    return today;
}

date = document.getElementById("date");
Today_Date = getDay();
date.min = Today_Date;
date.value = Today_Date;



// delete data 



// res = document.querySelector("#reset");
// id_item = document.querySelector(".id_candidat").value;
// res.addEventListener('click', e => {
//     e.preventDefault();
//     obj = {
//         id: id_item
//     }
//     fetch('http://localhost:8000/users/' + 1, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         }).then(res => res.json())
//         .then(data => console.log(data))

// })