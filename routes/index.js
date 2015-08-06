var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EhrScape provisioner' });
});

router.get('/download/workspace-markdown', function(req, res, next) {

  function processMarkdown(markdown) {
    for (item in req.query) {
      markdown = markdown.replace('{{' + item + '}}', req.query[item]);
    }
    return markdown;
  }

  fs.readFile('markdown_templates/workspace.md', { encoding: 'UTF-8' }, function(err, data) {
    res.setHeader("Content-Type", "text/markdown");
    res.setHeader("Content-Disposition", 'attachment; filename="workspace.md"');
    res.send(processMarkdown(data));
  });

});

module.exports = router;
