const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const schema = {
    type: "object",
    properties: {
        info: {
            type: "object",
            properties: {
                erstellt: { type: "string", format: "date" },
                verein: { type: "string" },
                ipaddresse: { type: "string", format: "ipv4" }
            },
            required: ["erstellt", "verein", "ipaddresse"]
        },
        anmeldung: {
            type: "object",
            properties: {
                Anrede: { type: "string" },
                Familienname: { type: "string" },
                Vorname: { type: "string" },
                Strasse: { type: "string" },
                Plz: { type: "string" },
                Ort: { type: "string" },
                Land: { type: "string" },
                Telefon: { type: ["string", "null"] },
                Telefax: { type: ["string", "null"] },
                "Mail-Adresse": { type: ["string", "null"], format: "email" }
            },
            required: ["Anrede", "Familienname", "Vorname", "Strasse", "Plz", "Ort", "Land"]
        },
        teilnehmer: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    Nachname: { type: "string" },
                    Vorname: { type: "string" },
                    Altersklasse: { type: "string" },
                    Klasse: { type: "string" },
                    Startzeit: { type: "string" }
                },
                required: ["Nachname", "Vorname", "Altersklasse", "Klasse", "Startzeit"]
            }
        }
    },
    required: ["info", "anmeldung", "teilnehmer"]
};

const data = {
    info: {
        erstellt: "2016-11-29",
        verein: "BSC Weisnicht",
        ipaddresse: "192.128.2.1"
    },
    anmeldung: {
        Anrede: "Herr",
        Familienname: "Schwärzler",
        Vorname: "Markus",
        Strasse: "Joe-Street 5",
        Plz: "6850",
        Ort: "Dornbirn",
        Land: "Österreich",
        Telefon: null,
        Telefax: null,
        "Mail-Adresse": null
    },
    teilnehmer: [
        { Nachname: "Maier", Vorname: "Joe", Altersklasse: "SCH", Klasse: "LB", Startzeit: "Vormittag" },
        { Nachname: "Maier", Vorname: "Marta", Altersklasse: "DAAK", Klasse: "LB", Startzeit: "Vormittag" }
    ]
};

const validate = ajv.compile(schema);
const valid = validate(data);
if (!valid) console.log(validate.errors);