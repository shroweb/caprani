<?php get_header(); cp_phead( 'Domestic services', 'Plumbing, heating &amp; renewables for your home', 'Professional plumbing, heating, air conditioning and renewable energy services across Hull and the surrounding areas.', 'bathroom.webp' ); ?>
<section class="sec"><div class="wrap">
  <h2 class="group-h">Heating &amp; plumbing prices</h2>
  <div class="price-table">
    <?php foreach ( cp_priced() as $p ) { printf( '<div class="pt-row"><div><h3>%s</h3><p>%s</p></div><span>from <b>%s</b> +VAT</span></div>', esc_html( $p[0] ), esc_html( $p[2] ), esc_html( $p[1] ) ); } ?>
    <div class="pt-row"><div><h3>Leaks &amp; repairs</h3><p>Efficient detection and repair of leaks, maintaining the integrity of your plumbing.</p></div><span><b>Free quote</b></span></div>
  </div>
  <p class="note">All prices are plus VAT at 20% unless stated. No two boilers or heating systems are alike, so contact us for a quote and our most accurate pricing.</p>
</div></section>
<section class="sec grey"><div class="wrap">
  <h2 class="group-h">Everything we do at home</h2>
  <div class="svc-grid">
    <?php foreach ( cp_services() as $s ) : ?>
      <article class="svc"><?php echo cp_img( $s[2], '', 1200, 900 ); // phpcs:ignore ?><div><h3><?php echo esc_html( $s[0] ); ?></h3><p><?php echo esc_html( $s[1] ); ?></p></div></article>
    <?php endforeach; ?>
    <article class="svc"><?php echo cp_img( 'service.webp', '', 1080, 1080 ); // phpcs:ignore ?><div><h3>Boiler servicing</h3><p>Age, dust and user error can wreak havoc on a boiler. An annual service extends its life expectancy and stops your manufacturer’s warranty becoming void.</p></div></article>
  </div>
</div></section>
<?php cp_emergency_band(); cp_cta(); get_footer();
