<?php
/**
 * Plugin Name: Pawmade Checkout Bridge
 * Description: Confirm a signed headless shopping bag and continue to the native WooCommerce checkout.
 * Version: 0.1.0
 * Requires PHP: 7.4
 * Requires Plugins: woocommerce
 */

defined('ABSPATH') || exit;

function pawmade_checkout_error($message, $status = 400) {
    wp_die(esc_html($message), 'Pawmade checkout', array('response' => $status));
}

add_action('template_redirect', function () {
    if (!isset($_GET['pawmade_checkout']) && !isset($_POST['pawmade_token'])) {
        return;
    }
    nocache_headers();
    header('Referrer-Policy: no-referrer');
    header('X-Robots-Tag: noindex, nofollow');
    header('X-Frame-Options: DENY');
    if (!function_exists('WC') || !defined('PAWMADE_CHECKOUT_SECRET') || strlen(PAWMADE_CHECKOUT_SECRET) < 32) {
        pawmade_checkout_error('Checkout is not configured yet. Please contact the store.', 503);
    }
    if (!is_ssl()) {
        pawmade_checkout_error('Checkout requires a secure HTTPS connection.', 503);
    }
    $raw = isset($_POST['pawmade_token']) ? $_POST['pawmade_token'] : $_GET['pawmade_checkout'];
    if (!is_string($raw) || strlen($raw) > 8192) {
        pawmade_checkout_error('Invalid checkout link. Please return to the store.');
    }
    $token = wp_unslash($raw);
    $parts = explode('.', $token);
    if (count($parts) !== 2 || !preg_match('/^[A-Za-z0-9_-]+$/D', $parts[0]) || !preg_match('/^[a-f0-9]{64}$/D', $parts[1])) {
        pawmade_checkout_error('Invalid checkout link. Please return to the store.');
    }
    $expected = hash_hmac('sha256', $parts[0], PAWMADE_CHECKOUT_SECRET);
    if (!hash_equals($expected, $parts[1])) {
        pawmade_checkout_error('Invalid checkout link. Please return to the store.');
    }
    $payload = json_decode(base64_decode(strtr($parts[0], '-_', '+/'), true), true);
    if (!is_array($payload) || ($payload['v'] ?? null) !== 1 || !is_int($payload['exp'] ?? null) || $payload['exp'] < time() || $payload['exp'] > time() + 360) {
        pawmade_checkout_error('This checkout link has expired. Please return to your bag and try again.');
    }
    $items = $payload['items'] ?? null;
    if (!is_array($items) || count($items) < 1 || count($items) > 20 || get_woocommerce_currency() !== 'USD') {
        pawmade_checkout_error('This bag cannot be checked out. Please return to the store.');
    }
    $seen = array();
    $total_quantity = 0;
    $products = array();
    foreach ($items as $item) {
        if (!is_array($item) || !is_int($item['id'] ?? null) || $item['id'] < 1 || !is_int($item['quantity'] ?? null) || $item['quantity'] < 1 || $item['quantity'] > 20 || isset($seen[$item['id']])) {
            pawmade_checkout_error('Invalid items or quantities. Please return to your bag.');
        }
        $seen[$item['id']] = true;
        $total_quantity += $item['quantity'];
        $product = wc_get_product($item['id']);
        if (!$product || !$product->is_type('simple') || $product->get_status() !== 'publish' || !$product->is_purchasable() || !$product->is_in_stock() || !$product->has_enough_stock($item['quantity']) || ($product->is_sold_individually() && $item['quantity'] > 1) || ($product->get_max_purchase_quantity() > 0 && $item['quantity'] > $product->get_max_purchase_quantity())) {
            pawmade_checkout_error('An item is unavailable or its quantity has changed. Please return to your bag and update it.');
        }
        $products[] = $product;
    }
    if ($total_quantity > 50) {
        pawmade_checkout_error('Please reduce the number of items in your bag.');
    }
    // GET only displays a confirmation. It must never replace an existing cart.
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        status_header(200);
        header('Content-Type: text/html; charset=' . get_option('blog_charset'));
        ?>
        <!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Confirm your bag | pawmade</title><style>body{margin:0;background:#faf8f2;color:#30392d;font:15px/1.7 Arial,sans-serif}main{max-width:540px;margin:8vh auto;padding:32px}h1{font:42px Georgia,serif}li{padding:14px 0;border-bottom:1px solid #dedfd3}ul{list-style:none;padding:0}button{border:0;border-radius:3px;padding:17px 25px;background:#c34d2f;color:white;font-size:15px;cursor:pointer}p{color:#64695c}.brand{font:bold 30px Georgia,serif}</style></head><body><main><div class="brand">pawmade</div><h1>One step closer to a happy tail.</h1><p>Confirm the items below to continue. This replaces any existing bag on this checkout site.</p><ul><?php foreach ($items as $index => $item) : ?><li><?php echo esc_html($products[$index]->get_name()); ?> &times; <?php echo esc_html($item['quantity']); ?></li><?php endforeach; ?></ul><p>Final prices, available stock, shipping, and taxes are confirmed at checkout. No payment is collected on this page.</p><form method="post" action="<?php echo esc_url(home_url('/')); ?>"><input type="hidden" name="pawmade_token" value="<?php echo esc_attr($token); ?>"><?php wp_nonce_field('pawmade_confirm_bag', 'pawmade_nonce'); ?><button type="submit">Confirm bag &amp; continue</button></form></main></body></html>
        <?php
        exit;
    }
    if (!isset($_POST['pawmade_nonce']) || !is_string($_POST['pawmade_nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['pawmade_nonce'])), 'pawmade_confirm_bag')) {
        pawmade_checkout_error('Please reopen checkout from the store and confirm your bag.', 403);
    }
    if (null === WC()->cart) {
        wc_load_cart();
    }
    // Preserve existing contents if any WooCommerce extension rejects an item.
    $previous_cart = WC()->cart->get_cart_contents();
    $previous_coupons = WC()->cart->get_applied_coupons();
    $previous_removed = WC()->cart->get_removed_cart_contents();
    try {
        WC()->cart->set_cart_contents(array());
        WC()->cart->set_applied_coupons(array());
        WC()->cart->set_removed_cart_contents(array());
        foreach ($items as $item) {
            if (!WC()->cart->add_to_cart($item['id'], $item['quantity'])) {
                throw new Exception('Unable to add an item.');
            }
        }
        WC()->cart->calculate_totals();
        WC()->cart->set_session();
    } catch (Throwable $error) {
        WC()->cart->set_cart_contents($previous_cart);
        WC()->cart->set_applied_coupons($previous_coupons);
        WC()->cart->set_removed_cart_contents($previous_removed);
        WC()->cart->calculate_totals();
        WC()->cart->set_session();
        pawmade_checkout_error('An item could not be added. Your previous checkout bag has been restored. Please return to the store.');
    }
    wp_safe_redirect(wc_get_checkout_url());
    exit;
}, 5);
