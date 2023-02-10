var aOfCars=[
    {
        sMarque:"Peugeot",
        sModele:"206",
        sColor:"Bleu",
        sPlace:"3",
        bValidity_check:0,
        // sPicture:''
    },
    {
        sMarque:"Lamborghini",
        sModele:"Murcielago",
        sColor:"Orange à pois verts",
        sPlace:"1",
        bValidity_check:0,
        // sPicture:''
    }
]

$(function() {
    // generer le tableau JSON
    loadVehicules();
  })

// =================================================================================================



function loadVehicules()
{
  // $("#container_vehicule").html("");
  let iVehicules = aOfCars.length;
  // alert("logan en string")
  for (let i = 0; i < iVehicules; i++) {
    loadTemplateVehicule(i);
  }
  for (let i = 0; i < iVehicules; i++) {
    loadVehicule(i);
  }

}


// =================================================================================================

/**
 * add an address on the html page
 * @param {JSON} jvehicule the address to append to html page
 */

 function loadTemplateVehicule(iIndiceAdress)
 {
 
   // get template addresses from html
   var templateVehicule = $("#template_vehicule").html();
 
   // modify content from JSON
   templateVehicule= templateVehicule.replace(/%id_vehicule%/g, iIndiceAdress);
   
   // append result to the adresses container
   $("#container_vehicule").html( $("#container_vehicule").html() + templateVehicule);
 }
 
// =================================================================================================


 function loadVehicule(iIndiceAdress)
{
  $('#marque_'+iIndiceAdress).val(aOfCars[iIndiceAdress]["sMarque"]);
  $('#modele_'+iIndiceAdress).val(aOfCars[iIndiceAdress]["sModele"]);
  $('#color_'+iIndiceAdress).val(aOfCars[iIndiceAdress]["sColor"]);
  $('#place_'+iIndiceAdress).val(aOfCars[iIndiceAdress]["sPlace"]);
  $('#validity_check_'+iIndiceAdress).val(aOfCars[iIndiceAdress]["bValidity_check"]);
  $('.vehicule-user_'+iIndiceAdress).html(aOfCars[iIndiceAdress].sMarque+" - "+aOfCars[iIndiceAdress].sColor);
  $('.vehicule-numero_'+iIndiceAdress).html(iIndiceAdress+1);

  
  $('#marque_'+iIndiceAdress).prop("disabled", true);
  $('#modele_'+iIndiceAdress).prop("disabled", true);
  $('#color_'+iIndiceAdress).prop("disabled", true);
  $('#place_'+iIndiceAdress).prop("disabled", true);
  $('#validity_check_'+iIndiceAdress).prop("disabled", true);
  
  
}
// =================================================================================================

function addVehicule()
{


  var templateVehicule = $("#template_vehicule").html();

  var iNewVehicule = aOfCars.length;

  aOfCars[iNewVehicule]= [];
  aOfCars[iNewVehicule]["sMarque"]= "";
  aOfCars[iNewVehicule]["sModele"]= "";
  aOfCars[iNewVehicule]["sColor"]= "";
  aOfCars[iNewVehicule]["sPlace"]= "";
  aOfCars[iNewVehicule]["bValidity_check"]= "";

  // modify content from JSON
  templateVehicule= templateVehicule.replace(/%id_vehicule%/g, iNewVehicule);
  
  // append result to the adresses container
  $("#container_vehicule").html( $("#container_vehicule").html() + templateVehicule);

  for (let i = 0; i <= iNewVehicule; i++) {
    loadVehicule(i);
  }

//   editVehicule(iNewVehicule);
  
}

// // =================================================================================================


function updateVehicule(iIndiceAdress)
	{
  aOfCars[iIndiceAdress]["sMarque"]= $('#marque_'+iIndiceAdress).val();
  aOfCars[iIndiceAdress]["sModele"]= $('#modele_'+iIndiceAdress).val();
  aOfCars[iIndiceAdress]["sColor"]= $('#color_'+iIndiceAdress).val();
  aOfCars[iIndiceAdress]["sPlace"]= $('#place_'+iIndiceAdress).val();
  aOfCars[iIndiceAdress]["bValidity_check"]= $('#validity_check_'+iIndiceAdress).val();

  $('#marque_'+iIndiceAdress).prop("disabled", true);
  $('#modele_'+iIndiceAdress).prop("disabled", true);
  $('#color_'+iIndiceAdress).prop("disabled", true);
  $('#place_'+iIndiceAdress).prop("disabled", true);
  $('#validity_check_'+iIndiceAdress).prop("disabled", true);

  
  
//   $('#btn_user_'+iIndiceAdress).hide();

  

}

// // =================================================================================================



function deleteAdress()
{
    $('#accordionExample_'+$('#id_vehiculo_del_modal').val()).remove();
    $('#modalSupp').hide();
}
// =================================================================================================

function confirmDeleteVehicule(iIndiceAdress) 
{
  $('#modalSupp').fadeIn(500);
  $('#id_vehiculo_del_modal').val(iIndiceAdress);
}


// // =================================================================================================


function editVehicule(iIndiceAdress)	
{
  $('#marque_'+iIndiceAdress).prop("disabled", false);
  $('#modele_'+iIndiceAdress).prop("disabled", false);
  $('#color_'+iIndiceAdress).prop("disabled", false);
  $('#place_'+iIndiceAdress).prop("disabled", false);
  $('#validity_check_'+iIndiceAdress).prop("disabled", false);



  
  
//   $('#btn_user_'+iIndiceAdress).show();

}
// -------test crooping img 

// =================================================================================================


// $(function(){
//     // Start upload preview image
//     $(".gambar").attr("src", "https://user.gadjian.com/static/images/personnel_boy.png");
//                             var $uploadCrop,
//                             tempFilename,
//                             rawImg,
//                             imageId;
//                             function readFile(input) {
//                                  if (input.files && input.files[0]) {
//                                   var reader = new FileReader();
//                                     reader.onload = function (e) {
//                                         $('.upload-demo').addClass('ready');
//                                         $('#cropImagePop').modal('show');
//                                         rawImg = e.target.result;
//                                     }
//                                     reader.readAsDataURL(input.files[0]);
//                                 }
//                                 else {
//                                     swal("Sorry - you're browser doesn't support the FileReader API");
//                                 }
//                             }
    
//                             $uploadCrop = $('#upload-demo').croppie({
//                                 viewport: {
//                                     width: 150,
//                                     height: 200,
//                                 },
//                                 enforceBoundary: false,
//                                 enableExif: true
//                             });
//                             $('#cropImagePop').on('shown.bs.modal', function(){
//                                 // alert('Shown pop');
//                                 $uploadCrop.croppie('bind', {
//                                     url: rawImg
//                                 }).then(function(){
//                                     console.log('jQuery bind complete');
//                                 });
//                             });
    
//                             $('.item-img').on('change', function () { imageId = $(this).data('id'); tempFilename = $(this).val();
//                                                                                                              $('#cancelCropBtn').data('id', imageId); readFile(this); });
//                             $('#cropImageBtn').on('click', function (ev) {
//                                 $uploadCrop.croppie('result', {
//                                     type: 'base64',
//                                     format: 'jpeg',
//                                     size: {width: 150, height: 200}
//                                 }).then(function (resp) {
//                                     $('#item-img-output').attr('src', resp);
//                                     $('#cropImagePop').modal('hide');
//                                 });
//                             });
//                     // End upload preview image
//     })
