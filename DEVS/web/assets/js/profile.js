/**
* False BDD
*/ 

let prof_user_info=[];

$(document).ready(function () {

  profileGetAddresses();

//   profilInfo();
//   /* Function to disable */ 
//   $('#prof_beneficiaire').prop('disabled', true);
//   $('#prof_birthday').prop('disabled', true);
//   $('#prof_email').prop('disabled', true);
//   $('#prof_number').prop('disabled', true);
//   $('#prof_centre1').prop('disabled', true);
//   $('#prof_centre2').prop('disabled', true);
//   $('#prof_centre3').prop('disabled', true);
//   $('#txtarea_description').prop('disabled', true);

//   /* No-drop cursor on textarea */
//   $("#txtarea_description").addClass("prof_cursor_disabled");

//   //generer le tableau JSON
//  loadAddresses();
 
//   // Start upload preview image
//   adaptImage();
})

// prof_user_info[0] = [];
// prof_user_info[0]["prof_beneficiaire"] = "1987583651";
// prof_user_info[0]["prof_nom"] = "Morain";
// prof_user_info[0]["prof_prenom"] = "Siquac";
// prof_user_info[0]["prof_birthday"] = "1998-07-03";
// prof_user_info[0]["prof_number"] = "0647478596";
// prof_user_info[0]["prof_email"] = "morain.siquac@gmail.com";
// prof_user_info[0]["prof_psw"] = "jtmromain";
// prof_user_info[0]["txtarea_description"] = "Je suis un homme tronc.";
// prof_user_info[0]["prof_centre1"] = "Les mecs attachiants";
// prof_user_info[0]["prof_centre2"] = "Les pédiluves";
// prof_user_info[0]["prof_centre3"] = "Romain Quissac";

// function boucle for qui boucle jusqu'a la longueur du tableau
/**
* ON LAUNCH
*/



function initialize_prof(prof_user_info)
{
  for (let i = 0; i < prof_user_info.length; i++)
  {
    $('#prof_beneficiaire').val(prof_user_info[i]["registration_number_user"]);
  // $('#prof_prenom').html(prof_user_info[i]["firstname_user"]);
  // $('#prof_nom').html(prof_user_info[i]["name_user"]);
  $('#prof_birthday').val(prof_user_info[i]["birthday_date_user"]);
  $('#prof_email').val(prof_user_info[i]["email_user"]);
  $('#prof_number').val(prof_user_info[i]["tel_user"]);
  $('#txtarea_description').val(prof_user_info[i]["description_user"]);
  // $('#prof_centre1').val(prof_user_info[0]["prof_centre1"]);
  // $('#prof_centre2').val(prof_user_info[0]["prof_centre2"]);
  // $('#prof_centre3').val(prof_user_info[0]["prof_centre3"]);
  }
}

/**
 * Adapt the image
 */
function adaptImage()
{
  $(".gambar").attr("src", "https://user.gadjian.com/static/images/personnel_boy.png");
  var $uploadCrop,
  tempFilename,
  rawImg,
  imageId;
  function readFile(input) {
     if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
        $('.upload-demo').addClass('ready');
        $('#cropImagePop').modal('show');
              rawImg = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
        else {
          swal("Sorry - you're browser doesn't support the FileReader API");
      }
  }

  $uploadCrop = $('#upload-demo').croppie({
    viewport: {
      width: 150,
      height: 200,
    },
    enforceBoundary: false,
    enableExif: true
  });
  $('#cropImagePop').on('shown.bs.modal', function(){
    // alert('Shown pop');
    $uploadCrop.croppie('bind', {
          url: rawImg
        }).then(function(){
          console.log('jQuery bind complete');
        });
  });

  $('.item-img').on('change', function () { imageId = $(this).data('id'); tempFilename = $(this).val();
                                           $('#cancelCropBtn').data('id', imageId); readFile(this); });
  $('#cropImageBtn').on('click', function (ev) {
    $uploadCrop.croppie('result', {
      type: 'base64',
      format: 'jpeg',
      size: {width: 150, height: 200}
    }).then(function (resp) {
      $('#item-img-output').attr('src', resp);
      $('#cropImagePop').modal('hide');
    });
  });
  // End upload preview image

}

/* Function show/hide password  */
function ShowPass(element) {
    let $container = $(element).closest('.input-group');
    let $Input = $container.find('input');
    let $i = $container.find('i');
    if ($i.hasClass("fa-eye-slash")) {
      $i.removeClass("fa-eye-slash").addClass("fa-eye")
      $Input.attr("type", "text");
    } else {
      $i.removeClass("fa-eye").addClass("fa-eye-slash")
      $Input.attr("type", "password");
    }
}

