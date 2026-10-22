<?php get_header(); cp_phead( 'About Caprani', 'Hello, and a big friendly warm welcome', 'Founded in 2016, Caprani Plumbing & Heating is a small, family-run business based in Hull, serving domestic and commercial clients.', 'reception.webp' ); ?>
<section class="sec"><div class="wrap">
  <div class="values">
    <div><h3>Raising industry standards</h3><p>Our mission is to elevate industry standards through continuous improvement, innovation and the highest quality and safety protocols.</p></div>
    <div><h3>Customer focused</h3><p>At the heart of our business is a dedication to tailored, reliable and friendly service for every client, domestic or commercial.</p></div>
    <div><h3>Investing in young people</h3><p>We’re committed to nurturing the next generation, with apprenticeships and training in plumbing and heating.</p></div>
  </div>
</div></section>
<section class="sec grey"><div class="wrap">
  <div class="sec-head"><div><p class="kick dark">The people</p><h2>Meet #TeamCAPRANI</h2></div></div>
  <div class="team-grid">
    <?php foreach ( cp_team() as $t ) : ?>
      <article class="member<?php echo $t[2] ? '' : ' noimg'; ?>"><div class="m-img"><?php echo $t[2] ? cp_img( 'team/' . $t[2], $t[0], 700, 930 ) : '<span>' . esc_html( implode( '', array_map( fn( $w ) => $w[0], explode( ' ', $t[0] ) ) ) ) . '</span>'; // phpcs:ignore ?></div><h3><?php echo esc_html( $t[0] ); ?></h3><p class="role"><?php echo esc_html( $t[1] ); ?></p><p><?php echo esc_html( $t[3] ); ?></p></article>
    <?php endforeach; ?>
  </div>
</div></section>
<section class="quote-band"><div class="wrap"><blockquote><p>“You have to take what you’re given and turn it into something more, because the easiest thing to do is complain. To get something you’ve never had, you have to do something you’ve never done.”</p><cite>Nathan Caprani, Company Director</cite></blockquote></div></section>
<section class="sec"><div class="wrap office-grid"><?php echo cp_img( 'office.webp', 'Caprani office', 1200, 1594 ) . cp_img( 'shop2.webp', 'Caprani showroom on Spring Bank West', 1600, 756 ) . cp_img( 'office2.webp', 'Caprani office interior', 1200, 1594 ); // phpcs:ignore ?></div></section>
<?php cp_cta(); get_footer();
