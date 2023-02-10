

//
//start of coded creat by Mathieu
//

//init variable 
var id_user;
var aListDatasConnect;
var aListDatas;
var benef_datas;
var index;
var tables;
var modal = ""
var construct_select
var dataRole
var bFirst = 0
var brole = 0
var afpaconnect;
//Specify a function to execute when the DOM is fully loaded.
$(document).ready(function () {

    getRole();

    //call function getAdminUsers
    getAdminUsers()
    //call of the function constructTable
    constructTable();
    // init datatable with the constant configuration
    tables = $('#table_user_admin').DataTable(configuration);
});


/**
 * creat the datatable html 
 * @constructTable {datas}
 * @param datas is returns of the call ajax 
 * @returns array datas 
 */
function constructTable(datas) {
    //if datas is empty or null
    if ((datas == null)) {
        //return nothing
        return;
    }
    aListDatas = datas
    //init variable shtml and concatenated into shtml the datatable
    var sHTML = "<thead>";
    sHTML += "<tr>";
    sHTML += "<td align='center'>Code Beneficiaire</td>";
    sHTML += "<td align='center'>Nom</td>";
    sHTML += "<td align='center'>Prenom</td>";
    sHTML += "<td align='center'>Email</td>";
    sHTML += "<td align='center'>role</td>";
    sHTML += "<td align='center'>eta</td>";
    sHTML += "<td align='center'>action</td>";
    sHTML += "</tr>";
    sHTML += "</thead>";
    sHTML += "<tbody>";
    //search in to variable datas the datas for the dataTable
     
    if (bFirst == 0){
        for (var j = 0; j < dataRole['content'].length; j++){
            //var using for build selection
            if (dataRole['content'][j].tag == "ROLE_USER") {
                dataRole['content'][j].tag = "Utilisateur"
            }
            if (dataRole['content'][j].tag == "ROLE_ADMIN") {
                dataRole['content'][j].tag = "Administrateur"
            }
            if (dataRole['content'][j].tag == "ROLE_SUPER_ADMIN") {
                dataRole['content'][j].tag = "Super Admin"
            }
                construct_select += ("<option value="+ dataRole['content'][j].tag +">" + dataRole['content'][j].tag  + "</option>")
        }
        bFirst = 1
    }
 

    for (var i = 0; i < datas.length; i++) {
        id_user = datas[i].id_user
        if (datas[i].name_role == "ROLE_USER") {
            datas[i].name_role = "Utilisateur"
        }
        if (datas[i].name_role == "ROLE_ADMIN") {
            datas[i].name_role = "Administrateur"
        }
        if (datas[i].name_role == "ROLE_SUPER_ADMIN") {
            datas[i].name_role = "Super Admin"
        }
        //concatenated in to datatable with datas
        sHTML += "<tr id='row_" + i + "'>";
        sHTML += "<td align='center'>" + datas[i].registration_number_user + "</td>";
        sHTML += "<td align='center'>" + datas[i].name_user + "</td>";
        sHTML += "<td align='center'>" + datas[i].firstname_user + "</td>";
        sHTML += "<td align='center'>" + datas[i].email_user + "</td>";
        sHTML += "<td align='center'><select class='input_select mx-auto  input_select_blue' id='select_role"+i+"' onchange='changeRole("+datas[i].id_user+","+i+")'>";
        sHTML += "<option value="+  datas[i].name_role +">" +  datas[i].name_role  + "</option>" 
        sHTML += ""+ construct_select +"</select></td>";
        sHTML2 += "<div class='user_actu_mini_actu' id='mini_article' onClick='article_complet("+ i +", "+ aofactu +")'></div>"
        //if eta usersAdmin equal at true   
        if (datas[i].is_active_user == 1) {
            //display switch button active in to datatable
            sHTML += "<td align='center' class='form-check btn_toggle form-switch switch-label form-switch-md'><input onchange='update_eta(" + datas[i].id_user + "," + i + ")' class='form-check-input switch" + i + "' type='checkbox' id='flexSwitchCheck0' checked></td>"
        } else {
            //display switch button disabled in to datatable
            sHTML += "<td align='center' class='form-check btn_toggle form-switch switch-label form-switch-md'><input onchange='update_eta(" + datas[i].id_user + "," + i + ")' class='form-check-input switch" + i + "' type='checkbox' id='flexSwitchCheck1'></td>"
        }
        //display delet button in to datatable
        sHTML += "<td align='center'\"><i data-bs-toggle='modal' data-bs-target='#exampleModal" + i + "' class='adm_usersdelet fas fa-trash-alt'></i></td>";
        sHTML += "</tr>";
    }
    sHTML += "</tbody>";
    //injection in to <tag> html of the shtml variable
    $('#table_user_admin').html(sHTML);

    aDatasAdmin = datas;
}







