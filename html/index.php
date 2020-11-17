<?php
$config = file_get_contents('config.json');
?>

<script type="text/javascript">
  window.config = <?php echo $config; ?>;
  //console.log(config);
</script>

<?php
include ('React/build/index.html');
