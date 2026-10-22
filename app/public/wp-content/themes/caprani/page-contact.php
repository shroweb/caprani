<?php get_header(); cp_phead( 'Contact', 'Contact the Caprani team', 'We operate a 365-day, 24/7 emergency call-out service. For anything else, send us a message and we’ll arrange a convenient time.', 'van.webp' );
$sent = sanitize_text_field( wp_unslash( $_GET['sent'] ?? '' ) ); $pick = sanitize_text_field( wp_unslash( $_GET['service'] ?? '' ) ); $type = sanitize_text_field( wp_unslash( $_GET['type'] ?? '' ) ); ?>
<section class="sec" id="form"><div class="wrap split top">
  <div>
    <div class="emerg-card"><b>Emergency?</b><p>Don’t fill in a form. Call us any time, day or night.</p><a class="btn orange full" href="tel:01482762888"><?php echo cp_icon( 'phone' ); // phpcs:ignore ?>01482 762888</a></div>
    <ul class="contact-list">
      <li><?php echo cp_icon( 'mail' ); // phpcs:ignore ?><span><b>Email</b><a href="mailto:info@capraniplumbing.co.uk">info@capraniplumbing.co.uk</a></span></li>
      <li><?php echo cp_icon( 'pin' ); // phpcs:ignore ?><span><b>Visit us</b>896 Spring Bank West, Hull, HU5 5BL<br><a href="https://maps.google.com/?q=896+Spring+Bank+West+Hull+HU5+5BL" rel="noopener">Get directions</a></span></li>
      <li><?php echo cp_icon( 'clock' ); // phpcs:ignore ?><span><b>Office hours</b>Weekdays 08:00–16:30. We love visitors, so feel free to pop in.</span></li>
    </ul>
  </div>
  <div class="form-card">
    <h2>Send an enquiry</h2>
    <?php if ( '1' === $sent ) { echo '<p class="notice ok">Thanks, your enquiry has been sent. The team will be in touch soon.</p>'; } elseif ( '0' === $sent ) { echo '<p class="notice">Please add your name, a phone number or email, and a message.</p>'; } ?>
    <form method="post" action="<?php echo cp_url( 'contact' ); ?>"><input type="hidden" name="cp_contact" value="1"><?php wp_nonce_field( 'cp_contact', 'cp_nonce' ); ?><p class="hp" aria-hidden="true"><label>Leave blank <input name="cp_hp" tabindex="-1" autocomplete="off"></label></p>
      <div class="seg" role="radiogroup" aria-label="Property type"><?php foreach ( [ 'Domestic', 'Commercial', 'Landlord' ] as $o ) { printf( '<label><input type="radio" name="type" value="%1$s"%2$s><span>%1$s</span></label>', esc_attr( $o ), ( $type ? $type === $o : 'Domestic' === $o ) ? ' checked' : '' ); } ?></div>
      <p><label for="name">Name *</label><input id="name" name="name" autocomplete="name" required></p>
      <div class="two2"><p><label for="phone">Phone</label><input id="phone" name="phone" type="tel" autocomplete="tel"></p><p><label for="email">Email</label><input id="email" name="email" type="email" autocomplete="email"></p></div>
      <div class="two2"><p><label for="postcode">Postcode</label><input id="postcode" name="postcode" autocomplete="postal-code"></p><p><label for="service">Service</label><select id="service" name="service"><option value="">Choose a service</option><?php foreach ( array_merge( array_column( cp_priced(), 0 ), array_column( cp_services(), 0 ), [ 'Landlord Care Plan', 'Commercial work', 'Something else' ] ) as $s ) { printf( '<option%s>%s</option>', $pick === $s ? ' selected' : '', esc_html( $s ) ); } ?></select></p></div>
      <p><label for="message">How can we help? *</label><textarea id="message" name="message" rows="5" required></textarea></p>
      <button class="btn orange" type="submit">Send enquiry</button>
    </form>
  </div>
</div></section>
<?php get_footer();