/**
 * creat the dynamic modal html 
 * @creatmodal {}
 * @returns nothing
 */
function creatmodal(aListDatas) {
    //creat delet modal dynamic whit element datas name ans laste name
    for (var i = 0; i < aListDatas.length; i++) {
        modal = "<div class='modal fade d-modal' id='exampleModal" + i + "' tabindex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>"
        modal += "<div class='modal-dialog'>"
        modal += " <div class='modal-content'>"
        modal += "<div class='modal-header'>"
        modal += "<h5 class='modal-title' id='exampleModalLabel'>Attention vous allez supprimer un utilisateur</h5>"
        modal += "<button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>"
        modal += "</div>"
        modal += "<div class='modal-body'>"
        modal += " êtes vous sur de vouloir supprimer l'imprimant <br> Nom:<b> " + aListDatas[i].name_user + "</b><br> Prenom :<b> " + aListDatas[i].firstname_user + "</b>"
        modal += "</div>"
        modal += "<div class='modal-footer'>"
        modal += "<button type='button' onClick=delete_user(" + aListDatas[i].id_user + ") data-bs-dismiss='modal' class='btn bg-green text-light'>Supprimer</button>"
        modal += "<button type='button' class='btn bg-blue text-light' data-bs-dismiss='modal'>Annuler</button>"
        modal += "</div>"
        modal += "</div>"
        modal += "</div>"
        modal += "</div>";
        $('#modal').append(modal);
    }
}



// CONFIGURATION DATATABLE
const configuration = {
    "stateSave": false,
    "order": [[1, "asc"]],
    "pagingType": "simple_numbers",
    "searching": true,
    "lengthMenu": [[10, 25, 50, 100, -1], ["Dix", "Vingt cinq", "Cinquante", "Cent", "Ze total stp"]],
    "language": {
        "info": "Administrateur _START_ à _END_ sur _TOTAL_ sélectionnés",
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

    "responsive": true,
    
    "columns": [
        {
            "orderable": true,
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
        },
        {
            "orderable": false
        },
        {
            "orderable": false
        }
    ],
    'retrieve': true
};

/**
 *  Affiche l'interface d'inscription et efface les données de connexion
 */

function reg_show_insc() {
    $("#reg_sec_inscription").show();
    $("#reg_sec_connexion").hide();
    $('#reg_inp_mail').val("");
    $('#reg_inp_pw').val("");

}

function show_modal() {
    $('#reg_modal').modal('show');
    $('#form-header-script').hide();
    $('#reg_benef_ok').hide();
    $('#footer-modal').hide();
    $("#reg_modal_code_script").show();
    $("#reg_sec_inscription").show();
}

/**
 *  Afficher/cacher mot de passe
 */

function Showpass() {
    if ($('.ShowPass').hasClass("fa-eye-slash")) {
        $('.ShowPass').removeClass("fa-eye-slash").addClass("fa-eye")
        $("[name='password']").attr("type", "text");
    } else {
        $('.ShowPass').removeClass("fa-eye").addClass("fa-eye-slash")
        $("[name='password']").attr("type", "password");
    }
}


function videInput(){

    $('#reg_inp_benef').val("")
    if ($('#reg_inp_benef').hasClass("reg_form_control")) {
        $('#reg_inp_benef').removeClass("err_red")
    }

    $("#reg_benef_invalid").val("");
    $("#reg_inp_prenom").val("");
    $("#reg_inp_nom").val("");
    $("#reg_inp_pw").val("");
    $("#reg_inp_select_role").val("");
    $("#reg_inp_select_function").val("");
    $("#reg_inp_checked").val("");

}





// ------------------------------------◘   Start call ajax for create liste users administrateur ◘-----------------------------------  


/**
 * function getAdminUsers() this function create liste at users administrateur 
 */
function getAdminUsers() {


    //inti variable datas for send argument at call ajax 
    var datas = {
        page: "adm_gestionadmin__getadminusers",
        bJSON: 1,
    }
    
    
    //init call ajax 
    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", // action="route.php"
        async: true, // allows synchronous or asynchronous multiple JS calls to PHP
        data: datas, // past the lsit of variable to send (datas)
        dataType: "json", //  format expected of return PHP
        cache: false, // stock in to the cache false
    })

        //if the call ajax is ok
        .done(function (datas) {
        console.log("getAdminUsers",datas)
            // if (!isEmpty(datas.error)) {
            //     alert(datas.error);
            
            // }
            //add datas in to aPinting
            aListDatas = datas;
            //call function constructTable whit arguments of datas
            constructTable(aListDatas);
            // init datatable with the constant configuration
            tables = $('#table_user_admin').DataTable(configuration);
            //call function creatmodal
            creatmodal(aListDatas);
        })
        //if call ajax dont work  
        .fail(function (err) {
            showError(err);
            //send in to the console the errors code 
            console.log('getAdminUsers Error: ' + err.status);
        });


}



