<?php get_header(); ?>
<section class="hero">
  <?php echo cp_img( 'copper.webp', '', 1179, 1173, 'hero-bg', false ); // phpcs:ignore ?>
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="kick">Hull &amp; East Yorkshire · Since 2016</p>
      <h1>Your local plumbing &amp; heating experts in Yorkshire.</h1>
      <p class="lead">A family-run Hull team for boilers, heating, plumbing, heat pumps and air conditioning, with a same-day emergency team on call 24/7, 365 days a year.</p>
      <p class="actions"><a class="btn orange lg" href="tel:01482762888"><?php echo cp_icon( 'phone' ); // phpcs:ignore ?>Call 01482 762888</a><a class="btn ghost lg" href="<?php echo cp_url( 'contact' ); ?>">Get a quote</a></p>
      <ul class="hero-ticks"><li><?php echo cp_icon( 'check' ); // phpcs:ignore ?>Gas Safe registered</li><li><?php echo cp_icon( 'check' ); // phpcs:ignore ?>OFTEC registered</li><li><?php echo cp_icon( 'check' ); // phpcs:ignore ?>REFCOM F-gas certified</li></ul>
    </div>
    <figure class="hero-photo">
      <?php echo cp_img( 'shopfront.webp', 'The Caprani team outside their Spring Bank West showroom in Hull', 1800, 2391, '', false ); // phpcs:ignore ?>
      <div class="badge-247"><b>24/7</b><span>Emergency call-outs<br>365 days a year</span></div>
      <figcaption>#TeamCAPRANI outside our Spring Bank West office</figcaption>
    </figure>
  </div>
</section>

<section class="sec"><div class="wrap">
  <div class="sec-head"><div><p class="kick dark">Upfront pricing</p><h2>Popular jobs, clear prices</h2></div><p class="note">All prices exclude VAT at 20%. No two heating systems are alike, so contact us for an accurate quote.</p></div>
  <div class="priced">
    <?php foreach ( cp_priced() as $p ) : ?>
      <article class="pcard"><?php echo cp_img( $p[3], '', 800, 800 ); // phpcs:ignore ?><div><h3><?php echo esc_html( $p[0] ); ?></h3><p><?php echo esc_html( $p[2] ); ?></p><p class="from">from <b><?php echo esc_html( $p[1] ); ?></b> <small>+VAT</small></p></div></article>
    <?php endforeach; ?>
  </div>
</div></section>

<?php cp_emergency_band(); ?>

<section class="sec grey"><div class="wrap">
  <div class="sec-head"><div><p class="kick dark">What we do</p><h2>Plumbing, heating &amp; renewables</h2></div><a class="more" href="<?php echo cp_url( 'domestic-services' ); ?>">All domestic services <?php echo cp_icon( 'arrow' ); // phpcs:ignore ?></a></div>
  <div class="svc-grid">
    <?php foreach ( cp_services() as $i => $s ) : ?>
      <article class="svc<?php echo 0 === $i ? ' wide' : ''; ?>"><?php echo cp_img( $s[2], '', 1200, 900 ); // phpcs:ignore ?><div><h3><?php echo esc_html( $s[0] ); ?></h3><p><?php echo esc_html( $s[1] ); ?></p></div></article>
    <?php endforeach; ?>
  </div>
</div></section>

<section class="care-band"><div class="wrap care-in">
  <div>
    <p class="kick">For landlords</p>
    <h2>The Landlord Care Plan</h2>
    <p class="price-big">£29.99 <small>+VAT a month</small></p>
    <p class="lead">Take the hassle out of property maintenance and compliance: 24/7 peace of mind, priority support and your CP12, all for one monthly fee.</p>
    <p class="actions"><a class="btn orange" href="<?php echo cp_url( 'care-plans' ); ?>">See what’s included</a></p>
  </div>
  <ul class="care-list"><?php foreach ( array_slice( cp_care_included(), 0, 5 ) as $c ) { printf( '<li>%s<div><b>%s</b><span>%s</span></div></li>', cp_icon( 'check' ), esc_html( $c[0] ), esc_html( $c[1] ) ); } // phpcs:ignore ?><li><?php echo cp_icon( 'bolt' ); // phpcs:ignore ?><div><b>Emergencies attended within 2 hours</b><span>With priority service and 4-hour appointment slots.</span></div></li></ul>
