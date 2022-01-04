var fs = require('fs');
var parseString = require('xml2js').parseString;
// var xml2js = require('xml2js');
// var parser = new xml2js.Parser();

// fs.readFile(__dirname + '/foo.xml', function(err, data) {
//     parser.parseString(data, function (err, result) {
//         console.dir(result);
//         console.log('Done');
//     });
// });

// JSON.parse(readFileSync('./mochawesome-report/mochawesome.json', 'utf8'));

fs.readFile('./test-reports/test.xml', function (err, xml) {
  parseString(xml, function (err, result) {
    console.info(result.testsuites.testsuite);
  });
});