// ------------------------------------◘   Start call ajax for update eta at users administrateur ◘-----------------------------------  



/**
 * function update_eta for active or disabled state uers admin
 * @param {Integer} registration_number_user 
 * @param {Integer} index 
 */
function update_eta(user_id, index) {

    //inti variable datas for send argument at call ajax 
    var datas = {
        eta: $('.switch' + index).value(),
        user_id:user_id,
        page: "adm_gestionadmin__update_eta",
        bJSON: 1,
    }

    //init call ajax 
    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", // action="./php/route.php"
        async: true, // allows synchronous or asynchronous multiple JS calls to PHP
        data: datas, // past the lsit of variable to send (datas)
        dataType: "json", // format expected of return PHP
        cache: false, // stock in to the cache false
    })
        //if the call ajax is ok
        .done(function() {
            //not return element for update function 
        })
        //if call ajax dont work  
        .fail(function (err) {
            //send in to the console the errors code 
            console.log('update_eta Error:' + err.status);
        })
}


// ------------------------------------◘   Start call ajax for delete users administrateur ◘-----------------------------------  

 /**
  * function delete_user for delete user admin at BDD
  * @param {Integer} index 
  * @param {Integer} registration_number_user 
  */

function delete_user(id_user) {


    //inti variable datas for send argument at call ajax 
    var datas = {
        eta: 2,
        id_user: id_user,
        page: "adm_gestionadmin__delete_user",
        bJSON: 1,
    }

    //init call ajax 
    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", // action="./php/route.php"
        async: true, // allows synchronous or asynchronous multiple JS calls to PHP
        data: datas, // past the lsit of variable to send (datas)
        dataType: "json", // format expected of return PHP
        cache: false, // stock in to the cache false
    })
        //if the call ajax is ok
        .done(function (retour) {
            getAdminUsers()
        })
        //if call ajax dont work  
        .fail(function (err) {
            //send in to the console the errors code 
            console.log('delete_user Error:' + err.status);
        })

}




 /**
  * function delete_user for delete user admin at BDD
  * @param {Integer} index 
  * @param {Integer} registration_number_user 
  */

function getRole() {


//inti variable datas for send argument at call ajax 
var datas = {
page: "adm_gestionadmin_roles",
bJSON: 1,
}

//init call ajax 
$.ajax({
type: "POST", // method="POST"
url: "route.php", // action="./php/route.php"
async: true, // allows synchronous or asynchronous multiple JS calls to PHP
data: datas, // past the lsit of variable to send (datas)
dataType: "json", // format expected of return PHP
cache: false, // stock in to the cache false
})
//if the call ajax is ok
.done(function (retour) {
    dataRole = retour
})
//if call ajax dont work  
.fail(function (err) {
    //send in to the console the errors code 
    console.log('delete_user Error:' + err.status);
})

}



