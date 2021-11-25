var data = [];
var today = new Date();
var winer = [];
var getData = [];
// var LocalData = localStorage.getItem("StoredData");
// var LocalData2 = JSON.parse(LocalData);
// getData = LocalData2;
var id = 0;

createTags();


function savedata() {
    // e.preventDefault();

    var namee = document.getElementById("name").value;
    var subj = document.getElementById("subj").value;

    data.push({
        id: ++id,
        nom: namee,
        sujet: subj
    });

    var dataJSON = JSON.stringify(data);
    localStorage.setItem('StoredData', dataJSON);
    createTags();

}

function createTags() {

    var recoverdData = localStorage.getItem('StoredData');
    var recoverdData2 = JSON.parse(recoverdData);

    var tags = document.getElementById('tags');
    tags.innerHTML = "";
    for (var i = 0; i < recoverdData2.length; i++) {

        tags.innerHTML +=
            ` 
            <span class="tag" >${recoverdData2[i].nom}-${recoverdData2[i].sujet} </span>
                        
                            `
        document.getElementById("name").value = "";
        document.getElementById("subj").value = "";
    }

}

// --------------- random ---------------




function Randoom() {
    today.setDate(today.getDate() + 1);
    if (today.getDay() == 6) {
        today.setDate(today.getDate() + 2)

    }

    var LocalData = localStorage.getItem("StoredData");
    getNewData = JSON.parse(LocalData);

    var Num = getNewData.length;
    if (Num == 0) {
        console.log("No data")
    }
    var rand = Math.floor(Math.random() * Num);
    winer.push({
        winer_id: getNewData[rand].id,
        winer_name: getNewData[rand].nom,
        winer_sujet: getNewData[rand].sujet,
        winer_date: today.toLocaleDateString()

    });
    console.log(getNewData);
    read_winner(getNewData[rand].id);



}

function read_winner(id) {
    var table = document.getElementById('tbodyy');
    table.innerHTML = "";
    for (let i = 0; i < winer.length; i++) {

        table.innerHTML += `<tr style="text-align: center; vertical-align: middle;">
                            <td >${winer[i].winer_name}</td>
                            <td>${winer[i].winer_sujet}</td>
                            <td>${winer[i].winer_date}</td>
                            <td class="ff">${winer[i].winer_id}</td>

                          </tr>`;

    }


    var NewLocal = JSON.stringify(getNewData.filter((element) => element.id !== id))
    localStorage.setItem('StoredData', NewLocal);
    createTags();

}







// // export pdf
function downloadDoc() {

    html2canvas($("#myPopup")[0], {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }]
            };
            pdfMake.createPdf(docDefinition).download("Table.pdf");
        }
    })



}