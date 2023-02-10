var id_city_selected_datalist;

// when loading the page, run everything in this function
$(document).ready(function () {

  // to load address of the users
  loadAddress();

  loadVehicle();

  //call function getAdminUsers
  // ajax();



});

// create json array
var aOfWeek = [
  {
    // sMonday:"Lundi",
    // sMAller:"Trajet Aller",
    // sMRetour:"Trajet Retour",
    // sMAllerRetour:"Trajet Aller-Retour",
    sMEtape: "St-Jean de Vedas, rue du Pablo",
    bActive: 1,
    bMAller: 0,
    bMRetour: 0,
    bMAllerRetour: 0
  },
]

// cette variable globale nous donne la date du jour J.
var date = new Date().toISOString().split('T')[0]


// function to check if the user accepted everything
function IsRulesChecked() {
  // did he checked the checkbox ?
  let checkbox1 = $("#ride_checkbox1").prop("checked");
  let checkbox2 = $("#ride_checkbox2").prop("checked");
  let checkbox3 = $("#ride_checkbox3").prop("checked");

  // if he did it
  if (checkbox1 && checkbox2 && checkbox3) {
    // hide the error message
    $(".ride_notchecked").hide();
  }
  else {
    // show it
    $(".ride_notchecked").show();
  }
}

//prendre les contenus du tableau et les injecter dans les inputs qui sont crées

// create new array "aofCarsTrajets" and put some data in it
// var aofCarsTrajets = [];
// aofCarsTrajets[0] = [];
// aofCarsTrajets[0]["id_vehicule"] = 17;
// aofCarsTrajets[0]["brand_vehicule"] = "Audi";
// aofCarsTrajets[0]["model_vehicule"] = "A5";
// aofCarsTrajets[0]["color_vehicule"] = "Noir";
// aofCarsTrajets[1] = [];
// aofCarsTrajets[1]["id_vehicule"] = 23;
// aofCarsTrajets[1]["brand_vehicule"] = "Peugeot";
// aofCarsTrajets[1]["model_vehicule"] = "208";
// aofCarsTrajets[1]["color_vehicule"] = "Rouge";



// Function to put the html template under the button pressed
var iDay = 0;
function addDetailsTrajet(iDayChecked) {
  iDay = iDayChecked;
  // If we check a day checkbox (Lundi..), do this
  if ($('#check_days' + iDayChecked).prop("checked")) {
    // put the content of the div #template_days in sTemplate
    var sTemplate = $('#template_days').html();
    // replace %num_jour_semaine% by the value of iDayChecked in the div #template_days
    sTemplate = sTemplate.replace(/___num_jour_semaine___/g, iDayChecked);
    sTemplate = sTemplate.replace(/__id__/g, iDayChecked)
    // sTemplate= sTemplate.replace("32", iDayChecked);
    // insert the new HTML in the right div
    $('#div-check' + iDayChecked).html(sTemplate);
    // show the div
    $('#div-check' + iDayChecked).show();

    // // put select input in sHTMLSelect
    // var sHTMLSelect = "<option selected value=\"\">Sélectionnez votre voiture</option>";
    // // doing a loop of our array "aofCarsTrajets" to build the result
    // for (var i = 0; i < aofCarsTrajets.length; i++) {
    //   // adding option value with the array aofCarsTrajets and insert into sHTMLSelect
    //   sHTMLSelect += "<option value=\"" + aofCarsTrajets[i]["id_vehicule"] + "\">" + aofCarsTrajets[i]["brand_vehicule"] + " " + aofCarsTrajets[i]["model_vehicule"] + " " + aofCarsTrajets[i]["color_vehicule"] + "</option>";
    // }
    // // insert sHTML in the right div #sel_id_vehicule with iDayChecked
    // $('#sel_id_vehicule' + iDayChecked).html(sHTMLSelect);
    // console.log(iDiv, iDayChecked);
  }
  else {
    // clean everything
    $('#div-check' + iDayChecked).html("");
    // hide the div
    $('#div-check' + iDayChecked).hide();
  }

}

//*************************************************************************************debut chantier************************************************************************** */
//********************************************************************************************************************************************************************* */

