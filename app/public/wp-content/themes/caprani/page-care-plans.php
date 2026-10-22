<?php get_header(); cp_phead( 'Caprani Care Plans', 'Landlord Care Plan', 'Property maintenance and compliance taken care of: 24/7 peace of mind, priority support and full legal coverage, for one affordable monthly fee.', 'office.webp' ); ?>
<section class="sec"><div class="wrap plan">
  <div class="plan-card">
    <p class="kick dark">Landlord Care Plan</p>
    <p class="price-big dark">£29.99 <small>+VAT per month</small></p>
    <dl class="plan-sum"><div><dt>Contract term</dt><dd>12-month minimum</dd></div><div><dt>Coverage</dt><dd>1 domestic rental property per plan</dd></div><div><dt>Availability</dt><dd>24/7 call-outs and scheduled maintenance</dd></div></dl>
    <a class="btn orange full" href="<?php echo cp_url( 'contact' ); ?>?service=Landlord%20Care%20Plan#form">Get started today</a>
  </div>
  <div>
    <h2>What’s included</h2>
    <ul class="care-list light"><?php foreach ( cp_care_included() as $c ) { printf( '<li>%s<div><b>%s</b><span>%s</span></div></li>', cp_icon( 'check' ), esc_html( $c[0] ), esc_html( $c[1] ) ); } // phpcs:ignore ?></ul>
    <h3 class="sub-h">Member-only discounts</h3>
    <div class="discounts"><div><b>20%</b><span>off new boiler installations after 12+ months</span></div><div><b>10%</b><span>off additional plumbing, heating and drainage services</span></div></div>
    <h3 class="sub-h">Why choose a Caprani plan?</h3>
    <ul class="ticks"><?php foreach ( [ 'Priority service over non-care-plan customers', 'A qualified engineer always one call away', 'Spread the cost into manageable monthly payments', 'Avoid unexpected repairs with proactive cover', 'Designated 4-hour appointment slots for minimal disruption', 'Emergency call-outs attended within 2 hours' ] as $w ) { echo '<li>' . cp_icon( 'check' ) . esc_html( $w ) . '</li>'; } // phpcs:ignore ?></ul>
  </div>
</div></section>
<section class="sec grey"><div class="wrap narrow">
  <h2>Plan terms &amp; exclusions</h2>
  <div class="faq">
    <details><summary>Gas exclusions</summary><p>Pre-existing faults at sign-up; gas pipework alterations, rerouting or upgrades; non-domestic or commercial appliances; unvented cylinders and thermal stores; boilers over 70kW or installations not meeting current Gas Safe regulations; back boilers or appliances with obsolete parts; cosmetic repairs or deep cleaning; flue, chimney or external terminal repairs; removal of asbestos or hazardous materials; faults caused by limescale, sludge or contamination; damage from misuse, third parties or lack of maintenance.</p></details>
    <details><summary>Central heating exclusions</summary><p>Remedial work to radiators, pipework or heating zones (such as balancing, bleeding or flushing); non-standard radiator valves including towel radiator valves; cylinders, cold water tanks or expansion vessels; non-standard or complex systems such as thermal stores, immersion heaters, warm air units and renewables; powerflushing or chemical cleans (available at extra cost).</p></details>
    <details><summary>Hot and cold water pipework exclusions</summary><p>Labour over 20 minutes to access a leak; washing machine or dishwasher connections; stop taps, including seized internal stop taps; pipework beyond the external stop tap; shared or communal pipework; frozen pipes, tenant misuse or accidental damage; pipework replacement not required to complete a repair.</p></details>
    <details><summary>Tap and toilet exclusions</summary><p>Replacement of toilets or ceramic sanitary ware; the cost of supplying a new tap (labour is covered if the existing tap is beyond repair); specialist or non-standard parts; concealed cisterns without access panels; work requiring removal of tiled boxing, units or fitted furniture; limescale, misuse or foreign objects; bathroom fitting changes; carpentry, tiling or cosmetic repairs; blockages from misuse; macerators, bidets, urinals and electric toilets.</p></details>
    <details><summary>General exclusions</summary><p>Call-outs must relate to uncontrollable internal leaks causing actual damage. Roof and external leaks, water ingress in wet areas, showers and shower pumps, lead, steel or iron pipework, fire, flood or storm damage, faults between tenancies, drainage systems, appliances and waste pipework are not covered. Damage caused by tenants or third parties is excluded.</p></details>
  </div>
</div></section>
<?php cp_cta(); get_footer();
