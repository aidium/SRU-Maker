function helloTest() {
    return "Hello test!";
}


function Databeskrivning() {

    this.generera = function() {
        var inneh�ll = [];
        inneh�ll.push(this.databeskrivningStart());
        inneh�ll.push(this.produkt());
        inneh�ll.push(this.skapad());
        inneh�ll.push(this.program());
        inneh�ll.push(this.filnamn());
        inneh�ll.push(this.databeskrivningSlut());
        return inneh�ll;
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
        var inneh�ll = [];
        inneh�ll.push(this.medielevStart());
        inneh�ll.push(this.orgNr());
        inneh�ll.push(this.namn());
        inneh�ll.push(this.postNr());
        inneh�ll.push(this.postOrt());
        inneh�ll.push(this.medielevSlut());
        return inneh�ll;
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
                var inneh�ll = [];
                inneh�ll.push(this.start());
                inneh�ll.push(this.identitet());
                if (this.namn !== null) {
                        inneh�ll.push(this.namn);
                }
                this.uppgifter.forEach(function(post) {
                        inneh�ll.push(post);
                });
                inneh�ll.push(this.slut());
                return inneh�ll;
        }

        this.infogaNamn = function(aNamn) {
                this.namn = "#NAMN " + aNamn;
        }

        this.uppgift = function(id, v�rde) {
                return "#UPPGIFT " + id + " " + v�rde;
        }

        this.nyUppgift = function(id, v�rde) {
                this.uppgifter.push(this.uppgift(id, v�rde));
        }

        this.systemInfo = function(v�rde) {
                return "#SYSTEMINFO " + v�rde;
        }

        this.l�ggtillSystemInfo = function(v�rde) {
                this.uppgifter.push(this.systemInfo(v�rde));
        }
}

function Fil() {
        this.blanketter = [];
        this.infogaBlankett = function(blankett) {
                this.blanketter.push(blankett);
        }


        this.generera = function() {
                var inneh�ll = [];
                this.blanketter.forEach(function(blankett) {
                        inneh�ll = inneh�ll.concat(blankett.generera());
                });
                inneh�ll.push("#FIL_SLUT");
                return inneh�ll;
        }
}

function genereraInfoSru(aOrgNr, aNamn, aPostNr, aPostOrt) {
        var databeskrivning = new Databeskrivning();
        var medialev = new Medielev(aOrgNr, aNamn, aPostNr, aPostOrt);

        var inneh�ll = databeskrivning.generera();
        inneh�ll = inneh�ll.concat(medialev.generera());

        var infoSru = inneh�ll.join("<br/>");
        return infoSru;
}

function genereraBlanketterSru(fil) {
       var inneh�ll = fil.generera();
       blanketterSru = inneh�ll.join("<br/>");
       return blanketterSru;
}
