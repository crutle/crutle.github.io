<?php
header('Content-Type: image/svg+xml');
include "../inc/inc-constantParams.php";
?>

<svg xmlns="http://www.w3.org/2000/svg" lang="en-GB" aria-labelledby="title" viewBox="0 0 200 24">

  <title id="title">Email Us!</title>

  <defs>
    <style type="text/css">
    rect {
    width: 200px;
    height: 24px;
    fill: rgb(255, 255, 255);
  }

  a:focus rect,
  rect:hover {
    rx: 4px;
    ry: 4px;
    fill: rgb(0, 0, 255);
  }

  text {
    font-size: 16px;
    fill: rgb(0, 0, 255);
    pointer-events: none;
  }

  a:focus text,
  rect:hover + text {
    fill: rgb(255, 255, 255);
    font-weight: 900;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
    text-decoration: underline 1px solid rgb(255, 255, 255);
    text-underline-offset: 5px;
  }

        @font-face {
  font-family: "Font Awesome 6 Free Solid";
  src: url("../css/Font Awesome 6 Free-Solid-900.otf") format("truetype");
  font-weight: 900;
}

.my-icon::before {
            font-family: 'Font Awesome 6 Free Solid';
            content: '\f0e0';
            font-size: 24px;
            fill: red; /* If you want to set color */
        }

        .fa-envelope::before {
  font-family: "Font Awesome 6 Free Solid";
  content: "\f0e0";
  font-size: 24px;
}
    </style>

  </defs>

  <a href="<?= $mail_to ?>" aria-label="Email Us!">

  <!-- <rect />
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">my</text> -->
    <text class="fa-envelope" x="0" y="0">s
</text>
    <!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
      </a>

</svg>