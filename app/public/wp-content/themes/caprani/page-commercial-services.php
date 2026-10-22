<?php get_header(); cp_phead( 'Commercial services', 'Commercial plumbing &amp; heating', 'For schools, hospitality, retail and care, with fast, reliable same-day call-outs to keep your business running smoothly.', 'scaffold.webp' ); ?>
<section class="sec"><div class="wrap split">
  <div>
    <h2>Reliable systems for every kind of business</h2>
    <p>We specialise in installations, servicing and maintenance tailored to the demands of commercial properties, from schools, care homes, offices and retail spaces to industrial facilities.</p>
    <p>Our experienced engineers deliver high-quality workmanship, addressing everything from large-scale heating systems to complex plumbing networks.</p>
    <div class="com-prices">
      <div><b>Commercial call-outs</b><span>from £202 +VAT</span><small>Same-day call-outs for your emergency</small></div>
      <div><b>Commercial solutions</b><span>Request a quote</span><small>Installations, servicing and planned maintenance</small></div>
    </div>
    <p class="actions"><a class="btn orange" href="<?php echo cp_url( 'contact' ); ?>?type=Commercial#form">Request a quote</a><a class="btn dark" href="tel:01482762888"><?php echo cp_icon( 'phone' ); // phpcs:ignore ?>01482 762888</a></p>
  </div>
  <figure class="stack"><?php echo cp_img( 'gasmeter.webp', 'Engineer testing a commercial gas meter', 1400, 1867, 'a' ) . cp_img( 'plantroom.webp', 'Commercial plant room pipework', 1080, 1350, 'b' ); // phpcs:ignore ?></figure>
</div></section>
<section class="sec grey"><div class="wrap">
  <h2 class="group-h">Sectors we work in</h2>
  <ul class="sectors"><li>Schools</li><li>Care homes</li><li>Hospitality</li><li>Offices</li><li>Retail</li><li>Industrial facilities</li></ul>
  <div class="svc-grid three">
    <article class="svc"><?php echo cp_img( 'scaffold.webp', '', 1400, 1867 ); // phpcs:ignore ?><div><h3>Air conditioning</h3><p>Installation, servicing, maintenance and repairs, carried out by REFCOM F-gas certified engineers.</p></div></article>
    <article class="svc"><?php echo cp_img( 'flue.webp', '', 1200, 1600 ); // phpcs:ignore ?><div><h3>Oil &amp; gas heating</h3><p>Oil boiler installation, servicing and maintenance alongside commercial gas work, with a focus on safety and performance.</p></div></article>
    <article class="svc"><?php echo cp_img( 'manifold.webp', '', 1179, 1430 ); // phpcs:ignore ?><div><h3>Plumbing networks</h3><p>From routine servicing to complex installations and urgent repairs across your site.</p></div></article>
  </div>
</div></section>
<?php cp_cta(); get_footer();