function changeRole(id_user,i){
    role = $("#select_role"+i+"").val()
    console.log(role)
    //init var datas and add setting index and token  
    var datas = {
        id_user: id_user,
        role:role,
        page: "adm_gestionadmin__updateRole",
        bJSON: 1,
    }
    //init call ajax 
    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", //qdqqqqdqq action="./php/route.php"
        async: true, // allows synchronous or asynchronous multiple JS calls to PHP
        data: datas, // past the lsit of variable to send (datas)
        dataType: "json", // format expected of return PHP
        cache: false, // stock in to the cache false
    })
    //if the call ajax is ok
    .done(function (retour) {
        getAdminUsers()
    })
    //if call ajax dont work  
    .fail(function (err) {
        //send in to the console the errors code 
        console.log('newAdmin Error:' + err.status);
    })
}




// ------------------------------------◘   Start call ajax for create new users administrateur in the Bdd afpacar◘-----------------------------------  


/**
 * function call ajax for delet element in to the json and datatable
 * @param { Integer } index 
 * @returns err
 */
 function check_code_bene() {
   
    code_benef = $("#reg_inp_benef").val()
    //init var datas and add setting index and token  
    var datas = {
        code_benef: code_benef,
        page: "adm_gestionadmin__newAdminToken",
        bJSON: 1,
    }
    //init call ajax 
    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", // action="./php/route.php"
        async: true, // allows synchronous or asynchronous multiple JS calls to PHP
        data: datas, // past the lsit of variable to send (datas)
        dataType: "json", // format expected of return PHP
        cache: false, // stock in to the cache false
    })
        //if the call ajax is ok
        .done(function (retour) {
            afpaconnect = retour
            if (retour['boolean'] === 1) {
                $('#form-header-script').show()
                $("#footer-modal").show();
                $('#reg_modal').modal('show');
                $("#reg_modal_code_script").hide();
                $('#reg_modal_inscript').show();
                $("#reg_benef_ok").show();
                $('#reg_inp_prenom').val(retour['content']['firstname']);
                $('#reg_inp_prenom').prop('disabled', true);
                $('#reg_inp_nom').val(retour['content']['lastname']);
                $('#reg_inp_nom').prop('disabled', true);
                $("#header_modal_code").hide();
                $("#reg_sec_inscription").hide();
                if(retour['content']['password'] != "" || retour['content']['password'] != null){
                    $('#reg_inp_pw').prop('disabled', true);
                    $('#reg_inp_pw').val("************");
                    $("#eye").hide();
                }
                //construct datatable after ass new users 
                // getAdminUsers()
            }else{
               
                $('#reg_modal_inscript').hide();
                $("#reg_benef_invalid").show();
                if ($('#reg_inp_benef').hasClass("reg_form_control")) {
                    $('#reg_inp_benef').addClass("err_red")
                }
            }
           
           
        })
        //if call ajax dont work  
        .fail(function (err) {
            //send in to the console the errors code 
            console.log('newAdmin Error:' + err.status);
        })
}



function newAdmin(){
     
    //init var datas and add setting index and token  
    var datas = {
        id_center: afpaconnect['content']['center_id'],
        name_functions: $("#reg_inp_select_function").val(),
        name_role: $("#reg_inp_select_role").val(),
        name_user:afpaconnect['content']['lastname'],
        firstname_user:afpaconnect['content']['firstname'],
        gender_user:afpaconnect['content']['gender'],
        email_user:afpaconnect['content']['mail1'],
        tel_user:afpaconnect['content']['phone'],
        hash_user:afpaconnect['content']['password'],
        registration_number_user:afpaconnect['content']['identifier'],
        registration_datetime_user:afpaconnect['content']['created_at'],
        is_active_user:1,
        page: "adm_gestionadmin__newAdmin",
        bJSON: 1,
    }
    //init call ajax 
    $.ajax({
        type: "POST", // method="POST"
        url: "route.php", // action="./php/route.php"
        async: true, // allows synchronous or asynchronous multiple JS calls to PHP
        data: datas, // past the lsit of variable to send (datas)
        dataType: "json", // format expected of return PHP
        cache: false, // stock in to the cache false
    })
    //if the call ajax is ok
    .done(function (retour) {
        getAdminUsers()
    })
    //if call ajax dont work  
    .fail(function (err) {
        //send in to the console the errors code 
        console.log('newAdmin Error:' + err.status);
    })
}


