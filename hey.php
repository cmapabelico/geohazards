<?php
	$php_var = "Hello world from PHP";
?>

<html>
  <head>
    <title>Pass variable from PHP to JavaScript - Cyberster's Blog'</title>
  </head>
  <body>
    <script>
      var js_var = "<?php echo $php_var; ?>";
        alert(js_var);
    </script>
  </body>
</html>