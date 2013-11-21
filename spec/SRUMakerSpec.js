describe("Hello test", function() {
    it("says hello", function() {
        expect(helloTest()).toEqual("Hello test!");
    });
});

describe("Databeskrivning", function() {
        var databeskrivning = new Databeskrivning();
        
        it("Ska ha en start", function() {
                expect(databeskrivning.databeskrivningStart()).toEqual("#DATABESKRIVNING_START");
        });

        it("Ska ha ett slut", function() {
                expect(databeskrivning.databeskrivningSlut()).toEqual("#DATABESKRIVNING_SLUT");
        });

        it("Ska omsluta innehållet", function() {
                var innehåll = databeskrivning.generera();
                expect(innehåll[0]).toEqual("#DATABESKRIVNING_START");
                expect(innehåll[innehåll.length - 1]).toEqual("#DATABESKRIVNING_SLUT");
        });

        describe("Generering av obligatoriska uppgifter", function() {
                it("Ska ha dagens datum och tid i rätt format", function() {
                        expect(databeskrivning.skapad()).toMatch(/#SKAPAD \d\d\d\d\d\d\d\d \d\d\d\d\d\d/);
                });

                it("Ska ha produkt som SRU", function() {
                        expect(databeskrivning.produkt()).toEqual("#PRODUKT SRU");
                });

                it("Ska ha program som SRU-Maker", function() {
                        expect(databeskrivning.program()).toEqual("#PROGRAM SRU-Maker");
                });

                it("Ska ha filnamn som BLANKETTER.SRU", function() {
                        expect(databeskrivning.filnamn()).toEqual("#FILNAMN BLANKETTER.SRU");
                });
        });
});

describe("Medieleverantören", function() {
        var medielev = new Medielev("198105198256", "Björn Palmqvist", "90629", "Umeå");
        
        it("Ska ha en start", function() {
                expect(medielev.medielevStart()).toEqual("#MEDIELEV_START");
        });

        it("Ska ha ett slut", function() {
                expect(medielev.medielevSlut()).toEqual("#MEDIELEV_SLUT");
        });

        it("Ska omsluta innehållet", function() {
                var innehåll = medielev.generera();
                expect(innehåll[0]).toEqual("#MEDIELEV_START");
                expect(innehåll[innehåll.length - 1]).toEqual("#MEDIELEV_SLUT");
        });

        describe("Generering av obligatoriska uppgifter", function() {
                it("Ska ha orgnr", function() {
                        expect(medielev.orgNr()).toMatch(/#ORGNR \d\d\d\d\d\d\d\d\d\d/);
                });

                it("Ska ha namn", function() {
                        expect(medielev.namn()).toMatch(/#NAMN [a-zA-ZåÅäÄöÖ ]+/);
                });

                it("Ska ha postnummer", function() {
                        expect(medielev.postNr()).toMatch(/#POSTNR \d\d\d\d\d/);
                });

                it("Ska ha postorten", function() {
                        expect(medielev.postOrt()).toMatch(/#POSTORT [a-zA-ZåÅäÄöÖ]+/);
                });
        });
});


describe("Info SRU ska gå att generera", function() {
        it("Generera INFO_SRU", function() {
                var infoSru = genereraInfoSru("198105198256", "Björn Palmqvist", "90629", "Umeå");
                expect(infoSru).toMatch(/#PROGRAM [a-zA-ZåÅäÄöÖ ]+/);
                expect(infoSru).toMatch(/#ORGNR 198105198256/);
                expect(infoSru).toMatch(/#NAMN Björn Palmqvist/);
                expect(infoSru).toMatch(/#POSTORT Umeå/);
                expect(infoSru).toMatch(/#FILNAMN BLANKETTER.SRU/);
        });
});

describe("Hantering av Blankett", function() {
        var blankett;
        var blankettId = "K10-2013";
        var idOrgNr = "198105198256";

        beforeEach(function() {
                blankett = new Blankett(blankettId, idOrgNr);
        });

        it("Ska ha en början med id", function() {
                expect(blankett.start()).toEqual("#BLANKETT " + blankettId);
        });

        it("Ska ha en identitet med rätt format", function() {
                expect(blankett.identitet()).toMatch(/#IDENTITET \d\d\d\d\d\d\d\d\d\d\d\d \d\d\d\d\d\d\d\d \d\d\d\d\d\d/);
        });

        it("Ska ha ett slut", function() {
                expect(blankett.slut()).toEqual("#BLANKETTSLUT");
        });

        it("De ska gå att generera blanketten", function() {
                var innehåll = blankett.generera();

                expect(innehåll[0]).toEqual(blankett.start());
                expect(innehåll[1]).toEqual(blankett.identitet());
                expect(innehåll[2]).toEqual(blankett.slut());
        });

        it("Ska gå att lägga till namn", function() {
                blankett.infogaNamn("Björn Palmqvist");
                var innehåll = blankett.generera();

                expect(innehåll[2]).toEqual("#NAMN Björn Palmqvist");
        });

        it("Ska gå att lägga till en uppgift", function() {
                blankett.nyUppgift("4530", "169780001096");
                var innehåll = blankett.generera();

                expect(innehåll[2]).toEqual("#UPPGIFT 4530 169780001096");
        });

        it("Ska gå att lägga till systeminfo", function() {
                blankett.läggtillSystemInfo("klarmarkerad 20130414 u a");
                var innehåll = blankett.generera();

                expect(innehåll[2]).toEqual("#SYSTEMINFO klarmarkerad 20130414 u a");
        });
});

describe("Filer ska hantera blanketterna", function() {
        var idOrgNr = "198105198256";

        var blankett1Id = "K10-2013";
        var blankett1 = new Blankett(blankett1Id, idOrgNr);
        
        var blankett2Id = "ANST-2013";
        var blankett2 = new Blankett(blankett2Id, idOrgNr);

        it("Ska gå att generera en fil med en blankett", function() {
                var fil = new Fil();
                fil.infogaBlankett(blankett1);

                var innehåll = fil.generera();
                expect(innehåll[0]).toEqual("#BLANKETT K10-2013");
                expect(innehåll[1]).toMatch(/#IDENTITET 198105198256 \d\d\d\d\d\d\d\d \d\d\d\d\d\d/);
                expect(innehåll[2]).toEqual("#BLANKETTSLUT");
                expect(innehåll[3]).toEqual("#FIL_SLUT");
        });

        it("Ska gå att generera en fil med flera blanketter", function() {
                var fil = new Fil();
                fil.infogaBlankett(blankett1);
                fil.infogaBlankett(blankett2);

                var innehåll = fil.generera();
                expect(innehåll[0]).toEqual("#BLANKETT K10-2013");
                expect(innehåll[1]).toMatch(/#IDENTITET 198105198256 \d\d\d\d\d\d\d\d \d\d\d\d\d\d/);
                expect(innehåll[2]).toEqual("#BLANKETTSLUT");
                expect(innehåll[3]).toEqual("#BLANKETT ANST-2013");
                expect(innehåll[4]).toMatch(/#IDENTITET 198105198256 \d\d\d\d\d\d\d\d \d\d\d\d\d\d/);
                expect(innehåll[5]).toEqual("#BLANKETTSLUT");
                expect(innehåll[6]).toEqual("#FIL_SLUT");
        });

        describe("BLAKETTER.SRU ska gå att generera", function() {
        
                it("Generera BLANKETTER.SRU", function() {
                        var fil = new Fil();
                        fil.infogaBlankett(blankett1);
                
                        var blanketterSru = genereraBlanketterSru(fil);

                        expect(blanketterSru).toMatch(/#BLANKETT K10-2013/);
                        expect(blanketterSru).toMatch(/#IDENTITET 198105198256 \d\d\d\d\d\d\d\d \d\d\d\d\d\d/);
                        expect(blanketterSru).toMatch(/#BLANKETTSLUT/);
                        expect(blanketterSru).toMatch(/#FIL_SLUT/);
                });
        });
});
