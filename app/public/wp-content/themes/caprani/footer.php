</main>
<footer class="site">
  <div class="wrap foot">
    <div class="f-brand"><?php echo cp_img( 'logo.webp', 'Caprani Plumbing & Heating', 1079, 452 ); // phpcs:ignore ?><p>A small, family-run plumbing and heating business based in Hull, serving domestic and commercial clients since 2016.</p><?php echo cp_img( 'accreds.webp', 'Gas Safe registered, OFTEC registered heating business and REFCOM F-gas certified', 800, 856, 'f-acc' ); // phpcs:ignore ?></div>
    <nav aria-label="Footer"><h3>Explore</h3><ul><?php foreach ( cp_nav() as $s => $l ) { printf( '<li><a href="%s">%s</a></li>', cp_url( $s ), esc_html( $l ) ); } ?><li><a href="<?php echo cp_url( 'jobs' ); ?>">Jobs</a></li></ul></nav>
    <div><h3>Visit or call</h3><ul class="f-contact">
      <li><?php echo cp_icon( 'pin' ); // phpcs:ignore ?>896 Spring Bank West, Hull HU5 5BL</li>
      <li><?php echo cp_icon( 'clock' ); // phpcs:ignore ?>Office open weekdays 08:00–16:30</li>
      <li><a href="tel:01482762888"><?php echo cp_icon( 'phone' ); // phpcs:ignore ?>01482 762888 (24/7 emergencies)</a></li>
      <li><a href="mailto:info@capraniplumbing.co.uk"><?php echo cp_icon( 'mail' ); // phpcs:ignore ?>info@capraniplumbing.co.uk</a></li>
    </ul></div>
  </div>
  <div class="wrap foot-bar"><p>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> Caprani Limited. Registered in England No. 10010264. Redesign concept by Swift7, not the official Caprani website.</p><p>Website by <a href="https://swift7.co.uk" rel="noopener">Swift7</a></p></div>
</footer>
<a class="float-call" href="tel:01482762888"><?php echo cp_icon( 'phone' ); // phpcs:ignore ?>Call 24/7</a>
<?php wp_footer(); ?>
</body>
</html>
