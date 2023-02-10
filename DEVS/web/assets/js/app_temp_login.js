

// Quand la page est chargée
$(function() {
    let sAction;
    // J'écoute si un clic a lieu sur un élément du menu qui m'intéresse 
    $('[data-action]').click(function() {
        // Je récupère le nom de l'action à envoyer
        sAction = $(this).data('action');
        // Je définis les données à envoyer
        let oData = {
            page: 'app_temp_login',
            action: sAction,
            bJSON: 1
        };
        // Je fais appel à la méthode AJAX
        $.ajax({
            type: 'POST',
            url: 'route.php',
            async: false,
            data: oData,
            dataType: 'json',
            cache: false
        })
        // Dans tous les cas, j'exécute cette fonction =>
        .always(function (result) {
            console.log('app_temp_login.js : ajax_result', result)
        })
        // Si j'ai bien reçu un json, j'exécute cette fonction =>
        .done(function (result) {
            if (result.error) {
                showErrorMessage();
            } else {
                // Je redirige vers 'index.html' (qui affichera d'elle même
                // la page d'accueil adaptée au profil de l'utilisateur)
                document.location.href="index";
            }
        })
        // Si je n'ai pas reçu un json (ou si j'ai reçu un json
        // inexploitable car mélangé avec le code html de la page
        // par exemple), j'éxecute cette fonction =>
        .fail(function (err) {
            // j'affiche l'erreur et son statut dans la console  
            console.log(`Error (statut ${err.status}) :`, err);
            showErrorMessage('Problème de réception des données');
        });
        /**
         * Display an error message
         * 
         * @param {string} sMessage The message you want to display
         */
        function showErrorMessage(sMessage = 'Une erreur est survenue')
        {
            toastr.error(sMessage, 'Erreur')
        }
    })
})