</div></section>

<section class="sec"><div class="wrap">
  <div class="sec-head"><div><p class="kick dark">Our workmanship</p><h2>Neat, tidy, built to last</h2></div></div>
  <div class="gallery">
    <?php foreach ( [ [ 'copper.webp', 'Copper pipework and heating controls' ], [ 'cylinder.webp', 'Hot water cylinder installation' ], [ 'manifold.webp', 'Black and copper pipework with Caprani sign' ], [ 'bath.webp', 'Freestanding roll-top bath' ], [ 'plantroom.webp', 'Commercial plant room pipework' ], [ 'radiator.webp', 'Victorian column radiator' ], [ 'install.webp', 'Boiler installation' ], [ 'bathroom.webp', 'Finished bathroom' ] ] as $i => $g ) { printf( '<figure class="g%d">%s</figure>', (int) $i, cp_img( $g[0], $g[1], 1200, 1200 ) ); } // phpcs:ignore ?>
  </div>
</div></section>

<section class="sec team-band"><div class="wrap split">
  <figure class="team-photo"><?php echo cp_img( 'backs.webp', 'The Caprani engineers in branded workwear', 1080, 607 ); // phpcs:ignore ?></figure>
  <div>
    <p class="kick">Meet #TeamCAPRANI</p>
    <h2>A family business that invests in people</h2>
    <p>Founded in 2016 and led by Nathan and Jessica Caprani, we’re a small, family-run team of engineers, apprentices and office staff, plus Otto the office dog. We’re committed to raising industry standards and to training the next generation through apprenticeships.</p>
    <div class="faces"><?php foreach ( array_slice( cp_team(), 0, 8 ) as $t ) { echo cp_img( 'team/' . $t[2], $t[0], 700, 930 ); } // phpcs:ignore ?></div>
    <p class="actions"><a class="btn ghost" href="<?php echo cp_url( 'about' ); ?>">Meet the team</a></p>
  </div>
</div></section>

<section class="sec grey"><div class="wrap split rev">
  <div>
    <p class="kick dark">Commercial</p>
    <h2>Keeping businesses running</h2>
    <p>Installations, servicing and maintenance for schools, care homes, hospitality, offices, retail and industrial sites, from large-scale heating systems to complex plumbing networks.</p>
    <ul class="ticks"><li><?php echo cp_icon( 'check' ); // phpcs:ignore ?>Same-day commercial call-outs from £202 +VAT</li><li><?php echo cp_icon( 'check' ); // phpcs:ignore ?>Planned maintenance and servicing</li><li><?php echo cp_icon( 'check' ); // phpcs:ignore ?>Air conditioning and F-gas work</li></ul>
    <p class="actions"><a class="btn dark" href="<?php echo cp_url( 'commercial-services' ); ?>">Commercial services</a></p>
  </div>
  <figure class="stack"><?php echo cp_img( 'plantroom.webp', 'Plant room pipework', 1080, 1350, 'a' ) . cp_img( 'gasmeter.webp', 'Engineer testing a commercial gas meter', 1400, 1867, 'b' ); // phpcs:ignore ?></figure>
</div></section>

<section class="hiring"><div class="wrap hiring-in"><div><b>We’re hiring</b><span>Looking for an experienced gas engineer to join #TeamCAPRANI.</span></div><a class="btn ghost" href="<?php echo cp_url( 'jobs' ); ?>">View the role</a></div></section>
<?php cp_cta(); get_footer();
