<?php
defined( 'ABSPATH' ) || exit;
add_action( 'after_setup_theme', function () { add_theme_support( 'title-tag' ); add_theme_support( 'html5', [ 'style', 'script' ] ); } );
add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style( 'cp', get_stylesheet_uri(), [], CP_VERSION );
	wp_enqueue_script( 'cp', get_template_directory_uri() . '/assets/js/main.js', [], CP_VERSION, [ 'strategy' => 'defer', 'in_footer' => true ] );
	foreach ( [ 'wp-block-library', 'wp-block-library-theme', 'global-styles', 'classic-theme-styles' ] as $h ) { wp_dequeue_style( $h ); }
}, 100 );
add_action( 'wp_head', function () {
	foreach ( [ 'manrope', 'inter' ] as $f ) { printf( '<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n", esc_url( get_template_directory_uri() . "/assets/fonts/$f.woff2" ) ); }
	echo '<meta name="description" content="Caprani Plumbing & Heating: family-run Hull plumbing and heating engineers since 2016. 24/7 emergency call-outs 365 days a year, boiler servicing, installations, heat pumps, air conditioning, landlord care plans and commercial work.">' . "\n";
	if ( is_front_page() ) {
		echo '<script type="application/ld+json">' . wp_json_encode( [ '@context' => 'https://schema.org', '@type' => 'Plumber', 'name' => 'Caprani Plumbing & Heating Ltd', 'telephone' => '+441482762888', 'email' => 'info@capraniplumbing.co.uk', 'url' => home_url( '/' ), 'foundingDate' => '2016', 'openingHours' => 'Mo-Fr 08:00-16:30', 'address' => [ '@type' => 'PostalAddress', 'streetAddress' => '896 Spring Bank West', 'addressLocality' => 'Hull', 'postalCode' => 'HU5 5BL', 'addressCountry' => 'GB' ] ] ) . '</script>' . "\n";
	}
}, 1 );
remove_action( 'wp_head', 'print_emoji_detection_script', 7 ); remove_action( 'wp_print_styles', 'print_emoji_styles' ); remove_action( 'wp_head', 'wp_generator' );
function cp_img( $f, $alt = '', $w = 0, $h = 0, $cls = '', $lazy = true ) {
	if ( isset( $_GET['qa'] ) ) { $lazy = false; }
	return sprintf( '<img src="%s" alt="%s"%s%s%s%s>', esc_url( get_template_directory_uri() . '/assets/img/' . $f ), esc_attr( $alt ), $w ? ' width="' . (int) $w . '"' : '', $h ? ' height="' . (int) $h . '"' : '', $cls ? ' class="' . esc_attr( $cls ) . '"' : '', $lazy ? ' loading="lazy" decoding="async"' : '' );
}
function cp_url( $s ) { return $s ? esc_url( home_url( '/' . $s . '/' ) ) : esc_url( home_url( '/' ) ); }
function cp_nav() { return [ '' => 'Home', 'domestic-services' => 'Domestic', 'commercial-services' => 'Commercial', 'care-plans' => 'Care plans', 'about' => 'Meet the team', 'contact' => 'Contact' ]; }
function cp_icon( $n ) {
	$p = [
		'phone' => '<path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/>',
		'mail'  => '<path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L20 7H4zm0 2.3L4 9.3V17h16V9.3z"/>',
		'pin'   => '<path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/>',
		'check' => '<path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/>',
		'clock' => '<path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 10.4 3.7 2.2-.8 1.3L11 13V7h2z"/>',
		'bolt'  => '<path d="M13 2 4 14h6l-1 8 9-12h-6z"/>',
		'arrow' => '<path d="M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3z"/>',
	];
	return '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">' . ( $p[ $n ] ?? '' ) . '</svg>';
}
function cp_phead( $kicker, $title, $lead = '', $img = 'shop2.webp' ) {
	echo '<section class="phead">' . cp_img( $img, '', 1600, 756, 'phead-bg', false ) . '<div class="wrap"><p class="kick">' . esc_html( $kicker ) . '</p><h1>' . wp_kses_post( $title ) . '</h1>' . ( $lead ? '<p class="lead">' . esc_html( $lead ) . '</p>' : '' ) . '</div></section>';
}
function cp_emergency_band() {
	?>
	<section class="emerg"><div class="wrap emerg-in">
		<div class="emerg-pulse" aria-hidden="true"><?php echo cp_icon( 'bolt' ); // phpcs:ignore ?></div>
		<div><h2>Boiler problems? Leaks? We’re on call 24/7, 365 days a year.</h2><p>Same-day emergency call-outs across Hull and the surrounding areas.</p></div>
		<a class="btn orange lg" href="tel:01482762888"><?php echo cp_icon( 'phone' ); // phpcs:ignore ?>01482 762888</a>
	</div></section>
	<?php
}
function cp_cta() {
	?>
	<section class="cta"><div class="wrap cta-in">
		<div><h2>Not an emergency, but needs doing?</h2><p>Whether it’s a job you’ve been putting off or something that isn’t urgent enough for a call-out, let us know and we’ll arrange a convenient time.</p></div>
		<p class="actions"><a class="btn orange" href="<?php echo cp_url( 'contact' ); ?>">Contact the Caprani team</a><a class="btn ghost" href="tel:01482762888"><?php echo cp_icon( 'phone' ); // phpcs:ignore ?>01482 762888</a></p>
	</div></section>
	<?php
}
// Enquiry form: validates, mails the site admin, thank-you message.
add_action( 'template_redirect', function () {
	if ( 'POST' !== $_SERVER['REQUEST_METHOD'] || empty( $_POST['cp_contact'] ) || ! empty( $_POST['cp_hp'] ) ) { return; }
	if ( ! isset( $_POST['cp_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['cp_nonce'] ) ), 'cp_contact' ) ) { return; }
	$f  = function ( $k ) { return sanitize_text_field( wp_unslash( $_POST[ $k ] ?? '' ) ); };
	$ok = $f( 'name' ) && ( is_email( $f( 'email' ) ) || $f( 'phone' ) ) && ! empty( $_POST['message'] );
	if ( $ok ) { wp_mail( get_option( 'admin_email' ), 'Website enquiry: ' . $f( 'service' ), "Name: {$f('name')}\nPhone: {$f('phone')}\nEmail: {$f('email')}\nPostcode: {$f('postcode')}\nType: {$f('type')}\nService: {$f('service')}\n\n" . sanitize_textarea_field( wp_unslash( $_POST['message'] ) ) ); }
	wp_safe_redirect( add_query_arg( 'sent', $ok ? '1' : '0', cp_url( 'contact' ) ) . '#form' ); exit;
} );
