
// CONFIGURATION DATATABLE

const configuration = {
    "stateSave": false,
    "order": [[1, "asc"]],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [[10, 25, 50, 100, -1], ["Dix", "Vingt cinq", "Cinquante", "Cent", "Ze total stp"]],
    "language": {
        "info": "Administrateur _START_ à _END_ sur _TOTAL_ sélectionnées",
        "emptyTable": "Aucun administrateur",
        "lengthMenu": "_MENU_ Administrateurs par page",
        "search": "Rechercher : ",
        "zeroRecords": "Aucun résultat de recherche",
        "paginate": {
            "previous": "Précédent",
            "next": "Suivant"
        },
        "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoEmpty": "Administrateur 0 à 0 sur 0 sélectionnée",
    },
    "responsive": {
        "responsive": true
    },
    "columns": [
        {
            "orderable": false
        },
        {
            "orderable": true
        },
        {
            "orderable": false
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        },
        {
            "orderable": true
        }
    ],
    'retrieve': true
};

//init dataTable responsive

$('#table_personnes').DataTable({
    responsive: true
});

//init variable 

var aListDatas;
var tables;
var iIndice;

//Specify a function to execute when the DOM is fully loaded.

$(document).ready(function () {
    constructTable();
    // INIT DATATABLE
    tables = $('#table_personnes').DataTable(configuration);

    //call function getAdminUsers
    getUserRides()
    //hide modal button
    $("#is_user_writed").hide();
    $("#is_user_writed_update").hide();
    $("#is_user").hide();
    $("#priceInput-show").hide();
    $("#ServInput-show").hide();
    $("#notUserWriter").hide();
    $("#UserWriter").hide();
    $("#UserWriterUpdate").hide();



});

/**
 * function for construct dataTable with returne call ajax
 * @param {Array} datas 
 * @returns 
 */

function constructTable(datas) {
    if (datas == null) {
        //return nothing
        return;
    }

    var sHTML = "<thead>";
    sHTML += "<tr>";
    sHTML += "<td align='center'>visualiser</td>";
    sHTML += "<td align='center'>depart</td>";
    sHTML += "<td align='center'></td>";
    sHTML += "<td align='center'>arrivé</td>";
    sHTML += "<td align='center'>Passager</td>";
    sHTML += "<td align='center'>État contrat</td>";

    sHTML += "<td align='center'>prix réglement/service</td>";
    sHTML += "</tr>";
    sHTML += "</thead>";
    sHTML += "<tbody>";
    for (var i = 0; i < datas.length; i++) {
        iIndice = i;
        var colapse = "<buttom class='position-absolute verif-service btn btn-md' data-bs-toggle='collapse' href='#collapseExample' ><i class='h3 text-pink far fa-handshake'></i></buttom>"

        sHTML += "<tr>";
        sHTML += "<td class='verif-logo-visual ps-5'><buttom class'btn  btn-md'  data-bs-toggle='modal'data-bs-target='#exampleModal'>" + colapse + "</buttom></td>";
        sHTML += "<td class='ps-5' align='center'>" + datas[i]['citydep'] + "</td>";
        if (aListDatas[i]["is_active_ad"] === 1) {
            sHTML += "<td align='left' class='td-border'><div class='div-car slidecar-moove road'><div><div class='slidecarswitch'><i class='text-pink car-icon fas h2 fa-car-side'></i></div></div></div></td>";
        } else {
            sHTML += "<td align='left' class='td-border'><div class='div-car slidecar-moove road'><div><div class='slidecar'><i class='text-pink car-icon fas h2 fa-car-side'></i></div></div></div></td>";

        }
        sHTML += "<td align='center'>" + aListDatas[i]['cityar'] + "</td>";
        sHTML += "<td align='center'>" + aListDatas[i]["firstname_user"] + "</td>";
        sHTML += "<td align='center'>" + aListDatas[i]["is_active_ad"] + "</td>";

        sHTML += "<td class='position-relative ' align='center'><span>" + aListDatas[i]["price_contract__passenger"] + "€<buttom class='position-absolute btn-ico-info d-block justify-content-center btn btn-md' data-bs-toggle='tooltip' data-bs-placement='top' title='\ " + aListDatas[i]["service_contract__passenger"] + "'\><i class='fas fa-info-circle h3 text-pink'></i></buttom></span> </td>";

    }
    sHTML += "</tbody>";

    $('#table_personnes').html(sHTML);
    // creatmodal()
}

/**
 * function call ajax for create element in to the json and datatable
 * @param {string} page:   
 * @param {Boolean} bJSON:  
 * @returns {array} datas:
 */