function filterTrueFalse() {

  let bConducteur, bPassager, is_driver, is_active_weekday, bSmoke, bLuggage, bHandicap;

  bConducteur = $('#inlineRadio1').is(':checked');
  bPassager = $('#inlineRadio2').is(':checked');
  bSmoke = $('#smoke').is(':checked');
  bLuggage = $('#luggage').is(':checked');
  bHandicap = $('#handicap').is(':checked');

  // si c'est un conducteur alors le booleen is_driver vaut 1
  if (bConducteur) {
    is_driver = 1;
  }
  // si c'est un conducteur alors le booleen is_driver vaut 0
  else {
    is_driver = 0;
  }


  var aFilter = {
    "bDriver": is_driver,
    "smoke": bSmoke,
    "luggage": bLuggage,
    "handicap": bHandicap
  }

  // filtre smoke
  switch (aFilter["smoke"]) {

    case true:
      aFilter["smoke"] = 1;
      break;

    case false:
      aFilter["smoke"] = 0;
      break;
  }

  // filtre luggage
  switch (aFilter["luggage"]) {

    case true:
      aFilter["luggage"] = 1;
      break;

    case false:
      aFilter["luggage"] = 0;
      break;
  }

  // filtre handicap
  switch (aFilter["handicap"]) {

    case true:
      aFilter["handicap"] = 1;
      break;

    case false:
      aFilter["handicap"] = 0;
      break;
  }
  return aFilter;

}

//**************************************************************************************************************************************************************************** */



// function to hide or show the cars of users and number of places div depending on which button is checked
function driverOrPassenger() {
  // know if the passenger button is checked
  if ($('#inlineRadio2').prop("checked")) {
    // hide vehicle and number of places div
    $(".ride_div-timeV").hide();
    $(".ride_div-timeT").hide();

    document.getElementById("pod").innerHTML = "Le conducteur doit accepter :";
  }
  else {
    // show vehicle and number of places div
    $(".ride_div-timeV").show();
    $(".ride_div-timeT").show();

    document.getElementById("pod").innerHTML = "Dans ma voiture, j'accepte :";
  }

}

// function to hide and show divs depending on which button is checked (aller, retour, aller-retour)
function HideDiv(iDiv) {

  $('#inlineRadioOptionsA' + iDiv).prop("checked")
  // if button "Aller" is checked : hide button "Retour" and show "Aller"
  if ($('#inlineRadioOptionsA' + iDiv).prop("checked")) {
    $("#ride_div-timeR" + iDiv).hide();
    $("#ride_div-timeA" + iDiv).show();
  }
  // if button "Retour" is checked : hide button "Aller" and show "Retour"
  if ($('#inlineRadioOptionsR' + iDiv).prop("checked")) {
    $("#ride_div-timeA" + iDiv).hide();
    $("#ride_div-timeR" + iDiv).show();
  }
  // if button "Aller-Retour" is checked : show both
  if ($('#inlineRadioOptionsAR' + iDiv).prop("checked")) {
    $("#ride_div-timeA" + iDiv).show();
    $("#ride_div-timeR" + iDiv).show();
  }
}
var aIdCity = [];
var icompteur;
var iAddStep = 0;

function addStep() {
  iAddStep++;


  // var sHtml = $("#div_template").html();
  // sHtml = sHtml.replace("___index_comment___", i);
  // sHtml = sHtml.replace("___index_city___", i);
  // sHtml = sHtml.replace("___comment___", i);

  for (i = 0; i < iAddStep; i++) {
    sHTML = "<div class='col-6 col-lg-6 form-group ride_step'>"
    sHTML += "<select class='form-control comp_form_control_green ride_select-step srch_input ride_city' list='list_result_city' id='ride_city" + i + "' aria-label='Default select example'>"
    sHTML += "</div>"

    sHTML += "<div class='col-6 col-lg-6 form-group ride_step'>"
    sHTML += "<label class='ride_days-step pb-3'>"
    sHTML += "<input class='form-control comp_form_control_green ride_days-step' id='comment_stage" + i + "' placeholder='Commentaire n°" + i + "'> </label>"
    sHTML += "</div>"
  }
  $("#div_template").append(sHTML);


}




// var iAddStep = 1;
// function addStep(){

//   console.log("????");

//   if (iAddStep < 4) {
//     iAddStep++;

//     // We create two div
//     let div = document.createElement('div');
//     let div2 = document.createElement('div');