/* Function to enable modification on inputs */ 
function prof_modif(){
  $('#prof_email').prop('disabled', false);
  $('#prof_number').prop('disabled', false);
  $('#prof_centre1').prop('disabled', false);
  $('#prof_centre2').prop('disabled', false);
  $('#prof_centre3').prop('disabled', false);
  $('#txtarea_description').prop('disabled', false);

  /* Classic cursor  */
  $("#txtarea_description").removeClass("prof_cursor_disabled");
}


/* PARTIE ADRESSE */

// declaration de variable

var aUserAddresses = [
  // {
  //   id:"17",
  //   add_user: "12 rue de la paix",
  //   city_user: "Sète",
  //   cp_user: "34200",
  //   bMainAdd: 0,
  // },
  // {
  //   id:"28",
  //   add_user: "58 rue de la joie",
  //   city_user: "Montpellier",
  //   cp_user: "34070",
  //   bMainAdd: 1,
  // },
  // {
  //   id:"34",
  //   add_user: "69 rue de la mer",
  //   city_user: "Lunel",
  //   cp_user: "34400",
  //   bMainAdd: 0,
  // },

];




// fonction lecture tableau jAdress=JSON en cours
function loadAddresses()
{
  $("#container_addresses").html("");
  let iAddresses = aUserAddresses.length;
  for (let i = 0; i < iAddresses; i++) {
    loadTemplateAddress(i);
  }
  for (let i = 0; i < iAddresses; i++) {
    loadAddress(i);
  }

}



/**
 * add an address on the html page
 * @param {JSON} iIndiceAdress the address to append to html page
 */

function loadTemplateAddress(iIndiceAdress)
{

  // get template addresses from html
  var templateAddress = $("#template_address").html();

  // modify content from JSON
  templateAddress= templateAddress.replace(/%id_adresse%/g, iIndiceAdress);
  
  // append result to the adresses container
  $("#container_addresses").html( $("#container_addresses").html() + templateAddress);
}

//prendre les contenus du tableau et les injecter dans les inputs qui sont crées
 
function loadAddress(iIndiceAdress)
{
  

  $('#add_user_'+iIndiceAdress).val(aUserAddresses[iIndiceAdress]["add_user"]);
  $('#city_user_'+iIndiceAdress).val(aUserAddresses[iIndiceAdress]["city_user"]);
  $('#cp_user_'+iIndiceAdress).val(aUserAddresses[iIndiceAdress]["cp_user"]);
  //va donner le n° de chaque adresse dans la nav
  $('.number_add_'+iIndiceAdress).html(iIndiceAdress+1);

  //au lancement de la page, le bMainAdd =1 sera checked
  if (aUserAddresses[iIndiceAdress]["bMainAdd"] == 1)   
  {
    $('input[id=pro_rd_mainadd][value='+iIndiceAdress+']').prop("checked", true);
  }

 


  
  $('#add_user_'+iIndiceAdress).prop("disabled", true);
  $('#city_user_'+iIndiceAdress).prop("disabled", true);
  $('#cp_user_'+iIndiceAdress).prop("disabled", true);
  
}

//fonction pour ajouter une adresse
function addAdress()
{


  var templateAddress = $("#template_address").html();

  var iNewAddress = aUserAddresses.length;

  aUserAddresses[iNewAddress]= [];
  aUserAddresses[iNewAddress]["id"]= "";
  aUserAddresses[iNewAddress]["add_user"]= "";
  aUserAddresses[iNewAddress]["city_user"]= "";
  aUserAddresses[iNewAddress]["cp_user"]= "";

  // modify content from JSON
  templateAddress= templateAddress.replace(/%id_adresse%/g, iNewAddress);
  
  // append result to the adresses container
  $("#container_addresses").html( $("#container_addresses").html() + templateAddress);

  for (let i = 0; i <= iNewAddress; i++) {
    loadAddress(i);
  }

  editAdress(iNewAddress);
  
}

//Enregistre new adresse ou modif (+ cache le modal et remet les inputs en disable)
function updateAdress(iIndiceAdress)
	{
  aUserAddresses[iIndiceAdress]["add_user"] = $('#add_user_'+iIndiceAdress).val();
  aUserAddresses[iIndiceAdress]["city_user"]= $('#city_user_'+iIndiceAdress).val();
  aUserAddresses[iIndiceAdress]["cp_user"]= $('#city_user_'+iIndiceAdress).val();
  // aUserAddresses[iIndiceAdress]["bMainAdd"]= $('#pro_rd_mainadd_ ' + iIndiceAdress).val();

  $('#add_user_'+iIndiceAdress).prop("disabled", true);
  $('#city_user_'+iIndiceAdress).prop("disabled", true);
  $('#cp_user_'+iIndiceAdress).prop("disabled", true);

  
  
  $('#btn_user_'+iIndiceAdress).hide();

  

}

//fonction pour supprimer l'adresse
function deleteAdress()
{
	$('#div_address_'+$('#id_adresse_del_modal').val()).remove();
  $('#modalSupp').hide();
}

