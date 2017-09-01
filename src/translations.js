const TRANSLATIONS = {
  en: {
    GRADING_TYPE: 'Select the type of grading',
    LINE_GRADING: 'Line-based grading',
    VAR_GRADING: 'Variable Check grading',
    UNITTEST_GRADING: 'Unit test grading',
    TURTLE_GRADING: 'Turtle graphics grading',
    LINE_GRADING_DESC: 'Grading and feedback is based on the exact order and indentation of the lines of code.',
    VAR_GRADING_DESC: 'Grading and feedback is based on executing the student code, and then comparing variable values to correct variable values.',
    UNITTEST_GRADING_DESC: 'Grading and feedback is based on executing a set of unit tests on the student code.',
    TURTLE_GRADING_DESC: 'Grading and feedback is based on the path drawn by a turtle controlled by executing the student code. The path is compared to a path drawn by a model answer code.',
    CODELINES: 'Code fragments to construct solution from',
    SELECT_LANG: 'Select a programming language:',
    OTHER_LANG: 'Other',
    VAR_CHECK_CONF: 'Variable check configuration',
    LINES_TO_SHOW: 'Lines of code shown to student.',
    LINES_INSTRUCTIONS: 'Note, that the order indicates the correct order and that two spaces at the beginning of a line indicates an indentation of one step.',
    VAR_DESCRIPTION: 'Description of the testcase',
    VAR_CODE_BEFORE: 'Code before',
    VAR_CODE_AFTER: 'Code after',
    VAR_CHECKS: 'Variable Checks',
    ADD_TESTCASE: 'Add testcase',
    TYPE_INT: 'Integer',
    TYPE_DECIMAL: 'Decimal',
    TYPE_BOOLEAN: 'Boolean',
    TYPE_STRING: 'String',
    NAME: 'Variable name',
    UNITTEST_INSTRUCTIONS: 'Unittests can include almost arbitrary Python code. Instructions for writing Python unittests can be found from the' +
                           ' <a href=\'https://docs.python.org/2/library/unittest.html\'>Python documentation</a>.<br/><br/>' +
                           '<strong>Note!</strong> It is crucial to execute the tests and store the result into variable <code>' +
                           '_test_result</code>, like done on the last line of the example code on the left.',
    TURTLE_CONF: 'Turtle configuration',
    TURTLE_MODEL_INSTR: 'Python code for the model turtle pattern (you can use variable modelTurtle to access the turtle object):',
    TURTLE_PENDOWN: 'Is turtle pen down initially',
    TURTLE_CODE_AFTER_INSTR: 'Python code to test the student solution which is added after the student code (use variable myTurtle to access the turtle object)',
    PREVIEW_TITLE: 'Parsons Problem Preview',
    RESET: 'Reset',
    FEEDBACK: 'Feedback',
    TEST_BUTTON: 'Test your configuration',
    CLOSE: 'Close',
    FEEDBACK_TITLE: 'Feedback from testing your program:',
    SOLVED_FEEDBACK: 'Good, you solved the assignment!',
    CONFIGURATION_TITLE: 'Exercise configuration'
  },
  'fi': {
    GRADING_TYPE: 'Valitse arvostelutapa',
    LINE_GRADING: 'Rivipohjainen arvostelu',
    VAR_GRADING: 'Muuttujien vertailu',
    UNITTEST_GRADING: 'Yksikkötestaus',
    TURTLE_GRADING: 'Kilpikonnagrafiikka',
    LINE_GRADING_DESC: 'Arvostelu ja palaute perustuvat koodirivien järjestykseen ja sisennykseen.',
    VAR_GRADING_DESC: 'Arvostelu ja palaute perustuvat opiskelijan ohjelman suoritukseen ja muuttujien arvojen vertailuun suorituksen jälkeen.',
    UNITTEST_GRADING_DESC: 'Arvostelu ja palaute perustuvat yksikkötestien ajamiseen opiskelijan ohjelmalle.',
    TURTLE_GRADING_DESC: 'Arvostelu ja palaute perustuvat kilpikonnan piirtämään polkuun opiskelijan ohjelmaa suoritettaessa. Polkua verrataan mallivastauksen piirtämään polkuun.',
    CODELINES: 'Koodirivit, joista vastaus rakennetaan',
    SELECT_LANG: 'Valitse ohjelmointikieli:',
    OTHER_LANG: 'Muu',
    VAR_CHECK_CONF: 'Muuttujien vertailun asetukset',
    LINES_TO_SHOW: 'Opiskelijalle näytettävät koodirivit.',
    LINES_INSTRUCTIONS: 'Huomaa, että rivien järjestys määrää oikean ratkaisun. Rivien sisennyksen voi määrätä välilyönneillä.',
    VAR_DESCRIPTION: 'Testitapauksen kuvaus',
    VAR_CODE_BEFORE: 'Koodi ennen',
    VAR_CODE_AFTER: 'Koodi jälkeen',
    VAR_CHECKS: 'Muuttujien vertailut',
    ADD_TESTCASE: 'Lisää testitapaus',
    TYPE_INT: 'Kokonaisluku',
    TYPE_DECIMAL: 'Desimaaliluku',
    TYPE_BOOLEAN: 'Totuusarvo',
    TYPE_STRING: 'Merkkijono',
    NAME: 'Muuttujan nimi',
    UNITTEST_INSTRUCTIONS: 'Yksikkötestit voivat sisältää lähes mitä tahansa Python koodia. Ohjeita yksikkötestien kirjoittamiseen ' +
                           'löytyy <a href=\'https://docs.python.org/2/library/unittest.html\'>Pythonin dokumentaatiosta</a>.<br/><br/>' +
                           '<strong>Huom!</strong> On erityisen tärkeää suorittaa testit ja sijoittaa tulos muuttujaan <code>' +
                           '_test_result</code>, kuten vasemmalla olevan esimerkkikoodin viimeisellä rivillä.',
    TURTLE_CONF: 'Kilpikonna-asetukset',
    TURTLE_MODEL_INSTR: 'Python-koodi, joka piirtää kilpikonnan mallipolun (kilpikonna on muuttujassa modelTurtle):',
    TURTLE_PENDOWN: 'Kilpikonnan kynä alhalla ohjelman alussa',
    TURTLE_CODE_AFTER_INSTR: 'Python-koodi joka suoritetaan opiskelijan ohjelman jälkeen (kilpikonna on muuttujassa myTurtle)',
    PREVIEW_TITLE: 'Tehtävän esikatselu',
    RESET: 'Aloita alusta',
    FEEDBACK: 'Palaute',
    TEST_BUTTON: 'Kokeile tehtävääsi',
    CLOSE: 'Sulje',
    FEEDBACK_TITLE: 'Palaute ohjelmasi testauksesta:',
    SOLVED_FEEDBACK: 'Hienoa, ratkaisit tehtävän!',
    CONFIGURATION_TITLE: 'Tehtävän asetukset'
  }
};

export function getTranslator(lang) {
  if (!lang || !TRANSLATIONS[lang]) {
    lang = 'en';
  }
  var trans = TRANSLATIONS[lang];
  return function(key) {
    return trans[key] || key.toUpperCase();
  };
}
