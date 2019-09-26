<?php 

//=================================================
// Include global javascript
// src: /js/global/*.js
// dist: /dist/global-script.min.js
//=================================================
function global_javascript() {
    $jsFilePath = glob( get_stylesheet_directory() . '/dist/global-script.min.*.js' );
    $jsFileURI = get_stylesheet_directory_uri() . '/dist/' . basename($jsFilePath[0]);
    if(!empty($jsFilePath)) {
        wp_enqueue_script( 'my_global_js', $jsFileURI , null , null , true );
    }
}
add_action('wp_enqueue_scripts', 'global_javascript');

//=================================================
// Include global css
// src: /scss/styles.scss
// dist: /dist/styles.min.css
//=================================================
function global_css() {
    $cssFilePath = glob( get_stylesheet_directory() . '/dist/styles.min.*' );
    $cssFileURI = get_stylesheet_directory_uri() . '/dist/' . basename($cssFilePath[0]);
    if(!empty($cssFilePath)) {
        wp_enqueue_style( 'my_css', $cssFileURI );
    }
}
add_action('wp_enqueue_scripts', 'global_css');

//=================================================
// Example of adding a single js file for a specific page
//=================================================
function frontpage_script() {
    $fileName = 'single-example'; // Put the file name here, without extensions
    if( is_front_page() )    {
        $singleJsFilePath = glob( get_stylesheet_directory() . '/dist/single/' . $fileName . '.min.*.js' );
        $singleJsFileURI = get_stylesheet_directory_uri() . '/dist/single/' . basename($singleJsFilePath[0]);
        if(!empty($singleJsFilePath)) {
            wp_enqueue_script( 'frontpage_js', $singleJsFileURI , null , null , true );
        }
    }
}
add_action('wp_enqueue_scripts', 'frontpage_script');