function getUserRides() {
    //init call ajax 

    //init var datas and add contract 
    var datas = {
        page: 'verification_des_avantage__getuserrides',
        bJSON: 1,
    }


    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", // action="lecture_fichier_retour_json.php"
        async: true, // allows synchronous or asynchronous multiple JS calls to PHP
        data: datas, // past the lsit of variable to send (datas)
        dataType: "json", //  format expected of return PHP
        cache: false, // stock in to the cache false
    })
        //if the call ajax is ok
        .done(function (datas) {
            console.log(datas)
            //add datas in to aPinting
            aListDatas = datas;
            //clear datatable
            tables.clear();
            //destroy datatable
            tables.destroy();
            //call function constructTable whit arguments of datas
            constructTable(aListDatas);
            // init datatable with the constant configuration
            tables = $('#table_personnes').DataTable(configuration);

            replace(datas)

            for (let i = 0; i < aListDatas.length; i++) {

                if ((aListDatas[i]['boolean'] === 1)
                    && (aListDatas[i]['price_contract__passenger'] == null || aListDatas[i]['price_contract__passenger'] == "")
                    && (aListDatas[i]['service_contract__passenger'] == null || aListDatas[i]['service_contract__passenger'] == "")) {
                        $("#is_user_writed_update").show();
                        $("#is_user_writed").hide();
                        $("#is_user").hide();
                        $("#priceInput-show").hide();
                        $("#ServInput-show").hide();
                }



                if((aListDatas[i]['boolean'] === 0)
                &&(aListDatas[i]['datetime_creation_contract__passenger'] != null || aListDatas[i]["datetime_creation_contract__passenger"] != "")){
                    $("#notContratWriter").hide()
                }



                if((aListDatas[i]['boolean'] === 0)
                &&(aListDatas[i]['	datetime_acceptance_contract__passenger'] == null || aListDatas[i]["datetime_acceptance_contract__passenger"] == "")){
                   
                    $("#is_user").show();


                    if ((aListDatas[i]['price_contract__passenger'] == null || aListDatas[i]['price_contract__passenger'] == "")
                    && (aListDatas[i]['service_contract__passenger'] == null || aListDatas[i]['service_contract__passenger'] == "")) {
                        $("#notContratWriter").hide();
                        $("#is_user_writed_update").hide();
                        $("#is_user_writed").hide();
                        $("#is_user").hide();
                        $("#priceInput-show").hide();
                        $("#ServInput-show").hide();
                        $("#priceInput").prop('disabled', true);
                        $("#service_input").prop('disabled', true);
                        $("#content_add").prop('disabled', true);
                    }
                    
                }

            }
        })
        //if call ajax dont work  
        .fail(function (err) {
            //send in to the console the errors code 
            console.log('Load Error: ' + err.status);
        });
}

/**
 * if the checkbox price is checked show the button else hide it 
 */

function pricechange() {

    if ($("#PriceCheck").prop("checked") == true) {
        $("#priceInput-show").show();
    } else if ($("#PriceCheck").prop("checked") == false) {
        $("#priceInput-show").hide();
    }
}

/**
 * if the checkbox price is checked show the button else hide it 
 */

function servchange() {

    if ($("#ServCheck").prop("checked") == true) {
        $("#ServInput-show").show();
    } else if ($("#ServCheck").prop("checked") == false) {
        $("#ServInput-show").hide();
    }
}

/**
 * function add datas in to the input 
 * @param {array} datas array of datas 
 */

function replace(datas) {

    var iPrice, sService;

    iPrice = datas[iIndice]["price_contract__passenger"];

    sService = datas[iIndice]["service_contract__passenger"];

    sContent_ad = datas[iIndice]["content_ad"];

    $('#priceInput').val(iPrice);

    $('#service_input').val(sService);

    $('#content_add').val(sContent_ad)
}


function onkeyup_update() {
    priceInput = $("#priceInput").val();
    service_input = $("#service_input").val();
    content_add = $("#content_add").val();
    if ((aListDatas[iIndice]['price_contract__passenger'] != priceInput)
        || (aListDatas[iIndice]['service_contract__passenger'] != service_input
            || aListDatas[iIndice]['content_ad'] != content_add)) {
        $("#is_user_writed_update").show();
        $("#UserWriterUpdate").show();
        $("#notContratWriter").hide();
        $("#is_user").hide();

    } else {
        $("#is_user_writed_update").hide();
        $("#UserWriterUpdate").hide();
        $("#notContratWriter").hide();
        $("#is_user").show();

    }
}