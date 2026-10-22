<!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#3c3c3c">
<script>document.documentElement.classList.add('js');</script>
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip" href="#main">Skip to content</a>
<div class="topbar"><div class="wrap tb">
  <span class="live"><i></i>24/7 emergency call-outs, 365 days a year</span>
  <span><?php echo cp_icon( 'pin' ); // phpcs:ignore ?>896 Spring Bank West, Hull</span>
  <span><?php echo cp_icon( 'check' ); // phpcs:ignore ?>Gas Safe · OFTEC · REFCOM</span>
  <a class="tb-r" href="mailto:info@capraniplumbing.co.uk"><?php echo cp_icon( 'mail' ); // phpcs:ignore ?>info@capraniplumbing.co.uk</a>
</div></div>
<header class="site" id="masthead">
  <div class="wrap bar">
    <a class="logo" href="<?php echo cp_url( '' ); ?>" aria-label="Caprani Plumbing & Heating home"><?php echo cp_img( 'logo.webp', 'Caprani Plumbing & Heating', 1079, 452, '', false ); // phpcs:ignore ?></a>
    <nav class="main" id="nav" aria-label="Main"><ul>
      <?php foreach ( cp_nav() as $s => $l ) { $cur = '' === $s ? is_front_page() : is_page( $s ); printf( '<li><a href="%s"%s>%s</a></li>', cp_url( $s ), $cur ? ' aria-current="page"' : '', esc_html( $l ) ); } ?>
    </ul><a class="btn orange" href="tel:01482762888"><?php echo cp_icon( 'phone' ); // phpcs:ignore ?>01482 762888</a></nav>
    <button class="menu-btn" aria-expanded="false" aria-controls="nav"><span></span><span></span><em class="sr">Menu</em></button>
  </div>
</header>
<main id="main">
