/**
 * Created by tremaine on 12/5/15.
 */

$(document).ready(function(){
    $('#spinner').hide();
    $('#send').prop('disabled', false);
    getClients = function(){
        var table = $('#clients');
        $.ajax({
            url: '/clients',
            type: 'GET',
            success: function(data){
                var clients = data;
                var len = data.length, i = 0;
                for(;i<len;i++){
                    table.append('<tr><td>'+clients[i].name+'</td><td>'+clients[i].email+'</td><td>'
                        +moment(clients[i].created).format('MMMM Do YYYY, h:mm:ss a')+'</td></tr>');
                }
            },
            error: function(){

            },
            complete: function(data){

            }
        });
    };

    getClients();

    var client = { name: $('#name'), email: $('#email'), regBtn:$('#register'), info : {
    name: '', email: '' }
  };
    //get clients

  //check if the name field is empty
  client.name.focusout(function(){
      if(client.name.val().length > 3){
        client.name.parent().removeClass('has-error').addClass('has-success');
        client.info.name = client.name.val();
      }else{
        //showValidationState(client.name);
        client.name.parent().removeClass('has-success').addClass('has-error');
        client.name.focus();
      }
  });

  client.email.focusout(function(){
    if(client.email.val().length > 3){
      client.email.parent().removeClass('has-error').addClass('has-success');
      client.info.email = client.email.val();
    }else{
      client.email.parent().removeClass('has-success').addClass('has-error');
      client.email.focus();
    }
  });

  var isValid = function(field){
    var valid = false;
    if(field.val().length > 3){
        field.parent().removeClass('has-error').addClass('has-success');
         valid = true;
      }
    return valid;
  };

  client.regBtn.click(function(event){
    //check if form data exists
    event.preventDefault();
     if(isValid(client.name) && isValid(client.email)){
      submitClient();
    }else{
       console.error('Form not sent');
     }
    //showError message
  });

  var pristine = function(){
    client.name.val('');
    client.email.val('');
    client.info = {};
    client.name.parent().removeClass('has-error has-success');
    client.email.parent().removeClass('has-error has-success');
      $('#subject').val('');$('#body').val('');
  };

  var submitClient = function(){
    $.ajax({
        url:'/clients',
        type: 'POST',
        data: client.info,
        success: function(data){
          updateTable(data);
        },
        error: function(error){
          console.error('Error');
          console.log(error);
        },
        complete: function(){
          pristine();
        }
    });
  };

  var updateTable = function(){
      //getClients();
    var table = $('#clients');
    table.prepend('<tr><td>'+client.name+'</td><td>'+client.email+'</td><td>'+moment(client.created).format('MMMM Do YYYY, h:mm:ss a')+'</td></tr>');
  };
    /**
     * Handle email form
     */
    $('#send').click(function(event){
        event.preventDefault();
        var email = {};
        email.subject = $('#subject').val();
        email.body = $('#body').val();
        $('#spinner').show();
        $(this).prop('disabled', true);
        submitEmail(email);
    });

    var submitEmail = function(email){
        $.ajax({
           url: '/emails',
            type: 'POST',
            data: email,
            success: function(data){
                pristine();
                showMessage('success');
            },
            error: function(error){
                showMessage('error');
            }
        });
        $('#send').prop('disabled', false);
        $('#spinner').hide();
    };

    var showMessage = function(type){
        var alertDiv = $('#message'),
            site_message = $('#site-message')
            alert_btn = $('<button>').attr({ 'type': 'button',
                                            'data-dismiss' :'alert',
                                            'aria-label': 'Close'}).addClass('close');
            alert_btn_span = $('<span>').attr({'aria-hidden': 'true'}).html('&times');
            alert_btn.append(alert_btn_span);
        switch(type){
            case 'success': alertDiv
                                .addClass('alert alert-success alert-dismissable')
                                .attr('role', 'alert')
                                .html('<strong>Success!</strong> Emails successfully processed.')
                                .append(alert_btn)
                                .show();
                break;
            case 'error' : alertDiv
                                .addClass('alert alert-danger alert-dismissable')
                                .attr('role', 'alert')
                                .html('<strong>Whoops!</strong>. Something went wrong will sending your email')
                                .append(alert_btn)
                                .show();
                break;
            case 'complete': site_message
                                .addClass('alert alert-info alert-dismissable')
                                .attr('role', 'alert')
                                .html('<strong>All emails have been successfully sent.</strong>')
                                .append(alert_btn)
                                .show();
                break;
            default: console.error('Error has occurred');
        };
    }
});

