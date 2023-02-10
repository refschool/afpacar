
$(document).ready(function () {
    getInfo();


});
function getInfo() {


    //init var datas and add setting index and token  
    var datas = {
        bJSON: 1,
        page: "charte_du_bon_conducteur_list",
        id_page:1
    }
    //init call ajax 
    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", // action="./php/route.php"
        data: datas,
        async: true, // allows synchronous or asynchronous multiple JS calls to PHP
        dataType: "json", // format expected of return PHP
        cache: false, // stock in to the cache false
    })
        //if the call ajax is ok
        .done(function (result) {
            afficher(result);
        })
        //if call ajax dont work  
        .fail(function (err) {
            //send in to the console the errors code 
            console.log('newAdmin Error:' + err.status);
        })
}

function afficher(aOfAdmInfo){
    var result= aOfAdmInfo[0]["content_page"];
    $("#charte_du_bon_conducteur").html(result);
    console.log(aOfAdmInfo[0]["content_page"]);
}