let apiParser = {
    currentIndex: -1,

    currentApi: function () {
        if (this.currentIndex > -1)
            return this.getCurrentInfo();
        else
            return null;
    },

    apis: [{ 
        name: "Personbilar", 
        url: "https://api.scb.se/OV0104/v1/doris/sv/ssd/START/TK/TK1001/TK1001A/PersBilarDrivMedel",
        params: null,
        title: null
    }],

    getTitle: function() {
        this.currentApi().title;
    },

    getParams: function () {
        this.currentApi().params;
    },

    getCurrentInfo: function() {
        let api = this.currentApi();
        if (api.params == null || api.title == null){
            $.get(api.url, null, function(data){
                api.title = data.title;
                api.params = data.variables;
            });
        }
        return api;
    },

    getFields: function(){
        let fieldList = [];

        let api = this.currentApi();

        if (api != null){
            for (var i = 0; i < api.params.length; i++){
                let param = api.params[i];

                if (param.code != 'ContentsCode') {
                    let values = [];

                    for (var k = 0; k < param.values.length; k++){
                        let paramValue = param.values[k];

                        let paramNum = parseInt(paramValue);
                        if (!isNaN(paramNum))
                            paramValue = paramNum;

                        values.add({'value': paramValue, 'text': param.valueTexts[k]});
                    }

                    let field = {
                        "name": param.Code,
                        "type": "select",
                        "items": values
                    }
                }
            }
        }
    }
}