//Fonction qui ouvre le modal de confirmation de suppression en fonction du Indice address (pour supprumer la bonne ad)

function confirmDeleteAdress(iIndiceAdress) 
{
  $('#modalSupp').fadeIn(500);
  $('#id_adresse_del_modal').val(iIndiceAdress);
}

//fonction qui permet de modifier les adressses et qui fait apparaitre le le btn enregistrer
function editAdress(iIndiceAdress)	
{
  $('#add_user_'+iIndiceAdress).prop("disabled", false);
  $('#city_user_'+iIndiceAdress).prop("disabled", false);
  $('#cp_user_'+iIndiceAdress).prop("disabled", false);

  
  
  $('#btn_user_'+iIndiceAdress).show();

}

// fonction pour definir l'adresse principale (bool 1) et que les autres adresse prennent le bool 0
//treatsdata requetes update
function setMainAdd(iIndiceAdress)
{
 for (i=0; i<aUserAddresses.length; i++)
 {
   aUserAddresses[i].bMainAdd= 0
  }
  aUserAddresses[iIndiceAdress].bMainAdd= 1;

 
 console.log(aUserAddresses);
 
}
// :::::::::::::::::::::::::::::::::::::::::::::Requetes AJAX::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //
/**
 * function call ajax for delet element in to the json and datatable
 * Get user addresses and displays it on the page
 * @param { Integer } index 
 * @returns err
*/
function profileGetAddresses() {


	//init var datas and add setting index and token  
	var datas = {
		bJSON: 1,
		page: "profile__getAddresses"
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
			console.log(result);
      aUserAddresses= result;
			loadAddresses();
		})
		//if call ajax dont work  
		.fail(function (err) {
			//send in to the console the errors code 
			console.log('profileGetAddresses Error:', err.status, err);
		})
}

/**
 * function call ajax for delet element in to the json and datatable
 * @param { Integer } index 
 * @returns err
*/
function profileUpdateAddress() {


	//init var datas and add setting index and token  
	var datas = {
		bJSON: 1,
		page: "profil__getAddresses",
    id_address: aUserAddresses[iIndiceAdress]["id_address"],
		name_city:$('#id_user_'+ iIndice).val(),
		zip_code_city:$('#cp_user_'+ iIndice).val(),
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
			
			updateAdress(result);
		})
		//if call ajax dont work  
		.fail(function (err) {
			//send in to the console the errors code 
			console.log('newAdmin Error:' + err.status);
		})
}


/**
 * function call ajax for delet element in to the json and datatable
 * @param { Integer } index 
 * @returns err
*/

function deleteAddresses() {


  // changer nom de page en delete__address
	//init var datas and add setting index and token  
	var datas = {
		bJSON: 1,
		page: "profile__delete__ad",    
    id_address: aUserAddresses[iIndiceAdress]["id_address"],
	  
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
			
			deleteAdress(result);
		})
		//if call ajax dont work  
		.fail(function (err) {
			//send in to the console the errors code 
			console.log('newAdmin Error:' + err.status);
		})
}


/**
 * function call ajax for delet element in to the json and datatable
 * @param { Integer } index 
 * @returns err
*/
function editAddress() {


	//init var datas and add setting index and token  
	var datas = {
		bJSON: 1,
		page: "profile__editAddress",
    id_address: aUserAddresses[iIndiceAdress]["id_address"],
		name_city:$('#id_user_'+ iIndice).val(),
		zip_code_city:$('#cp_user_'+ iIndice).val(),
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
			
			editAdress(result);
		})
		//if call ajax dont work  
		.fail(function (err) {
			//send in to the console the errors code 
			console.log('newAdmin Error:' + err.status);
		})
}

/**
 * function call ajax for delet element in to the json and datatable
 * @param { Integer } index 
 * @returns err
*/
function mainAddresses() {


	//init var datas and add setting index and token  
	var datas = {
		bJSON: 1,
		page: "profil_mainAddresses",
    id_address: aUserAddresses[iIndiceAdress]["id_address"],
		name_city:$('#id_user_'+ iIndice).val(),
		zip_code_city:$('#cp_user_'+ iIndice).val(),
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
			
			setMainAdd(result);
		})
		//if call ajax dont work  
		.fail(function (err) {
			//send in to the console the errors code 
			console.log('newAdmin Error:' + err.status);
		})
}




// Ajax request for user info
function profilInfo() {


	//init var datas and add setting index and token  
	var datas = {
		bJSON: 1,
		page: "profiles__info",

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
			console.log(result);
			prof_user_info= result;
			initialize_prof(result);
		})
		//if call ajax dont work  
		.fail(function (err) {
			//send in to the console the errors code 
			console.log('newAdmin Error:' + err.status);
		})
}

// -------test crooping img 
