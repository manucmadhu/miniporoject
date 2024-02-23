$(document).ready(function(){
    hide_loading();
    showAlert(
        'Please Enter your Aadhar Card Number to Authenticate yourself in order to cast your priceless vote.',
        'rgba(201, 136, 255, 0.3)', 'rgb(102, 0, 128)');
    setTimeout(function(){
        $('.loading-div').css({
            'height': 'calc(100vh - 50px)',
            'top': '50px',
        });
    }, 1000);
});

// Aadhar Validation on input
$('#aadhar').on('input', function(event) {
    var aadhar = $('#aadhar').val();
    if (aadhar.length > 12) {
        // Trim the input to 12 characters if it exceeds the limit
        $('#aadhar').val(aadhar.slice(0, 12));
    }
    if (!$.isNumeric(aadhar)) {
        // If input is not numeric, clear the input field
        $('#aadhar').val('');
    }
});

// Authenticate Aadhar number after button click
// function submit_aadhar() {
//     var aadhar = $('#aadhar').val().trim(); // Trimmed Aadhar number

//     // Check if Aadhar number is empty or not numeric
//     if (aadhar === '' || !$.isNumeric(aadhar)) {
//         showAlert('Please enter a valid Aadhar number.', 'rgba(255, 82, 82, 0.3)', 'rgb(122, 0, 0)', 'vibrate');
//         return; // Exit function if Aadhar number is invalid
//     }
    
//     // Send AJAX request to authenticate Aadhar number
//     show_loading('Please wait, you are being authenticated.');
//     $.ajax({
//         type: "POST",
//         url: "/authentication/",
//         data: {'aadhar_no': aadhar},
//         success: function(data) {
//             if (data.success) {
//                 // Handle successful authentication
//                 candidate_details_json = data.details;
//                 showAlert('Successfully Authenticated, Vote Now!', 'rgba(136, 255, 156, 0.3)', 'rgb(0, 128, 0)');
//                 setTimeout(function() {
//                     showAlert('Please verify an Email-ID, Private key will be sent to this Email-ID.', 'rgba(201, 136, 255, 0.3)', 'rgb(102, 0, 128)', null);
//                 }, 5000);
//                 $('.main-content').html(data.html);
//                 hide_loading();
//                 showShortDetails();
//             } else {
//                 // Handle authentication error
//                 showAlert(data.error, 'rgba(255, 82, 82, 0.3)', 'rgb(122, 0, 0)', 'vibrate');
//                 hide_loading();
//             }
//         },
//         error: function(xhr, textStatus, errorThrown) {
//             // Handle Ajax errors, including when the server returns a 400 Bad Request
//             showAlert('Error: ' + textStatus, 'rgba(255, 82, 82, 0.3)', 'rgb(122, 0, 0)', 'vibrate');
//             hide_loading();
//         }
//     });
// }
function submit_aadhar() {
    var aadhar = $('#aadhar').val().trim(); // Trimmed Aadhar number

    // Check if Aadhar number is empty or not numeric
    if (!aadhar) {
        showAlert('Please enter a valid Aadhar number.', 'rgba(255, 82, 82, 0.3)', 'rgb(122, 0, 0)', 'vibrate');
        return; // Exit function if Aadhar number is empty
    }
    
    // Send AJAX request to authenticate Aadhar number
    show_loading('Please wait, you are being authenticated.');
    $.ajax({
        type: "GET",  // Use GET method for passing Aadhar number in the URL
        url: "/authentication/",
        data: {'aadhar_no': aadhar}, // Include Aadhar number as a GET parameter
        success: function(data) {
            // Handle response from server
            if (data.success) {
                // Handle successful authentication
                candidate_details_json = data.details;
                showAlert('Successfully Authenticated, Vote Now!', 'rgba(136, 255, 156, 0.3)', 'rgb(0, 128, 0)');
                setTimeout(function() {
                    showAlert('Please verify an Email-ID, Private key will be sent to this Email-ID.', 'rgba(201, 136, 255, 0.3)', 'rgb(102, 0, 128)', null);
                }, 5000);
                $('.main-content').html(data.html);
                hide_loading();
                showShortDetails();
            } else {
                // Handle authentication error
                showAlert(data.error, 'rgba(255, 82, 82, 0.3)', 'rgb(122, 0, 0)', 'vibrate');
                hide_loading();
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            // Handle Ajax errors
            showAlert('Error: ' + textStatus, 'rgba(255, 82, 82, 0.3)', 'rgb(122, 0, 0)', 'vibrate');
            hide_loading();
        }
    });
}



// Show short Details at top right corner after authentication
function showShortDetails() {
    $('.basic-details').html(candidate_details_json.uuid+' ('+candidate_details_json.name+')');
    $('.profile-pic').first().attr('src', candidate_details_json.profile_pic);
    $('.short-details').css('display', 'flex');
}
