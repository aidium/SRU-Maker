function helloTest() {
    return "Hello test!";
}


function Databeskrivning() {

    this.generera = function() {
        var innehåll = [];
        innehåll.push(this.databeskrivningStart());
        innehåll.push(this.produkt());
        innehåll.push(this.skapad());
        innehåll.push(this.program());
        innehåll.push(this.filnamn());
        innehåll.push(this.databeskrivningSlut());
        return innehåll;
    }

    this.databeskrivningStart = function() {
        return "#DATABESKRIVNING_START";
    }

    this.databeskrivningSlut = function() {
        return "#DATABESKRIVNING_SLUT";
    }

    this.skapad = function() {
            var datum = new Date();
            return "#SKAPAD " + formatDatum(datum) + " " + formatTid(datum);

    }

    this.produkt = function() {
            return "#PRODUKT SRU";
    }

    this.program = function() {
            return "#PROGRAM SRU-Maker";
    }

    this.filnamn = function() {
            return "#FILNAMN BLANKETTER.SRU";
    }
}

function formatDatum(datum) {
        return "" + datum.getFullYear() + inledMedNoll(datum.getMonth() + 1) + inledMedNoll(datum.getDate());
}

function formatTid(datum) {
        return "" + inledMedNoll(datum.getHours()) + inledMedNoll(datum.getMinutes()) + inledMedNoll(datum.getSeconds());
}

function inledMedNoll(aTal) {
        var tal = "" + aTal;
        if (tal.length == 1) 
                return tal = "0" + tal;
        return tal;
}

function Medielev(aOrgNr, aNamn, aPostNr, aPostOrt) {
    this.varOrgNr = aOrgNr;
    this.varNamn = aNamn;
    this.varPostNr = aPostNr;
    this.varPostOrt = aPostOrt;

    this.generera = function() {
        var innehåll = [];
        innehåll.push(this.medielevStart());
        innehåll.push(this.orgNr());
        innehåll.push(this.namn());
        innehåll.push(this.postNr());
        innehåll.push(this.postOrt());
        innehåll.push(this.medielevSlut());
        return innehåll;
    }

    this.medielevStart = function() {
        return "#MEDIELEV_START";
    }

    this.medielevSlut = function() {
        return "#MEDIELEV_SLUT";
    }

    this.orgNr = function() {
            return "#ORGNR " + this.varOrgNr;
    }

    this.namn = function() {
            return "#NAMN " + this.varNamn;
    }

    this.postNr = function() {
            return "#POSTNR " + this.varPostNr;
    }

    this.postOrt = function() {
            return "#POSTORT " + this.varPostOrt;
    }
}

function Blankett(aBlankettId, aIdOrgNr) {
        this.blakettId = aBlankettId;
        this.idOrgNr = aIdOrgNr;
        this.namn = null;
        this.uppgifter = [];

        this.start = function() {
                return "#BLANKETT " + this.blakettId;
        }

        this.identitet = function() {
                var datum = new Date();
                return "#IDENTITET " + this.idOrgNr + " " + formatDatum(datum) + " " + formatTid(datum); 
        }

        this.slut = function() {
                return "#BLANKETTSLUT";
        }

        this.generera = function() {
                var innehåll = [];
                innehåll.push(this.start());
                innehåll.push(this.identitet());
                if (this.namn !== null) {
                        innehåll.push(this.namn);
                }
                this.uppgifter.forEach(function(post) {
                        innehåll.push(post);
                });
                innehåll.push(this.slut());
                return innehåll;
        }

        this.infogaNamn = function(aNamn) {
                this.namn = "#NAMN " + aNamn;
        }

        this.uppgift = function(id, värde) {
                return "#UPPGIFT " + id + " " + värde;
        }

        this.nyUppgift = function(id, värde) {
                this.uppgifter.push(this.uppgift(id, värde));
        }

        this.systemInfo = function(värde) {
                return "#SYSTEMINFO " + värde;
        }

        this.läggtillSystemInfo = function(värde) {
                this.uppgifter.push(this.systemInfo(värde));
        }
}

function Fil() {
        this.blanketter = [];
        this.infogaBlankett = function(blankett) {
                this.blanketter.push(blankett);
        }


        this.generera = function() {
                var innehåll = [];
                this.blanketter.forEach(function(blankett) {
                        innehåll = innehåll.concat(blankett.generera());
                });
                innehåll.push("#FIL_SLUT");
                return innehåll;
        }
}

function genereraInfoSru(aOrgNr, aNamn, aPostNr, aPostOrt) {
        var databeskrivning = new Databeskrivning();
        var medialev = new Medielev(aOrgNr, aNamn, aPostNr, aPostOrt);

        var innehåll = databeskrivning.generera();
        innehåll = innehåll.concat(medialev.generera());

        var infoSru = innehåll.join("<br/>");
        return infoSru;
}

function genereraBlanketterSru(fil) {
       var innehåll = fil.generera();
       blanketterSru = innehåll.join("<br/>");
       return blanketterSru;
}
