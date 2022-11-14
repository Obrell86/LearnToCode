
//const api = restful(apiUrl, requestBackend(request));


$(function() {
    let apiSelect = $('#apiSelect');
    
    // Nollställ dropdown
    apiSelect.find('option').remove().end().append('<option value="-1">-- Välj --</option>');

    // Fyll dropdown från API-lista.
    for (var i = 0; i < apiParser.apis.length; i++){
        let api = apiParser.apis[i];
        let opt = $('<option value="'+i+'">'+api.name+'</option>');
        apiSelect.append(opt);
    }

    apiSelect.change(function(evt){
        apiParser.currentIndex = evt.target.value;
        renderForm();
    });
 });

 function renderForm() {
    let api = apiParser.currentApi();

    // Dubbelkolla så att ett API har valts.
    if (api != null){
        $('#dataGrid').jsGrid({
            width: "100%",
            height: "400px",

            sorting: true,
            paging: true,

            
        });
    }
 }