//     // Insert my html content into my div
//     div.innerHTML =   "<label class=\"ride_select-step\"> <input class=\"form-control comp_form_control_green ride_select-clone\" list=\"list_result_city\" id=\"search_city" + iAddStep + " class=\"srch_input\" placeholder=\"Etape\"> <datalist id=\"list_result_city\"> <option id=\"id_city\" value=\"___NameCity___\" data-id=\"___IdCity___\"> </datalist> </label>"
//     div2.innerHTML =  "<label class=\"ride_days-step pb-3\"> <input class=\"form-control comp_form_control_green ride_days-step\" placeholder=\"Commentaire\" id=comment_stage" + iAddStep + ">" + "</label>"

//     // Put some classes into my div (like <div class="myclass">)
//     div.className = 'col-6 col-lg-6 form-group ride_step';
//     div2.className = 'col-6 col-lg-6 form-group ride_step';

//     // Select the "parent" div and insert the new div
//     document.querySelector("#div-addstep").appendChild(div);
//     document.querySelector("#div-addstep").appendChild(div2);
//   }
// }

function sendAd() {
  var datas = {
    bJSON: 1,
    page: "ride__sendAd",
    DriverRadio: $('#inlineRadio2').prop(),
    PassengerRadio: $('#inlineRadio2').prop(),
  }
}

/******************************************************* AJAX *****************************************************************/

function loadAddress() {

  var datas = {
    bJSON: 1,
    page: "get_ride_address"
  }
  $.ajax({
    type: "POST",
    url: "route.php",
    async: true,
    data: datas,
    dataType: "json",
    cache: false,
  }).done(function (result) {

    getAddress(result);

  }).fail(function (err) {
    console.log('error : ' + err.status);

    alert("Erreur aucune valeur JSON, sale petit chenipan");

  })
}

function loadStep() {

  var datas = {
    bJSON: 1,
    page: "get_ride_step"
  }
  $.ajax({
    type: "POST",
    url: "route.php",
    async: true,
    data: datas,
    dataType: "json",
    cache: false,
  }).done(function (result) {
    console.log(result);
    getStep(result);

  }).fail(function (err) {
    console.log('error : ' + err.status);

    alert("Erreur aucune valeur JSON, sale petit chenipan");

  })
}

function loadVehicle() {

  var datas = {
    bJSON: 1,
    page: "get_ride_vehicle"
  }
  $.ajax({
    type: "POST",
    url: "route.php",
    async: true,
    data: datas,
    dataType: "json",
    cache: false,
  }).done(function (result) {

    getVehicle(result);

  }).fail(function (err) {
    console.log('error : ' + err.status);

    alert("Erreur aucune valeur JSON, sale petit chenipan");

  })
}





/**
 * 
 */
function getAllRideInfo() {

  var isactivedriver = $("#inlineRadio1")
  var isactivepassenger = $("#inlineRadio2")
  if (isactivedriver.is(":checked")) {
    var driver = 1;
  }
  if ((isactivepassenger.is(":checked"))) {
    var driver = 0;
  }

  var cityArray = []
  
      city= $("#ride_city" + i).val(),
      comment= $("#comment_stage" + i).val()
    
  }

  var address = $("#sel_id_address").val()
  var dateStart = $("#dateStart").val()
  var dateEnd = $("#dateEnd").val()
  // var selectDay = [];
  // for (i = 1; i <= iDay; i++) {
  //   selectDay[i - 1] = $('#time_go_weekday' + i).val()

  // }

  var iDayArrayA = []
  for (i = 1; i <= iDay; i++) {
    iDayArrayA.push({
      'dayA': $('#time_go_weekday' + i).val()
    })
  }

  var iDayArrayR = []
  for (i = 1; i <= iDay; i++) {
    iDayArrayR.push({
      'dayR': $('#time_return_weekday' + i).val()
    })
  }
  var cars = []
  for (i = 1; i <= iDay; i++) {
    cars.push({
      'cars': $('#sel_id_vehicule' + iDay).val()
    })
  }

  var passenger = []
  for (i = 1; i <= iDay; i++) {
    passenger.push({
      'site': $('#max_number_seats_available' + i).val()
    })
  }

  var smokers = $("#smoke")
  var luggage = $("#luggage")
  var handicap = $("#handicap")

  if ((smokers.is(":checked"))) {
    var smokers = 1;
  }
  if ((luggage.is(":checked"))) {
    var luggage = 1;
  }
  if ((handicap.is(":checked"))) {
    var handicap = 1;
  }

  var comment = $("#textarea").val()



  var datas = {
    bJSON: 1,
    page: "post_all_ride_info",
    driver: driver,
    cityArray: cityArray,
    address: address,
    dateStart: dateStart,
    dateEnd: dateEnd,
    iDayArrayA: iDayArrayA,
    iDayArrayR: iDayArrayR,
    cars: cars,
    passenger: passenger,
    smokers: smokers,
    luggage: luggage,
    handicap: handicap,
    comment: comment

  }

  console.log(datas)
  $.ajax({
    type: "POST",
    url: "route.php",
    async: true,
    data: datas,
    dataType: "json",
    cache: false,
  }).done(function (result) {

    console.log(result);

  }).fail(function (err) {
    console.log('error : ' + err.status);

    console.log("Erreur aucune valeur JSON, sale petit chenipan");

  })

  /********************************************** CODE DE MATHIEU ET ANTOINE  ***************************************/

  //   array[0]['city'] = "Beziers"
  // array[0]['comment'] = "toto"
  // array[1]['city'] = "Beziers"
  // array[1]['comment'] = "tata"
  // array[2]]['city'] = "Beziers"
  // array[2]['comment'] = "titi"

  // for ($i = 0; $i < count(array; $i++)) {
  //     $sSqlPath = $this->GLOBALS_INI["PATH_HOME"] . $this->GLOBALS_INI["PATH_MODEL"] . 'insert_trajet_test.sql';
  //       $this->resultat= $this->oBdd->treatDatas($sSqlPath, array(
  //         "city" => $this->VARS_HTML['array[$i]['city'],
  //         "comment" => $this->VARS_HTML['array[$i]['comments'],
  //         ));

  // }

  /****************************** *****************************************************************************************/






}


