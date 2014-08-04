// Extend jQuery addClass, removeClass and hasClass for SVG elements
(function($){

  /* addClass shim
   ****************************************************/
  var addClass = $.fn.addClass;
  $.fn.addClass = function(value) {
    var orig = addClass.apply(this, arguments);

    var elem,
      i = 0,
      len = this.length;

    for (; i < len; i++ ) {
      elem = this[ i ];
      if ( elem instanceof SVGElement ) {
        var classes = $(elem).attr('class');
        if ( classes ) {
            var index = classes.indexOf(value);
            if (index === -1) {
              classes = classes + " " + value;
              $(elem).attr('class', classes);
            }
        } else {
          $(elem).attr('class', value);
        }
      }
    }
    return orig;
  };

  /* removeClass shim
   ****************************************************/
  var removeClass = $.fn.removeClass;
  $.fn.removeClass = function(value) {
    var orig = removeClass.apply(this, arguments);

    var elem,
      i = 0,
      len = this.length;

    for (; i < len; i++ ) {
      elem = this[ i ];
      if ( elem instanceof SVGElement ) {
        var classes = $(elem).attr('class');
        if ( classes ) {
          var index = classes.indexOf(value);
          if (index !== -1) {
            classes = classes.substring(0, index) + classes.substring((index + value.length), classes.length);
            $(elem).attr('class', classes);
          }
        }
      }
    }
    return orig;
  };

  /* hasClass shim
   ****************************************************/
  var hasClass = $.fn.hasClass;
  $.fn.hasClass = function(value) {
    var orig = hasClass.apply(this, arguments);

    var elem,
      i = 0,
      len = this.length;

    for (; i < len; i++ ) {
      elem = this[ i ];
      if ( elem instanceof SVGElement ) {
        var classes = $(elem).attr('class');

        if ( classes ) {
          if ( classes.indexOf(value) === -1 ) {
            return false;
          } else {
            return true;
          }
        } else {
            return false;
        }
      }
    }
    return orig;
  };
})(jQuery);

// Page Visibility
(function($){

// Page Visibility
function getHiddenProp()
{
  var prefixes = ['webkit','moz','ms','o'];

  // if 'hidden' is natively supported just return it
  if ('hidden' in document) return 'hidden';

  // otherwise loop over all the known prefixes until we find one
  for (var i = 0; i < prefixes.length; i++){
    if ((prefixes[i] + 'Hidden') in document)
      return prefixes[i] + 'Hidden';
  }

  // otherwise it's not supported
  return null;
}

function pageIsHidden()
{
  var prop = getHiddenProp();
  if (!prop) return false;
  return document[prop];
}

function pageIsVisible()
{
  return !pageIsHidden();
}

function pageVisibilityChange()
{
  // If it's been more than 10 minutes since last update (maybe computer went to sleep), then refresh the whole map first
  if ( pageIsVisible() && ps2maps.facilityControl.lastTimestamp && moment().diff(ps2maps.facilityControl.lastTimestamp, 'seconds') >= 600 ) {
    ps2maps.facilityControl.socket.onopen();
  }
}

// Register
var visbilityProperty = getHiddenProp();
if ( visbilityProperty )
{
  var event = visbilityProperty.replace(/[H|h]idden/,'') + 'visibilitychange';
  document.addEventListener(event, pageVisibilityChange);
}

})();
