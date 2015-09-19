   var $me = $( '.star-ctr' );

   var $bg, $fg, step, wd, cc,
       sw, fw, cs, cw, ini;

   $bg = $me.children( 'ul' );
   $fg = $bg.clone().addClass( 'star-fg' ).css( 'width', 0 ).appendTo( $me );
   $bg.addClass( 'star-bg' );

   function initialize() {

      ini = true;

      // How many rating elements
      cc = $bg.children().length;

      steps = Math.floor( +( $me.attr( 'data-steps' ) || 0 ) );

      // Total width of the bar
      wd = $bg.width();

      // Width of one rating element; assumes all are the
      // same width;  Used if step > cc
      sw = $bg.children().first().outerWidth( true );

      // Width of each star (including spacing)
      fw = wd / cc;

      if ( steps > 0 ) {

         // Width of each sub-step
         cw = sw / steps;
      }
   }

   $me.mousemove(function( e ) {
      if ( !ini ) initialize();

      var dt, nm, nw, ns, ow, vl;

      // Where is the mouse relative to the left
      // side of the bar?
      ow = dt = e.pageX - $me.offset().left;
      vl = Math.round( ow / wd * cc * 10 ) / 10;

      // steps == 0 means continous mode, so no need to
      // waste time finding a snapping point
      if ( steps > 0 ) {

         // Find the per element step
         vl = nm = Math.floor( dt / fw );
         ow = nw = $fg.children().eq( nm ).position().left;

         // Now find any sub-step within an element
         // when the number of steps is larger
         // than the number of elements
         ns = Math.round( ( dt - nw ) / cw );
         ow = nw + ns * cw;

         // The fractional part of the rating
         vl += Math.round( ( ns / steps ) * 10 ) / 10;
      }

      $me.attr( 'data-value', vl );
      $fg.css( 'width', Math.round( ow )+'px' );

   }).click(function() {
alert("clicked");
       // Grab value
       alert( $( this ).attr( 'data-value' ) );

       return false;
   });