// create new array "aOfAddress" and put some data in it
// var aOfAddress = [];
// aOfAddress[0] = [];
// aOfAddress[0]["id_address"] = "1";
// aOfAddress[0]["address_address"] = "12 rue Jean Mermoz";
// aOfAddress[1] = [];
// aOfAddress[1]["id_address"] = "2";
// aOfAddress[1]["address_address"] = "34 rue de Costesèque";

/**
 * function to get address
 */
function getAddress(aOfAddress) {

  // put the select input in sHTMLSelectAddress
  let sHTMLSelectAddress = "<option selected value=\"\">Mon adresse par défaut</option>";
  // doing a loop of our array "aOfAddress" to build the result
  for (let i = 0; i < aOfAddress.length; i++) {
    // adding option value with the array aOfAddress and insert into sHTMLSelectAddress
    sHTMLSelectAddress += "<option value=" + aOfAddress[i]["id_address"] + ">" + aOfAddress[i]["address_address"] + "</option>";
  }
  // insert sHTMLSelectAddress in the div #sel_id_address
  $('#sel_id_address').html(sHTMLSelectAddress);
}


/**
 * function to get step
 */
function getStep(aOfStep) {

  // put the select input in sHTMLSelectStep
  let sHTMLSelectStep = "<option selected value=\"\">Mon étape par défaut</option>";
  // doing a loop of our array "aOfStep" to build the result
  for (let i = 0; i < aOfStep.length; i++) {
    // adding option value with the array aOfStep and insert into sHTMLSelectStep
    sHTMLSelectStep += "<option value=\"" + aOfStep[i]["id_city"] + "\">" + aOfStep[i]["label_city"] + "</option>";
  }
  $('.ride_city').append(sHTMLSelectStep);
}

var indice = "";
function getVehicle(aofCarsTrajets) {
  // put select input in sHTMLSelect
  indice++
  // doing a loop of our array "aofCarsTrajets" to build the result
  for (var i = 0; i < aofCarsTrajets.length; i++) {
    sHtml = "<select class='form-select input_select_green ride_days-input-vehicle'aria-label='Default select example' id='sel_id_vehicule__id__'>"
    sHtml += "<option selected value='undefine'>Sélectionnez votre voiture</option>"
    sHtml += " <option value='" + aofCarsTrajets[i]["id_vehicule"] + "'>" + aofCarsTrajets[i]["brand_vehicule"] + " " + aofCarsTrajets[i]["model_vehicule"] + " " + aofCarsTrajets[i]["color_vehicule"] + "</option>"
    sHtml += "</select>"
  }
  $('#selectCar').html(sHtml);
}


