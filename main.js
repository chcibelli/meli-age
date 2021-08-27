$( document ).ready(function() {

    $( "#main-btn" ).click(function() {
        
        $('#result').hide();
        
        let nickname = $('#nickname').val();
        let site = $('#hidden_site').val();
        
        if(nickname == '' || site == '') {
            $('#result').html('<p>Elegí tu país e ingresá tu apodo/nickname :(</p>');
            $('#result').show();
            $('#share').html('');
            $('#share').hide();
            return false;
        }
        
        let url = 'https://api.mercadolibre.com/sites/'+site+'/search?nickname='+nickname.trim();
        
        $.getJSON( url, function( data ) {
            
            if (typeof data.seller === "undefined") {
                $('#result').html('<p>No encontre el apodo/nickname :(</p>');
                $('#share').html('');
                $('#share').hide();    
                $('#result').show();
            } else {
                var difference = getDifference(new Date(data.seller.registration_date),new Date());
                let result = '<p>Te registraste el ' + formatDate(new Date(data.seller.registration_date)) + '</p>';
                
                result += '<p>Estas usando Mercado Libre hace ';
                if(difference.y >0) { result += difference.y + (difference.y > 1 ? ' años' : ' año'); }
                if(difference.m >0) { result += ', ' + difference.m + (difference.m > 1 ? ' meses' : ' mes'); }
                if(difference.d >0) { result += ' y ' + difference.d + (difference.d > 1 ? ' días' : ' día'); }
                result += '</p>';
                
                result += '<p class="divider"></p>'
                
                let ry = new Date(data.seller.registration_date).getFullYear();
                result += '<p class="info">Así era el logo de MELI ese año 🚀 </p>';
                result += '<p><img src="img/'+ry+'_logo-min.png" class="logo" ></p>';
                result += '<p></p>';
                result += '<p class="info">Y esta era la home del sitio en ese momento 👀 👀 </p>';
                result += '<p><a href="img/'+ry+'_full-min.png" target="_blank"><img src="img/'+ry+'_full-min.png" class="website" ></a></p>';
                
                let tweet = 'Yo uso Mercado Libre hace ';
                if(difference.y >0) { tweet += difference.y + (difference.y > 1 ? ' años' : ' año'); }
                if(difference.m >0) { tweet += ', ' + difference.m + (difference.m > 1 ? ' meses' : ' mes'); }
                if(difference.d >0) { tweet += ' y ' + difference.d + (difference.d > 1 ? ' días' : ' día'); }
                tweet += ' ¿Y vos? Averigualo entrando en -> ';
                
                $('#share').html('<a class="twitter-share-button" href="https://twitter.com/intent/tweet" data-size="large"  data-url="https://chcibelli.github.io/meli-how-old-are-u/" data-text="'+tweet+'">Tweet</a>');
                twttr.widgets.load();
                
                $('#result').html(result);
                $('#result, #share').show();
                
            }
        });			
        
    });	
    
    /*$('#nickname').on('keyup',function(e) {
        $(this).val($(this).val().toUpperCase());
    });*/
    
    $('#nickname').on('keypress',function(e) {
        if(e.which == 13) {
            $('#main-btn').click();
        }
    });
    
    var availableTags = [ 
        {label:"Argentina", value:"MLA"}, 
        {label:"Bolivia",value:"MBO"},
        {label:"Brasil", value:"MLB"},
        {label:"Chile", value:"MLC"},
        {label:"Colombia", value:"MCO"},
        {label:"Costa Rica", value:"MCR"},
        {label:"Cuba", value:"MCU"},
        {label:"Dominicana", value:"MRD"},
        {label:"Ecuador", value:"MEC"},
        {label:"Guatemala", value:"MGT"},
        {label:"Honduras", value:"MHN"},
        {label:"Mexico", value:"MLM"},
        {label:"Nicaragua", value:"MNI"},
        {label:"Panama", value:"MPE"},
        {label:"Paraguay", value:"MPY"},
        {label:"Perú", value:"MPE"},
        {label:"Paraguay", value:"MPE"},
        {label:"Uruguay", value:"MLU"},
        {label:"Venezuela", value:"MLV"}
    ];
    
    $( "#site" ).autocomplete({
        source: availableTags,
        select: function (event, ui) {
            $('#hidden_site').val(ui.item.value);
            $('#site').val(ui.item.label);
            return false;
        }
    }); 
    
});	

function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function formatDate(date) {
    return pad(date.getUTCDate()) + '/' + pad(date.getUTCMonth()+1) + '/' + date.getUTCFullYear();
}

function getDifference(startdate, enddate) {
    var startdateMoment = moment(startdate);
    var enddateMoment = moment(enddate);
    if (startdateMoment.isValid() === true && enddateMoment.isValid() === true) {
        var years = enddateMoment.diff(startdateMoment, 'years');				
        var months = enddateMoment.diff(startdateMoment, 'months') - (years * 12);
        startdateMoment.add(years, 'years').add(months, 'months');
        var days = enddateMoment.diff(startdateMoment, 'days')
        return {y:years, m:months, d:days};				
    }
}